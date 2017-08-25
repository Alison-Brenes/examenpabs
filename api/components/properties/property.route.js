var express = require('express');
var router = express.Router();
var propertyController = require('./properties.controller.js');

//para aquellas rutas que ocupen un id

router.param('id', function(req, res, next, id){
  req.body.id = id;
  next();
});

router.route('/get_all_properties')
  .get(function(req,res){
    propertyController.findAll(req,res);
  });

module.exports = router;
