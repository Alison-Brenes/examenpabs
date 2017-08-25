//Requerimos mongoose
var mongoose = require('mongoose');
//Esquema de usuarios
var PurchaseSchema = new mongoose.Schema({
  players : String,
  price: Number
});

module.exports = mongoose.model('Purchase', PurchaseSchema); //nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural
