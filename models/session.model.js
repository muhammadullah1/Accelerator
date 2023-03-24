const { Sequelize } = require('sequelize');
const sequelize = require('../config/databaseConfig');

const Session = sequelize.define('Session', {
  // Define the model attributes
  roomName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  creater: {
    type: Sequelize.STRING,
    allowNull: true
  },
  users: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true,
    defaultValue: []
  },
  from: {
    type: Sequelize.DATE,
    allowNull: false
  },
  to: {
    type: Sequelize.DATE,
    allowNull: false
  },
  deletedAt: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: null
  },
  deletedBy: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  }
}, {
  paranoid: true // enable soft delete functionality
});

// create the table in the database
Session.sync({ force: true })
  .then(() => {
    console.log('User table created successfully.');
  })
  .catch((error) => {
    console.error('Error creating User table:', error);
  });

module.exports = Session;
