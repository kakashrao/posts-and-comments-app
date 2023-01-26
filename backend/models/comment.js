const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  commentOn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
})

module.exports = mongoose.model('Comment', commentSchema);
