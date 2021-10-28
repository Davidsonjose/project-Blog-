const Post = require("../models/Post");
const ApiError = require("../utils/errorHandler");
const upload = require("../utils/upload");
// const User = require('../models/User');

exports.getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find().populate({
      path: "user",
      select: "username _id",
    }).populate({path: 'category', select: '_id title'})
    res.status(200).json({
      status: " success",
      data: posts,
    });
  } catch (error) {
    return next(ApiError(error), 400);
  }
};
exports.getAllUserPost = async (req, res, next) => {
  try {
    const posts = await Post.find({ user: req.params._id });
    res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    return next(ApiError(error), 400);
  }
};
// exports.getUserName = async(req, res, next)=>{
//   const { body } = req;
//   const user = new User({
//       username: body.username,
//       email: body.email,
//       password: body.password,
//       firstname: body.firstname,
//       lastname: body.lastname,
//       role: body.role,
//   });
//   user.password= undefined;
//     try {
//       const getUsername= await Post.findOne({email: body.email});
//       // console.log(getUsername);
//       res.status(201).json({
//         status: 'success',
//         data: user,
//       })
//     } catch (error) {
//        return next(new ApiError('just creating an api'), 400)
//     }
// }

exports.getSinglePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    let post = await Post.findById({ _id: id });
    res.status(200).json({
      status: "success",
      post,
    });
  } catch (error) {
    return next(new ApiError(error), 400);
  }
};

exports.createPosts = (req, res, next) => {
  // const { body, file } = req;
  const ImageFile = upload.single("image");
  ImageFile(req, res, async (err) => {
    try {
      const { file, body } = req;
      if (err) {
        return next(new ApiError(err, 400));
      }
      if (!file) {
        return next(new ApiError("upload an image"), 400);
      }
      const data = { image: `upload/${file.filename}`, ...body };
      const posts = await Post.create(data);
      // console.log(post);
      res.status(201).json({
        status: "success",
        message: posts,
      });
    } catch (error) {
      return next(error);
    }
  });
  // const post = await Post.create()
};

exports.logMethod = (req, res, next) => {
  console.log(req.method, "/", req.get("host") + "/" + req.url);
  next();
};
