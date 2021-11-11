const express = require("express");

const {
  getAllCategory,
  create,
  // getAllCategoryAndPost,
} = require("../controller/categoryController");
const { roles } = require("../controller/authController");

const router = express.Router();
router.get("/getCategory", getAllCategory);

// router.get("/posts/:id", getAllCategoryAndPost);

router.post("/createCategory", roles('user'),   create);

module.exports = router;
