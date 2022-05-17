// Importing mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var postSchema = new Schema({
  userid: {
    type: Number,
    required: true,
  },
  postCaption: {
    type: String,
  },
  postLocation: {
    type: String,
  },
  imageLink: [
    {
      type: String,
    },
  ],
});

//Export user module
const Post = mongoose.model("post", postSchema);
module.exports = Post;
