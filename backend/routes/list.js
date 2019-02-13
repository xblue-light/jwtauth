const express = require('express');
const router = express.Router();
const List = require('../models/List');

router.get('/list', function(req, res){
    List.find(function(err, data){
        if(err){
          console.log(err);
        }
        else {
          res.json(data);
        }
    });
});

module.exports = router;