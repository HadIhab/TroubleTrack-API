import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { fileURLToPath } from 'url';
import path, { dirname } from "path";
import fs from 'fs';
import passport from 'passport';
import  User  from '../models/User.model.js';
import dotenv from 'dotenv';

dotenv.config();
//Building path to key
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathToKey = path.join(__dirname, '..', 'PUB_KEY.pem');
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"],
};

passport.use(
    new JwtStrategy(options, async function (jwt_payload, done) {
        // Since we are here, the JWT is valid!

        // We will assign the `sub` property on the JWT to the database ID of user
        try {
            const user = await User.findOne({
                where: {
                    email: jwt_payload.sub
                }
            });
            if (user) {
                // Since we are here, the JWT is valid and our user is valid, so we are authorized!
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);

export default passport;


