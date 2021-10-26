const Post = require('../models/Post');
const { default: ApiError } = require('../utils/errorHandler');
const upload = require('../utils/upload');


exports.getAllPost= async (req, res, next) => {
    try {
      const posts = await Post.find();
      res.status(200).json({
        status: ' success',
        data: posts,
      });
    } catch (error) {
     return next (ApiError(error), 400);
    }
  }

  exports.getSinglePost = async (req, res, next)=>{
        try {
            const { id } = req.params;
            let post = await Post.findById({ _id: id })
            res.status(200).json({
                status: 'success',
                post,
            });
        } catch (error) {
            return next (new Error(error))
        }
  }

  exports.createPosts =  async(req, res, next)=>{
        try {
          const ImageFile = upload.single('image');
          ImageFile(req, res, async (err)=>{
              if (err) {  
                 return next(new ApiError(err, 400))
              }
              res.send({file: req.file, ...req.body})
          });   
          // const post = await Post.create()
        } catch (error) {
          next(error);
        }
  }

  exports.logMethod = (req, res, next)=>{
      console.log(req.method, '/', req.get('host') + '/' + req.url);
      next();
  }

