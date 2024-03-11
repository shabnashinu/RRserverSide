const company = require('../models/company')
const companyproject = require('../models/projectupload')


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






//to check company is  registered or not
const iscompanyregistered = async(req,res)=>{

    const {email,title,description}=req.body
    console.log(email);
    try {
        const registeredcompany = await company.findOne({ email });
    if (registeredcompany) {

        const picture = req.file.location
        const upload = new companyproject
        ({ 
            email, 
            picture, 
            title,
            description 
        });
        await upload.save();
     
      res.status(200).json({ registered: true });
    } else {
      res.status(200).json({ registered: false });
    }
        
    } catch (error) {
        console.error('Error checking company registration:', error);
        res.status(500).json({ error: 'Internal server error' }); 
    }

}









module.exports={
    companyregistration,
    iscompanyregistered
}

