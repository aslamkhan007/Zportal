// utils
const makeValidation = require("@withvoid/make-validation");
// models

const UserModel = require("../../models/User");
const WorkspaceModel = require("../../models/Workspace");
const InviteManagerModel = require("../../models/InviteManager");
const WorkspaceUsersModel = require("../../models/WorkspaceUsers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mail = require("../../utilities/mail");
const {
  sendWsInviteMail,
  acceptWsInvitation,
  removeUserWorkSpace,
  updateUserWorkSpace,
  rejectWsInvitation,
} = require("../../helpers/workspace");

const onCreateWorkSpace = async (req, res, next) => {
  try {
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        workspace: { type: types.string },
      },
    }));
    if (!validation.success) return res.status(400).json({ ...validation });
    // check for limit
    const workSpaceCount = await WorkspaceModel.find({
      created_by: req._user._id,
    }).count();
    if (workSpaceCount >= req._user.workSpaceCount) {
      return res.status(200).json({
        status: 401,
        success: true,
        message: `You can create only ${req._user.workSpaceCount} workspace`,
      });
    }
    //create workspace
    let data = {
      workspace: req.body.workspace,
      created_by: req._user._id,
      color: req.body.color,
    };

    if (req.file && req.file.filename) {
      data.workspacePic = req.file.filename;
    }
    const ws = new WorkspaceModel(data);
    const workSpace = await ws.save();
    return res.status(200).json({
      status: 200,
      success: true,
      workSpaceObj: { workSpace },
      message: "workspace created successfully.",
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};

const onInvite = async (req, res, next) => {
  try {
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        email: { type: types.string },
        workSpaceId: { type: types.string },
      },
    }));
    if (!validation.success) return res.status(400).json({ ...validation });
    //create workspace
    const { workSpaceId, email } = req.body;
    const result = await sendWsInviteMail(req._user, workSpaceId, email);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Invited successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(200).json({
      status: 401,
      success: false,
      message: error.message,
      data: {},
    });
  }
};

const getPendingInvitations = async (req, res, next) => {
  try {
    let { workspaceId } = req.params;

    const pending = await InviteManagerModel.find({
      invites: { $in: workspaceId },
    })
      // .populate('invites', '_id workspace created_by')
      .populate({
        path: "invites",
        model: "Workspace",
        select: {
          _id: 1,
          workspace: 1,
          workspacePic: 1,
          color: 1,
          created_by: 1,
        },
        populate: {
          path: "created_by",
          model: "User",
          select: { first_name: 1 },
        },
      })

      .exec();
    // .populate('acceptedInvites', '_id workspace created_by')
    // .populate("rejectedInvites", "_id workspace created_by")

    return res.status(200).json({
      success: true,
      status: 200,
      data: pending,
      message: "pending invitations",
    });
  } catch (error) {
    return res.status(200).json({
      status: 401,
      success: false,
      message: error.message,
      data: {},
    });
  }
};

const onAcceptInvite = async (req, res, next) => {
  try {
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        workSpaceId: { type: types.string },
      },
    }));
    if (!validation.success) return res.status(400).json({ ...validation });
    //create workspace

    const result = await acceptWsInvitation(req._user, req.body.workSpaceId);
    return res.status(200).json({
      status: 200,
      success: true,
      workSpaceObj: { result },
      message: "joined workspace successfully.",
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};

const onRejectInvite = async (req, res, next) => {
  try {
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        workSpaceId: { type: types.string },
      },
    }));
    if (!validation.success) return res.status(400).json({ ...validation });
    //create workspace

    const result = await rejectWsInvitation(req._user, req.body.workSpaceId);
    return res.status(200).json({
      status: 200,
      success: true,
      workSpaceObj: { result },
      message: "Invite is rejected.",
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};

const onGetWorkSpaceObject = async (req, res, next) => {
  try {
    //check if user has any work space or any invited workspaces
    let workSpaceObj = {
      workSpaceExist: false,
      invitesExist: false,

      acceptedInvitesExist: false,
      workSpace: "",
      invites: "",
      acceptedInvites: [],
      rejectedInvites: [],
    };

    const workSpace = await WorkspaceModel.findOne({
      created_by: req._user._id,
    });
    if (workSpace) {
      workSpaceObj.workSpaceExist = true;
      workSpaceObj.workSpace = workSpace;
    }

    const invitedWorkSpaces = await InviteManagerModel.findOne({
      email: req._user.email,
    })
      // .populate('invites', '_id workspace created_by')
      .populate({
        path: "invites",
        model: "Workspace",
        select: {
          _id: 1,
          workspace: 1,
          workspacePic: 1,
          color: 1,
          created_by: 1,
        },
        populate: {
          path: "created_by",
          model: "User",
          select: { first_name: 1 },
        },
      })
      .populate({
        path: "acceptedInvites",
        model: "Workspace",
        select: {
          _id: 1,
          workspace: 1,
          workspacePic: 1,
          color: 1,
          created_by: 1,
        },
        populate: {
          path: "created_by",
          model: "User",
          select: { first_name: 1 },
        },
      })
      .populate({
        path: "rejectedInvites",
        model: "Workspace",
        select: {
          _id: 1,
          workspace: 1,
          workspacePic: 1,
          color: 1,
          created_by: 1,
        },
        populate: {
          path: "created_by",
          model: "User",
          select: { first_name: 1 },
        },
      })
      .exec();
    // .populate('acceptedInvites', '_id workspace created_by')
    // .populate("rejectedInvites", "_id workspace created_by")

    // console.log("inviteddddddddddd", invitedWorkSpaces);
    if (invitedWorkSpaces) {
      if (invitedWorkSpaces.invites.length) workSpaceObj.invitesExist = true;
      if (invitedWorkSpaces.acceptedInvites.length)
        workSpaceObj.acceptedInvitesExist = true;
      workSpaceObj.invites = invitedWorkSpaces.invites;
      workSpaceObj.acceptedInvites = invitedWorkSpaces.acceptedInvites;
      workSpaceObj.rejectedInvites = invitedWorkSpaces.rejectedInvites;
    }
    return res.status(200).json({
      success: true,
      status: 200,
      workSpaceObj,
      message: "workspace object",
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};

const getUsersOfWorkspace = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    if (!workspaceId)
      return res
        .status(200)
        .json({ status: 200, success: true, results: [], pending: [] });
    const results = await WorkspaceUsersModel.find({ workspaceId })
      // .populate("deletedBy", "first_name last_name")
      // .populate("restoreBy", "first_name last_name")
      .populate("userId", "email")
      .populate({
        path: "deletedBy",
        select: "first_name last_name email",
        skipInvalidIds: true,
      })
      .populate({
        path: "restoreBy",
        select: "first_name last_name email",
        skipInvalidIds: true,
      })
      .exec();
    const pending = await InviteManagerModel.find({
      invites: { $in: workspaceId },
    })
      // .populate('invites', '_id workspace created_by')
      .populate({
        path: "invites",
        model: "Workspace",
        select: {
          _id: 1,
          workspace: 1,
          workspacePic: 1,
          color: 1,
          created_by: 1,
        },
        populate: {
          path: "created_by",
          model: "User",
          select: { first_name: 1 },
        },
      })

      .exec();
    console.log("resultssssssssss ", results);
    return res
      .status(200)
      .json({ status: 200, success: true, results, pending });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};

// router.get('/search/:workspaceId/:text',

const searchWorkspaceUsers = async (req, res, next) => {
  try {
    let { text, workspaceId } = req.params;

    let result = await WorkspaceUsersModel.find({
      workspaceId,
      name: { $regex: text, $options: "i" },
    }).populate({
      path: "deletedBy",
      select: "first_name last_name email",
    });
    return res.status(200).json({ status: 200, success: true, result });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};
/*
const onRemoveUser = async (req, res, next) => {
  try {
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        workspaceId: { type: types.string },
        userId: { type: types.string },
      },
    }));
    if (!validation.success) return res.status(400).json({ ...validation });
    //create workspace
    const { workspaceId, userId } = req.body;
    const result = await removeUserWorkSpace(req._user, workspaceId, userId);
    return res.status(200).json({
      status: 200,
      success: true,
      result,
      message: "user removed successfully.",
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};
*/

const onUpdateUser = async (req, res, next) => {
  try {
    const { workspaceId, userId } = req.body;
    const { operationType } = req.query;
    const validation = makeValidation((types) => ({
      payload: { workspaceId, userId },
      checks: {
        workspaceId: { type: types.string },
        userId: { type: types.string },
      },
    }));
    if (!validation.success) return res.status(400).json({ ...validation });
    //create workspace

    let result = null;
    result = await updateUserWorkSpace(
      req._user,
      workspaceId,
      userId,
      operationType
    );
    // if (operationType === "restore") {
    //   result = await updateUserWorkSpace(req._user, workspaceId, userId);
    // } else if (operationType === "delete") {
    //   result = await removeUserWorkSpace(req._user, workspaceId, userId);
    // }

    return res.status(200).json({
      status: 200,
      success: true,
      result,
      message: `user ${operationType}d successfully.`,
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};

const getWorkspceUsers = async (req, res, next) => {
  try {
    let { workspaceId } = req.params;
    let users = [];
    let result = await WorkspaceModel.findOne({
      _id: workspaceId,
    })
      .populate("invitedUsers", "first_name last_name")
      .exec();
    if (result.invitedUsers && result.invitedUsers.length) {
      users = JSON.parse(JSON.stringify(result.invitedUsers));
      users = users.map((user) => {
        return { name: `${user.first_name} ${user.last_name}`, _id: user._id };
      });
    }

    return res.status(200).json({ status: 200, success: true, results: users });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};

module.exports = {
  onCreateWorkSpace,
  onInvite,
  onAcceptInvite,
  onRejectInvite,
  onGetWorkSpaceObject,
  // onRemoveUser,
  onUpdateUser,
  getPendingInvitations,
  getUsersOfWorkspace,
  searchWorkspaceUsers,
  getWorkspceUsers,
};
