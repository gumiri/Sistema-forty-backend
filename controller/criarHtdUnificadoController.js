const express = require('express');
const router = express.Router();
const criarHtdUnificado = require('../model/criarHtdUnificado');

router.get('/', (req,res) =>{
    criarHtdUnificado((err,result)=>{
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(result);
        }
    })
})

module.exports = router;