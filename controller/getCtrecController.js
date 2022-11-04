const express = require('express');
const router = express.Router();
const getctrec = require('../model/getCtrecModel');

router.get('/', function(req,res){
    getctrec(function(err,result){
        if (err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(result);
        }
    });
})

module.exports = router;