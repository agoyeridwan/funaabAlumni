module.exports = (err, req, res, next) => {
  // console.log("The error is", err);
  // console.log("The errors are........", err);
  if (err.name.startsWith("Sequelize")) {
    res.status(500).json({
      status: "error",
      msg: err.errors[0].message,
    });
  } else
    res.status(err.statusCode).json({
      status: err.status,
      msg: err.message,
    });
};
