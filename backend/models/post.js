const mongoose = require("mongoose");

const postImageSchema = mongoose.Schema({
  url: String,
  fileName: String,
})

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [postImageSchema]
})

module.exports = mongoose.model("Post", postSchema);
