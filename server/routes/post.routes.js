const express = require("express");
const postController = require("../controller/postController");
const { authorization } = require("../controller/authController");

const router = express.Router();

//RETRIEVE
router.get("/", postController.getAllPost);

router.get("/:id", postController.getSinglePost);

router.use(authorization);
router.post("/new/post", postController.createPosts);
router.get("/all/user-post/:id", postController.getAllUsersPost);

module.exports = router;
