const express = require('express');
const router = express.Router();
const copiarBds = require('../model/copiarBdsModel');


router.get('/', (req,res) =>{
    copiarBds(function(err,result){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(result);
        }
    });
})

module.exports = router;