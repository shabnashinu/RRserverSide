const mongoose = require ('mongoose')

const houseSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
      },
    picture: 
    { 
        type: String,
         required: true 
    },
    budget:
     { 
        type: String, 
        required: true 
    }
  });
  
  const House = mongoose.model('House', houseSchema);

  module.exports = House
  