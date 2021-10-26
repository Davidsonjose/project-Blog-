const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        trim:  true,
        required: [true, 'please input you firstname'],
    },

    lastname:{
        type: String,
        trim: true,
        required: [true, 'please write your lastname'],
    },

    username:{
        type: String,
        trim: true,
        unique: [true, 'username has already be taken'],
        required: [true, 'please input a username'],

    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'email has already be taken'],
        required: [true, 'please input your email'],
    },
      role: {
          type: String,
          enum: ['user', 'admin'],
          default: 'user',
      }, 
      profile_img: String,
      password:{
          type: String,
          required:[true, 'please input your password'],
          min: 8,
          max: 16,
      },
      passwordChangedAt: Date,


      
    }, {timestamps: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true },
});
    userSchema.pre('save', async function (next) {
        this.password= await bcryptjs.hash(this.password, 10);
        return next();
    })
 /**
  * 
  * @param {string} inputPassword: req.body password
  * @param {string} userPassword: user instance password
  * @returns {boolean}: true if password is correct, false if not 
  */

userSchema.methods.comparePassword = async function (
    inputPassword, 
    userPassword
    ) {
    return bcryptjs.compare(inputPassword, userPassword);
}
//pre save middleware

const User = mongoose.model('User', userSchema);


module.exports = User;