


const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index.ejs', {
    title: 'Home | welcome',
    server_url: req.server_url, 
  });
});
router.get('/login', (req, res, next)=>{
  res.render('login.ejs',{
    title: 'Login Page',
    server_url: req.server_url, 
  });
});
router.get('/sign-up', (req, res, next)=>{
  res.render('sign-up.ejs',{
    title: 'Sign-up',
    server_url: req.server_url, 
  });
});


router.get('/about-us', (req, res, next) => {
  res.render('about.ejs', {
    title: 'About my app 🗣',
    description: 'A very smooth application done by me',
    server_url: req.server_url, 
  });
});

router.get('/contact-us', (req, res, next) => {
  res.render('contact.ejs', {
    title: 'contact us',
    server_url: req.server_url, 
  });
});

router.post('/contact-us', (req, res, next) => {
    res.send(req.body);
});

router.post('/description', (req, res, next) => {
   res.redirect('/');
});

module.exports = router;
