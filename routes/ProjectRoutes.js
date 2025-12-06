const express = require('express');
const {
    createProject,
    retrieveAllProjects,
    // retrieveProjectById,
    // updateProjectById,
    // deleteProjectById
} = require('../controllers/ProjectController');

const projectRouter = express.Router();

projectRouter
  .route('/')
  .post(createProject)
  .get(retrieveAllProjects);

// projectRouter
//   .route('/:id')
//   .get(retrieveProjectById)
//   .put(updateProjectById)
//   .delete(deleteProjectById);

projectRouter
  .route('/')
  .get(retrieveAllProjects)
  .post(createProject);

module.exports = projectRouter;
