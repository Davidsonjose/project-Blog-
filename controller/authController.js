const User = require('../models/User');


exports.register = async(req, res, next)=>{
    try {
        const { body } = req;
        
        const emailExist = await User.findOne({email: body.email});
        if (emailExist) {
            return next('Email address exist');
        }
        const usernameExist = await User.findOne({username: body.username});
        if (usernameExist) {
            return next('username has been taken');
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
        res.status(201).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        next(error)
    }
}


exports.login = (req, res, next)=>{
    res.status(201).json({
        status: 'success',

    })
}
























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

