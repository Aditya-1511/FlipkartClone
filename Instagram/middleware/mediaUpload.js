const Promise = require("bluebird-extra"),
  path = require("path"),
  fs = require("fs"),
  _ = require("lodash"),
  unlink = Promise.promisify(fs.unlink, fs),
  AWS = require("aws-sdk");
require("dotenv/config");
// const customException = require('../customException');

// AWS.config = {
//     accessKeyId: process.env.ACCESS_KEY,
//     secretAccessKey: process.env.KEY_ID,
//     bucketName: process.env.S3_BUCKET_NAME,
//     region: process.env.REGION,
//     signatureVersion: process.env.SV
// };

const s3 = new AWS.S3({
  accessKeyId: "AKIAZ3F2NF2NE3CRTOW2",
  secretAccessKey: "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",
});

function _fetchFilesFromReq(request) {
  if (request.file) {
    return [request.file];
  } else if (request.files) {
    return request.files;
  } else {
    //No Data
  }
}

function __deleteFiles(filePathList) {
  var promiseArray = [];

  _.each(_.uniq(filePathList), function (path) {
    promiseArray.push(unlink(path));
  });

  Promise.all(promiseArray)
    .then(() => console.log("All files deleted successfully."))
    .catch((error) => console.log(error));
}

function uploadMultipleMediaToS3() {
  return function (request, response, next) {
    var files = _fetchFilesFromReq(request);
    if (!files) {
      return next();
    }

    Promise.mapSeries(files, function (file) {
      return _uploadToS3(file.path, file.fieldname);
    })
      .then(function (urls) {
        let location = [];
        urls.forEach(function (url) {
          if (url.Location) {
            location.push(url.Location);
          }
        });

        request.body.imageLoction = location;
        __deleteFiles(_.map(files, "path"));
        next();
      })
      .catch(function (error) {
        throw error;
      });
  };
}

function _uploadToS3(file, buffer) {
  return new Promise(function (resolve, reject) {
    s3.upload(
      {
        Key: String(file),
        Bucket: "myigbucket",
        Body: buffer,
        ContentType: file.filetype,
      },
      function (error, data) {
        if (error) {
          console.log("Upload failed: ", error);
          reject(error);
        } else {
          resolve(data);
        }
      }
    );
  });
}

module.exports = {
  uploadMultipleMediaToS3,
};
