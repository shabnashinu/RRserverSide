const user  = require('../models/user-registration-model')


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


module.exports={
    registrationuser
}