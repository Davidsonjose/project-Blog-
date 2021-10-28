const mongoose = require("mongoose");
// const User = require('./User');
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please include the title"],
      trim: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "please include a description"],
      trim: true,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      // required: [true, 'a post must belong to a user']
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, 'a post must belong to a category']
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
