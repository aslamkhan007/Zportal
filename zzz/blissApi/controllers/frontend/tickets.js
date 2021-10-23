const UserModel = require("../../models/User");
const { ProjectsModel } = require("../../models/Project");
const { StagesModel } = require("../../models/Stages");
const { TicketsModel } = require("../../models/Tickets");
const WorkspaceModel = require("../../models/Workspace");
const WorkspaceUsersModel = require("../../models/WorkspaceUsers");
const multiparty = require("multiparty");
const jwt = require("jsonwebtoken");
const mail = require("../../utilities/mail");
const { pick } = require('lodash')
// helper methods 
const mapTickets = async (ticketIds) => {
    const promises = ticketIds.map(async (ticketId, index) => {
        const promise = TicketsModel.updateOne({ _id: ticketId }, { $set: { position: index } });
        return promise;
    });
    const results = await Promise.all(promises);
    return results
}

const onCreateTicket = async (req, res, next) => {
    try {
        let form = new multiparty.Form();
        let obj = {};
        console.log("body", req.body, req.files);
        const { body } = req;
        obj = Object.entries(body).reduce((acc, val) => {
            acc = { ...acc, [val[0]]: JSON.parse(val[1]) };

            return acc;
        }, {});

        // console.log("req.body", req);
        if (!obj.title)
            return res.status(200).json({
                status: 401,
                success: false,
                message: "title is required ",
            });
        if (!obj.description)
            return res.status(200).json({
                status: 401,
                success: false,
                message: "description is required ",
            });
        if (!obj.stageId)
            return res.status(200).json({
                status: 401,
                success: false,
                message: "stageId is required ",
            });
        if (!obj.projectId)
            return res.status(200).json({
                status: 401,
                success: false,
                message: "projectId is required ",
            });

        let ticketCode = await getTicketCode(obj.projectId);
        let data = pick(obj, [
            "title",
            "status",
            "description",
            "stageId",
            "projectId",
            "assignTo",
            "startDate",
            "dueDate",
            "priority",
            "estimate",
            "workedOn",
            "riskStatus",
            "subTasks",
            "watcher",
            "progress",
        ]);
        data.ticketCode = ticketCode;

        // console.log("obj ", obj);

        const result = await TicketsModel.create(data);
        if (result) {
            if (req.files) {
                console.log("files sss", req.files);
                req.files.forEach((file) => {
                    result.attachments.push(file.filename);
                });

                await result.save();
            }

            let stage = await StagesModel.findById(obj.stageId);
            if (stage) stage.tickets.push(result._id);
            stage = await stage.save();
        }

        return res.status(200).json({
            status: 200,
            result,
            success: true,
            message: "ticket is created successfully.",
        });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

const _onCreateTicket = async (req, res, next) => {
    try {

        const { title, description, stageId, projectId } = req.body;
        if (!title)
            return res
                .status(200)
                .json({
                    status: 401,
                    success: false,
                    message: "title is required ",
                });
        if (!description)
            return res
                .status(200)
                .json({
                    status: 401,
                    success: false,
                    message: "description is required ",
                });
        if (!stageId)
            return res
                .status(200)
                .json({
                    status: 401,
                    success: false,
                    message: "stageId is required ",
                });
        if (!projectId)
            return res
                .status(200)
                .json({
                    status: 401,
                    success: false,
                    message: "projectId is required ",
                });

        let ticketCode = await getTicketCode(projectId)
        let data = pick(req.body, ['title', 'status', 'description', 'stageId', 'projectId', 'assignTo', 'startDate', 'dueDate', 'priority', 'estimate', 'workedOn', 'riskStatus', 'subTasks', 'watcher', 'progress'])
        data.ticketCode = ticketCode

        const result = await TicketsModel.create(data);
        if (result) {
            if (req.files) {
                req.files.forEach(file => {
                    result.attachments.push(file.filename)
                })

                await result.save()
            }

            let stage = await StagesModel.findById(stageId);
            if (stage) stage.tickets.push(result._id);
            stage = await stage.save();
        }

        return res.status(200).json({
            status: 200,
            result,
            success: true,
            message: "ticket is created successfully.",
        });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};



const onlistTickets = async (req, res, next) => {
    try {
        const { stageId } = req.params;

        const results = await TicketsModel.find({
            stageId,
        });

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

// helper methods

const getTicketCode = async (projectId) => {
    let ticketCode = ''
    let code = ''
    let project = await ProjectsModel.findById(projectId);
    let count = await TicketsModel.find({ projectId }).count() + 1;
    if (count > 99) {
        code = count
    } else if (count < 100 && count > 9) {
        code = '0' + count.toString()
    } else {
        code = '00' + count.toString()
    }
    return ticketCode = `${project ? project.projectCode : 'unknown'}-${code}`
}


const onTicketOperations = async (req, res, next) => {
    try {
        let message = "success";
        let result = "";
        let obj = {};
        obj = Object.entries(req.body).reduce((acc, val) => {
            acc = { ...acc, [val[0]]: JSON.parse(val[1]) };

            return acc;
        }, {});
        const { ticketId, operationType, status, prevStatusId, ticketIds } = obj;
        if (operationType == "edit") {
            //find and update

            let data = pick(obj, [
                "title",
                "description",
                "status",
                "projectId",
                "assignTo",
                "startDate",
                "dueDate",
                "priority",
                "estimate",
                "workedOn",
                "riskStatus",
                "subTasks",
                "watcher",
                "progress",
            ]);

            result = await TicketsModel.findOneAndUpdate(
                {
                    _id: ticketId,
                },
                { $set: { ...data, attachments: [] } },
                { new: true }
            );

            if (result) {
                if (req.files) {
                    console.log("files sss", req.files);
                    req.files.forEach((file) => {
                        result.attachments.push(file.filename);
                    });

                    await result.save();
                }
            }
            if (status && prevStatusId) {
                if (status !== prevStatusId) {
                    // await StagesModel.updateOne(
                    //     { _id: prevStatusId },
                    //     { $pullAll: { tickets: [ticketId] } })
                    // await StagesModel.updateOne(
                    //     { _id: status },
                    //     { $push: { tickets: ticketId } })
                }

                //   change tickets position wthin stage
                await mapTickets(ticketIds);
            }

            // if (stageId && prevStageId) {
            //     if (stageId !== prevStageId) {
            //         await StagesModel.updateOne(
            //             { _id: prevStageId },
            //             { $pullAll: { tickets: [ticketId] } })
            //         await StagesModel.updateOne(
            //             { _id: stageId },
            //             { $push: { tickets: ticketId } })
            //     }

            //     //   change tickets position wthin stage
            //     await mapTickets(ticketIds)
            // }
            message = "ticket  updated  successfully ";
        }
        if (operationType == "archive") {
            let data = {};
            data.archived = true;
            data.archivedOn = new Date();
            data.archivedBy = req._user._id;
            result = await TicketsModel.findOneAndUpdate(
                {
                    _id: ticketId,
                },
                { $set: data },
                { fields: { _id: 1 }, new: true }
            );
            message = "ticket  archived  successfully ";
        }
        if (operationType == "delete") {
            let data = {};
            data.isDeleted = true;
            data.deletedOn = new Date();
            data.deletedBy = req._user._id;
            result = await TicketsModel.findOneAndUpdate(
                {
                    _id: ticketId,
                },
                { $set: data },
                { fields: { _id: 1 }, new: true }
            );
            message = "ticket  deleted  successfully ";
        }

        return res.status(200).json({
            status: 200,
            success: true,
            result,
            message,
        });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

const _onTicketOperations = async (req, res, next) => {
    try {
        let message = "success"
        let result = ''
        const { ticketId, operationType, status, prevStatusId, ticketIds } = req.body;
        if (operationType == "edit") {
            //find and update
            let data = pick(req.body, ['title', 'description', 'status', 'projectId', 'assignTo', 'startDate', 'dueDate', 'priority', 'estimate', 'workedOn', 'riskStatus', 'subTasks', 'watcher', 'progress'])
            result = await TicketsModel.findOneAndUpdate({
                _id: ticketId
            }, { $set: data }, { fields: { _id: 1 }, new: true });
            if (status && prevStatusId) {
                if (status !== prevStatusId) {

                    // await StagesModel.updateOne(
                    //     { _id: prevStatusId },
                    //     { $pullAll: { tickets: [ticketId] } })
                    // await StagesModel.updateOne(
                    //     { _id: status },
                    //     { $push: { tickets: ticketId } })
                }

                //   change tickets position wthin stage
                await mapTickets(ticketIds)
            }

            // if (stageId && prevStageId) {
            //     if (stageId !== prevStageId) {
            //         await StagesModel.updateOne(
            //             { _id: prevStageId },
            //             { $pullAll: { tickets: [ticketId] } })
            //         await StagesModel.updateOne(
            //             { _id: stageId },
            //             { $push: { tickets: ticketId } })
            //     }

            //     //   change tickets position wthin stage
            //     await mapTickets(ticketIds)
            // }
            message = "ticket  updated  successfully "

        }
        if (operationType == "archive") {
            let data = {}
            data.archived = true
            data.archivedOn = new Date()
            data.archivedBy = req._user._id
            result = await TicketsModel.findOneAndUpdate({
                _id: ticketId
            }, { $set: data }, { fields: { _id: 1 }, new: true });
            message = "ticket  archived  successfully ";
        }
        if (operationType == "delete") {
            let data = {}
            data.isDeleted = true
            data.deletedOn = new Date()
            data.deletedBy = req._user._id
            result = await TicketsModel.findOneAndUpdate({
                _id: ticketId
            }, { $set: data }, { fields: { _id: 1 }, new: true });
            message = "ticket  deleted  successfully ";
        }

        return res
            .status(200)
            .json({
                status: 200,
                success: true,
                result,
                message
            });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};


module.exports = {
    onCreateTicket,
    onlistTickets,
    onTicketOperations
};
