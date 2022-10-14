const express = require('express');
const router = express.Router();
const unificar = require('../model/unificar');


router.get('/', (req,res) =>{
    unificar(function(err,result){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(result);
        }
    });
})

module.exports = router;