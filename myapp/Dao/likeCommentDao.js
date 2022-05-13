const { default: mongoose } = require("mongoose");
var likeCommentModel = require("../model/likeCommentModel");
const ObjectId = require('mongodb').ObjectId;

function addLikeComment(){
    console.log("Add Like Comment in likeCommentDao");
}

function getPost(postId){
    // console.log(postId);
    mongoose.Types.ObjectId(postId);
    let query = {};
    query._id = postId;
    // console.log(query);
    let findPost = db.collection("posts").find(query);
    console.log("findPost");
    return findPost;
}


module.exports = {
  addLikeComment,
  getPost
};
