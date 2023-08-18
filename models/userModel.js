const sq = require("../util/init");
const { DataTypes } = require("sequelize");
const User = sq.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "This field must be an email",
      },
    },
    unique: true,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: {
      msg: "Please provide a password",
    },
  },
  passwordConfirm: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  matricNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  employed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  workPlace: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
    defaultValue: "default.jpg",
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "student",
    validate: {
      isIn: [["student", "admin", "lecturer"]],
      msg: "The valus should either be Student, admin or lecturer",
    },
  },
});
User.sync().then(() => {
  console.log("User model created");
});
module.exports = User;
