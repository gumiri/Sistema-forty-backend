const express = require('express');
const router = express.Router();
const getHistorico = require('../model/historicoClienteModel');


router.get('/', (req,res) =>{
    getHistorico(req.query.cc, req.query.dt, function(err,result){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(result);
        }
    });
})

module.exports = router;