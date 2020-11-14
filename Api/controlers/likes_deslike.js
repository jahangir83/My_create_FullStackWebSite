
const Post = require('../../model/post')

exports.likeGetControler = async(req, res, next) => {

    let { postId } = req.params
    let liked = null


    if (!req.user) {
        return res.status(400).json({
            error: 'Your not authenticat user'
        })
    }
    let userId = req.user._id
    try {
        let post =await Post.findById(postId)
        if (post.dislikes.includes(userId)) {
            await Post.findOneAndUpdate(
                { _id: postId },
                {$pull:{'dislikes': userId}}
            )
        }

        if (post.likes.includes(userId)) {
            await Post.findOneAndUpdate(
                { _id: postId },
                {$pull:{'likes': userId}}
            )
            liked = false
        } else {
            await Post.findOneAndUpdate(
                { _id: postId },
                {$push: {'likes': userId}}
            )
            liked =  true
        }
        let updatePost = await Post.findById(postId)

        res.status(200).json({
            liked,
            totalLike: updatePost.likes.length,
            totalDislike: updatePost.dislikes.length
        })
     } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'Server Occre Error'
        })
    }

}

exports.deslikesGetcontroler = async (req, res, next) => {
    let { postId } = req.params

    let desLiked = null

    if (!req.user) {
        return res.status(400).json({
            error : 'your are not authenticat user'
        })
    }
    let userId = req.user._id
    try {
        let post = await Post.findById(postId)
        if (post.likes.includes(userId)) {
            await Post.findOneAndUpdate(
                { _id: postId },
                {$pull:{'likes': userId}}
            )
        }

        if (post.dislikes.includes(userId)) {
            await Post.findOneAndUpdate(
                { _id: postId },
                {$pull:{'dislikes': userId}}
            )
            desLiked = false
        } else {
            await Post.findOneAndUpdate(
                { _id: postId },
                {$push: {'dislikes': userId}}
            ) 
            desLiked  = true
        }

        let upsatePost = await Post.findById(postId)
        res.status(200).json({
            desLiked,
            totalLike: upsatePost.likes.length,
            totalDislike: upsatePost.dislikes.length
        })


     }  catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'Server Occre Error'
        })
    }
}