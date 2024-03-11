const express = require('express')
const Router = express.Router()
const companycontroller = require('../controller/companycontroller')
const s3file = require('../utilities/s3');

Router.post('/registrationform', s3file.fields([
  { name: 'businessLicense', maxCount: 1 },
  { name: 'proofOfInsurance', maxCount: 1 },
  { name: 'constructionPermits', maxCount: 1 },
  { name: 'safetyPlan', maxCount: 1 },
  { name: 'projectPortfolio', maxCount: 1 }
]), companycontroller.companyregistration);

Router.post('/companyupload', s3file.single('picture'), companycontroller.iscompanyregistered);
Router.get('/getcompanyuploads',companycontroller.getcompanyuploads)
Router.put('/updatecompanyupload',s3file.single('picture'),companycontroller.updatecompanyuploads)


module.exports = Router