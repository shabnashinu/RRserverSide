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
const iscompanyregistered = async (req, res) => {
    const { email, title, description } = req.body;
    console.log(email);
    try {
        const registeredcompany = await company.findOne({ email });
        if (registeredcompany) {
            const picture =  req.file.location  
            const companyupload = new companyproject({
                email,
                picture,
                title,
                description
            });


            const savecompany = await companyupload.save();
            console.log(savecompany);
            res.status(200).json({ registered: true });
        } else {
            res.status(200).json({ registered: false });
        }
    } catch (error) {
        console.error('Error checking company registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// to display the companyuploads and budget
const getcompanyuploads = async(req,res)=>{
    try {

        const uploadedcompany = await companyproject.find()
        if(uploadedcompany){
            res.status(200).json(uploadedcompany); 
        }
        else{
            res.status(404).json({ error: 'company data not found' });
        }
        
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



//to update company uploads 
const updatecompanyuploads = async(req,res)=>{
    const { title,email,description } = req.body;
    console.log(req.file.location);
    
    try {
        const updatedcompany = await companyproject.findOne({email});
        updatedcompany.title = title
        updatedcompany.description = description
        updatedcompany.picture = req.file.location
        updatedcompany.save()
        if (updatedcompany) {
          res.status(200).json(updatedcompany);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}







module.exports={
    companyregistration,
    iscompanyregistered,
    getcompanyuploads,
    updatecompanyuploads
}

