
// users, title, bio, profilePicture, likes: {fb, twi}, posts, bookmarks

const { Schema, model } = require('mongoose')


const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usre',
        required:true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    bio: {
        type: String,
        trim: true,
        required: true,
        maxlength: 500
    },
    profilePic: {
        type: String
    },
    links: {
        website: String,
        facebook: String,
        twitter: String,
        github: String
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
}, {timestamps: true})

const Profile = model('profile', profileSchema)
module.exports = Profile