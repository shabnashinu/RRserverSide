const express = require('express')
const Router = express.Router()
const Admincontroller = require('../controller/Admincontroller')

Router.get('/listuser',Admincontroller.usershow)
Router.get('/listcompany',Admincontroller.companyshow)
Router.post('/accept-user',Admincontroller.approvalmessage)
Router.post('/approvecompany',Admincontroller.companyapprovalmail)


module.exports = Router