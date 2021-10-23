const express = require("express");
// controllers
const ticketController = require("../../controllers/frontend/tickets");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const DIR = "./uploads/attachments";
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
//  upload.array("attachments", 1),
router.post(
    "/create", upload.array("attachments"),
    ticketController.onCreateTicket
)
    .get(
        "/list/:stageId",
        ticketController.onlistTickets
    )
    .patch(
        "/operations",
        upload.array("attachments"),
        ticketController.onTicketOperations
    )

module.exports = router;
