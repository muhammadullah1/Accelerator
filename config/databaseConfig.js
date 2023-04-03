const { Sequelize } = require('sequelize');
module.exports = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    dialect: process.env.DATABASE_TYPE,
    pool: {
      max: parseInt(process.env.DATABASE_MAX_CONNECTIONS) || 10,
      min: 0,
      idle: 10000,
    },
    define: {
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
      freezeTableName: true,
    },
    logging: false,
  }
);
