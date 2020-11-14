
const User = require('../model/User')


exports.bindUserWithRequest =  () => {
    return async (req, res, next) => {
        if (!req.session.isLoggedIn) {
            return next()
        }

        try {
            let user = await User.findById(req.session.user._id)
            req.user = user
            next()
           
        } catch (e) {
            console.log(e)
            next(e)
       }
    }
}
//
exports.isAuthtenticat = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/auth/login')
    }
    next()
}

exports.isUnAutenticate = (req, res, next) => {
     if (req.session.isLoggedIn) {
        res.redirect("/deshbord")
    } 
    next()
}