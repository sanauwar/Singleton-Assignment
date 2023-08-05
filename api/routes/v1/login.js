const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require("../../../config/database");

router.get('/', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await knex("users").where({ email: email }).first();
        if (!user) {
            res.status(404).send({
                message: "User not found"
            });
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                res.status(401).send({
                    data: [],
                    message: "Credential not matched"
                });
            } else if (result === true) {

                const token = jwt.sign(
                    { user_id: user.id, email: user.email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: process.env.EXPIRY_TIME,
                    }
                );

                user.token = token;

                res.status(200).send({
                    data: user,
                    message: "Login successfully"
                })
            } else {
                res.status(401).send({
                    data: [],
                    message: "Credential not matched"
                })
            }
        });

    } catch (error) {
        res.status(500).send({
            message: "Error in inserting user data"
        })
    }

});




module.exports = router;