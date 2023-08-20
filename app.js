const express = require("express");
const app = express();
const globalError = require("./controllers/errorHandler");
const AppError = require("./util/errorClass");
const userRoute = require("./Routes/userRoute");
app.use(express.json({ limit: "10kb" }));
app.use("/api/v1/mtealumni/users", userRoute);
app.use("*", (req, res, next) => {
  next(new AppError(`This url ${req.originalUrl} doesn't exist`, 404));
});
app.use(globalError);
module.exports = app;
