
const { validationResult } = require('express-validator')
const Flash = require('../utils/Flash')
const Profile = require('../model/profile')
const formater = require('../utils/validationErrorFormation')
const User = require('../model/User')
const Comment = require('../model/Comment')

exports.deshbordGetCotroler = async (req, res, next) => {

    try {
        let profile = await Profile.findOne({ user: req.user._id })

        if (profile) {
            return  res.render('../views/pages/deshbord/deshbord',
                {
                    title: 'My Deshboard',
                    flashMessage: Flash.getMessage(req)
                    
                })
        }

        res.redirect('/deshbord/create-profile')
        
    } catch (e) {
        next(e)
    }

  
}

exports.createGetControler = async (req, res, next) => {

    try { 
        let profil = await Profile.findOne({ user: req.user._id })
        if (profil) {
           return res.redirect('/deshbord/edit-profile')
        }
        res.render('pages/deshbord/create-profile',
            {
                title: " Create Your Profile",
                flashMessage: Flash.getMessage(req),
                 error: {}
            })
    } catch (e) {
        next(e)
    }
}

exports.createPostcontroler = async (req, res, next) => {
    let errors = validationResult(req).formatWith(formater)
    if (!errors.isEmpty()) {
          return res.render('pages/deshbord/create-profile',
            {
                title: " Create Your Profile",
                flashMessage: Flash.getMessage(req),
                error: errors.mapped()
            })
    }
    //
    let {
        name,
        title,
        bio,
        website,
        facebook,
        twitter,
        github
    } = req.body

    let profilePics = req.user.profilePics
    let posts = []
    let bookmarks = []

    try {
        let profile = new Profile({
            user: req.user._id,
            name,
            title,
            bio,
            profilePics: profilePics,
            links: {
                website: website || '',
                facebook: facebook || '',
                twitter: twitter || '',
                github: github || ''
            },
            posts: [],
            bookmarks:[]
        })

        let createprofile = await profile.save()

        await User.findOneAndUpdate(
            { _id: req.user._id },
            {$set: {profile: createprofile._id}}
        )

        req.flash('success', 'Successfully createProfile')
        res.redirect('/deshbord')

    } catch (e) {
        console.log(e)
        next(e)
    }

    //
      

 
}

exports.editGetcontroler =async (req, res, next) => {
    
    try {
        let profile =await Profile.findOne({ user: req.user._id })
        
        if (!profile) {
          return  res.redirect('/deshbord/create-profile')
        }

        res.render('pages/deshbord/edit-profile', {
            title: 'Edit Your Profile',
            error: {},
            flashMessage: Flash.getMessage(req),
            profile
        })

    } catch (e) {
        next(e)
    }
}

exports.editPostcontroler = async (req, res, next) => {
    let errorss = validationResult(req).formatWith(formater)
    
    let { 
        name,
        title,
        bio,
        website,
        facebook,
        twitter,
        github
    } = req.body
    

    
        if (!errorss.isEmpty()) {
            return res.render('pages/deshbord/edit-profile', {
                title: 'Create Your Profile ',
                flashMessage: Flash.getMessage(req),
                error: errorss.mapped(),
                profile: {
                    name,
                    title,
                    bio,
                    links: {
                        website,
                        facebook,
                        twitter,
                        github
                    }
                }
            })
        }
    try { 

        let profile={
            name,
            bio,
            title,
            links: {
                website: website || '',
                facebook: facebook || '',
                twitter: twitter || '',
                github: github || ''
            }
        }

        let updateProfile = await Profile.findOneAndUpdate(
            { user: req.user._id },
            { $set: profile},
            {new: true}
        )
        
        req.flash('success', 'Profile Update Success')
         res.render('pages/deshbord/edit-profile', {
            title: 'Edit Your Profile',
            error: {},
            flashMessage: Flash.getMessage(req),
            profile: updateProfile
        })

    } catch (e) {
        next(e)
    }

}
exports.bookmarksGetControler = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({ user: req.user._id })
            .populate({
                path: 'bookmarks',

                select:'title thumbnail'
            })
      
         res.render('pages/deshbord/bookmarks', {
            title: 'Bookmark ',
            flashMessage: Flash.getMessage(req),
            posts: profile.bookmarks
        })
        

    } catch (e) {
        next(e)
    }
}

exports.commentGetControler = async (req, res, next) => {
    
    try { 
        
        let profile = await Profile.findOne({ user: req.user._id })
        let comment = await Comment.find({post: {$in: profile.posts }})
            .populate({
                path: 'post',
                select: 'title'
            })
            .populate({
                path: 'user',
                select: 'username profilePic'
            })
            .populate({
                path: 'replies.user',
                select: 'username  profilePic'
            })
        res.render('pages/deshbord/comment', {
            title: 'Comment Page',
            flashMessage: Flash.getMessage(req),
            comments: comment
        })
    } catch (e) {
        next(e) 
    }
}