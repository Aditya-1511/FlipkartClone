var express = require("express");
var router = express.Router();
var likeCommentModel = require("../model/likeCommentModel");
var likeCommentDao = require("../Dao/likeCommentDao");
var likeCommentController = require("../controller/likeCommentController");
var verifyToken = require("../middleware/verifyToken");

router.post('/add_like_comment', (req,res)=>{
    console.log("Add like comment route is working fine");
    likeCommentController.addLikeComment(req.body);
});

module.exports = router;
