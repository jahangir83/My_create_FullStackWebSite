const router = require('express').Router()

const { explorerControler, singleGetPostControler} = require('../controler/explorercontroler')

router.get('/', explorerControler)

router.get('/:postId',singleGetPostControler) 

module.exports = router