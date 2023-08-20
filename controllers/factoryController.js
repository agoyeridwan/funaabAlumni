const catchAsync = require("../util/catchAsync");
const AppError = require("../util/errorClass");
class factoryFunction {
  createOne(model) {
    return catchAsync(async (req, res, next) => {
      // return async (req, res, next) => {
      // try {
      const doc = await model.create(req.body);
      res.status(200).json({
        status: "success",

        data: {
          doc,
        },
      });
      // } catch (error) {
      //   console.log(error);

      //   res.status(404).json({
      //     status: "fail",
      //     error,
      //   });
      // }
    });
  }
  findAll(model) {
    return async (req, res, next) => {
      // try {
      const doc = await model.findAll();
      res.status(200).json({
        status: "success",
        data: {
          length: doc.length,
          doc,
        },
      });
      // } catch (error) {
      //   console.log(error);

      //   res.status(404).json({
      //     status: "fail",
      //     error,
      //   });
      // }
    };
  }
  findOne(model) {
    return catchAsync(async (req, res, next) => {
      const doc = await model.findOne({
        where: { matricNumber: req.params.matricnumber },
      });
      if (!doc) return next(new AppError("User not found", 404));
      res.status(200).json({
        status: "success",
        data: {
          doc,
        },
      });
      // }
    });
  }
  updateOne(model) {
    return catchAsync(async (req, res, next) => {
      const doc = await model.findOne({
        where: { matricNumber: req.params.matricnumber },
      });
      if (!doc) return next(new AppError("This user doesn't exist", 404));
      const updatedUser = await doc.update(req.body);
      if (!updatedUser) return;
      res.status(200).json({
        status: "success",
        data: {
          updatedUser,
        },
      });
    });
  }
  deleteOne(model) {
    return catchAsync(async (req, res, next) => {
      const doc = await model.destroy({
        where: { matricNumber: req.params.matricnumber },
      });
      res.status(204).json({
        status: "success",
        msg: "User successfully deleted",
      });
    });
  }
}
module.exports = factoryFunction;
