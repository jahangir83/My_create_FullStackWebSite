
const User = require('../model/User')

const Flash = require('../utils/Flash')
exports.authoreGetControler = async (req, res, next) => {
    let userId = req.params.userId

    
    try { 
        let author = await User.findById(userId)
            .populate({
                path: 'profile',
                populate: {
                    path: 'posts'
                }
            })
        
    

        res.render('pages/explorer/authore', {
        title: 'jast now',
            flashMessage: Flash.getMessage(req),
        authore: author
        
    })

    } catch (e) {
        next(e)
    }
    
    
}