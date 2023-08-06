const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require("../../../config/database");

router.get('/', async (req, res) => {
    try {
        let candidateData = await knex("candidate_t");

        if (candidateData === undefined) {
            candidateData = {}
        }
        res.send({
            data: candidateData,
            message: "All Candidate Info"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Somethng went wrong"
        })
    }

});

router.get('/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(401).send({
                message: "Id not Found"
            });
        }
        const candidateId = req.params.id

        let candidateData = await knex("candidate_t").where("id", candidateId).first();

        if (candidateData === undefined) {
            candidateData = {}
        }
        res.send({
            data: candidateData,
            message: "Candidate Info"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Somethng went wrong"
        })
    }

});

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const [insertedId] = await knex("candidate_t").insert(body);

        const candidateData = await knex("candidate_t").where("id", insertedId).first();
        res.status(200).send({
            data: candidateData,
            message: "Candidate Registration successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error inserting candidate data"
        })
    }

});

router.delete('/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(401).send({
                message: "Candidate not Found"
            });
        }
        const candidateId = req.params.id

        let numRowsDeleted = await knex("candidate_t").where("id", candidateId).del();

        res.status(200).send({
            data: numRowsDeleted,
            message: "Candidate Deleted successfully"
        });

    } catch (error) {
        res.status(401).send({
            message: "Error deleting user",
            error: error
        });
    }

});


module.exports = router;