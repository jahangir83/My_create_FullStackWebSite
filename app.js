
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const config = require('config')
const morgan = require('morgan')
//Import Mioddlewer 
const setAllMiddlewere = require('./middlewere/middlewers')
//Import Router
const setallRoute = require('./route/route')
const compression = require('compression')

//Import Middlewer


//playground route
// const play = require('./playground/play')

const app = express()
app.use(morgan('dev'))
//Views engine setup
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(compression())

app.use('/public', express.static( 'public'))
//use Middlewere Array
setAllMiddlewere(app)

//All Router use
setallRoute(app) 

app.use((req, res, next) => {
    let error = new Error('404 Not Found')
    console.log(error.message)
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status == 404) {
        res.render('pages/error/404', { title:'404 Not Found', flashMessage: {}})
    }
    console.log(chalk.white.bgRed.inverse(error.message))
    console.log(error) 
    res.render('pages/error/500', { title: 'Internal Server Error', flashMessage: {}})
}) 

app.get("*", (req, res) => {
    
})



const PORT = process.env.PORT || 3000
mongoose.connect(config.get('db-url'), { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify: true })
    .then(() => {
        console.log(chalk.black.bgGreen(`Database connected`))

        app.listen(PORT, () => {
            console.log(chalk.black.bgGreen(`Server is runnit ${PORT}`));
        })
    })
    .catch(e => {
        return console.log(e)
    })
