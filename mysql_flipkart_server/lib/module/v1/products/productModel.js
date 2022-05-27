// import
const constants = require("../../../constant");
const { Sequelize, DataTypes } = require("sequelize");

//intialise db
const sequelize = new Sequelize("flipkart_mysql", "Aditya", "Aditya@123", {
  host: "localhost",
  dialect: "mysql",
});

const Product = sequelize.define(constants.DB_MODEL_REF.PRODUCT, {
  productName: {
    type: DataTypes.STRING,
  },
  productId: {
    type: DataTypes.INTEGER,
  },
  deliveryPinCode: {
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  color: {
    type: DataTypes.STRING,
  },
  size: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});

(async () => {
  await sequelize.sync({ force: false });
  // Code here
})();

module.exports = {
  Product,
};
