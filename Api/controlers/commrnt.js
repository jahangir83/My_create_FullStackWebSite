const User = require('../../model/User')
const Post =  require('../../model/post')
const Comment = require('../../model/Comment')

exports.postCommentContorl = async (req, res, next) => {
    let {postId} = req.params
    let {body} = req.body
  

    if (!req.user) {
        return res.status(400).json({
            error: 'You are not authenticat user'
        })
    }

    let commentt = new Comment({
        post: postId,
        user: req.user._id,
        body,
        replies:[]
    })

    try {
        let createComment = await commentt.save()

     await Post.findOneAndUpdate(
        { _id: postId },
        {$push:{ 'comments': createComment._id}}
    )

    let commentJoson = await Comment.findById(createComment._id).populate({
        path: 'user',
        select:'profilePic username email'
    })
        
        
        return res.status(201).json(
        commentJoson
    )
        
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: 'Server Error Occure'  
        })
    }
}
// Reply controler
exports.repliePostComtrol = async (req, res, next) => {
    let { commentId } = req.params
    let { body } = req.body

    if (!req.user) {
        return res.status(400).json({
            error: 'your are not authenticat'
        })
    }

    let reply = {
        body,
        user: req.user._id
    }
    try {
         await Comment.findOneAndUpdate(
            { _id: commentId },
            {$push: {'replies': reply}}
        )
        res.status(201).json({
            ...reply,
            profilePic: req.user.profilePic
        })
     } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'Server Occure Error'
        })
    }
}

exports.deletePostControler = async (req, res, next) => {
    let commentId  = req.params.commentId
    console.log("commentId==", commentId)

    try {
        let coment = await Comment.findByIdAndRemove(commentId)
        console.log("jahagnri== ",coment)
        
        res.status(200).json(coment)
    } catch (e) {
        next(e)
    }


}