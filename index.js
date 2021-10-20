

const express = require('express'); //import express
const path = require('path');
const mongoose = require('mongoose');
const postRoutes =require('./routes/post.routes');
const userRoutes =require('./routes/user.routes');
// const appRoutes = require('./routes/app.routes');
const Post = require('./models/Post');








//initialize our app
const app = express();

//post middleware (responsible for handling post data)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//static route middleware
app.use('/upload', express.static(path.join(__dirname, 'upload')));

//global variable
app.use((req, res, next)=>{
  req.server_url = 'http://localhost:5000/'   
       return next();
})

//routes middleware
// app.use('/', appRoutes);
app.use('/api/post', postRoutes );
app.use('/api/user', userRoutes );



//api response
app.get('/api/names', (req, res, next) => {
  res.status(200).json({
    names: ['Ejike', 'Chinedu', 'Smart'],
    
  });
});


// app.get('/api/title', async(req, res, next)=>{
//   const posts= await Post.find();
//   res.status(200).json({
//     status: 'success',
//     title: 'Posts-' + posts.title,

//   })
// })

//global error handler 
app.use((err, req, res, next)=>{
    err.statusCode= err.statusCode || 500
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        data: err.message,
        stack: err.stack,
    })
})


app.all('*', (req, res, next)=>{
       return next(new Error('app route not found'))
});



mongoose.connect('mongodb://localhost:27017/media',{
  useNewUrlParser: true,
  // useCreateIndex: false
})
.then(()=>{
  console.log('database is connected');
})
.catch((err)=>{
  console.log(err);
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



