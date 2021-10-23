const UserModel = require("../models/User");
const WorkspaceModel = require("../models/Workspace");
const InviteManagerModel = require("../models/InviteManager");
const WorkspaceUsersModel = require("../models/WorkspaceUsers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mail = require("../utilities/mail");
const CONFIG = require("../config.json");

// const mongoose = require('mongoose');

const sendWsInviteMail = async (currentUser, workSpaceId, sendToEmail) => {
  try {
    //check whwather the user has any workspace or not with provided workspace id

    const workspaceExist = await WorkspaceModel.findOne({
      _id: workSpaceId,
      created_by: currentUser._id,
    });
    if (!workspaceExist) {
      throw Error("workspace is not created by invited user");
    }

    const token = jwt.sign(
      { wsAdmin: currentUser._id, workSpaceId, invitedUser: sendToEmail },
      CONFIG.JWT_INVITE_WORKSPACE
    );
    const inviteUserExist = await InviteManagerModel.findOne({
      email: sendToEmail,
    });
    let invite;
    if (inviteUserExist) {
      invite = inviteUserExist.invites.find(
        (invite) => invite.workSpaceId == workSpaceId
      );
      if (!invite) {
        inviteUserExist.invites.push(workSpaceId);
        await inviteUserExist.save();
      }
    } else {
      //create
      invite = await InviteManagerModel.create({
        invites: [workSpaceId],
        email: sendToEmail,
      });
    }
    const emailData = {
      email: sendToEmail,
      subject: `Account Invitation link`,
      body: `
          <h1>Please use the following link to Join Workspace</h1>
          <p> <a href="${CONFIG.FRONT_BASE_URL}/register/${token}">Accept Invitation</a> </p>
          <hr />
          <p>This email may contain sensetive information</p>
          <p></p>
      `,
    };

    return mail.sendMailer(emailData);
  } catch (error) {
    throw error;
  }
};

const acceptWsInvitation = async (currentUser, workSpaceId) => {
  try {
    const workSpace = await WorkspaceModel.findById(workSpaceId);
    let inviteUser = await InviteManagerModel.findOne({
      email: currentUser.email,
    });
    if (!inviteUser) throw Error("invite not exist");
    if (inviteUser.acceptedInvites.length >= currentUser.workSpaceCount)
      throw Error(`Invite Limit is ${currentUser.workSpaceCount}`);
    if (workSpace) {
      const findInvite = inviteUser.invites.find((w) => w == workSpaceId);
      if (!findInvite) throw Error("invite not exist");
      await InviteManagerModel.updateOne(
        { email: currentUser.email },
        { $pullAll: { invites: [workSpaceId] } }
      );
      const findWorkspaceId = inviteUser.acceptedInvites.find(
        (w) => w == workSpaceId
      );
      if (!findWorkspaceId) {
        inviteUser.acceptedInvites.push(workSpaceId);
        invitedUser = await inviteUser.save();
      }
      const findUserId = workSpace.invitedUsers.find(
        (user) => user.toString() == currentUser._id.toString()
      );
      if (!findUserId) {
        workSpace.invitedUsers.push(currentUser._id);
        await workSpace.save();
      }

      //create user in workspace users
      const workSpaceuser = await adduserInWorkSpace(currentUser, workSpaceId);

      const invitedObject = await InviteManagerModel.findOne({
        email: currentUser.email,
      })

        .populate("invites", "_id workspace")
        .populate("acceptedInvites", "_id workspace")
        .populate("rejectedInvites", "_id workspace")
        .exec();

      return invitedObject;
    } else {
      throw Error("workspace not exist");
    }
  } catch (error) {
    throw error;
  }
};

const rejectWsInvitation = async (currentUser, workSpaceId) => {
  try {
    const workSpace = await WorkspaceModel.findById(workSpaceId);
    let inviteUser = await InviteManagerModel.findOne({
      email: currentUser.email,
    });
    if (!inviteUser) throw Error("invite not exist");

    if (workSpace) {
      const findInvite = inviteUser.invites.find((w) => w == workSpaceId);
      if (!findInvite) throw Error("invite not exist");
      await InviteManagerModel.updateOne(
        { email: currentUser.email },
        { $pullAll: { invites: [workSpaceId] } }
      );
      const findWorkspaceId = inviteUser.rejectedInvites.find(
        (w) => w == workSpaceId
      );
      if (!findWorkspaceId) {
        inviteUser.rejectedInvites.push(workSpaceId);
        invitedUser = await inviteUser.save();
      }

      const invitedObject = await InviteManagerModel.findOne({
        email: currentUser.email,
      })
        .populate("invites", "_id workspace")
        .populate("acceptedInvites", "_id workspace")
        .populate("rejectedInvites", "_id workspace")
        .exec();

      return invitedObject;
    } else {
      throw Error("workspace not exist");
    }
  } catch (error) {
    throw error;
  }
};

/*
// soft delete user
const removeUserWorkSpace = async (currentUser, workSpaceId, userId) => {
  try {
    const findDeleteduser = await UserModel.findOne({ _id: userId });
    console.log(
      "updateddddddddddddddddddddddddddd",
      findDeleteduser,
      workSpaceId,
      userId
    );

    const workSpace = await WorkspaceModel.updateOne(
      { _id: workSpaceId },
      { $pullAll: { invitedUsers: [userId] } },
      { new: true }
    );
    if (findDeleteduser) {
      await InviteManagerModel.updateOne(
        { email: findDeleteduser.email },
        { $pullAll: { acceptedInvites: [workSpaceId] } }
      );
    }

    const workspaceUser = await WorkspaceUsersModel.findOneAndUpdate(
      { userId },
      {
        isDeleted: true,
        deletedBy: currentUser._id,
        deletedOn: new Date(),
        restoreOn: "",
      },
      { new: true }
    ).populate("userId");
    return workspaceUser;
  } catch (error) {
    throw error;
  }
};
*/
const updateUserWorkSpace = async (currentUser, workSpaceId, userId, type) => {
  try {
    const findUpdateduser = await UserModel.findOne({ _id: userId });

    let workspace;

    workSpace = await WorkspaceModel.updateOne(
      { _id: workSpaceId },
      type === "delete"
        ? { $pullAll: { invitedUsers: [userId] } }
        : type === "restore"
          ? { $push: { invitedUsers: userId } }
          : {},
      { new: true }
    );

    if (findUpdateduser) {
      await InviteManagerModel.updateOne(
        { email: findUpdateduser.email },
        type === "delete"
          ? { $pullAll: { acceptedInvites: [workSpaceId] } }
          : type === "restore"
            ? { $push: { acceptedInvites: workSpaceId } }
            : {},
        { new: true }
      );
    }

    const workspaceUser = await WorkspaceUsersModel.findOneAndUpdate(
      { userId },
      type === "delete"
        ? {
          isDeleted: true,
          deletedBy: currentUser._id,
          deletedOn: new Date(),
          restoreOn: "",
          restoreBy: "",
        }
        : type === "restore"
          ? {
            isDeleted: false,
            deletedOn: "",
            deletedBy: "",
            restoreOn: new Date(),
            restoreBy: currentUser._id,
          }
          : {},

      { new: true }
    )
      .populate("userId")
      .populate({
        path: "deletedBy",

        skipInvalidIds: true,
        select: "first_name last_name email",
      })
      .populate({
        path: "restoreBy",
        select: "first_name last_name email",
        skipInvalidIds: true,
      });

    return workspaceUser;
  } catch (error) {
    throw error;
  }
};

// const removeUserWorkSpace(permanently) = async (workSpaceId, userId) => {
//   try {
//     const workSpace = await WorkspaceModel.updateOne(
//       { _id: workSpaceId },
//       { $pullAll: { invitedUsers: [userId] } },
//       { new: true }
//     );
//     const workspaceUser = await WorkspaceUsersModel.findOneAndDelete({ userId });
//     return workspaceUser
//   } catch (error) {
//     throw error;
//   }
// };

const adduserInWorkSpace = async (currentUser, workspaceId) => {
  try {
    const userExist = await UserModel.findOne({ userId: currentUser._id });
    if (userExist) return;
    const name = `${currentUser.first_name} ${currentUser.last_name}`;
    const workSpaceUser = await WorkspaceUsersModel.create({
      name,
      userId: currentUser._id,
      workspaceId,
      type: "member",
      created_at: new Date(),
    });
    return workSpaceUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendWsInviteMail,
  acceptWsInvitation,
  // removeUserWorkSpace,
  updateUserWorkSpace,
  rejectWsInvitation,
};
