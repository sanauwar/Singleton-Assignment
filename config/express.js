const express = require('express')
const app = express()
require('dotenv').config();
const bodyparser = require('body-parser')
const v1 = require('../api/routes/v1/index')

const port = process.env.port || 5000
app.use(bodyparser.json())

app.use('/v1', v1)


app.use((req, res, next) => {
    if (process.env.NODE_ENV == 'local') {
        console.log(`Routes not found ${req.path}`);
    }
    res.status(500).send({ msg: "Page not found" })
    next()
})

module.exports = { app, port };