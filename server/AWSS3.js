// Load the AWS SDK for Node.js
require('dotenv').config()
var AWS = require('aws-sdk')
const fs = require("fs"); // from node.js
const path = require("path"); // from node.js
const uuid = require('uuid');
const express = require('express')
const app = express()
// var argv = require('minimist')(process.argv.slice(2));
const { BUCKET_NAME } = process.env

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/profile_pic.jpg'))
})
// Create S3 service object
module.exports = {
  signedUrl: async(req, res) => {
   AWS.config.update({ region: 'us-west-1' })

   AWS.config.getCredentials(function(err) {
     if (err) console.log(err.stack)
     // credentials not loaded
     else {
       console.log('Access key:', AWS.config.credentials.accessKeyId)
       console.log('Secret access key:', AWS.config.credentials.secretAccessKey)
     }
   })
   const bucketParams = {
     Bucket: BUCKET_NAME,
     Key: 'SiteImages/aikido-svgrepo-com.svg'
   }
   // Create a promise on S3 service object
   s3 = new AWS.S3({ apiVersion: '2006-03-01' })
   // Handle promise fulfilled/rejected states
   s3.getBucketAcl(bucketParams, (err, data) => {
     if (err) {
       console.log('Error', err)
     } else if (data) {
       s3.listObjects(bucketParams, function(err, data) {
         if (err) {
           console.log('Error', err)
         } else {
           res.status(200).send(data)
         }
       })
     }
   })

}
}