const { Sequelize } = require('sequelize');
const sequelize = require('../config/databaseConfig');

const Session = sequelize.define('Session', {
  // Define the model attributes
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  sessionName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sessionId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  classesId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  teacherId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  teacherName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  creater: {
    type: Sequelize.STRING,
    allowNull: true
  },
  sessionDate: {
    type: Sequelize.STRING,
    allowNull: true
  },
  startTime: {
    type: Sequelize.STRING,
    allowNull: true
  },
  endTime: {
    type: Sequelize.STRING,
    allowNull: true
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
Session.sync()
  .then(() => {
    console.log('Session table created successfully.');
  })
  .catch((error) => {
    console.error('Error creating Session table:', error);
  });

module.exports = Session;
