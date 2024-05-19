import {check, validationResult} from "express-validator";
import {checkIssueKeys, checkIssueValues, validationIssueResults} from "./issue_middleware.js";


export const checkLoginValues = [
    check('email').isEmail().withMessage('Invalid email address'),
];

export const validationLoginResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    next();
};

export const checkLoginKeys = (req, res, next) => {
    const allowedKeys = ['email', 'password'];
    const requestKeys = Object.keys(req.body);
    const invalidKeys = requestKeys.filter(key => !allowedKeys.includes(key));
    if (invalidKeys.length > 0) {
        return res.status(400).json({ errors: `Invalid keys: ${invalidKeys.join(', ')}` });
    }
    next();
}

const loginValidation = [checkLoginKeys, checkLoginValues, validationLoginResults];

export default loginValidation;