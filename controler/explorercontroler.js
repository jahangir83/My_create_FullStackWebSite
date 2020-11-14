
const  moment = require('moment')
const Flash = require('../utils/Flash')
const Post = require('../model/post')
const Profile = require('../model/profile')

function genDate(days) {
    let data = moment().subtract(days, 'days')
    return data.toDate()
}

function genaratFilterObject(filter) {
    let filterObj = {}
    let order = 1

    switch (filter) {
        case 'week': {
            filterObj= {
                createdAt: {
                    $gt: genDate(7)
                }
            }
            order = -1
            break
        }
        case 'month': {
            filterObj= {
                createdAt: {
                    $gt: genDate(30)
                }
            }
            order = - 1
            break
        }
        case 'all': {
            order = -1
            break
        }
    }
    return {
        filterObj,
        order
    }
}

exports.explorerControler = async (req, res, next) => {

    let filter = req.query.filter || 'latest'
    let itemParpage = 10
    let currentPage = parseInt(req.query.page) || 1

    let {order, filterObj } = genaratFilterObject(filter.toLowerCase())
    try { 
        let posts = await Post.find(filterObj)
            .populate('authore', 'username')
            .sort(order === 1 ? '-createdAt' : 'createdAt')
            .skip((itemParpage * currentPage) - itemParpage)
            .limit(itemParpage)
        
        let totalPost = await Post.countDocuments()
        let totalpage = totalPost / itemParpage
        
        let bookmarks = []

        if (req.user) {
            let profile = await Profile.findOne({ user: req.user._id })
            if (profile) {
                bookmarks = profile.bookmarks
            }
        }
        
        res.render('pages/explorer/explorer' ,{
            filter,
            title: 'Explores Page',
            flashMessage: Flash.getMessage(req),
            posts,
            itemParpage,
            currentPage,
            totalpage,
            bookmarks
        })
    } catch (e) {
        next(e)
    }


}
//-----------------------------------------------
exports.singleGetPostControler =async (req, res, next) => {
    let { postId } = req.params
   
 
    try { 
        let post = await Post.findById(postId)
            .populate('authore', 'username profilePic' )
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'username profilePic'
                }
            })
            .populate({ 
                path: 'comments',
                populate: {
                    path: 'replies.user',
                    select: 'usrename profilePic'
                }
            })
        //Check post Empty
        if (!post) {
            let error = new Error("404 Not Found")
            error.status = 404
            throw error
        }
        //Find Bookmarks array
        let bookmarks = []

        if (req.user) {
            let profile = await Profile.findOne({ user: req.user._id })
            if (profile) {
                bookmarks = profile.bookmarks
            }
        }
        res.render('pages/explorer/singleViwe', {
        title: post.title,
        post,
        flashMessage: Flash.getMessage(req),
        bookmarks

    })

        
    } catch (e) {
        next(e)
    }
    

    

   
}