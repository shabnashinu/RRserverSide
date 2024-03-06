const company = require('../models/company')


const companyregistration = async (req, res) => {
    try {
   
        const { companyName, address, contactPerson, email, phoneNumber } = req.body;

        // Extract file locations from the uploaded files
        const businessLicense = req.files['businessLicense'][0].location;
        const proofOfInsurance = req.files['proofOfInsurance'][0].location;
        const constructionPermits = req.files['constructionPermits'][0].location;
        const safetyPlan = req.files['safetyPlan'][0].location;
        const projectPortfolio = req.files['projectPortfolio'][0].location;
        
      
        const newCompany = new company({
            companyName,
            address,
            contactPerson,
            email,
            phoneNumber,
            businessLicense,
            proofOfInsurance,
            constructionPermits,
            safetyPlan,
            projectPortfolio
        });

      
        await newCompany.save();
        res.status(201).json({ message: 'Company registered successfully' });
    } catch (error) {
        console.error('Error registering company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports={
    companyregistration
}

