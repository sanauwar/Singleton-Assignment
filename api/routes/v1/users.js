const express = require('express')
const router = express.Router();
const knex = require("../../../config/database");

router.post('/register', async (req, res) => {
    try {
        const body = req.body
        const [insertedId] = await knex("users").insert(body);
        const userData = await knex("users").where("id", insertedId).first();

        res.send({
            data: userData,
            message: "User Registration successfully"
        })
    } catch (error) {
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