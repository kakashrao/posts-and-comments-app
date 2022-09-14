const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

const User = require('../models/user');

const jwt = require('jsonwebtoken');

router.post("", upload.single('image'), (req, res) => {
  bcrypt.hash(req.body.password, 10, async function(err, hash) {
    if(hash) {
      const user = new User({
        name: req.body.name,
        profession: req.body.profession,
        bio: req.body.bio,
        imageUrl: req.file ? req.file.path : '',
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

router.put("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if(user) {
    bcrypt.compare(req.body.password, user.password, async function(err, result) {
      if(result) {
        const token = await jwt.sign({
          email: user.email,
          id: user._id
        },
          process.env.JWT_KEY,
        {
          expiresIn: '1h'
        }
        )

        res.status(200).json({
          userData : {
            token: token,
            id: user._id,
            name: user.name,
            profession: user.profession,
            bio: user.bio,
            imageUrl: user.imageUrl
          }
        })
      } else {
        res.status(401).json({
          message: "Invalid credentials"
        })
      }
    });
  } else {
    res.status(404).json({
      message: "User not exist"
    })
  }
})

router.get("/:userId", async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId });

  if(user) {
    res.status(200).json({
      userData : {
        id: user._id,
        name: user.name,
        profession: user.profession,
        bio: user.bio,
        imageUrl: user.imageUrl
      }
    })
  } else {
    res.status(404).json({
      message: "User not found"
    })
  }
})

module.exports = router;
