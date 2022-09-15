const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
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
