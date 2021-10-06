const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
         required: [true, 'please include the title'],
        
    },
    image: {
        type: String,
        required: true, 
        trim: true,
    },
    description:{
        type: String,
         required: [true, 'please include a description'],
        trim: true,
    },
},
{ timestamps: true }
);

const Post = mongoose.model('post', PostSchema);



module.exports= Post;






// const mongoose = require('mongoose');

// const PostSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, 'make you put title na 😡😡'],
//       trim: true,
//     },

//     image: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     description: {
//       type: String,
//       required: [true, 'please put description na abeg'],
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// const Post = mongoose.model('Post', PostSchema);

// module.exports = Post;