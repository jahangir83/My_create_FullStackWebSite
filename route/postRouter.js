const route = require('express').Router()

const { createPOSTGetControler,
    createPOSTPostControler,
    editPostgetControler,
    updatePost,
    postDelete,
    postAllGetControler
} = require('../controler/postControler')
const upload = require('../middlewere/uploadMiddlewere')

const postValidator = require('../validator/desbordValidtor/post/postValidator')
const { isAuthtenticat} = require('../middlewere/authMiddelewer')
const { validationResult } = require('express-validator')

route.get("/create",isAuthtenticat, createPOSTGetControler)
route.post("/create", isAuthtenticat, upload.single('post-thumbnail'), postValidator, createPOSTPostControler)

route.get('/edit/:postId', isAuthtenticat, editPostgetControler)
route.post('/edit/:postId', isAuthtenticat, upload.single('post-thumbnail'), postValidator, updatePost)

route.get('/delete/:postId', isAuthtenticat, postDelete)

route.get('/', isAuthtenticat, postAllGetControler)



module.exports = route