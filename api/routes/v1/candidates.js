const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require("../../../config/database");

router.get('/', async (req, res) => {
    try {
        const PAGE_SIZE = 2

        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * PAGE_SIZE;

        // Get total count of candidates
        const totalCount = await knex("candidate_t").count("* as count").first();
        const totalCandidates = totalCount.count;

        // Fetch candidate data for the requested page
        const candidateData = await knex("candidate_t")
            .limit(PAGE_SIZE)
            .offset(offset);

        res.send({
            data: candidateData,
            totalCandidates: totalCandidates,
            totalPages: Math.ceil(totalCandidates / PAGE_SIZE),
            currentPage: page,
            message: "Candidate Info - Page " + page,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Somethng went wrong"
        })
    }

});

router.get('/search', async (req, res) => {
    try {
        if (!req.query.first_name) {
            return res.status(400).json({ message: "Missing 'first_name' query parameter" });
        }
        const PAGE_SIZE = 2;
        const firstName = req.query.first_name;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * PAGE_SIZE;

        // Fetch candidate data for the requested page and filtered by first name
        const candidateData = await knex("candidate_t")
            .where('first_name', 'like', `%${firstName}%`)
            .limit(PAGE_SIZE)
            .offset(offset);

        // Fetch total count of candidates matching the first name
        const totalCount = await knex("candidate_t")
            .where('first_name', 'like', `%${firstName}%`)
            .count("* as count")
            .first();
        const totalCandidates = totalCount.count;

        res.send({
            data: candidateData,
            totalCandidates: totalCandidates,
            totalPages: Math.ceil(totalCandidates / PAGE_SIZE),
            currentPage: page,
            message: `Candidate Info for '${firstName}' - Page ${page}`,
        });
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
router.patch('/:id', async (req, res) => {
    const candidateId = req.params.id;
    const updateFields = req.body;

    try {
        // Fetch the existing candidate data from the database
        const existingCandidate = await knex('candidate_t').where('id', candidateId).first();

        if (!existingCandidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        // Merge the existing data with the updated fields
        const updatedCandidate = { ...existingCandidate, ...updateFields };

        // Perform the update operation in the database
        await knex('candidate_t').where('id', candidateId).update(updatedCandidate);

        res.json({ message: 'Candidate information updated successfully', data: updatedCandidate });
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