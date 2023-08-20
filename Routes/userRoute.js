const express = require("express");
const userController = require(".././controllers/userController");
const userModel = require(".././models/userModel");
const router = express.Router();
router
  .route("/")
  .post(userController.createOne(userModel))
  .get(userController.findAll(userModel));

router
  .route("/:matricnumber")
  .get(userController.findOne(userModel))
  .patch(userController.updateOne(userModel))
  .delete(userController.deleteOne(userModel));
module.exports = router;
