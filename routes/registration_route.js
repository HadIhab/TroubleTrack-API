import express from 'express';
import { registerUser } from '../controllers/registration_controllers.js';
import {
    validateRegistrationData,
    validate,
    checkRegistrationKeys
} from '../Middleware/registration_middleware.js';

const registration_route = express.Router();
registration_route.post('/', checkRegistrationKeys, validateRegistrationData, validate, registerUser);

export default  registration_route;