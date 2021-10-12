const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
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
      password:{
          type: String,
          required:[true, 'please input your password'],
          min: 8,
          max: 16,
      },
      passwordChangedAt: Date,



}, {timestamps: true});

const User = mongoose.model('user', UserSchema);

module.exports = User;