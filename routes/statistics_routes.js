import express from 'express';
import {
    getTotalErrorCount,
    getErrorTrend,
    getErrorDistributionByProject,
    getResolutionTimeByProject,
    getProjectPerformance,
    getErrorResolutionTime,
    getErrorSeverity
} from '../controllers/statistics_controllers.js';

const statistics_router = express.Router();
//routes :
statistics_router.get('/total-error-count', getTotalErrorCount);
statistics_router.get('/error-trend', getErrorTrend);
statistics_router.get('/error-distribution/:projectId', getErrorDistributionByProject);
statistics_router.get('/resolution-time/:projectId', getResolutionTimeByProject);
statistics_router.get('/project-performance/:projectId', getProjectPerformance );
statistics_router.get('/error-resolution-time', getErrorResolutionTime);
statistics_router.get('/error-severity', getErrorSeverity);

export default statistics_router;