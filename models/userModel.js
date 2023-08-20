const sq = require("../util/init");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const User = sq.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Please enter a valid email address",
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
    allowNull: false,
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
  workplace: {
    type: DataTypes.STRING,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    defaultValue: "default.jpg",
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "Alumni",
    validate: {
      isIn: {
        args: [["Alumni", "student", "admin", "lecturer"]],
        msg: "The valus should either be Student, admin or lecturer",
      },
    },
  },
  entryYear: {
    type: DataTypes.STRING,
  },
});
User.beforeCreate(async (user, options) => {
  console.log("I am saving this hook");
  console.log(user.password);
  user.password = await bcrypt.hash(user.password, 13);
  console.log("Thse user hashed password is", user.password);

  // user.passwordConfirm = undefined;
});
// User.afterValidate((user, options) => {
//   user.passwordConfirm = undefined;
// });
User.sync().then(() => {
  console.log("User model created");
});

module.exports = User;
