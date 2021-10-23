// utils
const makeValidation = require("@withvoid/make-validation");
const timestamp = require("time-stamp");
const created_date = timestamp.utc("YYYY-MM-DD HH:mm:ss");
const bcrypt = require("bcrypt");
// models
const { register, getUser, sendActivationMail, activateAccount, forgetPassword, resetPassword, } = require("../../helpers/users");
const jwt = require("jsonwebtoken");
const UserModel = require('../../models/User');
const WorkspaceModel = require('../../models/Workspace');
const InviteManagerModel = require('../../models/InviteManager');
const CONFIG = require('../../config.json')


const onRegisterUser = async (req, res, next) => {
  try {
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        first_name: { type: types.string },
        last_name: { type: types.string },
        email: { type: types.string },
        password: { type: types.string }
      },
    }));
    if (!validation.success) return res.status(400).json({ ...validation });
    const user = await register(req.body);
    //send activation mail
    let message = "User registered successfully.";
    if(req.body.status !== 1)
    {
      sendActivationMail(user.email)
      message = "User registered successfully, please check email for activation link.";
    }
    
    return res
      .status(200)
      .json({ success: true, status: 200, user, message: message });
  } catch (error) {
    return res.status(200).json({ status: 401, success: false, message: error.message });
  }
  //     return res.status(500).json({ success: false, error: error });
  //   }
};

const onLogin = async (req, res) => {
  try {
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        email: { type: types.string },
        password: { type: types.string },
      },
    }));
    if (!validation.success) return res.status(400).json({ ...validation });
    const user = await getUser(req.body);
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      CONFIG.FRONTEND_JWT_SECRET
    );
    //check if user has any work space or any invited workspaces
    let workSpaceObj = { workSpaceExist: false, invitesExist: false, acceptedInvitesExist: false, workSpace: '', invites: '', acceptedInvites: '', rejectedInvites: '' }
    const workSpace = await WorkspaceModel.findOne({ created_by: user._id });
    if (workSpace) {
      workSpaceObj.workSpaceExist = true;
      workSpaceObj.workSpace = workSpace
    }
    const invitedWorkSpaces = await InviteManagerModel.findOne({ email: user.email })
      .populate({
        path: 'invites',
        model: 'Workspace',
        select: { '_id': 1, 'workspace': 1, 'workspacePic':1, 'color':1, 'created_by': 1, },
        populate: {
          path: 'created_by',
          model: 'User',
          select: { 'first_name': 1 }
        }
      })
      .populate({
        path: 'acceptedInvites',
        model: 'Workspace',
        select: { '_id': 1, 'workspace': 1, 'workspacePic':1, 'color':1, 'created_by': 1, },
        populate: {
          path: 'created_by',
          model: 'User',
          select: { 'first_name': 1 }
        }
      })
      .populate({
        path: 'rejectedInvites',
        model: 'Workspace',
        select: { '_id': 1, 'workspace': 1, 'workspacePic':1, 'color':1, 'created_by': 1, },
        populate: {
          path: 'created_by',
          model: 'User',
          select: { 'first_name': 1 }
        }
      })
      .exec()
    if (invitedWorkSpaces) {
      if (invitedWorkSpaces.invites.length) workSpaceObj.invitesExist = true
      if (invitedWorkSpaces.acceptedInvites.length) workSpaceObj.acceptedInvitesExist = true
      workSpaceObj.invites = invitedWorkSpaces.invites
      workSpaceObj.acceptedInvites = invitedWorkSpaces.acceptedInvites
      workSpaceObj.rejectedInvites = invitedWorkSpaces.rejectedInvites
    }
    return res
      .status(200)
      .json({ success: true, status: 200, token, user, workSpaceObj, message: "login successfully" });
  } catch (error) {
    return res.status(200).json({ status: 401, success: false, message: error.message });
  }
};

const onActivateAccount = async (req, res) => {
  try {
    const user = await activateAccount(req.params.token);
    if (user)
      return res
        .status(200)
        .json({ status: 200, success: true, message: "Account activated successfully" });
  } catch (error) {
    return res.status(200).json({ status: 401, success: false, message: error.message });
  }
};

const onForgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(200).json({ status: 401, success: false, message: "Email is required" });
  try {
    await forgetPassword(email);
    return res
      .status(200)
      .json({ status: 200, success: true, message: "Password reset email is sent successfully" });
  } catch (error) {
    return res.status(200).json({ status: 401, success: false, message: error.message });
  }

};

const onResetPassword = async (req, res, next) => {
  const { resetToken, password } = req.body;
  if (!resetToken) {
    return res.status(200).json({ status: 401, success: false, message: "Something went wrong!" });
  }
  if (!password) {
    return res.status(200).json({ status: 401, success: false, message: "please provide newPassword" });
  }
  try {
    const user = await resetPassword(req.body);
    return res
      .status(200)
      .json({ status: 200, success: true, message: "password has changed successfully" });
  } catch (error) {
    return res.status(200).json({ status: 401, success: false, message: error.message });
  }

};

const impursunateLogin = async (req, res) => {
  try {
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        _id: { type: types.string },
      },
    }));
    if (!validation.success) return res.status(400).json({ ...validation });
    // find user 
    const user = await UserModel.findOne({ _id: req.body._id, role: { $ne: 1 } });
    if (!user) return res.status(200).json({ status: 401, success: false, message: "User not found with provided Id" });
    if (!user.status) return res.status(200).json({ status: 401, success: false, message: "User account is not activated yet !" });
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      CONFIG.FRONTEND_JWT_SECRET
    );
    //check if user has any work space or any invited workspaces
    let workSpaceObj = { workSpaceExist: false, invitesExist: false, acceptedInvitesExist: false, workSpace: '', invites: '', acceptedInvites: '', rejectedInvites: '' }
    const workSpace = await WorkspaceModel.findOne({ created_by: user._id });
    if (workSpace) {
      workSpaceObj.workSpaceExist = true;
      workSpaceObj.workSpace = workSpace
    }
    const invitedWorkSpaces = await InviteManagerModel.findOne({ email: user.email })
      .populate({
        path: 'invites',
        model: 'Workspace',
        select: { '_id': 1, 'workspace': 1, 'created_by': 1, },
        populate: {
          path: 'created_by',
          model: 'User',
          select: { 'first_name': 1 }
        }
      })
      .populate({
        path: 'acceptedInvites',
        model: 'Workspace',
        select: { '_id': 1, 'workspace': 1, 'created_by': 1, },
        populate: {
          path: 'created_by',
          model: 'User',
          select: { 'first_name': 1 }
        }
      })
      .populate({
        path: 'rejectedInvites',
        model: 'Workspace',
        select: { '_id': 1, 'workspace': 1, 'created_by': 1, },
        populate: {
          path: 'created_by',
          model: 'User',
          select: { 'first_name': 1 }
        }
      })
      .exec()
    if (invitedWorkSpaces) {
      if (invitedWorkSpaces.invites.length) workSpaceObj.invitesExist = true
      if (invitedWorkSpaces.acceptedInvites.length) workSpaceObj.acceptedInvitesExist = true
      workSpaceObj.invites = invitedWorkSpaces.invites
      workSpaceObj.acceptedInvites = invitedWorkSpaces.acceptedInvites
      workSpaceObj.rejectedInvites = invitedWorkSpaces.rejectedInvites
    }
    return res
      .status(200)
      .json({ success: true, status: 200, token, user, workSpaceObj, message: "login successfully" });
  } catch (error) {
    return res.status(200).json({ status: 401, success: false, message: error.message });
  }
};

const changeProfile = async (req, res, next) => {
  var update_data = {
    profile_img: req.files[0].filename,
  };

  await UserModel.updateOne({ _id: req._user._id }, update_data)
    .then(async (data) => {
      return res.json({
        status: 200,
        data: req.files[0].filename,
        message: "Image uploaded sucessfully",
      });
    })
    .catch((err) => {
      console.log("error=========================>", err);
      return res.send({ status: 500, message: err.message });
    });
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, password } = req.body
    const validPassword = await bcrypt.compare(currentPassword, req._user.password)

    if (validPassword) {
      if (!password) return res.status(200).json({ status: 401, success: false, message: "please provide password to be changed !" });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      var update_data = {
        password: hashedPassword,
        updated_at: created_date,
      };

      await UserModel.updateOne({ _id: req._user.id }, update_data)
        .then(async (data) => {
          return res.send({
            data: data,
            status: 200,
            message: "Password changed successfully",
          });
        })
        .catch((err) => {
          console.log("error=========================>", err);
          return res.send({ status: 500, message: err.message });
        });
    } else {
      return res.status(200).json({ status: 401, success: false, message: "Current password you have entered is incorrect!" })
    }
  } catch (error) {
    return res.send({ status: 500, message: error.message });
  }
};

const changeTimeZone = async (req, res, next) => {
  try {
    let updatedata = {}
    const { selectedTimeZone, selectedTimeFormat, selectedDateFormat, notifications } = req.body
    if (selectedTimeZone) updatedata.selectedTimeZone = selectedTimeZone
    if (selectedTimeFormat) updatedata.selectedTimeFormat = selectedTimeFormat
    if (selectedDateFormat) updatedata.selectedDateFormat = selectedDateFormat
    if (notifications !== '' && notifications !== undefined) updatedata.notifications = notifications

    const result = await UserModel.findByIdAndUpdate(req._user._id, updatedata, { new: true })
    return res
      .status(200)
      .json({ success: true, status: 200, result, message: "Time zone detail updated successfully" });
  } catch (error) {
    return res.status(200).json({ status: 401, success: false, message: error.message });
  }

};

module.exports = {
  onRegisterUser,
  onLogin,
  onActivateAccount,
  onForgotPassword,
  onResetPassword,
  impursunateLogin,
  changeProfile,
  changePassword,
  changeTimeZone
};
