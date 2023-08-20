const express = require('express');
const router = express.Router();
const getClientes = require('../model/todosClientesModel');


router.get('/', (req,res) =>{
    getClientes(req.query.token, req.query.orderBy, function(err,result){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(result);
        }
    });
})

module.exports = router;