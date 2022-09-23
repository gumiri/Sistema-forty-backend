const express = require('express');
const router = express.Router();
const clienteReceb = require('../model/clientesRecbAbertoModel');


router.get('/', (req, res) =>{
    clienteReceb(function(err, result){
        if(err){
            res.status(500).json(err,[]);
        }
        else{
            res.status(200).json(undefined, result);
        }
    });
    //res.status(200).json(clienteReceb);
});

module.exports = router;