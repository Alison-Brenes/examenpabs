(function(){
  angular
  .module('myApp')
  .service('playerService', playerService);

  // Inicio de función playerService.
  function playerService($http){
    var players = [{
      code: 001,
      name:'Goku',
      alias: 'Kokkun',
      money: 1500,
      photo:'https://res.cloudinary.com/pabskun/image/upload/v1489535279/goku_cqc9tb.png'
    },
    {
    code: 002,
    name:'Piccolo',
    alias: 'PikOREO',
    money: 1500,
    photo:'https://res.cloudinary.com/pabskun/image/upload/v1489535276/piccolo_ksxdec.png'
  },
  {
    code: 003,
    name:'Logan',
    alias: 'Lovezno',
    money: 1500,
    photo:'https://res.cloudinary.com/pabskun/image/upload/v1489535284/lobezno_o1vs9g.png'
  },
  {
    code: 004,
    name:'Bomberman',
    alias: 'Don Pepe y los Globos',
    money: 1500,
    photo:'https://res.cloudinary.com/pabskun/image/upload/v1489535282/donpepe_x9hksw.png'
  }];
  var publicAPI = {
    setPlayers : _setPlayers,
    getPlayers : _getPlayers,
    updatePlayer : _updatePlayer,
  }; // Cierre del publicAPI.
  return publicAPI;

  // Inicio de la funcion _setPlayers, que se encarga de registar los datos en el localStorage.
  function _setPlayers(pPlayer){

  return $http.post('http://localhost:3000/api/save_players',pPlayer)
  }// Cierre de la función _setPlayers.

  // Inicio de la función _getPlayers, que se encarga de obtener los datos más actualizados.
  function _getPlayers(){
      return $http.get('http://localhost:3000/api/get_all_players');
  }// Cierre de la función _getPlayers.

  // Inicio de la función _updatePlayer, que se encarga de permitir la edición de datos.
  function _updatePlayer(pobjPlayer){
    console.log(pobjPlayer);
          return $http.put('http://localhost:3000/api/update_player',pobjPlayer);
    }
}//Cierre de la  función playerService.
})();
