import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from'./config/database.js';
import defineAssociations from './models/relationships/associations.js';
import projectsRouter from './routes/project_routes.js';
import statisticsRouter from './routes/statistics_routes.js';
import registrationRouter from './routes/registration_route.js';
import loginRouter from './routes/login_route.js';
//import passport from './Middleware/passport_configuration.js';
import passport from './config/passport.js';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.use(cors());

defineAssociations(sequelize);
/*app.use(session({
    secret: 'my key',
    resave: false,
    saveUninitialized: false
}));*/

app.use(passport.initialize());
//app.use(passport.session());

// Mount routes
app.use('/api/register', registrationRouter);
app.use('/api/login', loginRouter)
app.use('/api/projects', projectsRouter);
app.use('/api/statistics',statisticsRouter);

app.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`);

})