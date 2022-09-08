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

router.get("/:id", (req, res) => {
  // console.log(req);
  const postId = req.params['id'];
  Post.findById(postId)
    .then((post) => {
      if(post) {
        console.log(post);
        res.status(200).json({
          post: post
        });
      } else {
        res.status(404).json({
          message: "Post not found"
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error, please try again later"
      })
    })
})

module.exports = router;
