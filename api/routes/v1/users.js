const express = require('express')
const router = express.Router();

router.post('/register', (req, res) => {
    res.send({
        data: req.body,
        message: "User Signup"
    })
})

router.get('/login', (req, res) => {
    res.send({
        data: req.body,
        message: "User Login"
    })
})



module.exports = router;