const express = require('express');
const router = express.Router();
const postMPFortyflex = require('../../../model/materia_prima/Alphaflex/postMPFortyflexModel');


router.post('/', (req, res) => {
    postMPFortyflex(req.body, function (err, result) {
        if (err) {
            res.status(500).json(err);
        }
        else{
            res.status(200).json(result);
        }
    });
})

module.exports = router;