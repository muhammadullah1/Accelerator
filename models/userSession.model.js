const { Sequelize } = require('sequelize');
const sequelize = require('../config/databaseConfig');
import Session from './session.model';
import User from './user.model';
// Define the UserSession model
const UserSession = sequelize.define('UserSession', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sessionId: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Define the associations between the models
Session.belongsToMany(User, { through: UserSession });
User.belongsToMany(Session, { through: UserSession });

// create the table in the database
UserSession.sync()
    .then(() => {
        console.log('UserSession table created successfully.');
    })
    .catch((error) => {
        console.error('Error creating UserSession table:', error);
    });

module.exports = UserSession;