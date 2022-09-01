const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    posts: [
      { title: 'New Post', description: 'How is my post, please comment and like' },
      { title: 'New Post', description: 'How is my post, please comment and like' },
      { title: 'New Post', description: 'How is my post, please comment and like' }
    ]
  })
})

module.exports = router;
