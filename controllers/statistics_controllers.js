import Issue from '../models/Issue.model.js';
import sequelize from "../config/database.js";

export const getTotalErrorCount = async (req, res) => {
    try {
        const totalErrorCount = await Issue.count();
        res.json({ totalErrorCount });
    } catch (error) {
        console.error('Error retrieving total error count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getErrorTrend = async (req, res) => {
    try {
        // Group errors by date and count occurrences
        const errorTrend = await Issue.findAll({
            attributes: [
                [sequelize.literal('DATE(createdAt)'), 'date'],
                [sequelize.fn('COUNT', sequelize.col('issue_id')), 'count']
            ],
            group: [sequelize.literal('DATE(createdAt)')],
            order: [[sequelize.literal('DATE(createdAt)'), 'ASC']]
        });

        res.json(errorTrend);
    } catch (error) {
        console.error('Error retrieving error trend:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getErrorDistributionByProject = async (req, res) => {
    const project_id = req.params.projectId;
    try {
        const errorDistribution = await Issue.findAll({
            where: { project_id: project_id },
            attributes: ['error_type', [sequelize.fn('COUNT', 'issue_id'), 'count']],
            group: ['error_type']
        });

        res.json({ project_id: project_id, errorDistribution });
    } catch (error) {
        console.error('Error retrieving error distribution by project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getResolutionTimeByProject = async (req, res) => {
    const project_id = req.params.projectId;
    try {
        const resolutionTimes = await Issue.findAll({
            where: { project_id: project_id },
            attributes: [
                [sequelize.fn('AVG', sequelize.literal('TIMESTAMPDIFF(SECOND, occurrence_time, IFNULL(resolvedAt, NOW()))')), 'averageResolutionTimeInSeconds']
            ]
        });
        //const averageResolutionTimeInDays = Math.round(resolutionTimes[0].dataValues.averageResolutionTime);
        //const avgResolutionTime = resolutionTimes[0].dataValues.averageResolutionTime;
        const averageResolutionTimeInSeconds = resolutionTimes[0].dataValues.averageResolutionTimeInSeconds;
        // Convert seconds to hours
        const averageResolutionTimeInHours = (averageResolutionTimeInSeconds / 3600).toFixed(2);

        res.json({ project_id: project_id, averageResolutionTimeInHours: `${averageResolutionTimeInHours} hours` });
    } catch (error) {
        console.error('Error retrieving resolution time by project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getProjectPerformance = async (req, res) => {
    const project_id = req.params.projectId;
    try {

        const totalIssues = await Issue.count({ where: { project_id: project_id } });
        const closedIssues = await Issue.count({ where: { project_id: project_id, status: 'closed' } });
        const errorRate = ((closedIssues / totalIssues) * 100).toFixed(2) + '%';


        const responseTime = '150 ms';
        const uptime = '99.5%';

        res.json({
            project_id: project_id,
            performanceMetrics: {
                errorRate,
                responseTime,
                uptime
            }
        });
    } catch (error) {
        console.error('Error retrieving project performance metrics:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getErrorResolutionTime = async (req, res) => {
    try {
        // Calculate average resolution time for all reported errors
        const resolutionTimes = await Issue.findAll({
            attributes: [
                [sequelize.fn('AVG', sequelize.literal('TIMESTAMPDIFF(SECOND, occurrence_time, IFNULL(resolvedAt, NOW()))')), 'averageResolutionTimeInSeconds']
            ]
        });

        //const averageResolutionTime = Math.round(resolutionTime.dataValues.averageResolutionTime);
        const averageResolutionTimeInSeconds = resolutionTimes[0].dataValues.averageResolutionTimeInSeconds;
        // Convert seconds to hours
        const averageResolutionTimeInHours = (averageResolutionTimeInSeconds / 3600).toFixed(2);

        res.json({ averageResolutionTimeInHours: `${averageResolutionTimeInHours} hours` });
    } catch (error) {
        console.error('Error calculating error resolution time:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getErrorSeverity = async (req, res) => {
    try {
        // Group issues by error type and count occurrences
        const errorSeverity = await Issue.findAll({
            attributes: ['error_type', [sequelize.fn('COUNT', '*'), 'count']],
            group: ['error_type']
        });

        // Map the result to format as { errorType: count }
        const severityDistribution = errorSeverity.map(severity => ({
            severity: severity.dataValues.error_type,
            count: severity.dataValues.count
        }));

        res.json( severityDistribution );
    } catch (error) {
        console.error('Error retrieving error severity distribution:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};