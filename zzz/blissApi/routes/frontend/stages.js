const express = require("express");
// controllers
const stageController = require("../../controllers/frontend/stages");
const router = express.Router();

router.post(
    "/create",
    stageController.onCreateStage
)
    .get(
        "/list/:projectId",
        stageController.onlistStages
    )
    .patch(
        "/operations",
        stageController.onStageOperations
    )



module.exports = router;
