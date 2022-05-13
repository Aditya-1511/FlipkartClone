const { token } = require("morgan");
var likeCommentDao = require("../Dao/likeCommentDao");
var jwtHandler = require("../jwtHandler");
var redisClient = require("../redis/redisClient");

function addLikeComment(postInfo){
    console.log(postInfo);
    console.log("Add Like Comment in likeCommentController");
    likeCommentDao.getPost(postInfo.postId);
    likeCommentDao.addLikeComment();
}


module.exports = {
 addLikeComment
};
