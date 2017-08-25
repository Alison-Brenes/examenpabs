var Purchase = require('./purchase.model.js');

module.exports.save = function(req, res){
  var newPurchase = new Purchase({
    players: req.body.players,
    price: req.body.price
  });

  newPurchase.save(function(err){
    if(err){
      res.json({success:false, msg:'No se pudo registrar el jugador' + err});
    }else{
      res.json({success:true, msg:'Se registró el jugador correctamente'});
    }
  });
}

module.exports.findAll = function(req,res){
  Purchase.find().then(function(purchases){
    res.send(purchases);
  })
};

module.exports.update = function(req,res){

  Purchase.findByIdAndUpdate(req.body._id, { $set: req.body}, function (err, purchase) {
    if (err){
      res.json({success:true,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }

  });

}
