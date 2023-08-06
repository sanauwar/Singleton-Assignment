const express = require('express')
const router = express.Router();
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require("../../../config/database");

router.post('/', async (req, res) => {
    const blacklist = new Set();
    try {

        const token = req.headers["x-access-token"];

        // Check if token exists
        if (!token) {
            return res.status(401).json({ error: 'Token not found' });
        }
        blacklist.add(token);

        res.send({
            message: 'Logged out successfully',
            data: newtoken
        });

    } catch (error) {
        res.status(500).send({
            message: "User logout successfully"
        })
    }

});





module.exports = router;