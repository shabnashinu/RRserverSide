const express = require('express')
const Router = express.Router()
const commoncontroller =  require('../controller/commoncontroller')


Router.post('/signup',commoncontroller.signup)
Router.post('/verifyotp',commoncontroller.verifyotp)
Router.post('/login',commoncontroller.login)
Router.post('/forgotpassword',commoncontroller.forgotpassword)
Router.post('/verify',commoncontroller.verfy)

module.exports = Router

