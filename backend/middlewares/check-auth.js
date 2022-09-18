const jwt = require('jsonwebtoken');

const Post = require('../models/post');

module.exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    // console.log(decodedToken);
    req.userData = {
      userId: decodedToken.id,
      email: decodedToken.email
    }
    next();
  }
  catch(error) {
    res.status(401).json({
      message: 'Authorization failed'
    })
  }
}

module.exports.isCreator = async (req, res, next) => {
  const { userId } = req.userData;
  const { postId } = req.params;

  const post = await Post.findById(postId);

  if(post.creator._id == userId) {
    next();
  } else {
    res.status(403).json({
      message: 'User is not the creator of this post'
    })
  }
}

module.exports.parseObj = (req, res, next) => {
  console.log(req.body);
  next();
}
