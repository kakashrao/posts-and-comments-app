const express = require("express");
const router = express.Router();

const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

const Post = require('../models/post');

const checkAuth = require('../middlewares/check-auth');

router.post("/", checkAuth, upload.array('images') , (req, res, next) => {
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
    images: postImages,
    creator: req.userData.userId
  });

  post.save()
    .then((result) => {
      res.status(200).json({
        message: 'Post Successfully Created'
      })
    })
})

router.get("/", (req, res, next) => {
  Post.find().populate('creator')
    .then((results) => {
      console.log(results);
      let posts = [];

      if(results.length > 0) {
        posts = results.map((post) => {
          return {
            postId: post._id,
            title: post.title,
            description: post.description,
            images: post.images,
            creator: {
              id: post.creator._id,
              name: post.creator.name,
              profession: post.creator.profession,
              imageUrl: post.creator.imageUrl
            }
          }
        })
      }

      res.status(200).json({
        posts: posts
      });
    })
})

router.get("/:id", (req, res) => {
  // console.log(req);
  const postId = req.params['id'];
  Post.findById(postId).populate('creator')
    .then((post) => {

      if(post) {
        const postData = {
          postId: post._id,
          title: post.title,
          description: post.description,
          images: post.images,
          creator: {
            id: post.creator._id,
            name: post.creator.name,
            profession: post.creator.profession,
            imageUrl: post.creator.imageUrl
          }
        }

        res.status(200).json({
          post: postData
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
