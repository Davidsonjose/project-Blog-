const express = require('express');

const {
  register,
  login,
  authorization,
} = require('../controller/authController');
const { getUserProfile } = require('../controller/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.use(authorization);
router.get('/profile', getUserProfile);

module.exports = router;