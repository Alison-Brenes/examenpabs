var express = require('express');
var router = express.Router();
var purchaseController = require('./purchases.controller.js');

//para aquellas rutas que ocupen un id

router.param('id', function(req, res, next, id){
  req.body.id = id;
  next();
});

router.route('/save_purchase')
  .post(function(req,res){
    purchaseController.save(req,res);

  });
router.route('/get_all_purchases')
  .get(function(req,res){
    purchaseController.findAll(req,res);
  });

router.route('/update_purchases')
  .put(function(req, res){
  purchaseController.update(req,res);
});

module.exports = router;
