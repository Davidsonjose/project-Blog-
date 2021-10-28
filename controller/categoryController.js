// const router = require('express').Router();
const Category = require("../models/Category");
const ApiError = require("../utils/errorHandler");

exports.createNewCategory = async (req, res, next) => {
  try {
    const { body } = req;
    const categoryExist = await Category.findOne({
      title: body.title
    });
    if (categoryExist) {
      return next(new ApiError("category already exist"), 400);
    }
    const category = await Category.create({ title: body.title });
    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return next(new ApiError(error, 400));
  }
};


exports.getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
     return next(new ApiError(error), 400)
    // next(error)
  }
};
