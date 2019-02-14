const express = require('express');
const router = express.Router();
const List = require('../models/List');

router.get('/list', function(req, res){
    // List.find(function(err, data){
    //     if(err){
    //       console.log(err);
    //     }
    //     else {
    //       res.json(data);
    //     }
    // });

    // const doc = List.find({ createdBy: req.user._id });
    // res.status(200).json({ data:doc });
});

module.exports = router;