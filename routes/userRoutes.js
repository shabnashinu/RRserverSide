const express = require('express')
const Router = express.Router()
const usercontroller = require('../controller/usercontroller')


Router.post('/user-registration-data',usercontroller.registrationuser)
Router.post('/upload',usercontroller.isuserregistered)


module.exports = Router
