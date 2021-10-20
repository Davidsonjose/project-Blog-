const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require("../models/User");
const { default: ApiError } = require('../utils/errorHandler');
const signToken = (id)=> 
    jwt.sign({ id: id },
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRES_IN});
exports.register = async (req, res, next) => {
  try {
    const { body } = req;
    const emailExist = await User.findOne({ email: body.email });
    if (emailExist) {
      return next(new Error(`${body.email} is taken`));
    }
    const usernameExist = await User.findOne({ username: body.username });
    if (usernameExist) {
      return next(new Error('username is taken'));
    }
    const user = new User({
      username: body.username,
      email: body.email,
      password: body.password,
      firstname: body.firstname,
      lastname: body.lastname,
      role: body.role,
    });

    await user.save();
    user.password = undefined;
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next (new Error(error));
  }
};

//authentication
exports.login = async (req, res, next) => {
  try {
    const { body } = req;
    const user= await User.findOne({email: body.email});
    if (!user) {
      return next(new Error(`${body.email} does not exist`, 404));
    }
    const username = await User.findOne({username: body.username});
    const comparePassword = await user.comparePassword(
      body.password,
      user.password
      );
      
      if (!comparePassword || !username) {
          return next(new Error("incorrect username or password", 404));
        }
        
        //  user.password = undefined;
        //  await user.save();
    user.password = undefined;
    let token = signToken(user._id);  
    res.status(200).json({
      status: "success",
      data: user,
      token,
    });
  } catch (error) {
    next (new Error(error));
  }
};

exports.authorization = async(req, res, next)=>{
        try {
            let token;
            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith('Bearer')
            ) {
                token = req.headers.authorization.split(' ')[1];
            }
            if (!token) {
                return next(new Error('please login to view this resource'))
            }
            let decoded = await jwt.verify(token, process.env.JWT_SECRET);
            
            const currentUser = await User.findById({_id: decoded.id})
            if (!currentUser) {
                return next(new ApiError('user does not exist'))
            }
            res.status(200).json({
                status: 'success',
                currentUser,
            })

        } catch (error) {
           next (new Error(error));
        } 
}










// const username = await  User.findOne({username: body.username});
//  const email = await User.findOne({email: body.email});
// if ( !comparePassword) {
//     return next(new Error('incorrect username or password'));
// }
//  if (!email) {
//      return next(new Error(`${body.email} does not exist`))
//  }

// const User = require('../models/User');

// exports.register= (req, res, next)=>{
//     res.status(201).json({
//         status: 'success',
//     })
// }

// exports.login = (req, res, next)=>{
//     res.status(201).json({
//         status: 'success',
//     })
// }
