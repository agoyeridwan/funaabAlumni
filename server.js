const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const { Sequelize } = require("sequelize");
console.log(process.env.USER);
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
const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
testDbConnection();
module.exports = sequelize;
app.listen(3000, () => {
  console.log("The app is listening at port 3000");
});
