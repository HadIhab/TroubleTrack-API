import express from 'express';
//import passport from '../Middleware/passport_configuration.js';
import { logUser } from '../controllers/login_controllers.js';
import loginValidation from "../Middleware/login_middleware.js";

const login_router = express.Router();

login_router.post('/', loginValidation, logUser);

/*
login_router.post('/', passport.authenticate('local'), (req, res) => {
    // If authentication is successful, Passport.js adds the user object to req
    res.json({ message: 'Login successful', user: req.user });
});
*/
export default login_router;