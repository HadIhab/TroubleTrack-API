import { check, validationResult } from 'express-validator';

export const checkProjectKeys = (req, res, next) => {
    const allowedKeys = ['name', 'description', 'type'];
    const requestKeys = Object.keys(req.body);
    const invalidKeys = requestKeys.filter(key => !allowedKeys.includes(key));
    if (invalidKeys.length > 0) {
        return res.status(400).json({ errors: `Invalid keys: ${invalidKeys.join(', ')}` });
    }
    next();
}

export const checkProjectValues = () => {
    return [
        check('name')
            .exists().withMessage('name is required')
            .isString().withMessage('name must be a string'),
        check('description')
            .optional()
            .isString().withMessage('description must be a string if provided'),
        check('type')
            .exists().withMessage('type is required')
            .isString().withMessage('type must be a string'),

    ];
};

export const validationProjectResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const projectValidation = [checkProjectKeys, ...checkProjectValues(), validationProjectResults];

export default projectValidation;