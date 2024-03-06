const mongoose = require ('mongoose')

const userinterface = new mongoose.Schema({
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
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    accepted:{
        type:Boolean,
        default:false
    }

  });


  const user = mongoose.model('userregister',userinterface)

  module.exports = user