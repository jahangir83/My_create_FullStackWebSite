const { body } = require('express-validator')
const cheeario = require('cheerio')


const postValidator = [
    body('title')
        .not().isEmpty().withMessage("Title Can Not Be Empty")
        .isLength({ max: 100 }).withMessage('Title is can not be Greter then 100 chars')
    ,
    body('body')
        .not().isEmpty().withMessage('body can not be empty')
        .custom(value => {
            let node = cheeario.load(value)
            let text = node.text()

            if (text.lenght > 5000) {
                throw new Error('Body Can Not Be Greater Then 500 Chars')
            }
            return true
        })
]

module.exports = postValidator