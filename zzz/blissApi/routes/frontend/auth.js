const express = require('express');
// controllers
const authCountroller = require('../../controllers/frontend/auth')
const { authMiddleware } = require('../../middlewares/frontend/authMiddleware')

const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
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
  .post('/register', authCountroller.onRegisterUser)
  .post('/login', authCountroller.onLogin)
  .post('/forgot-password', authCountroller.onForgotPassword)
  .post('/reset-password', authCountroller.onResetPassword)
  .patch('/activate/:token', authCountroller.onActivateAccount)
  .post('/impersonateLogin', authCountroller.impursunateLogin)
  .post('/changeProfile', upload.array("profileImage", 1), authMiddleware, authCountroller.changeProfile)
  .post('/changePassword', authMiddleware, authCountroller.changePassword)
  .patch('/changeTimeZone', authMiddleware, authCountroller.changeTimeZone)

module.exports = router;
