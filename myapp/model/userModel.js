var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });
  var userdata = mongoose.model("userdata", userSchema);

  userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.updated;
    return obj;
  };