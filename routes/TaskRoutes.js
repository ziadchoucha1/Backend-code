const express = require('express');
const { assignTask, requestMaterials } = require('../controllers/TaskController.js');
const taskRouter = express.Router();

// Assign task to team member
taskRouter.post('/assign', assignTask);

// Request materials for a project
taskRouter.post('/materials', requestMaterials);

module.exports = taskRouter;
