import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});
sequelize
    .authenticate()
    .then(() => {
        console.log("DATABASE CONNECTED SUCCESSFULLY");
    })
    .catch((error) => {
        console.log(error);
    });
/*sequelize.sync({ alter: true }).then(() => {
    console.log('Database synchronized successfully');
}).catch(err => {
    console.error('Error synchronizing database:', err);
});*/

export default sequelize;