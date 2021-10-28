

const express = require('express'); //import express
const path = require('path');
const mongoose = require('mongoose');
const postRoutes =require('./routes/post.routes');
const userRoutes =require('./routes/user.routes');
const categoryRoutes =require('./routes/category.routes');








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
app.use('/api/category', categoryRoutes );



//api response
app.get('/api/names', (req, res, next) => {
  res.status(200).json({
    names: ['Ejike', 'Chinedu', 'Smart'],
    
  });
});


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



