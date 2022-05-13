const { default: mongoose } = require("mongoose");
const { db } = require("../model/postModel");
var postModel = require("../model/postModel");

async function add_post(postInfo) {
  // console.log(postInfo, "postInfo in postDao");
  let addPostToDb = await db.collection("posts").insertOne(postInfo);
//   console.log(addPostToDb, "addPostToDb in postDao");
return addPostToDb;
}

async function update_post(postInfo){
    console.log("Update post in postDao");
    // console.log(postInfo, "postInfo in postDao");
    let updatePost = await db.collection("posts").updateOne({query:{_id:postInfo.postId},update:{postCaption : postInfo.postCaption}, upsert : true});
    console.log(updatePost, "updatePost in postDao");
}

async function get_post(postId){
    // console.log(postId, "postId in postDao");
    let query = {};
    query._id = mongoose.Types.ObjectId(postId);
//    console.log(postId);
    let findPost = await db.collection("posts").findOne(query);
    // console.log(findPost);
    return findPost;
}

module.exports = {
  add_post,
  update_post,
  get_post
};
