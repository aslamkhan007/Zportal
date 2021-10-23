const express = require("express");
// controllers
const settingsController = require("../../controllers/frontend/settings");

const router = express.Router();

router
    .get(
        "/recyclebin/list",
        settingsController.onlistRecycleItems
    )
    .patch(
        "/recyclebin/actions",
        settingsController.onRecycleAction
    )
    .get(
        "/recyclebin/search/:text",
        settingsController.onSearchRecycleItems
    )


module.exports = router;
