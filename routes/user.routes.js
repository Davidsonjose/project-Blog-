const router = require('express').Router();

const authController = require('../controller/authController');



router.post('/login', authController.login);
router.post('/register', authController.register);






module.exports = router;
























// // const { Router } = require('express');
// const { register, login } = require('../controller/authController');



// router.post('/register', register)
// router.post('/login', login)

// module.exports = router;


