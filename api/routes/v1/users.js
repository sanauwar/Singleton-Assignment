const express = require('express')
const router = express.Router();
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require("../../../config/database");

router.post('/register', async (req, res) => {
    try {

        body.password = await bcrypt.hash(req.body.password, 10);
        const [insertedId] = await knex("users").insert(body);
        const userData = await knex("users").where("id", insertedId).first();

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


//::TODO
// router.get('/login', (req, res) => {
//     res.send({
//         data: req.body,
//         message: "User Login"
//     })
// })



module.exports = router;