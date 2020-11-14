const Post = require("../model/post")
const Flash = require('../utils/Flash')

exports.searchGetCntroler = async (req, res, next) => {
    let term = req.query.term
    let currentPage = parseInt(req.query.page) || 1
    let itemPerPage = 10
    
    console.log("Term===", term)   

    try { 

        let post = await Post.find({
            $text: {
                $search: term
            }
        })
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)
        
        let totalPost = await Post.countDocuments({
            $text: {
                $search: term
            }
        }); 
        console.log("Post==", post)
        console.log("TotalPost==", totalPost)
        
        let totalPage = totalPost / itemPerPage
        console.log("TatalPage==", totalPage)

        res.render('pages/explorer/search', {
            title: `Resut for - ${term}`,
            flashMessage: Flash.getMessage(req),
            searchTerm: term,
            itemPerPage,
            currentPage,
            totalPage,
            posts : post
        })

    } catch (e) {
        next(e)
    }
}