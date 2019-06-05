const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
  summary: {
    type: String, 
    required: true
  },
  projectUrl: {
    type: String, 
    required: true
  },
  imageUrl: {
    type: String, 
    required: true
  },
  users: {
    type: Array,
    required: true
  }
},
{
  toJson: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Project', projectSchema);
