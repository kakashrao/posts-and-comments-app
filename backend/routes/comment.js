const express = require('express');
const app = express();
const router = express.Router();

const Comment = require("../models/comment");
const Post = require("../models/post");

const { checkAuth } = require("../middlewares/check-auth");

// app.use(express.json);

router.post('/', checkAuth, (req, res, next) => {
  if (!req.body.message) {
    res.status(404).json({
      message: 'Please enter a message'
    })
  }

  req.body.commentBy = req.userData.userId;

  const comment = new Comment({ ...req.body });

  comment.save()
    .then(async (result) => {
      const post = await Post.findById(req.body.commentOn);

      post.commentsCount++;

      await post.save();

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

router.get('/:postId', async (req, res, next) => {
  if (!req.params.postId) {
    res.status(404).json({
      message: 'Post not found'
    })
  }

  const postId = req.params.postId;

  const comment = await Comment.find({ commentOn: postId }).populate('commentBy');

  if (comment && comment.length > 0) {
    const comments = comment.map((element) => {
      return {
        commentId: element._id,
        message: element.message,
        commentBy: {
          name: element.commentBy.name,
          image: element.commentBy.imageUrl,
          profession: element.commentBy.profession,
        }
      }
    });

    res.status(200).json({
      data: comments
    })
  } else {
    res.status(404).json({
      message: 'No comments found'
    })
  }
})

module.exports = router;
