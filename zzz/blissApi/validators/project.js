const { check, param, body } = require('express-validator');

exports.createProjectValidators = [
    body('projectName')
        .notEmpty()
        .withMessage('Project name is required'),
    body('workspaceId', 'workspaceId is required')
        .notEmpty(),

];

exports.getListValidators = [
    param('workspaceId')
        .not()
        .isEmpty()
        .withMessage('please provide workspaceId'),
];

exports.editValidators = [
    body('projectId')
        .not()
        .isEmpty()
        .withMessage('please provide projectId'),
    body('projectName')
        .not()
        .isEmpty()
        .withMessage('please provide projectName')
];

exports.deleteValidators = [
    param('projectId')
        .not()
        .isEmpty()
        .withMessage('please provide projectId'),
];

