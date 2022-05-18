// Importing mongoose
const config = require('../../../config/');
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');
var constants = require("../../../constant");


const User = sequelize.define('User', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = {
  User
}