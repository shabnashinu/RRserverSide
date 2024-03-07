const express = require('express')
const Router = express.Router()
const usercontroller = require('../controller/usercontroller')
const upload = require('../utilities/s3');


Router.post('/user-registration-data',usercontroller.registrationuser)
Router.post('/upload', upload.single('picture'), usercontroller.isuserregistered);
Router.get('/getuseruploads',usercontroller.getuseruploads)
Router.put('/updateuserupload',upload.single('picture'),usercontroller.updateuseruploads)
module.exports = Router
