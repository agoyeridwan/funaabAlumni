const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: "postgres",
    logging: false,
  }
);
module.exports = sequelize;
