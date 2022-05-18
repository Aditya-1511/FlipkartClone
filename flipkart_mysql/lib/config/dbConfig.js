"use strict"

//=================================== Load Modules start ===================================

//=================================== Load external modules=================================
var mysql = require('mysql2');
const { Sequelize } = require('sequelize');
//Import logger
const logger = require("../logger").logger;
const appUtils = require("../appUtils");
const adminService = require("../module/v1/admin/adminService");
const whiteListService = require("../module/whiteList/whiteListService");
//=================================== Load Modules end =====================================

// Connect to Db
async function connectDb(env,callback) {
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: 'localhost',
        dialect: 'mysql'
    });
    try {
        await sequelize.authenticate();
        console.log('*** MySQL has been connected successfully ***');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    callback();
}

// ========================== Export Module Start ==========================
module.exports = connectDb;
// ========================== Export Module End ============================