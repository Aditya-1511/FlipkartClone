require("dotenv/config");
const aws = require("aws-sdk");
const fs = require("fs");

const s3 = new aws.S3({
  accessKeyId: process.env.IAM_ACCESS_KEY,
  secretAccessKey: process.env.IAM_KEY_ID,
});

const uploadFile = (fileName) => {
  return new Promise((res, rej) => {
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: "product.jpg", // File name you want to save as in S3
        Body: JSON.stringify(data, null, 2),
      };

      s3.upload(params, function (s3Err, data) {
        if (s3Err) throw s3Err;

        const url = data.Location;
        res(url);
        fs.unlinkSync(fileName);
      });
    });
  });
};

module.exports = {
  uploadFile,
};
