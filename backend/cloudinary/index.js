const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dtdtewp0m',
  api_key: '358465116993375',
  api_secret: 'giolO0gPP5vnDdj-73HwJzgKh_s',
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
