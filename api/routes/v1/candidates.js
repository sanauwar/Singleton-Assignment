const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require("../../../config/database");

console.log('oooooo');
router.get('/', async (req, res) => {
    try {
        // const user = await knex("andidates");

        res.status(200).send({
            data: [],
            message: "Welcome to Candidate Page"
        })

    } catch (error) {
        res.status(500).send({
            message: "Error inserting user data"
        })
    }

});


module.exports = router;