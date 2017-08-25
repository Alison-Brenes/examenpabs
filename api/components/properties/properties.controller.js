var Property = require('./property.model.js');

module.exports.save = function(req, res){
  var newProperty = new Property({
    code: req.body.code,
    name: req.body.name,
    alias: req.body.alias,
    money: req.body.money,
    photo: req.body.photo
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
