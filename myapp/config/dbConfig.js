const mongoose = require('mongoose');
const userModel = require('../model/userModel');

async function dbConnection(){
    await mongoose.connect("mongodb://localhost:27017/instagram")
        console.log("MongoDb connected successfully");
}


module.exports = {
    dbConnection
};