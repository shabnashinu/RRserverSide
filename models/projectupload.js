const mongoose = require ('mongoose')

const projectschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
      },
    picture: 
    { 
        type: String,
         required: true 
    },
    title:
     { 
        type: String, 
        required: true 
    },
    description:
     { 
        type: String, 
        required: true 
    }
  });

  const project = mongoose.model('project',projectschema)

  module.exports = project