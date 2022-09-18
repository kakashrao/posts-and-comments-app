const express = require("express");
const app = express();
const router = express.Router();

const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const  { cloudinary } = require('../cloudinary/index');

const Post = require('../models/post');

const { checkAuth, isCreator } = require('../middlewares/check-auth');

app.use(express.json);

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

router.put("/:postId", checkAuth, isCreator, upload.array('images') , async (req, res, next) => {
  const { postId } = req.params;

  const deleteImagesList = req.body.deleteImages ? JSON.parse(req.body.deleteImages) : [];
  delete req.body.deleteImages;

  const post = await Post.findByIdAndUpdate(postId, {...req.body, creator: req.userData.userId});

  if(req.files && req.files.length > 0) {
    const postImages = [];

    req.files.forEach(f => {
      postImages.push({
        url: f.path,
        fileName: f.originalname,
      })
    })

    post.images.push(...postImages);
    await post.save();
  }

  if(deleteImagesList && deleteImagesList.length > 0) {

    for (let image of deleteImagesList) {
      await cloudinary.uploader.destroy(image.split('.')[0]);
  }
  await post.updateOne({ $pull: { images: { fileName: { $in: deleteImagesList } } } })
  }

  res.status(200).json({
    message: 'Post Successfully Updated'
  })
})

router.get("/", (req, res, next) => {
  Post.find().populate('creator')
    .then((results) => {
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

router.get("/:postId", (req, res) => {
  // console.log(req);
  const postId = req.params['postId'];
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

router.delete("/:postId", checkAuth, isCreator, async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findByIdAndDelete(postId);
  for (let image of post.images) {
    await cloudinary.uploader.destroy(image.fileName.split('.')[0]);
  }

  res.status(200).json({
    message: "Post Successfully deleted"
  })
})

module.exports = router;
