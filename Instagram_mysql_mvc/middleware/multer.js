const multer = require("multer");
const fs = require("fs");
// config = require('.');

var fileName;
var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (request, file, callback) {
    var time = new Date().getTime();
    fileName = file.fieldname + "_" + time + "_" + file.originalname;
    callback(null, fileName);
  },
});

var upload = multer({ storage: storage });

function _singleFile(key) {
  return upload.single(key);
}

function _fileArray(key, count) {
  return upload.array(key, count);
}

// ========================== Export Module Start ==========================
module.exports = {
  single: _singleFile,
  array: _fileArray,
};
// ========================== Export Module End ============================
