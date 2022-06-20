const { default: mongoose } = require("mongoose");
const { db } = require("../model/postModel");
var postModel = require("../model/postModel");
const ObjectId = require("mongodb").ObjectId;

async function add_post(postInfo) {
  // console.log(postInfo, "postInfo in postDao");
  let addPostToDb = await db.collection("posts").insertOne(postInfo);
  // console.log("addPostToDb in postDao", addPostToDb);
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

async function get_all_information(accessToken) {
  // console.log("Get all information in postDao");
  // console.log(accessToken);
  const res = await postModel.aggregate([
    // {
    //   $match: { __v: 0 },
    // },
    {
      $lookup: {
        from: "likeComments",
        localField: "_id",
        foreignField: "postId",
        as: "Like-Comment",
      },
    },
    {
      $lookup: {
        from: "user",
        localField: "userid",
        foreignField: "userid",
        as: "User-Information",
      },
    },
    {
      $project: {
        _id: 1,
        postCaption: 1,
        postLocation: 1,
        imageLoction: 1,
        "Like-Comment._id": 1,
        "Like-Comment.postId": 1,
        "Like-Comment.commentOnPost": 1,
        "User-Information._id": 1,
        "User-Information.name": 1,
        "User-Information.email": 1,
      },
    },
  ]);
  console.log(res, "res");
  console.log("Get all information in postDao");
  return res;
}

module.exports = {
  add_post,
  update_post,
  get_post,
  delete_post,
  get_all_information,
};
