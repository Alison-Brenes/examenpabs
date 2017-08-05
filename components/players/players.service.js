(function(){
  angular
  .module('myApp')
  .service('playerService', playerService);

  // Inicio de función jugadores.(Pamela)
  function playerService(){
    var players = [];
    var publicAPI = {
      setPlayers : _setPlayers,
      getPlayers : _getPlayers,
      updatePlayer : _updatePlayer,
    }; // Cierre del publicAPI.(Pamela)
    return publicAPI;

  // Inicio de la funcion jugadores, que se encarga de registar los datos en el localStorage.(Pamela)
    function _setPlayers(pPlayer){
      var playersList = _getPlayers();

      playersList.push(pPlayer);
      localStorage.setItem('lsUsersList', JSON.stringify(playersList));
    }// Cierre de la función jugadores.(Pamela)

    // Inicio de la función jugadores, que se encarga de obtener los datos más actualizados.(Pamela)
    function _getPlayers(){
      var playersList = JSON.parse(localStorage.getItem('lsUsersList'));
      if(playersList == null){
        playersList = players;
      }
      return playersList;
    }// Cierre de la función jugadores.(Pamela)

    // Inicio de la función jugadores, que se encarga de permitir la edición de datos.(Pamela)
    function _updatePlayer(pobjPlayer){
      var playersList = _getPlayers();
      for(var i = 0; i < playersList.length; i++){
        if(playersList[i].code == pobjPlayer.code){
          playersList[i] = pobjPlayer;
        }
      }
      localStorage.setItem('lsUsersList', JSON.stringify(playersList));
    }// Cierre de la función jugadores.(Pamela)


  }//Fin función jugadores.(Pamela)
})();
