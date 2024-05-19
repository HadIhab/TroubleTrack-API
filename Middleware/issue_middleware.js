import { check, validationResult } from 'express-validator';

export const checkIssueKeys = (req, res, next) => {
    const allowedKeys = ['error_type', 'status', 'occurrence_time', 'resolvedAt', 'severity'];
    const requestKeys = Object.keys(req.body);
    const invalidKeys = requestKeys.filter(key => !allowedKeys.includes(key));
    if (invalidKeys.length > 0) {
        return res.status(400).json({ errors: `Invalid keys: ${invalidKeys.join(', ')}` });
    }
    next();
}

export const checkIssueValues = () => {
    return [
        check('error_type')
            .exists().withMessage('error_type is required')
            .isString().withMessage('error_type must be a string')
            .isIn(['SyntaxError', 'ReferenceError', 'TypeError', 'RangeError', 'EvalError', 'URIError', 'AggregateError'])
            .withMessage('type must be one of the following values: SyntaxError, ReferenceError, TypeError, RangeError, EvalError, URIError, AggregateError'),
        check('status')
            .exists().withMessage('status is required')
            .isString().withMessage('status must be a string')
            .isIn(['Open', 'Closed', 'Archived'])
            .withMessage('Status must be one of the following values: Open, Closed, Archived'),
        check('occurrence_time')
            .optional()
            .isISO8601().withMessage('occurrence_time must be a valid date'),
        check('resolvedAt')
            .optional()
            .isISO8601().withMessage('resolvedAt must be a valid date if provided'),
        check('severity')
            .exists().withMessage('severity is required')
            .isString().withMessage('severity must be a string')
            .isIn(['Minor', 'Major', 'Critical'])
            .withMessage('severity must be one of the following values: Minor, Major, Critical')
    ];
};

export const validationIssueResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const issueValidation = [checkIssueKeys, ...checkIssueValues(), validationIssueResults];

export default issueValidation;