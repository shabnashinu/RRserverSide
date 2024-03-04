const express = require('express')
const Router = express.Router()
const Admincontroller = require('../controller/Admincontroller')

Router.get('/listuser',Admincontroller.usershow)
Router.post('/accept-user',Admincontroller.approvalmessage)

module.exports = Router