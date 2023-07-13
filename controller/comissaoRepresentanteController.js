const express = require('express');
const router = express.Router();
const getEstoque = require('../model/fortyvinil/comissaoRepresentante/comissaoRepresentanteModel');


router.get('/', (req,res) =>{
    getEstoque(req.query.token, req.query.date1, req.query.date2, function(err,result){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(200).send(result);
        }
    });
})

module.exports = router;