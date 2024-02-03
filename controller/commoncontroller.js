const User = require("../models/userModel")
const sendotp = require("../otp/sendotp")


const signup = async(req,res)=>{
    console.log(req.body);
    const {firstName,lastName,phone,email,password} = req.body
    const exist = await User.findOne({phone})

    if(exist){
        res.json({exist:true,message:"already exist"})
    }
    else{
        console.log(phone);
        sendotp(phone)
        .then((msg)=>{
            res.json({otpsend:true,message:"otp send succesfully"})
        })
        .catch((err)=>{
            console.log(err);
            res.json({otpsend:false,message:"failed"})  
        })
    }
   
}

module.exports={
    signup
}