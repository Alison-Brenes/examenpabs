var Property = require('./property.model.js');

module.exports.save = function(req, res){
  var newProperty = new Property({
    name  : req.body.name,
    idproperty  : req.body.idproperty,
    posistion  : req.body.posistion,
    price  :  req.body.price,
    rent  :  req.body.rent,
    multpliedrent :  req.body.multpliedrent,
    housecost  :  req.body.housecost,
    group  :  req.body.group,
    ownedby :  req.body.ownedby,
    buildings :  req.body.buildings,
    mortgaged :  req.body.mortgaged,
    probability :  req.body.probability,
    rel :  req.body.rel,
    ohousecost :  req.body.ohousecost,
    oprice :  req.body.oprice,
    averageProbability :  req.body.averageProbability

  });

  newProperty.save(function(err){
    if(err){
      res.json({success:false, msg:'No se pudo registrar el jugador' + err});
    }else{
      res.json({success:true, msg:'Se registró el jugador correctamente'});
    }
  });
}

module.exports.findAll = function(req,res){
  Property.find().then(function(properties){
    res.send(properties);
  })
};

module.exports.update = function(req,res){

  Property.findByIdAndUpdate(req.body._id, { $set: req.body}, function (err, property) {
    if (err){
      res.json({success:true,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }

  });

}
