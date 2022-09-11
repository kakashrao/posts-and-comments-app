const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const multer = require('multer');
const { storage } = require('../cloudinary/index');
const User = require('../models/user');
const upload = multer({ storage });

router.post("", upload.single('image'), (req, res) => {
  bcrypt.hash(req.body.password, 10, async function(err, hash) {
    if(hash) {
      const user = new User({
        name: req.body.name,
        profession: req.body.profession,
        bio: req.body.bio,
        imageUrl: req.file.path,
        email: req.body.email,
        password: hash
      })

      await user.save();
      res.status(200).json({
        message: "User registration is successful"
      })
    } else {
      res.status(500).json({
        message: "Failed to signup, please try again"
      })
    }
});
})

module.exports = router;
