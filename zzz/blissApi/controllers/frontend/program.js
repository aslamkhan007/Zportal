// utils
const makeValidation = require("@withvoid/make-validation");
const UserModel = require("../../models/User");
const { ProjectsModel } = require("../../models/Project");
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

const onCreateProgram = async (req, res, next) => {
    try {
        const { name, workspaceId, description } = req.body;
        if (!name)
            return res
                .status(200)
                .json({
                    status: 401,
                    success: false,
                    message: "Program name is required ",
                });
        if (!workspaceId)
            return res
                .status(200)
                .json({
                    status: 401,
                    success: false,
                    message: "WorkspaceId is required ",
                });

        let data = pick(req.body, [
            "name",
            "workspaceId",
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
        data.createdBy = req._user._id;

        const result = await ProgramModel.create(data);

        return res.status(200).json({
            status: 200,
            result,
            success: true,
            message: "Program created successfully.",
        });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

const onlistPrograms = async (req, res, next) => {
    try {
        const { workspaceId } = req.params;

        const results = await ProgramModel.find({
            workspaceId,
            isDeleted: { $ne: true },
            archived: { $ne: true },
        })
            .populate({
                path: "projects",
                match: { isDeleted: { $ne: true }, archived: { $ne: true } },
                model: "Projects",
            })
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

const onProgramOperations = async (req, res, next) => {
    try {
        const { programId, operationType } = req.body;
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
            let result = await ProgramModel.findOneAndUpdate(
                {
                    _id: programId,
                },
                { $set: data },
                { fields: { _id: 1 }, new: true }
            );
            return res.status(200).json({
                status: 200,
                success: true,
                result,
                message: "Program  updated  successfully ",
            });
        }
        if (operationType == "archive") {
            let data = {};
            data.archived = true;
            data.archivedOn = new Date();
            data.archivedBy = req._user._id;
            let result = await ProgramModel.findOneAndUpdate(
                {
                    _id: programId,
                },
                { $set: data },
                { fields: { _id: 1 }, new: true }
            );
            return res.status(200).json({
                status: 200,
                success: true,
                result,
                message: "Program  archived  successfully ",
            });
        }
        if (operationType == "delete") {
            let data = {};
            data.isDeleted = true;
            data.deletedOn = new Date();
            data.deletedBy = req._user._id;
            let result = await ProgramModel.findOneAndUpdate(
                {
                    _id: programId,
                },
                { $set: data },
                { fields: { _id: 1 }, new: true }
            );
            return res.status(200).json({
                status: 200,
                success: true,
                result,
                message: "Program  deleted  successfully ",
            });
        }
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

module.exports = {
    onCreateProgram,
    onlistPrograms,
    onProgramOperations,
};
