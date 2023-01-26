const express = require('express');
const app = express();
const router = express.Router();

const Comment = require("../models/comment");

const { checkAuth } = require("../middlewares/check-auth");
const { read } = require('fs');

// app.use(express.json);

router.post('/', checkAuth, (req, res, next) => {
  if (!req.body.message) {
    res.status(404).json({
      message: 'Please enter a message'
    })
  }

  const comment = new Comment({ ...req.body });

  comment.save()
    .then((result) => {
      res.status(200).json({
        commentId: comment._id
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to post comment, please try again"
      })
    })
});

module.exports = router;
