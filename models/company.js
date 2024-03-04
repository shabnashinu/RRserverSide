const mongoose = require('mongoose');

const companyRegistrationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required']
  },
  address: {
    type: String,
    required: true
  },
  contactPerson: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  businessLicense: {
    type: String,
    required: true
  },
  proofOfInsurance: {
    type: String, 
    required: true
  },
  constructionPermits: {
    type: String, 
    required: true
  },
  safetyPlan: {
    type: String, 
    required: true
  },
  projectPortfolio: {
    type: String, 
    required: true
  }
});

const company = mongoose.model("company", companyRegistrationSchema);

module.exports = company;
