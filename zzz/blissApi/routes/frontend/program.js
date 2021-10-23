const express = require("express");
// controllers
const programController = require("../../controllers/frontend/program");
const router = express.Router();

router.post(
    "/create",
    programController.onCreateProgram
)
    .get(
        "/list/:workspaceId",
        programController.onlistPrograms
    )
    .patch(
        "/operation",
        programController.onProgramOperations
    )

module.exports = router;
