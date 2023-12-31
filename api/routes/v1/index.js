const express = require('express')
const router = express.Router()

const test = require('./test')
const users = require('./users')
const login = require('./login')
const candidates = require('./candidates')
const logout = require('./logout')
//For authorization
const dmz = require('./dmz')

router.all('*', dmz.enforce);
router.use('/test', test)
router.use('/user', users)
router.use('/login', login)
router.use('/candidates', candidates)
router.use('/logout', logout)

module.exports = router

