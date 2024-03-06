const mongoose = require ('mongoose');
const { Number } = require('twilio/lib/twiml/VoiceResponse');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: [true, 'firstname is reqired']
    },
   lastName:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        default:'user'
    },
   
})

const User = mongoose.model("Users",userSchema)

module.exports = User