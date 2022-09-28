const express = require('express');
const router = express.Router();
const gCliente = require('../model/gClientesModel');

router.get('/', (req,res) => {
    gCliente(function (err,result){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(result);
        }
    });
});

module.exports = router;
