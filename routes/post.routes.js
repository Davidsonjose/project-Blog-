

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// const cloudinary = require('cloudinary').v2;
const postController =  require('../controller/postController');
const Post = require('../models/Post');

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
       return callback(new Error('filetype not supported upload jpeg or png '),
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
router.get('/', postController.getAllPost);
router.get('/:id', postController.getSinglePost);

// router.get('/:id', async (req, res, next) => {
//   try {
//     let { id } = req.params;
//     let post = await Post.findById({ _id: id });
//     res.render('posts/single.ejs', {
//       title: 'Posts -' + post.title,
//       post,
//       server_url: req.server_url,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

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
     next(error);
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
     next(error);
  }
});

// router.post('/create', (req, res, next)=>{
//     const image = upload.single('image');
//     image (req, res, (err)=>{
//         if (err) {
//             return new Error(err)
//         }
//         res.send(req.file);
//     });
// });




// router.delete('/delete/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const post = await Post.findById({ _id: id });
//     fs.unlinkSync(post.image);
//     await post.delete();
//     res.redirect('/post');
//   } catch (error) {
//     next(error);
//   }
// });
 // let cloudFile = await cloudinary.uploader.upload(file.path);

    // const data = {
    //   image: cloudFile.url,
    //   ...body,
    // };
    // fs.unlinkSync(`uploads/pictures/${file?.filename}`);
    // const post = await Post.create(data);

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//       callback(null,'../upload/pictures');
//     },
//     filename: function (req, file, callback) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       const extname = path.extname(file.originalname);
//       callback(null, file.fieldname + '-' + uniqueSuffix + extname)
//     }
//   });
// //const fileFilter =(req, res, callback) =>{
    //   if (file.mimetype === 'image/jpeg') {
    //       callback(null, true);
    //   } else{
        //   callback('file not supported', false);
    //   }
//   }
  
//   const upload = multer({
//        storage, 
//         // limits: { fileSize: 1000000 },
//     fileFilter:fileFilter
//      });




// router.get('/', (req, res, next)=>{
//     res.render('../views/posts/list.ejs',{
//         title: 'Posts',
//     });
// });


// router.get('/', (req, res, next)=>{
//     res.render('../views/posts/create.ejs', {
//         title: 'create post'
//     })
// });          

// router.get('/create', (req, res, next)=>{
//     res.render('../views/posts/create.ejs',{
//         title: 'create Post',
//     });
// });
// router.post('/create', (req, res, next)=> {
//     const image = upload.single('image');
//     image(req, res, (err)=>{
//         if (err) {
//             return new Error(err);
//         }
//         res.send(req.file);
//     });  
// });


module.exports = router;