const router = require('express').Router()

const {authoreGetControler} = require("../controler/authoreControler")

router.get('/:userId', authoreGetControler)


module.exports = router