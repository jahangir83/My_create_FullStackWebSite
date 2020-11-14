
const router = require('express').Router()
const { isAuthtenticat } = require('../../middlewere/authMiddelewer')

const { 
    postCommentContorl,
    repliePostComtrol,
    deletePostControler
} = require('../controlers/commrnt')

const { 
    likeGetControler,
    deslikesGetcontroler,
    
} = require('../controlers/likes_deslike')

const { bookmarksGetControler} = require('../controlers/bookmark')

router.post('/comment/:postId', isAuthtenticat, postCommentContorl)
router.post('/comment/replie/:commentId', isAuthtenticat, repliePostComtrol)

router.get('/likes/:postId', isAuthtenticat, likeGetControler)
router.get('/deslike/:postId', isAuthtenticat, deslikesGetcontroler)

router.get('/bookmarks/:postId', isAuthtenticat, bookmarksGetControler)
router.delete('/delete/:commentId', isAuthtenticat,deletePostControler )



module.exports = router