const express = require('express')
const router = express.Router()

const test = require('./test')
const users = require('./users')
const login = require('./login')
//For authorization
const dmz = require('./dmz')

router.all('*', dmz.enforce);
router.use('/test', test)
router.use('/user', users)
router.use('/login', login)

module.exports = router

