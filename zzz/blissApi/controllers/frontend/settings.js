// utils
const makeValidation = require("@withvoid/make-validation");
const UserModel = require("../../models/User");
const { ProjectsModel } = require("../../models/Project");
const WorkspaceModel = require("../../models/Workspace");
const WorkspaceUsersModel = require("../../models/WorkspaceUsers");
const jwt = require("jsonwebtoken");
const mail = require("../../utilities/mail");
const { validationResult } = require('express-validator');
const { pick, has, isEmpty, union, uniqBy, concat, includes, result } = require('lodash')
const bcrypt = require("bcrypt");
const moment = require("moment");

const onlistRecycleItems = async (req, res, next) => {
    try {
        let results = []
        const { isDeleted, archived } = req.query;
        if (isDeleted) {
            results = await ProjectsModel.find({
                isDeleted: true,
            }).populate('deletedBy', 'first_name last_name')
                .populate('archivedBy', 'first_name last_name').exec();
        }
        if (archived) {
            results = await ProjectsModel.find({
                archived: true,
            }).populate('deletedBy', 'first_name last_name')
                .populate('archivedBy', 'first_name last_name').exec();
        }
        if (results && results.length) {
            results = JSON.parse(JSON.stringify(results))
            results = results.map(result => {
                return {
                    ...result, name: result.projectName, id: result._id,
                    _deletedBy: `${result.deletedBy ? result.deletedBy.first_name : ''} ${result.deletedBy ? result.deletedBy.last_name : ''}`,
                    deletedOn: result.deletedOn ? moment(result.deletedOn).format('dddd, MMM,YYYY') : '',
                    archivedOn: result.archivedOn ? moment(result.archivedOn).format('dddd, MMM,YYYY') : '',
                    _archivedBy: `${result.archivedBy ? result.archivedBy.first_name : ''} ${result.archivedBy ? result.archivedBy.last_name : ''}`
                }
            })
        }
        return res
            .status(200)
            .json({
                status: 200,
                success: true,
                results
            });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};

const onRecycleAction = async (req, res, next) => {
    try {
        let message = ""
        let { actionType, ids, password } = req.body;
        // let mapedIds = ids.map(id => ObjectId(id))
        if (actionType === 'delete') {
            await ProjectsModel.deleteMany({ _id: { $in: ids } });
            message = "Items Deleted successfully"
        }
        if (actionType === 'deleteAll') {
            const validPassword = await bcrypt.compare(password, req._user.password);
            if (!validPassword) return res
                .status(200)
                .json({ status: 401, success: false, message: "password is not valid" });
            await ProjectsModel.deleteMany({ isDeleted: true });
            message = "Items Deleted successfully"
        }
        if (actionType === 'restore') {
            const result = await ProjectsModel.updateMany(
                {
                    _id:
                    {
                        $in: ids
                    }
                },
                {
                    isDeleted: false

                })
            message = "Items Restored successfully"
        }
        if (actionType === 'restoreArchive') {
            const result = await ProjectsModel.updateMany(
                {
                    _id:
                    {
                        $in: ids
                    }
                },
                {
                    archived: false

                })
            message = "Items Restored successfully"
        }
        return res
            .status(200)
            .json({
                status: 200,
                success: true,
                message
            });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};



const onSearchRecycleItems = async (req, res, next) => {
    try {
        let results = []
        const { text } = req.params;
        const { isDeleted, archived } = req.query;
        if (isDeleted) {
            results = await ProjectsModel.find({
                isDeleted: true,
                projectName: { $regex: text, $options: 'i' }
            }).populate('deletedBy', 'first_name last_name')
                .populate('archivedBy', 'first_name last_name').exec();
        }
        if (archived) {
            results = await ProjectsModel.find({
                archived: true,
                projectName: { $regex: text, $options: 'i' }
            }).populate('deletedBy', 'first_name last_name')
                .populate('archivedBy', 'first_name last_name').exec();
        }
        if (results && results.length) {
            results = JSON.parse(JSON.stringify(results))
            results = results.map(result => {
                return {
                    ...result, name: result.projectName, id: result._id,
                    _deletedBy: `${result.deletedBy ? result.deletedBy.first_name : ''} ${result.deletedBy ? result.deletedBy.last_name : ''}`,
                    deletedOn: result.deletedOn ? moment(result.deletedOn).format('dddd, MMM,YYYY') : '',
                    archivedOn: result.archivedOn ? moment(result.archivedOn).format('dddd, MMM,YYYY') : '',
                    _archivedBy: `${result.archivedBy ? result.archivedBy.first_name : ''} ${result.archivedBy ? result.archivedBy.last_name : ''}`
                }
            })
        }
        return res
            .status(200)
            .json({
                status: 200,
                success: true,
                results
            });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 401, success: false, message: error.message });
    }
};


module.exports = {
    onlistRecycleItems,
    onRecycleAction,
    onSearchRecycleItems
};
