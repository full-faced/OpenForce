const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  toJson: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Post', postSchema);
