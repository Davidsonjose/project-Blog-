const Post = require('../models/Post');
const { default: ApiError } = require('../utils/errorHandler');



exports.getAllPost= async (req, res, next) => {
    try {
      const posts = await Post.find();
      res.status(200).json({
        status: ' success',
        data: posts,
      });
    } catch (error) {
     return next (ApiError(error));
    }
  }

  exports.getSinglePost = async (req, res, next)=>{
        try {
            const { id } = req.params;
            let post = await Post.findById({ _id: id })
            res.status(200).json({
                status: 'success',
                post,
            })
        } catch (error) {
            return next (ApiError(error))
        }
  }

