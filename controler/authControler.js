
const bcrypt = require('bcrypt')
const User = require('../model/User')
const { validationResult } = require('express-validator')
const errorformater = require('../utils/validationErrorFormation')
const Flash = require('../utils/Flash')


exports.signupGetControler = (req, res, next) => {
   
    res.render('pages/auth/signup',
        {
            title: 'Create New Account',
            error: {},
            value: {},
            flashMessage: Flash.getMessage(req)
        })

}
 //----------------------------------------------------------//
exports.signupPostControler = async (req, res, next) => {

    let { username, password, email, confirmPassword } = req.body
    let values = {username, email, password, } 

    let Errors = validationResult(req).formatWith(errorformater)

   
    if (!Errors.isEmpty()) {
        req.flash('fail', 'Please Check Your Form')
        return res.render('pages/auth/signup',
            {
                title: 'Create New Account',
                error: Errors.mapped(),
                value: values,
                flashMessage: Flash.getMessage(req)
            })
    }


    try {
        let hashPassword = await bcrypt.hash(password, 11)
    
        let user = new User({
            username,
            email,
            password: hashPassword
        })

        await user.save()
        req.flash('success', 'User Created Successfylly')
        res.render('pages/auth/login',
            {
                title: 'Create New Account',
                error: {},
                value: {},
                flashMessage: Flash.getMessage(req)
            })
    } catch (e) {
        next(e)
    }

     
}
//---------------------------------------------------------------------//
exports.loginGetControler = (req, res, next) => {
    res.render('pages/auth/login',
        {
            title: 'Login Your Account',
            error: {},
            flashMessage: Flash.getMessage(req)
        })
  
}
//---------------------------------------------------------//
exports.loginPostControler = async (req, res, next) => {
    let { email, password } = req.body
    
    let Error = validationResult(req).formatWith(errorformater)

    if (!Error.isEmpty()) {
        req.flash('fail', 'Please Check Your Form')
        return res.render('pages/auth/login',
            {
                title: 'Login your Account',
                error: Error.mapped(),
                flashMessage: Flash.getMessage(req)
            })
    }
   
    try {
        let user = await User.findOne({ email })

       
        if (!user) {
            req.falsh('fail', 'Plese privide valid Credentials')
            return res.render('pages/auth/login',
            {
                title: 'Login your Account',
                error: {},
                flashMessage: Flash.getMessage(req)
            })
        }
       

        let match = await bcrypt.compare(password, user.password)

        if (!match) {
            req.flash('fail', 'Plese privide valid Credentials')
           return res.render('pages/auth/login',
            {
                title: 'Login your Account',
                error: {},
                flashMessage: Flash.getMessage(req)
            })
        }
        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err => {
            if (err) {
                return next(err)
            }
            req.flash('success', 'Successfully Login')
            res.redirect('/deshbord')
        })

    } catch (e) {
        next(e)
    }
}

exports.logoutControler = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
           return next(err)
        }
       
         return res.redirect('/auth/login', )
    })
}

exports.changePasswordGetControler = (req, res, next) => {

    res.render('pages/auth/changePassword', {
        title: 'Change Password',
        flashMessage: Flash.getMessage(req)
    })
}

exports.changePasswordPostControler = async (req, res, next) => {
    let { oldPassword, newPassword, confirmPassword } = req.body
   
    
    if (newPassword !== confirmPassword) {
        req.flash('fail', 'password dose not mathch')
       return res.redirect('/auth/change-password')
    }

    try {
        let mathc = await bcrypt.compare(oldPassword, req.user.password)
        if (!mathc) {
             req.flash('fail', 'Invalid password')
          return  res.redirect('/auth/change-password')

        }
        let hash = await bcrypt.hash(newPassword, 11)
        await User.findOneAndUpdate(
            { _id: req.user._id },
            {$set: {password: hash}}
        )
        req.flash('success', 'password update successfully')
        res.redirect('/auth/change-password')
    } catch (e) {
        next(e)
    }
}

