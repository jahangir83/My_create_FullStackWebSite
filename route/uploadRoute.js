const router = require('express').Router()
const { isAuthtenticat } = require('../middlewere/authMiddelewer')
const upload = require('../middlewere/uploadMiddlewere')
const { uploadPostControler,
    deleteProfilePics,
    postImageUploadControler
} = require('../controler/uploadControl')



router.post('/profilePica', isAuthtenticat, upload.single('profilePics'), uploadPostControler)

router.delete('/profilepics', isAuthtenticat, deleteProfilePics)

router.post('/postimage', isAuthtenticat, upload.single('post-image'), postImageUploadControler)

module.exports = router