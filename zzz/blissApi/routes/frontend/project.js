const express = require("express");
// controllers
const projectController = require("../../controllers/frontend/project");
const router = express.Router();

router.post(
    "/create",
    projectController.onCreateProject
)
    .get(
        "/list/:programId",
        projectController.onlistProjects
    )

    .patch(
        "/operation",
        projectController.onProjectOperations
    )

    .get(
        "/getProject/:projectId",
        projectController.getProject
    )
    .get(
        "/getProjectBoardView/:projectId",
        projectController.getProjectBoardView
    )
    .get(
        "/getProjectGanttView/:projectId",
        projectController.getProjectGanttView
    )
    .post(
        "/createStatus",
        projectController.onCreateStatus
    )
    .patch(
        "/statusOperations",
        projectController.onStatusOperations
    )

module.exports = router;
