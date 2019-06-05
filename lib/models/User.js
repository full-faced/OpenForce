const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  projects: {
    type: Array,
    require: false
  }
},
{ 
  toJson: {
    transform: function(doc, ret) {
      console.log('what is this thing?', ret, doc);
      delete ret.passwordHash;
      delete ret.__v;
    }
  }

})
;
