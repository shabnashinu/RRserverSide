const userapplied = require('../models/user-registration-model')
const company = require('../models/company');
const nodemailer = require('nodemailer');
const emailmessage = require('../utilities/nodemailer')

//to see the users 
const usershow = async(req,res)=>{
    try {
        // Fetch all users from the database
        const users = await userapplied.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error listing users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//for sending email message
const approvalmessage = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);

         emailmessage.mailapprove(email);
        //  await userapplied.findOneAndDelete({ email });

        res.status(201).json({ message: 'Approval message sent successfully' });
    } catch (error) {
        console.error('Error sending approval message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}








    
    


module.exports = {
    usershow,
    approvalmessage
}