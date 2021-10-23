const express = require("express");
// controllers
const workSpaceController = require("../../controllers/frontend/workspace");
const { authMiddleware } = require("../../middlewares/frontend/authMiddleware");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const DIR = "./uploads/profile";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
    console.log(DIR, "in the dir");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

router
  .post(
    "/create",
    upload.single("workspacePic"),
    workSpaceController.onCreateWorkSpace
  )
  .post("/invite", workSpaceController.onInvite)
  .post("/acceptInvite", workSpaceController.onAcceptInvite)
  .get("/getWorkSpaceObject", workSpaceController.onGetWorkSpaceObject)
  .patch("/rejectInvite", workSpaceController.onRejectInvite)
  .post("/updateuser", workSpaceController.onUpdateUser)
  // .post("/updateuser", workSpaceController.onUpdateUser)
  .get("/users/:workspaceId", workSpaceController.getUsersOfWorkspace)
  .get(
    "/pendingInvitation/:workspaceId",
    workSpaceController.getPendingInvitations
  )
  .get("/search/:workspaceId/:text", workSpaceController.searchWorkspaceUsers)
  .get("/ws-users/:workspaceId/", workSpaceController.getWorkspceUsers);

module.exports = router;
