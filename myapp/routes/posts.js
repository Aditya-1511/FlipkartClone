var express = require("express");
const { db } = require("../model/postModel");
var router = express.Router();
var Post = require("../model/postModel");
var postDao = require("../Dao/postDao");
var postController = require("../controller/postController");
var middleware = require("../middleware/verifyToken");


router.post("/add_post", (req, res) => {
  console.log("Add post route is working fine");
    postDao.addProduct(req.body);
});


module.exports = router;
