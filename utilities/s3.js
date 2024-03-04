const { S3Client } = require('@aws-sdk/client-s3')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const app = express()
const s3 = new S3Client({
    region:process.env.REGION,
    credentials:{
        accessKeyId:process.env.ACCESSKEY,
        secretAccessKey:process.env.SECRETKEY
    }
})
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKETNAME,
    metadata: function (req, file, cb) {
      console.log(file);
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname)
    }
  })
})
module.exports=upload




