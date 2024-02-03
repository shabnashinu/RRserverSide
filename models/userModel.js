const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
   lastName:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    usertype:{
        type:String,
        default:'user'
    }
})

const User = mongoose.model("Users",userSchema)

module.exports = User