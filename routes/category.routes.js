const express = require("express");
const fs = require("fs");
const { authorization, roles } = require("../controller/authController");
const {
  createNewCategory,
  getAllCategory,
} = require("../controller/categoryController");
// const Category = require("../models/Category");

const router = express.Router();

//RETRIEVE
router.use(authorization);
router.get("/createCategory", roles('user'), createNewCategory);
router.get("/getCategory", getAllCategory);

module.exports = router;
