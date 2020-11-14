const express = require('express')
const router = express.Router()
const { isAuthtenticat } = require('../middlewere/authMiddelewer')

const profileValidator = require('../validator/desbordValidtor/profileValidator')

const {
    deshbordGetCotroler,
    createGetControler,
    createPostcontroler,
    editGetcontroler,
    editPostcontroler,
    bookmarksGetControler,
    commentGetControler
    } = require('../controler/deshbordControler')


router.get('/create-profile'  ,isAuthtenticat, createGetControler )
router.post('/create-profile', isAuthtenticat, profileValidator, createPostcontroler)

router.get('/comment', isAuthtenticat, commentGetControler)


router.get('/bookmark', isAuthtenticat, bookmarksGetControler)

router.get('/edit-profile',isAuthtenticat, editGetcontroler)
router.post('/edit-profile', isAuthtenticat, profileValidator, editPostcontroler)
router.post('/edit-profile', isAuthtenticat, profileValidator, editPostcontroler)

router.get('/', isAuthtenticat, deshbordGetCotroler)


module.exports = router