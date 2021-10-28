

const express = require('express');
// const multer = require('multer');
// const path = require('path');
const fs = require('fs');
// const cloudinary = require('cloudinary').v2;
const postController =  require('../controller/postController');
const Post = require('../models/Post');
// const upload = require('../utils/upload')
const {authorization} = require('../controller/authController')





const router = express.Router();

//RETRIEVE
router.get('/', postController.getAllPost);
// router.get('/:id', postController.getSinglePost);
router.use(authorization);
router.post('/new/post', postController.createPosts)
router.get('/all/user-post/:id', postController.getAllUserPost);




module.exports = router;                                                                                