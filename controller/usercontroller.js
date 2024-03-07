const user = require('../models/user-registration-model');
const useruploads = require('../models/houseupload')



const registrationuser = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, password, email, address } = req.body;

        console.log(req.body);

        const newUser = new user({
            firstName: firstName,
            lastName: lastName,
            phone: phoneNumber,
            email: email,
            password: password,
            address: address
        });

        // Save the new user document to the database
        await newUser.save();

        console.log('User registered successfully:', newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



//to check is it registered or not
const isuserregistered = async (req, res) => {
    console.log(req.body);
  
    const { email , budget } = req.body;
    console.log(req.file);

  try {
  
    const registereduser = await user.findOne({ email });
    if (registereduser) {

        const picture = req.file.location
        const upload = new useruploads
        ({ 
            email, 
            picture, 
            budget 
        });
        await upload.save();
     
      res.status(200).json({ registered: true });
    } else {
      
      res.status(200).json({ registered: false });
    }
  } catch (error) {
    console.error('Error checking user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


// to display the userhomes and budget
const getuseruploads = async(req,res)=>{
  
    try {

        const uploadeduser = await useruploads.find()
        if(uploadeduser){
            res.status(200).json(uploadeduser); 
        }
        else{
            res.status(404).json({ error: 'User data not found' });
        }
        
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//to update
const updateuseruploads = async(req,res)=>{
    const { budget,email } = req.body;
    console.log(req.file.location);
    console.log(budget);
    try {
        const updatedUser = await useruploads.findOne({email});
        updatedUser.budget = budget
        updatedUser.picture = req.file.location
        updatedUser.save()
        if (updatedUser) {
          res.status(200).json(updatedUser);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}




module.exports={
    registrationuser,
    isuserregistered,
    getuseruploads,
    updateuseruploads
}