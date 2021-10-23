const express = require('express');
const router = express.Router();

const clientController = require('../controllers/admin/user')
const authentication= require('../middlewares/verify')
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const DIR = "./uploads/";
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

/********************Client and Team   Routes************************ */

router.post('/login',
clientController.loginClient
);
router.post('/forgot',
clientController.ForgotPassword
);
router.post('/reset',
clientController.ResetPassword
);


router.post('/add-user',
clientController.addClient
);
router.post('/add-team',authentication,
clientController.addTeam
);
router.get('/get-team',authentication,
clientController.GetTeam
);
router.get('/get-client',authentication,
clientController.GetClient
);
router.get('/single-client',authentication,
clientController.GetSingleClient
);
router.get('/single-client/:id',authentication,
clientController.GetSingleClient
);
router.post('/update-client',authentication,
clientController.updateClient
);
router.post('/update-team/:id',authentication,
clientController.updateTeam
);
router.post('/upload-images/:id',upload.array("image", 5),
authentication,
clientController.uploadImage
);

router.post('/change-password',authentication,
clientController.changepassword
);


module.exports = router;