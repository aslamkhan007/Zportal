// utils
const makeValidation = require("@withvoid/make-validation");
const UserModel = require("../../models/User");
const { ProjectsModel } = require("../../models/Project");
const { StatusModel } = require("../../models/Status");
const { ProgramModel } = require("../../models/Program");
const WorkspaceModel = require("../../models/Workspace");
const WorkspaceUsersModel = require("../../models/WorkspaceUsers");
const jwt = require("jsonwebtoken");
const mail = require("../../utilities/mail");
const { validationResult } = require("express-validator");
const {
    pick,
    has,
    isEmpty,
    union,
    uniqBy,
    concat,
    includes,
} = require("lodash");
const { TicketsModel } = require("../../models/Tickets");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

const mapStatus = async (statusIds) => {
    const promises = statusIds.map(async (statusId, index) => {
        const promise = StatusModel.updateOne(
            { _id: statusId },
            { $set: { position: index } }
        );
        return promise;
    });
    const results = await Promise.all(promises);
    return results;
};

const onCreateProject = async (req, res, next) => {
    try {
        let statusResponse = "";
        const { projectName, programId, description } = req.body;
        if (!projectName)
            return res
                .status(200)
                .json({
                    status: 401,
                    success: false,
                    message: "Project name is required ",
                });
        if (!programId)
            return res
                .status(200)
                .json({
                    status: 401,
                    success: false,
                    message: "Program id is required ",
                });

        const projectCode =
            projectName.slice(0, 2).trim() + Math.floor(1000 + Math.random() * 9000);
        let data = pick(req.body, [
            "projectName",
            "programId",
            "description",
            "assignTo",
            "startDate",
            "dueDate",
            "priority",
            "estimate",
            "workedOn",
            "riskStatus",
            "watcher",
            "progress",
        ]);
        data.projectCode = projectCode;
        data.createdBy = req._user._id;

        const result = await ProjectsModel.create(data);
        if (result) {
            const initialStatus = [
                { position: 0, status: "BACKLOG", projectId: result._id },
                { position: 1, status: "THIS SPRINT", projectId: result._id },
                { position: 2, status: "IN PROGRESS", projectId: result._id },
                { position: 3, status: "IN REVIEW", projectId: result._id },
                { position: 4, status: "DONE", projectId: result._id },
            ];
            // insert 5 status in the status collection and their entries in the projects array
            statusResponse = await StatusModel.insertMany(initialStatus);
            if (statusResponse && statusResponse.length) {
                statusResponse.forEach((r) => {
                    result.status.push(r._id);
                });
                await result.save();
            }
            //  { fields: { _id: 1 },
            // save project id in program schema
            let program = await ProgramModel.findById(programId);
            if (program) program.projects.push(result._id);
            program = await program.save();
        }

        result.members.push({
            user: req._user._id,
            first_name: req._user.first_name,
            last_name: req._user.last_name,
            role: "admin",
        });
        await result.save();
        return res.status(200).json({
            status: 200,
            result,
            success: true,
            message: "project created successfully.",
        });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

const onStatusOperations = async (req, res, next) => {
    try {
        const { statusId, operationType, statusIds, projectId } = req.body;
        if (statusIds && statusIds.length) {
            const results = await mapStatus(statusIds);
            return res.status(200).json({
                status: 200,
                success: true,
                results,
                message: "positions  updated  successfully ",
            });
        }
        if (!statusId)
            return res
                .status(200)
                .json({ status: 401, success: false, message: "statusId is required" });

        if (operationType === "edit") {
            let data = pick(req.body, ["status"]);
            let result = await StatusModel.findOneAndUpdate(
                {
                    _id: statusId,
                },
                { $set: data },
                { fields: { _id: 1 }, new: true }
            );

            return res.status(200).json({
                status: 200,
                success: true,
                result,
                message: "Status updated successfully",
            });
        }
        if (operationType === "delete") {
            const result = await StatusModel.findByIdAndDelete({ _id: statusId });
            const doneStatus = await StatusModel.findOne({
                projectId,
                status: "DONE",
            });
            const tickets = await TicketsModel.updateMany(
                { status: statusId },
                { $set: { status: doneStatus._id } }
            );

            await ProjectsModel.updateOne(
                { _id: projectId },
                { $pullAll: { status: [statusId] } }
            );

            return res.status(200).json({
                status: 200,
                success: true,
                message: "Status Deleted successfully",
            });
        }
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

const onCreateStatus = async (req, res, next) => {
    try {
        let statusResponse = "";
        const { status, projectId } = req.body;
        if (!status)
            return res
                .status(200)
                .json({ status: 401, success: false, message: "Status is required " });
        if (!projectId)
            return res
                .status(200)
                .json({
                    status: 401,
                    success: false,
                    message: "Project id is required ",
                });

        let position = await StatusModel.find({ projectId }).count();

        const result = await StatusModel.create({
            projectId,
            status,
            position,
        });
        if (result) {
            const project = await ProjectsModel.findOneAndUpdate(
                { _id: projectId },
                { $push: { status: result._id } }
            );
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "status created successfully.",
        });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

const onlistProjects = async (req, res, next) => {
    try {
        const { programId } = req.params;

        const results = await ProjectsModel.find({
            programId,
            isDeleted: { $ne: true },
            archived: { $ne: true },
        })
            .populate({
                path: "stages",
                match: { isDeleted: { $ne: true }, archived: { $ne: true } },
                options: { sort: { position: 1 } },
                model: "Stages",
                populate: {
                    path: "tickets",
                    match: { isDeleted: { $ne: true }, archived: { $ne: true } },
                    options: { sort: { position: 1 } },
                    model: "Tickets",
                },
            })
            .populate("status")
            .exec();

        return res.status(200).json({
            status: 200,
            success: true,
            results,
        });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

const onProjectOperations = async (req, res, next) => {
    try {
        const { projectId, operationType } = req.body;
        if (!projectId)
            return res
                .status(200)
                .json({
                    status: 401,
                    success: false,
                    message: "projectId is required",
                });

        if (operationType === "edit") {
            let data = pick(req.body, [
                "projectName",
                "view",
                "description",
                "assignTo",
                "startDate",
                "dueDate",
                "priority",
                "estimate",
                "workedOn",
                "riskStatus",
                "watcher",
                "progress",
            ]);
            let result = await ProjectsModel.findOneAndUpdate(
                {
                    createdBy: req._user._id,
                    _id: projectId,
                },
                { $set: data },
                { fields: { _id: 1 }, new: true }
            );
            if (!result)
                return res
                    .status(200)
                    .json({
                        status: 401,
                        success: false,
                        message: "Only project creator can modify project",
                    });
            return res.status(200).json({
                status: 200,
                success: true,
                result,
                message: "Project updated successfully",
            });
        }

        if (operationType == "archive") {
            let data = {};
            data.archived = true;
            data.archivedOn = new Date();
            data.archivedBy = req._user._id;
            let result = await ProjectsModel.findOneAndUpdate(
                {
                    createdBy: req._user._id,
                    _id: projectId,
                },
                { $set: data },
                { fields: { _id: 1 }, new: true }
            );
            if (!result)
                return res
                    .status(200)
                    .json({
                        status: 401,
                        success: false,
                        message: "Only project creator can archive project",
                    });
            const doneStatus = await StatusModel.findOne({
                projectId,
                status: "DONE",
            });
            const tickets = await TicketsModel.updateMany(
                { projectId },
                { $set: { status: doneStatus._id } }
            );
            return res.status(200).json({
                status: 200,
                success: true,
                result,
                message: "Project  archived  successfully ",
            });
        }

        if (operationType == "delete") {
            let data = {};
            data.isDeleted = true;
            data.deletedOn = new Date();
            data.deletedBy = req._user._id;
            let result = await ProjectsModel.findOneAndUpdate(
                {
                    createdBy: req._user._id,
                    _id: projectId,
                },
                { $set: data },
                { fields: { _id: 1 }, new: true }
            );
            if (!result)
                return res
                    .status(200)
                    .json({
                        status: 401,
                        success: false,
                        message: "Only project creator can delete project",
                    });
            //get done status
            const doneStatus = await StatusModel.findOne({
                projectId,
                status: "DONE",
            });
            const tickets = await TicketsModel.updateMany(
                { projectId },
                { $set: { status: doneStatus._id } }
            );
            return res.status(200).json({
                status: 200,
                success: true,
                result,
                message: "Project  deleted  successfully ",
            });
        }
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

const onArchiveProject = async (req, res, next) => {
    try {
        const { projectId } = req.body;
        if (!projectId)
            return res
                .status(200)
                .json({
                    status: 401,
                    success: false,
                    message: "projectId is required ",
                });

        let result = await ProjectsModel.findOne({
            _id: projectId,
        });

        if (result) {
            result.archived = true;
            result = await result.save();
        } else {
            return res
                .status(200)
                .json({ status: 401, success: false, message: "no project found " });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            result,
            message: "Project archived successfully successfully",
        });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

const onDelete = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        let result = await ProjectsModel.findOne({
            createdBy: req._user._id,
        });

        if (!result)
            return res
                .status(200)
                .json({
                    status: 401,
                    success: false,
                    message: "Only project creator can delete project",
                });

        //delete user
        let deletedProject = await ProjectsModel.findOneAndUpdate(
            {
                _id: projectId,
            },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedProject)
            return res
                .status(200)
                .json({
                    status: 401,
                    success: false,
                    message: "Could not able to delete !",
                });

        return res.status(200).json({
            status: 200,
            success: true,
            deletedProject,
            message: "Project deleted  successfully ",
        });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

const getProject = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const results = await ProjectsModel.findOne({
            _id: projectId,
            isDeleted: { $ne: true },
            archived: { $ne: true },
        })
            .populate({
                path: "stages",
                match: { isDeleted: { $ne: true }, archived: { $ne: true } },
                model: "Stages",
                populate: {
                    path: "tickets",
                    match: { isDeleted: { $ne: true }, archived: { $ne: true } },
                    model: "Tickets",
                },
            })
            .populate("status")
            .exec();

        return res.status(200).json({
            status: 200,
            success: true,
            results,
        });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

const _getProjectBoardView = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        let results = await ProjectsModel.findOne({
            _id: projectId,
            isDeleted: { $ne: true },
            archived: { $ne: true },
        }).populate({
            path: "stages",
            match: { isDeleted: { $ne: true }, archived: { $ne: true } },
            model: "Stages",
            options: { sort: { position: 1 } },
            populate: {
                path: "tickets",
                match: { isDeleted: { $ne: true }, archived: { $ne: true } },
                options: { sort: { position: 1 } },
                model: "Tickets",
            },
        });
        let columns = [];
        if (results && results.stages && results.stages.length) {
            let stages = JSON.parse(JSON.stringify(results.stages));
            columns = stages.map((stage) => {
                stage.id = stage._id;
                stage.title = stage.name;

                if (stage.tickets && stage.tickets.length) {
                    let tickets = JSON.parse(JSON.stringify(stage.tickets));
                    stage.cards = tickets.map((ticket) => {
                        ticket.id = ticket._id;
                        return ticket;
                    });
                } else {
                    stage.cards = [];
                }

                return {
                    id: stage.id,
                    title: stage.title,
                    cards: stage.cards,
                    description: stage.description,
                };
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            results: { columns },
        });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

const getProjectBoardView = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const statusPrototype = await StatusModel.find({
            projectId,
        }).sort({ position: 1 });

        //  const statusPrototype = ["", "BACKLOG", "AMBER", "TODO", "IN PROGRESS", "DONE"]
        doneList = [];

        let results = await TicketsModel.aggregate([
            {
                $match: {
                    projectId: ObjectId(projectId),
                    isDeleted: { $ne: true },
                    archived: { $ne: true },
                },
            },
            { $sort: { position: 1 } },
            {
                $group: {
                    _id: "$status",
                    tickets: {
                        $push: "$$ROOT",
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);

        let columns = [];
        if (statusPrototype && statusPrototype.length) {
            statusPrototype.forEach((s) => {
                let statusObj = {};
                statusObj.id = s._id;
                statusObj.title = s.status;
                statusObj.cards = [];
                columns.push(statusObj);
                if (results && results.length) {
                    let result = JSON.parse(JSON.stringify(results));
                    result.forEach((status) => {
                        if (s._id == status._id) {
                            if (status.tickets && status.tickets.length) {
                                let tickets = JSON.parse(JSON.stringify(status.tickets));
                                status.cards = tickets.map((ticket) => {
                                    ticket.id = ticket._id;
                                    statusObj.cards.push(ticket);
                                });
                            }
                        }
                    });
                }
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            results: { columns },
        });
        //   results: { columns }
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

const getProjectGanttView = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        let results = await ProjectsModel.findOne({
            _id: projectId,
            isDeleted: { $ne: true },
            archived: { $ne: true },
        }).populate({
            path: "stages",
            match: { isDeleted: { $ne: true }, archived: { $ne: true } },
            model: "Stages",
            options: { sort: { position: 1 } },
            populate: {
                path: "tickets",
                match: { isDeleted: { $ne: true }, archived: { $ne: true } },
                options: { sort: { position: 1 } },
                model: "Tickets",
            },
        });
        let data = [];

        if (results && results.stages && results.stages.length) {
            let stages = JSON.parse(JSON.stringify(results.stages));
            stages.forEach((stage) => {
                data.push({
                    id: stage._id,
                    text: stage.name,
                    start_date: "2020-02-12",
                    duration: 1,
                    progress: 0.6,
                    open: true,
                });
                if (stage.tickets && stage.tickets.length) {
                    let tickets = JSON.parse(JSON.stringify(stage.tickets));
                    stage.cards = tickets.forEach((ticket) => {
                        data.push({
                            id: ticket._id,
                            text: ticket.title,
                            start_date: "2020-02-12",
                            duration: 1,
                            progress: 0.6,
                            parent: stage._id,
                        });
                    });
                }
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            results: { data },
        });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

module.exports = {
    onCreateProject,
    onlistProjects,
    onProjectOperations,
    onDelete,
    onArchiveProject,
    getProject,
    getProjectBoardView,
    getProjectGanttView,
    onCreateStatus,
    onStatusOperations,
};
