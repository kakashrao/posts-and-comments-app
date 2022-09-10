const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'posts-and-comments-app',
    allowed_formats: ['jpg', 'jpeg', 'png', 'svg']
  }
})

module.exports = {
  storage,
  cloudinary
}

// Important!!!!!

// Make an environemnt file for cloudinary credentials
