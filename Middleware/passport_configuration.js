import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import  User  from '../models/User.model.js';

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            // Find user by email (assuming email is used for login)
            const user = await User.findOne({ where: { email: username } });
            if (!user) {
                return done(null, false, { message: 'Incorrect username or password' });
            }

            // Validate password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return done(null, false, { message: 'Incorrect username or password' });
            }

            // Authentication successful
           return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.user_id); // Serialize the user by user_id
});

passport.deserializeUser(async (user_id, done) => {
    try {
        const user = await User.findOne({ where: { user_id } });
        done(null, user); // Deserialize the user by user_id
    } catch (error) {
        done(error);
    }
});

//export default passport;
