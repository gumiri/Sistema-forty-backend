const { json } = require('express');
const express = require('express');
const router = express.Router();
const teste = require('../model/teste');


router.get('/', (req, res) =>{
    teste(function(err,result){
        if (err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(result);
        }

    });
});

module.exports = router;