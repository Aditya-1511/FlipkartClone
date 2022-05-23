const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('instagram_mysql', 'Aditya', 'Aditya@123', {
  host: 'localhost',
  dialect: 'mysql'
});

if(sequelize){
  console.log("MySQL connected successfully");
}else{
  console.log("Database could not connect");
}