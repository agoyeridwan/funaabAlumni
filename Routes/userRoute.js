const express = require("express");
const userController = require(".././controllers/userController");
const authController = require("../controllers/authController");
const userModel = require(".././models/userModel");
const router = express.Router();
router.route("/signup").post(authController.signup(userModel));
router.route("/login").post(authController.login(userModel));
router
  .route("/")
  .post(authController.protect(userModel), userController.createOne(userModel))
  .get(userController.findAll(userModel));

router
  .route("/:matricnumber")
  .get(userController.findOne(userModel))
  .patch(userController.updateOne(userModel))
  .delete(userController.deleteOne(userModel));
module.exports = router;
