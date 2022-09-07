const express = require("express");
const router = express.Router();

const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

const Post = require('../models/post');

router.post("/", upload.array('images') , (req, res, next) => {
  const postData = req.body;
  const postImages = [];

  if(req.files && req.files.length > 0) {
    req.files.forEach(f => {
      postImages.push({
        url: f.path,
        fileName: f.originalname,
      })
    })
  }

  const post = new Post({
    title: postData.title,
    description: postData.description,
    images: postImages
  });

  post.save()
    .then((result) => {
      res.status(200).json({
        message: 'Post Successfully Created'
      })
    })
})

router.get("/", (req, res, next) => {
  Post.find()
    .then((results) => {
      // console.log(results);
      res.status(200).json({
        posts: results
      });
    })
})

module.exports = router;
