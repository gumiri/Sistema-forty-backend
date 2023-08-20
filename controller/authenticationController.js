const express = require('express');
const router = express.Router();
const auth = require('../model/auth/authenticationModel');

router.post('/', (req, res) => {
    auth(req.body, function (err, result, authentication) {
        if (err) {
            res.status(500).json(err);
        }
        else if (authentication) {
            res.status(200).json(result);
        }
        else {
            res.status(401).json(result);
        }
    });
})

module.exports = router;