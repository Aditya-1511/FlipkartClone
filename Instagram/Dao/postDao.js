const { default: mongoose } = require("mongoose");
const { db } = require("../model/postModel");
var postModel = require("../model/postModel");
const ObjectId = require("mongodb").ObjectId;

async function add_post(postInfo) {
  // console.log(postInfo, "postInfo in postDao");
  let addPostToDb = await db.collection("posts").insertOne(postInfo);
  console.log("addPostToDb in postDao",addPostToDb);
  return addPostToDb;
}

async function update_post(postInfo) {
  console.log("Update post in postDao");
  //   console.log(postInfo, "postInfo in postDao");
  let query = {};
  query._id = postInfo.postId;
  let update = {};
  update.postCaption = postInfo.captionToupdate;

  //   console.log(query);
  //   console.log(update);

  let updatePost = await db
    .collection("posts")
    .updateOne(
      { _id: new ObjectId(postInfo.postId) },
      { $set: { postCaption: postInfo.captionToupdate } },
      { upsert: true }
    );
  //   console.log (updatePost);
  return updatePost;
}

async function get_post(postId) {
  // console.log(postId, "postId in postDao");
  let query = {};
  query._id = mongoose.Types.ObjectId(postId);
  //    console.log(postId);
  let findPost = await db.collection("posts").findOne(query);
  // console.log(findPost);
  return findPost;
}

async function delete_post(postId) {
  console.log("Delete post in postDao");
  // console.log(postId, "postId in postDao");
  let query = {};
  mongoose.Types.ObjectId(query._id);
  let deletePost = await db.collection("posts").deleteOne(query);
  console.log(deletePost, "deletePost in postDao");
  return deletePost;
}

module.exports = {
  add_post,
  update_post,
  get_post,
  delete_post,
};
