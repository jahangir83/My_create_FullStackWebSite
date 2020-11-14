const router = require('express').Router()

const { searchGetCntroler } = require('../controler/SearchControler')

router.get('/', searchGetCntroler)


module.exports = router

