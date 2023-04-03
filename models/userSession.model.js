const { Sequelize } = require('sequelize');
const sequelize = require('../config/databaseConfig');
const Session = require('./session.model');
const User = require('./user.model');

// Define the UserSession model
const UserSession = sequelize.define('UserSession', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
    },
}, {
    timestamps: true,
    paranoid: true,
});

// Define the associations between the models
Session.belongsToMany(User, { through: UserSession });
User.belongsToMany(Session, { through: UserSession });
UserSession.belongsTo(User, { foreignKey: 'userId' });
UserSession.belongsTo(Session, { foreignKey: 'sessionId' });

// create all tables in the database
sequelize.sync()
    .then(() => {
        console.log('Tables created successfully!');
    })
    .catch((error) => {
        console.error('Error creating tables:', error);
    });


module.exports = UserSession;
