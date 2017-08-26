//Requerimos mongoose
var mongoose = require('mongoose');
//Esquema de usuarios
var PropertySchema = new mongoose.Schema({
  name   : String,
  idproperty   : String,
  posistion   : Number,
  price   : Number,
  rent   : Number,
  multpliedrent  : String,
  housecost   : Number,
  group   : String,
  ownedby  : Number,
  buildings  : Number,
  mortgaged  : String,
  probability  : Number,
  rel  : String,
  ohousecost  : Number,
  oprice  : Number,
  averageProbability  : Number
});

module.exports = mongoose.model('Property', PropertySchema); //nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural
