const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send({
        data: {
            name: "test"
        },
        message: "Testing"
    })
})

router.post('/', (req, res) => {
    res.send({
        data: req.body,
        message: "Request body Testing"
    })
})


module.exports = router;