const express = require('express')
const Router = express.Router()
const commoncontroller =  require('../controller/commoncontroller')


Router.post('/signup',commoncontroller.signup)

module.exports = Router

