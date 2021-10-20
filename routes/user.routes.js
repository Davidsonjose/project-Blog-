const router = require('express').Router();

const {authorization, login, register} = require('../controller/authController');
const{getUserProfile} = require('../controller/UserController');


router.post('/login', login);
router.post('/register', register);
router.get('/profile', getUserProfile);

router.use(authorization);  
// router.get('/profile', getUserProfile);
// router.get('/profile', getUserProfile);




module.exports = router;
























// // const { Router } = require('express');
// const { register, login } = require('../controller/authController');



// router.post('/register', register)
// router.post('/login', login)

// module.exports = router;


