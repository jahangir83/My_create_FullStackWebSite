const Profile = require('../../model/profile')
const chalk= require('chalk')
const { post } = require('../routers/apiRoute')


exports.bookmarksGetControler = async (req, res, next) => {
    let { postId } = req.params 
    
    let bookmarks = null

    if (!req.user) {
        return res.status(400).json({
            error: 'You are not authenticat'
        })
    }
   
    try {
        let profile = await Profile.findOne({ user: req.user._id })
        // console.log(chalk.bgGreen('POSTID'), profile.bookmarks)
        if (profile.bookmarks.includes(postId)) {
            await Profile.findOneAndUpdate(
                { user: req.user._id },
                {$pull:{'bookmarks': postId}}
            )
            bookmarks = false
        } else {
            await Profile.findOneAndUpdate(
                { user: req.user._id },
                {$push:{'bookmarks': postId}}
            )
            bookmarks = true
            
        }
        res.status(200).json({
            bookmarks
        })
     }catch (e) {
        res.status(500).json({
            message: 'Sever Error'
        })
    }


}