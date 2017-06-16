const mongoose = require('mongoose');

let User = mongoose.Schema({
  name:String,
  age:Number,
  created_at:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User',User);
