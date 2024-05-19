import  UserModel  from '../User.model.js';
import ProjectModel from '../Project.model.js';
import IssueModel from '../Issue.model.js';

const defineAssociations = (sequelize) => {

    IssueModel.belongsTo(UserModel, { foreignKey: 'user_id' });
    IssueModel.belongsTo(ProjectModel, { foreignKey: 'project_id' });

    ProjectModel.belongsTo(UserModel, { foreignKey: 'user_id' });
    ProjectModel.hasMany(IssueModel, { foreignKey: 'project_id' });

    UserModel.hasMany(ProjectModel, { foreignKey: 'user_id' });
    UserModel.hasMany(IssueModel, { foreignKey: 'user_id' });
};

export default defineAssociations;