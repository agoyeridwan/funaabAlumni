const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const sequelize = require("./util/init");
console.log(process.env.USER);

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = sequelize;
testDbConnection();
// zconsole.log("Small sequelize is", sequelize);

app.listen(3000, () => {
  console.log("The app is listening at port 3000");
});
