const express = require('express');
const router = express.Router();
const getCtrec = require('../model/getCtrecModel');


router.get('/', (req,res) =>{
    getCtrec(req.query.date1, req.query.date2, req.query.orderBy, function(err,result){
        console.log(req.query.date1);
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(result);
        }
    });
})

module.exports = router;