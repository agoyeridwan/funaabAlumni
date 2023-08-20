const factoryFunction = require("./factoryController");

class userController extends factoryFunction {}
module.exports = new userController();
