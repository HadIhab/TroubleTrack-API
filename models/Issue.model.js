import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const IssueModel = sequelize.define('Issue', {
    issue_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    error_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    occurrence_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    resolvedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    severity: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default IssueModel;
