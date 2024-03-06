const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new S3Client({
    region: process.env.REGION,
    credentials:{
        accessKeyId: process.env.ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRETKEY
    }
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKETNAME,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname)
    }
  })
})
module.exports=upload




