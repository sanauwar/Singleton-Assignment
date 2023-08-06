const express = require('express')
const router = express.Router();
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require("../../../config/database");

router.post('/register', async (req, res) => {
    try {
        const body = req.body;
        body.password = await bcrypt.hash(req.body.password, 10);
        const [insertedId] = await knex("user_t").insert(body);
        const userData = await knex("user_t").where("id", insertedId).first();
        // console.log('insertedId', insertedId);
        const token = jwt.sign(
            { user_id: insertedId, email: userData.email },
            process.env.TOKEN_KEY,
            {
                expiresIn: process.env.EXPIRY_TIME,
            }
        );

        userData.token = token;
        res.send({
            data: userData,
            message: "User Registration successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error inserting user data"
        })
    }

});


module.exports = router;