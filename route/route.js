const authRoute = require('./authRouter')
const deshbordRoute = require('./deshbordRoute')
const play = require('../playground/play')
const uploadRoute = require('./uploadRoute')
const PostRoute = require('./postRouter')
const exploerRoute = require('./explorerRouter')
const searchRouter = require('./searchRouter')
const authoreRouter = require('./authoreRouter')


const apiRoute = require('../Api/routers/apiRoute')

const route = [
    {
        path: '/auth',
        hendler: authRoute
    },
    {
        path: '/deshbord',
        hendler:deshbordRoute
    },
    {
        path: '/playground',
        hendler: play
    },
    {
        path: "/upload",
    hendler: uploadRoute
    },
    {
        path: '/posts',
        hendler: PostRoute
    },
    {
        path: '/explorer',
        hendler:exploerRoute
    },
    {
        path: '/search',
        hendler: searchRouter
    },
    {
        path: '/authore',
        hendler: authoreRouter
    },
    {
        path: '/api',
        hendler: apiRoute
    },
    {
    path: '/',
        hendler: (req, res) => {
        res.json({
            message:"Hello word"
        })
    }
    },
    
    
]

module.exports = app => {
    route.forEach(r => {
        if (r.path == '/') {
            app.get(r.path, r.hendler)
        } else {
            app.use(r.path, r.hendler)
        }
    })
}
