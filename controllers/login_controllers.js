import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import issueJWT from "../utility/utils.js";

export const logUser = async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(400).json({ message: 'Incorrect username or password' });
        } else {
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (isValidPassword) {
                const tokenObject = issueJWT(user);
                res.status(200).json({
                    success: true,
                    token: tokenObject.token,
                    expiresIn: tokenObject.expires,
                });
            } else {
                return res.status(400).json({ message: 'Invalid password' });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }

};