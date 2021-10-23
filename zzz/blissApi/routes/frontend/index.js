const express = require('express');
// routers
const authRouter = require('./auth');
const workSpaceRouter = require('./workspace');
const projecteRouter = require('./project');
const stageRouter = require('./stages');
const ticketsRouter = require('./tickets');
const settingsRouter = require('./settings');
const programRouter = require('./program');
const { authMiddleware } = require('../../middlewares/frontend/authMiddleware')
const router = express.Router();

router.use('/auth', authRouter);
router.use('/workspace', authMiddleware, workSpaceRouter);
router.use('/project', authMiddleware, projecteRouter);
router.use('/stage', authMiddleware, stageRouter);
router.use('/ticket', authMiddleware, ticketsRouter);
router.use('/settings', authMiddleware, settingsRouter);
router.use('/program', authMiddleware, programRouter);

module.exports = router;
