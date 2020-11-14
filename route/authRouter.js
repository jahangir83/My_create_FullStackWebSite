const router = require('express').Router()
const signuvalidator = require('../validator/auth/signupValid')
const loginValid = require('../validator/auth/loginValid')
const {
    signupGetControler,
    signupPostControler,
    loginGetControler,
    loginPostControler,
    logoutControler,
    changePasswordGetControler,
    changePasswordPostControler
} = require('../controler/authControler')
const {isUnAutenticate, isAuthtenticat } = require('../middlewere/authMiddelewer')


router.get('/signup',isUnAutenticate , signupGetControler)
router.post('/signup',isUnAutenticate , signuvalidator, signupPostControler)

router.get('/login',isUnAutenticate , loginGetControler)
router.post('/login', isUnAutenticate, loginValid, loginPostControler)

router.get('/change-password', isAuthtenticat, changePasswordGetControler)
router.post('/change-password', isAuthtenticat, changePasswordPostControler)

router.get('/logout', logoutControler)

module.exports = router