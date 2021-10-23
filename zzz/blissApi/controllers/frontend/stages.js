const UserModel = require("../../models/User");
const { ProjectsModel } = require("../../models/Project");
const { StagesModel } = require("../../models/Stages");
const WorkspaceModel = require("../../models/Workspace");
const WorkspaceUsersModel = require("../../models/WorkspaceUsers");
const jwt = require("jsonwebtoken");
const mail = require("../../utilities/mail");
const { pick } = require("lodash");

// hepler methods
const mapStages = async (stageIds) => {
    const promises = stageIds.map(async (stageId, index) => {
        const promise = StagesModel.updateOne(
            { _id: stageId },
            { $set: { position: index } }
        );
        return promise;
    });
    const results = await Promise.all(promises);
    return results;
};

const onCreateStage = async (req, res, next) => {
    try {
        const { name, projectId, description } = req.body;
        if (!name)
            return res.status(200).json({
                status: 401,
                success: false,
                message: "Stage name is required ",
            });
        if (!projectId)
            return res.status(200).json({
                status: 401,
                success: false,
                message: "projectId is required ",
            });
        const count = await StagesModel.find({ projectId }).count();
        let data = pick(req.body, [
            "name",
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
        data.position = count;
        data.createdBy = req._user._id;
        data.projectId = projectId;
        const result = await StagesModel.create(data);
        if (result) {
            let project = await ProjectsModel.findById(projectId);
            if (project) project.stages.push(result._id);
            project = await project.save();
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: "Stage created successfully.",
        });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

const onEditStage = async (req, res, next) => {
    try {
        const { name, stageId } = req.body;
        if (!name)
            return res.status(200).json({
                status: 401,
                success: false,
                message: "Stage name is required ",
            });
        if (!stageId)
            return res
                .status(200)
                .json({ status: 401, success: false, message: "stageId is required " });
        let result = await StagesModel.findOne({
            _id: stageId,
        });

        if (result) {
            result.name = name;
            result = await result.save();
        }
        return res.status(200).json({
            status: 200,
            success: true,
            result,
            message: "Stage edited successfully.",
        });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

const onlistStages = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const results = await StagesModel.find({
            projectId,
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

const onDelete = async (req, res, next) => {
    try {
        const { projectId, stageId } = req.params;
        let result = await ProjectsModel.findOne({
            createdBy: req._user._id,
        });

        if (!result)
            return res.status(200).json({
                status: 401,
                success: false,
                message: "Only project creator can delete their stages",
            });

        //delete user
        let deletedStage = await StagesModel.findOneAndDelete({
            _id: stageId,
        });

        if (!deletedStage)
            return res.status(200).json({
                status: 401,
                success: false,
                message: "Could not able to delete !",
            });

        return res.status(200).json({
            status: 200,
            success: true,
            deletedStage,
            message: "stage deleted  successfully ",
        });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};
const onStageOperations = async (req, res, next) => {
    try {
        const { stageId, operationType, stageIds } = req.body;
        if (stageIds && stageIds.length) {
            const results = await mapStages(stageIds);
            return res.status(200).json({
                status: 200,
                success: true,
                results,
                message: "positions  updated  successfully ",
            });
        }
        if (operationType == "edit") {
            //find and update
            let data = pick(req.body, [
                "name",
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
            let result = await StagesModel.findOneAndUpdate(
                {
                    _id: stageId,
                },
                { $set: data },
                { fields: { _id: 1 }, new: true }
            );
            return res.status(200).json({
                status: 200,
                success: true,
                result,
                message: "Stage  updated  successfully ",
            });
        }
        if (operationType == "archive") {
            let data = {};
            data.archived = true;
            data.archivedOn = new Date();
            data.archivedBy = req._user._id;
            let result = await StagesModel.findOneAndUpdate(
                {
                    _id: stageId,
                },
                { $set: data },
                { fields: { _id: 1 }, new: true }
            );
            return res.status(200).json({
                status: 200,
                success: true,
                result,
                message: "stage  archived  successfully ",
            });
        }
        if (operationType == "delete") {
            let data = {};
            data.isDeleted = true;
            data.deletedOn = new Date();
            data.deletedBy = req._user._id;
            let result = await StagesModel.findOneAndUpdate(
                {
                    _id: stageId,
                },
                { $set: data },
                { fields: { _id: 1 }, new: true }
            );
            return res.status(200).json({
                status: 200,
                success: true,
                result,
                message: "stage  deleted  successfully ",
            });
        }
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

module.exports = {
    onCreateStage,
    onEditStage,
    onlistStages,
    onDelete,
    onStageOperations,
};
