const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('connect-flash')
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('config')

const {bindUserWithRequest} = require('./authMiddelewer')
const setLocals = require('./setLocal')


var store = new MongoDBStore({
  uri: config.get('db-url'),
    collection: 'Sessions',
    expires: 1000 * 60 * 60 * 24
});


const Middlewere = [
    cors(),
    morgan("dev"),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: config.get('secret'),
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    flash(),
    bindUserWithRequest(),
    setLocals(),
]

module.exports = app => {
    Middlewere.forEach(m => {
        app.use(m)
    })
}