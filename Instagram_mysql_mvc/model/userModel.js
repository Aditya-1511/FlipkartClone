// import
const constants = require("../constant");
const { Sequelize, DataTypes } = require("sequelize");

//intialise db
const sequelize = new Sequelize("instagram_mysql", "Aditya", "Aditya@123", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define(constants.DB_MODEL_REF.USER, {
  userid: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  dob: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
});

(async () => {
  await sequelize.sync({ force: false });
  // Code here
})();

module.exports = {
  User,
};
