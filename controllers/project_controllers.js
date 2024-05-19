import Project from '../models/Project.model.js';
import Issue from '../models/Issue.model.js';
import { Op } from 'sequelize';

export const createProject = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const project = await Project.create({user_id, ...req.body});
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getAllProjects = async (req, res) => {
    try {
        const filters = {};

        // Filter by project name (if provided)
        if (req.query.name) {
            filters.name = {
                [Op.iLike]: `%${req.query.name}%`
            };
        }

        // Filter by project type (if provided)
        if (req.query.type) {
            filters.type = {
                [Op.iLike]: `%${req.query.type}%`
            };
        }

        
        if (req.query.createdAfter) {
            filters.createdAt = {
                [Op.gte]: new Date(req.query.createdAfter)
            };
        }

        const projects = await Project.findAll({ where: filters });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            res.status(404).json({ error: 'Project not found' });
        } else {
            res.status(200).json(project);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            res.status(404).json({ error: 'Project not found' });
        } else {
            await project.update(req.body);
            res.status(200).json(project);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            res.status(404).json({error: 'Project not found'});
        } else {
            await project.destroy();
            res.status(200).json({message: 'Project deleted successfully'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const getProjectErrors = async (req, res) => {
    try {
        const { projectId } = req.params;
        const issues = await Issue.findAll({ where: {
            project_id: projectId
            }});
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const createProjectError = async (req, res) => {
    try {
        const project_id = req.params.projectId;
        const user_id = req.user.user_id;
        const issue = await Issue.create({
            project_id,
            user_id,
            ...req.body
        });
        res.status(201).json({message: 'Error reported successfully', issue});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
};

export const updateProjectError = async (req, res) => {
    try {
        const project_id = req.params.projectId;
        const issue_id = req.params.errorId;
        const issue = await Issue.findOne({
            where: {
                project_id,
                issue_id
            }
        });
        if (!issue) {
            res.status(404).json({message: 'Issue not found'});
        } else {
            let resolvedAt = null;
            if (req.body.status === 'Closed') {
                resolvedAt = new Date();
            }
            await issue.update({...req.body, resolvedAt});
            res.status(200).json({message: 'Error updated successfully', issue});
        }
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProjectError = async (req, res) => {
    try {
        const project_id = req.params.projectId;
        const issue_id = req.params.errorId;
        const result = await Issue.destroy({
            where: {
                project_id,
                issue_id
            }
        });
        if (!result) {
            res.status(404).json({message: 'Issue not found'});
        } else {
            res.status(200).json({message: 'Error deleted successfully', result});
        }
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};