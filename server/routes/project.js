const express = require('express');
const router = express.Router();
const { getProjects, addProject, deleteProject, updateProject, assignMember, projectDetail } = require('../controllers/project');

router
    .route('/')
    .get(getProjects)
    .post(addProject);

router
    .route('/:id')
    .get(projectDetail)
    .delete(deleteProject)
    .put(updateProject);

router
    .route('/assign/:id')
    .put(assignMember);

module.exports = router;