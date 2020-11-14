const { body } = require('express-validator')
const Profile = require('../../model/profile')
const validator = require('validator')


const linkValidat = value => {
    if (value) {
        if (!validator.isURL(value)) {
            throw new Error("Plese Provide Valid Url")
        }
       
    }
  return true   
}


module.exports = [

    body('name')
        .not().isEmpty().withMessage('Name Can Not Empty')
        .isLength({max: 50}).withMessage("Name is just 50 caracter number")
        .trim()
    ,
    body('title')
        .not().isEmpty().withMessage('Titile Cant Not Empty')
        .isLength({ max: 100 }).withMessage('Title Can Not Be More Than 100 Chars')
        .trim()
    ,
    body('bio')
        .not().isEmpty().withMessage('bio Cant Not Empty')
        .isLength({ max: 500 }).withMessage('bio Can Not Be More Than 500 Chars')
        .trim()
    ,
    body('website')
        .custom(linkValidat)
    ,
    body('facebook')
        .custom(linkValidat),
    
    body('twitter')
        .custom(linkValidat),
    
    body('github')
        .custom(linkValidat),
  

]

