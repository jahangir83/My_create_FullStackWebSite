// title, body, authore, tags, thumnail, readTime, likes, dislike, comments


const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')

// const comment = require('./Comment.js')

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    body: {
        type: String,
        required:true,
    },
    authore: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    tags: {
        type: [String],
        required: true
    },
    thumbnail: String,
    readTime: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
           ref: 'comment'
        }
    ]
}, { timestamps: true })

postSchema.index({
    tags:'text',
    title: 'text',
    body: 'text',
}, {
        weights: {
        title: 5,
        tags: 5,
        body: 2
    }
})

const Post = mongoose.model('post', postSchema)
module.exports = Post
