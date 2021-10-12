const Post = require('../models/Post');



exports.getAllPost= async (req, res, next) => {
    try {
      const posts = await Post.find();
      res.status(200).json({
        status: ' success',
        data: posts,
      });
    } catch (error) {
      next(error);
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
            
        }
  }

