require('dotenv').config()
var AWS = require('aws-sdk')
const axios = require('axios')

const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_URL, BUCKET } = process.env
// Set the region
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: 'us-west-1'
})
var aws = require('aws-sdk');

// aws.config.update({
//     accessKeyId: AWS_ACCESS_KEY,
//     secretAccessKey: AWS_SECRET_KEY
// });

exports = module.exports = {
    sign: function(filename, filetype) {
        var s3 = new aws.S3();

        var params = {
            Bucket: activsocial_project,
            Key: filename,
            Expires: 60,
            ContentType: filetype
        };

        s3.getSignedUrl('putObject', params, function(err, data) {
            if (err) {
                console.log(err);
                return err;
            } else {
              console.log(data)
                return data;
            }
        });
    }
};