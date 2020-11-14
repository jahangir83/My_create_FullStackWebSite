
const fs = require('fs')
const User = require('../model/User')
const Profile = require('../model/profile')
const e = require('express')

exports.uploadPostControler = async (req, res, next) => {
    if (req.file) {
        try { 
            let oldProfilePis = req.user.profilePic
            let profile = await Profile.findOne({ user: req.user._id })
            let profilePic = `/public/uploads/${req.file.filename}`
            if (profile) {
               await Profile.findOneAndUpdate(
                    { user: req.user._id },
                    {$set:{profilePic}}
                )
            } 
            await User.findOneAndUpdate(
                    { _id: req.user._id },
                    {$set:{profilePic}}
            )
             if (oldProfilePis !== '/public/uploads/defult.jpg') {
                 fs.unlink(`./${oldProfilePis}`, (er) => {
                    console.log(er);
                })
            }
                res.status(500).json({
                    profilePic
                })
            
           

        } catch (e) {
            res.status(500).json({
                profilePic: req.user.profilePic
            })
        }
    } else {
        res.status(500).json({
            profilePic: req.user.profilePic
        })
    }
}

exports.deleteProfilePics =  (req, res, next) => {
 
    try {
        let defaultprofile = '/public/uploads/defult.jpg'
        let currentProfilePics = req.user.profilePic
        console.log(currentProfilePics)
        fs.unlink(`./${currentProfilePics}`, async (err) => { console.log(err)

            let profile = await Profile.findOne({ user: req.user._id })
           
           if (profile) {
               await Profile.findOneAndUpdate(
                    { user: req.user._id },
                    {$set:{profilePic: defaultprofile}}
                )
            } 
                await User.findOneAndUpdate(
                { _id: req.user._id },
                    {
                        $set: { profilePic: defaultprofile }
                    }
            )
            

            
            })
       
            res.status(200).json({
                profilePic: defaultprofile
            })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message:"Can not Romove Profile pics"
        })
    }
    
}

exports.postImageUploadControler = (req, res) => {
    if (req.file) {
        return res.status(200).json({
            imgUrl: `/public/uploads/${req.file.filename}`
        })
    }

    return res.status(500).json({
        message: 'server Error'
    })
    
}