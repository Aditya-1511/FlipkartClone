var express = require("express");
const { db } = require("../model/postModel");
var router = express.Router();
var Post = require("../model/postModel");
var postDao = require("../Dao/postDao");
var postController = require("../controller/postController");
var multer = require("multer");
var verifyToken = require("../middleware/verifyToken");
var middlewareMulter = require("../middleware/multer");

router.post(
  "/add_post",
  [verifyToken.isValidToken, middlewareMulter._singleFile("postImage")],
  (req, res) => {
    console.log("Add post route is working fine");
    // console.log(req.payload, "req.payload");
    // console.log(req.body, "req.body");
    let {userid, postCaption, postLocation} = req.body;
    postController.add_post({userid, postCaption, postLocation});
    res.send("Hello from posts.js");
  }
);

router.put('/update_post', (req,res)=>{
  console.log("Update post is working fine");
  // console.log(req.body, "req.body in posts");
  postController.update_post(req.body);
});

module.exports = router;
