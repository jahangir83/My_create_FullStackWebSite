//post, user , body, repliese

const { Schema, model } = require('mongoose')



const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post',
        
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    replies: [
        {
            body: {
                type: String,
                required:true
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required:true
            },
            createAt: {
                type: Date,
                dufult: new Date()
            }
        }
    ]
}, { timestamps: true })

const Comment = model('comment', commentSchema)
module.exports = Comment
