const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "a category must have a title"],
      unique: [true, "this category already exist"],
    },
  },

  { timestamps: true }
);
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
