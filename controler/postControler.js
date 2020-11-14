
const { validationResult } = require('express-validator')
const formater = require('../utils/validationErrorFormation')
const Flash = require('../utils/Flash')
const readintime = require('reading-time')
const Post = require('../model/post')
const Profile = require('../model/profile')


exports.createPOSTGetControler = (req, res, next) => {
    res.render('pages/deshbord/post/createPost', {
        title: "Create Post Title",
        error: {},
        flashMessage: Flash.getMessage(req),
        value: {}
    })
}

exports.createPOSTPostControler = async (req, res, next) => {
    
    let { title, body, tags} = req.body
//Error Hendle Start
    let error = validationResult(req).formatWith(formater)
    if (!error.isEmpty()) {
        return res.render('pages/deshbord/post/createPost', {
        title: "Create Post Title",
        error: error.mapped(),
            flashMessage: Flash.getMessage(req),
            value :{
                title, 
                body,
                tags
        }
    })
    }
//Error Hendle End

    if (tags) {
        tags = tags.split(',') 
        tags = tags.map(t => t.trim())
    }
    let readtime = readintime(body).text

    let post = await new Post({
        title,
        body,
        tags,
        authore: req.user._id,
        thumbnail:'',
        readTime: readtime,
        likes: [],
        dislikes: [],
        comments:[]
    })

    if (req.file) {
        post.thumbnail = `/public/uploads/${req.file.filename}`
    }

    try { 
        let createPost = await post.save()

        await Profile.findOneAndUpdate(
            { user: req.user._id },
            {$push:{'posts': createPost._id}}
        )
        req.flash('success', 'Successfully create Post ')
        res.redirect( `/posts/edit/${createPost._id}`)

       

    } catch (e) {
        next(e)
    }



    
}

//

exports.editPostgetControler = async (req, res, next) => {
    let postId = req.params.postId
    
    try {
        let post = await Post.findOne({ authore: req.user._id, _id: postId })
        if (!post) {
            let error = new Error("404 Not Found")
            error.status = 400
            throw error
        }

        res.render('pages/deshbord/post/editPost', {
            title: 'Edit Your Post',
            error: {},
            flashMessage: Flash.getMessage(req),
            post
        })

    } catch (e) {
        next(e)
    }
}

exports.updatePost = async (req, res, next) => {

    let postId = req.params.postId
    let { title, body, tags,} = req.body

    let error = validationResult(req).formatWith(formater)
    try {
        let post = await Post.findOne({ authore: req.user._id, _id: postId })
        if (!post) {
            let error = new Error("404 Not Found")
            error.status = 404
            throw error 
        }

        if (!error.isEmpty()) {
            res.render('pages/deshbord/post/createPost', {
                title: "Update Post",
                error: error.mapped(),
                flashMessage: Flash.getMessage(req),
                post
            })
        }

        if (tags) {
            tags = tags.split(',')
            tags = tags.map( t => t.trim())
        }

        let thumbnail = post.thumbnail
        if (req.file) {
            thumbnail =  req.file.filename
        }
        await Post.findOneAndUpdate(
            { _id: post._id },
            { $set: { title, body, tags, thumbnail } },
            {new: true}
        )

        req.flash('success', 'Update Successfully')
         res.redirect( `/posts/edit/${post._id}`)
        
    } catch (e) {
        next(e)
    }
}

exports.postDelete = async (req, res, next) => {
    let { postId } = req.params
    try { 
        let post = await Post.findOne({ authore: req.user._id, _id: postId })
        if (!post) {
            let error = new Error('404 not found')
            error.status = 404
            throw error
        }
        await Post.findOneAndDelete({ _id: post._id })
        await Profile.findOneAndUpdate(
            { authore: req.user._id, _id: postId },
            {$pull:{'posts': postId}}
        )
        req.flash('success', 'Delete Successfully')
        res.redirect('/posts')
    }catch(r){next(e)}

}
//All post
exports.postAllGetControler = async (req, res, next) => {

    try { 
        let posts = await Post.find({ authore: req.user._id })
        res.render("pages/deshbord/post/posts", {
            title: 'Your All Create Post',
            posts,
            flashMessage: Flash.getMessage(req)
        })
    }catch(e){next(e)}
}

exports.jahangir = (req, res, next) => {
    postI
}