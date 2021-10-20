

const multer = require('multer');
const path = require('path');
const fs = require('fs');
// const cloudinary = require('cloudinary').v2;
const ApiError = require('../utils/errorHandler');

// cloudinary configuration
// cloudinary.config({
//   cloud_name: 'YOUR_CLOUD_NAME',
//   api_key: 'YOUR_API_KEY',
//   api_secret: 'YOUR_API_SECRET',
// });

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    return callback(null, 'upload/pictures');
  },

  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    return callback(null, file.fieldname + '-' + uniqueSuffix + extname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, callback) => {
    let fileType = ['image/jpeg', 'image/png'];
    if (!fileType.includes(file.mimetype)) {
       return callback(new ApiError('filetype not supported upload jpeg or png '),
       false
       );
    }
    // if (!fileType.includes(file.mimetype)) {
    //   return callback(
    //     new Error('file type not supported upload png, jpeg or jpg'),
    //     false
    //   );
    // }

    return callback(null, true);
  },
});

const router = express.Router();

//RETRIEVE
router.get('/',authController.authorization, postController.getAllPost);
router.get('/:id', postController.getSinglePost);



router.get('/create/post', (req, res, next) => {
  res.render('posts/create.ejs', {
    title: 'create post',
    server_url: req.server_url, 
  });
});

//CREATE
router.post('/create/post', upload.single('image'),  async(req, res, next) => {
  try {
    const {file, body} = req;
    const data = {
      image: `upload/pictures/${file?.filename}`,
      ...body,
    };
    const post = await Post.create(data);
    res.redirect(`/post/${post.id}`);
  } catch (error) {
     next (new ApiError(error));
  }
});
router.delete('/delete/:id', async(req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete({ _id: id});
    await post.delete();
    fs.unlinkSync(post.image);
    res.redirect('/post')
  } catch (error) {
     next (new ApiError(error));
  }
});

module.exports = upload;