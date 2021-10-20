// const router = require('express').Router();
const User = require("../models/User");

exports.getUserProfile = (req, res, next)=>{
    
    // req.user.password = undefined;
    // req.user.password = undefined;
    const { body } = req;
    const user = new User({
        username: body.username,
        email: body.email,
        password: body.password,
        firstname: body.firstname,
        lastname: body.lastname,
        role: body.role,
    });
    user.password = undefined;
    res.status(200).json({
        status: 'success',
        data: user,
    })
}

//   await user.save();
//   user.password = undefined;


// module.exports  = router;