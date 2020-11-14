const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const upload = require('../middlewere/uploadMiddlewere')

const Flash = require('../utils/Flash')

router.get('/play', (req, res, next) => {
    console.log(Flash.getMessage(req))
    res.render('pages/playgrounds/play', { title: 'Create New Account', flashMessage: {}})
})

router.post('/play', upload.single('my-file'), (req, res, next) => {
    if (req.file) {
        console.log(req.file)
    }
     res.redirect('/playground/play')
})

module.exports = router