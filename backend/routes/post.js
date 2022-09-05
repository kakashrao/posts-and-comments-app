const express = require("express");
const router = express.Router();

const Post = require('../models/post');

router.post("/", (req, res, next) => {
  // console.log(req.body);
  const postData = req.body;
  const post = new Post({
    title: postData.title,
    description: postData.description
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
      console.log(results);
      res.status(200).json({
        posts: results
      });
    })
})

module.exports = router;
