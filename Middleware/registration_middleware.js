import { check, validationResult } from 'express-validator';

export const validateRegistrationData = [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('name').notEmpty().withMessage('Name is required'),
    check('last_name').notEmpty().withMessage('Last name is required'),
];

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    next();
};

export const checkRegistrationKeys = (req, res, next) => {
    const allowedKeys = ['email', 'password', 'name', 'last_name'];
    const requestKeys = Object.keys(req.body);
    const invalidKeys = requestKeys.filter(key => !allowedKeys.includes(key));
    if (invalidKeys.length > 0) {
        return res.status(400).json({ errors: `Invalid keys: ${invalidKeys.join(', ')}` });
    }
    next();
}
