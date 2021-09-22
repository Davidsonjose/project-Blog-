

const express = require('express'); //import express
const path = require('path');

const postRoutes =require('./routes/post.routes');
const homeRoutes = require('./routes/home.routes');

//initialize our app
const app = express();

//post middleware (responsible for handling post data)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//templating set up
app.set('views', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//static route middleware
app.use(express.static(path.join(__dirname, 'public'))); //static css/img/js
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



//routes middleware
app.use('/', homeRoutes);



//api response
app.get('/api/names', (req, res, next) => {
  res.status(200).json({
    names: ['Ejike', 'Chinedu', 'Smart'],
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`app is running on local://localhost:${PORT}`);
})





















// const express = require('express'); //import express
// const path= require('path');
// const app = express ();




// app.set('views', 'ejs')
// app.set('views', path.join(__dirname, 'views'))

// app.use(express.static(path.join(__dirname, 'public')))

//makes you view into the browser using /
//app.use(express.static(path.join(__dirname, 'the folder name')))

// app.get('/', (req, res, next)=>{
//   res.sendFile(path.join(__dirname, './views/index.ejs'))
// });
// app.get('/', (req, res, next)=>{
//   res.send('index.ejs', {
//     title: 'Home | Welcome',
//     description: 'Welcome to my home page',
//   });
// });



// app.get('/about', (req, res, next)=>{
//   res.send('about.ejs', {
//     title: 'About my app 👌',
//     description: 'A very cool application done by me',
//   })           
// });

// app.get('/', (req, res, next)=>{
//    res.render('index.ejs', {
//        title: 'Home | Welcome',
//        description: 'welcome to my home page'
//    });
// });

// app.get('/about-us', (req, res, next)=>{
//   res.render('about.ejs', {
//       title: 'About my app 👌',
//       description: ' a very cool application done by davidson'
//   });
// });


// app.get('/contact-us', (req, res, next)=>{
//   res.render('contact.ejs', {
//     title: 'contact me '
//   })
// });
// api response
// app.get('/api/names',(req,res, next)=>{
//   res.status(200).json({
//     names: ['Davidson', 'Jose', 'Ubong'], 
//   })
// } )



