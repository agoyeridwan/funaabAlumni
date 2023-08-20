const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../util/errorClass");
const catchAsync = require("../util/catchAsync");
class authController {
  restrictTo(...role) {
    return (req, res, next) => {
      if (!role.includes(req.user.role))
        next(new AppError("You are not allowed to acces this route"), 400);
    };
  }
  signup(model) {
    return catchAsync(async (req, res, next) => {
      let doc = await model.create(req.body);
      doc = await doc.update({
        passwordConfirm: "",
        entryYear: doc.matricNumber.slice(0, 4),
      });
      const token = this._signAPIToken(doc.matricNumber);
      res.status(200).json({
        status: "success",
        data: {
          doc,
          token,
        },
      });
    });
  }
  login(model) {
    return catchAsync(async (req, res, next) => {
      console.log("user is logged in");
      if (!req.body.matricNumber)
        return next(new AppError("Please enter a matric number", 400));
      const user = await model.findOne({
        where: { matricNumber: req.body.matricNumber },
      });
      if (!user)
        return next(
          new AppError(
            "There is no user with this matric number please enter a valid matric number",
            404
          )
        );
      console.log(user.password);
      if (!req.body.password)
        return next(new AppError("Please enter a password", 400));
      const password = await bcrypt.compare(req.body.password, user.password);
      if (!password) return next(new AppError("incorrect password", 401));
      const token = this._signAPIToken(user.matricNumber);
      res.status(200).json({
        status: "success",
        token,
      });
    });
  }
  protect(req, res, nest) {
    console.log(req.headers);
  }
  _signAPIToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  }
}
module.exports = new authController();
