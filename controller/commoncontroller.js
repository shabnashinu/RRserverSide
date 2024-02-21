const User = require("../models/userModel")
const sendotp = require("../twilio/sendotp")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authId = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const countryCode = process.env.COUNTRYCODE;
const twilio = require('twilio');
const client = twilio(accountSid, authId);


const signup = async (req, res) => {
    console.log(req.body);
    const { firstname, lastname, phone, email, password } = req.body
    const exist = await User.findOne({ phone })

    if (exist) {
        res.json({ exist: true, message: "already exist" })
    }
    else {
        console.log(phone);
        sendotp.otpgenerate(phone)
            .then((msg) => {
                res.json({ otpsend: true, message: "otp send succesfully" })
            })
            .catch((err) => {
                console.log(err);
                res.json({ otpsend: false, message: "failed" })
            })
    }

}

const verifyotp = async (req, res) => {
    const { firstname, lastname, email, password, phone, otp } = req.body
    // verification check
    try {
        const verificationCheck = await client.verify.v2.services(serviceSid)
            .verificationChecks.create({ to: `+91${phone}`, code: otp })
            console.log("verified", verificationCheck);
            if (verificationCheck && verificationCheck.status === 'approved') {
                const hashepassword = await bcrypt.hash(password, 10)
                const newUser = new User({
                    firstName: firstname,
                    lastName: lastname,
                    password:hashepassword,
                    phone,
                    email
                });
                const savedUser = await newUser.save();

                if (savedUser) {
                    const secretKey = process.env.secretKey;

                    const find=User.findOne({phone})
                    console.log("finded",find,find._id,find.userType);
                    const payload = { id:savedUser._id, userType:savedUser.usertype};
                    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
                    console.log(token);
                    res.json({
                        token:token,
                        success: true,
                        error:false, 
                        user: true,
                        message: 'successfully verified user',
                        user:savedUser.usertype
                    });
                }
            }

    } catch (error) {
        console.log("Here is the error", error)
    }


}

const login = async (req, res) => {
console.log(req.body);

    try {
        const secretKey = process.env.secretKey;
        const { email, password } = req.body;
        const exist = await User.findOne({ email });
        console.log(exist);
        if (exist) {
            const isPasswordMatch = await bcrypt.compare(password, exist.password);
            console.log(isPasswordMatch);
            if (isPasswordMatch) {
                console.log(exist,isPasswordMatch);
                const payload = { id: exist._id, userType: exist.usertype };
                const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
                console.log("JWT Token:", token);
                res.json({success:true, token });
            } else {
                res.json({ error: true, message: "incorrect password" });
            }
        } else {
            res.json({ error: true, message: "invalid credentials" });
        }
    } catch (error) {
        res.json({ error: true, message: 'error' });
    }
                                                                                                                                                                                         
}

//forgot password send otp

const forgotpassword = async(req,res)=>{
    console.log(req.body);
    const {phone} = req.body
    const exist = await User.findOne({ phone })
    if (exist) {
        console.log(phone);
        sendotp.otpgenerate(phone)
            .then((msg) => {
                res.json({ otpsend: true, message: "otp send succesfully" })
            })
            .catch((err) => {
                console.log(err);
                res.json({ otpsend: false, message: "failed" })
            })
    }
    else{
        res.json({otpsend:false, message:"user does not exist" })
    }
}

//verifyuser
const verfy = async(req,res)=>{
    const {phone,otp}=req.body
    console.log(req.body);
    sendotp.verify(phone,otp)
    .then((verificationCheck)=>{
        console.log(verificationCheck);
        if(verificationCheck && verificationCheck.status === "approved"){
            res.json({otpverified:true})
        }
        else {
            res.json({otpverified:false})
        }
    }).catch(()=>{
        res.json({otpverified:false})
    })
}


module.exports = {
    signup,
    verifyotp,
    login,
    forgotpassword,
    verfy
}