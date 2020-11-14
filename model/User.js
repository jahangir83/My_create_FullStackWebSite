
const { Schema, model } = require('mongoose')
// const profil = require('./profile')

//Name , Email , Password, and Profile

const userShchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 15
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref:'profile'
    },
    profilePic: {
        type: String,
        default: '/public/uploads/defult.jpg'
    }
}, {timestamps: true})

const User = model('User', userShchema)
module.exports = User