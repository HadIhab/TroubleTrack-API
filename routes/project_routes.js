import express from 'express';
import {
    createProject,
    getAllProjects,
    getProjectById,
    getProjectErrors,
    updateProject,
    deleteProject,
    createProjectError,
    updateProjectError,
    deleteProjectError
} from '../controllers/project_controllers.js';
import { isAuthenticated }  from '../Middleware/auth_middleware.js';
import passport from '../config/passport.js';
import issueValidation from '../Middleware/issue_middleware.js';
import projectValidation from '../Middleware/project_middleware.js';

const project_router = express.Router();

project_router.use(passport.authenticate("jwt", { session: false }));

// Routes
project_router.post('/', projectValidation, createProject); // Create a new project
project_router.get('/', getAllProjects); // Get all projects
project_router.get('/:id', getProjectById); // Get a project by ID
project_router.put('/:id', projectValidation, updateProject); // Update a project by ID
project_router.delete('/:id', deleteProject); // Delete a project by ID
project_router.get('/:projectId/errors', getProjectErrors);
project_router.post('/:projectId/errors', issueValidation, createProjectError);
project_router.put('/:projectId/errors/:errorId', issueValidation, updateProjectError);
project_router.delete('/:projectId/errors/:errorId', deleteProjectError);

export default project_router;
