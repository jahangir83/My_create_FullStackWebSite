
const User = require('../../model/User')
const { body} = require('express-validator')


const signuvalidator = [
    body('username')
        .isLength({ min: 2, max: 15 }).withMessage('Username Must Be Between 2 to 15 chars')
        .custom(async username => {
            let user = await User.findOne({ username })
            if (user) {
                return Promise.reject('username Alredy used')
            }
        })
        .trim()
    ,
    body('email')
        .isEmail().withMessage('Please provide A Valid Email')
        .custom(async email => {
            let user = await User.findOne({ email })
            if (user) {
                return Promise.reject('Email Alredy Used')
            }
        })
        .normalizeEmail()
    ,
    body('password')
        .isLength({min:5 }).withMessage('Your Must Be 5 Chars Password')
    ,
    body('confirmPassword')
        .custom((confirmPass, { req }) => {
            if (confirmPass !== req.body.password) {
                throw new Error('password not match')
            }
            return true
        })
        .isLength({min:5 }).withMessage('Your Must Be 5 Chars Password')
]
module.exports = signuvalidator