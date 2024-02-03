const express = require('express')
const Router = express.Router()
const Admincontroller = require('../controller/Admincontroller')

Router.get('/data',Admincontroller.Admin)

