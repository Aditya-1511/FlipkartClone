// // Importing mongoose
// var mongoose = require("mongoose");
// var constants = require("../../../constant");

// var Schema = mongoose.Schema;
// var User;

// var UserSchema = new Schema({
//   name: {
//     type: String,
//     default: "",
//     required: true,
//   },
//   email: {
//     type: String,
//     index: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   gender: {
//     type: String,
//   },
//   dob: {
//     type: String,
//     default: "",
//   },
// });

// UserSchema.methods.toJSON = function () {
//   var obj = this.toObject();
//   delete obj.updated;
//   return obj;
// };

// //Export user module
// User = module.exports = mongoose.model(constants.DB_MODEL_REF.USER, UserSchema);

// import
const constants = require("../../../constant");
const { Sequelize, DataTypes } = require("sequelize");

//intialise db
const sequelize = new Sequelize("flipkart_mysql", "Aditya", "Aditya@123", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define(constants.DB_MODEL_REF.USER, {
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

// const Product = sequelize.define(constants.DB_MODEL_REF.PRODUCT, {
//   productName: {
//     type: DataTypes.STRING,
//   },
//   productId: {
//     type: DataTypes.NUMBER,
//   },
//   color: {
//     type: DataTypes.STRING,
//   },
//   size: {
//     type: DataTypes.NUMBER,
//   },
//   deliveryPinCode: {
//     type: DataTypes.NUMBER,
//   },
//   quantity: {
//     type: DataTypes.NUMBER,
//   },
//   price: {
//     type: DataTypes.NUMBER,
//   },
// });

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

module.exports = {
  User,
  // Product
};
