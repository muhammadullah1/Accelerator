// Define the User model
const { Sequelize } = require('sequelize');
const sequelize = require('../config/databaseConfig');

const User = sequelize.define('User', {
    // Define the model attributes
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.ENUM('teacher', 'student'),
        allowNull: false
    }
}, {
    paranoid: true // enable soft delete functionality
});

// create the table in the database
User.sync()
    .then(() => {
        console.log('user table created successfully.');
    })
    .catch((error) => {
        console.error('Error creating user table:', error);
    });

module.exports = User;
