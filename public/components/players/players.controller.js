(function(){
  angular
  .module('myApp')
  .controller('playerController', playerController);

  playerController.$inject = ['playerService','ImageService','Upload','$scope'];

  // Inicio de playerController.
  function playerController(playerService,ImageService,Upload,$scope){

    var vm = this;
    vm.players ="";
    loadPlayers();

    function loadPlayers(){
        playerService.getPlayers().then(function (response) {
            vm.players = response.data;
          });

          vm.cloudObj = ImageService.getConfiguration();
        }

    $scope.pagina = 1;
    $scope.siguiente = function() {
      $scope.pagina = 2;
    }
    $scope.anterior = function() {
      $scope.pagina = 1;
    }
    $scope.registro1 = function() {
      $scope.pagina = 1;
    }

    // Inicio de la función presave.
    vm.presave= function(newPlayer){
      vm.cloudObj.data.file = document.getElementById("photo").files[0];
      Upload.upload(vm.cloudObj)
        .success(function(data){
          newPlayer.photo = data.url;
          vm.save(newPlayer);
        }); // Cierre de la función success.
    } // Cierre de la función presave.

    // Inicio de la función save, que se encarga de obtener los datos y enviarlos para ser guardados.
    vm.save= function(){
      var newPlayer = {
        code: vm.code,
        name: vm.name,
        alias: vm.alias,
        money: 1500,
        photo: vm.photo,
      }// Cierre de newPlayer.

      // intento de restringir los usuarios que se registran
        if(vm.players.length == 0){
          playerService.setPlayers(newPlayer);
          console.log(vm.players);
          clear();
          loadPlayers();
          return;
        }else{
          for(var i = 0; i < vm.players.length; i++){
            if(newPlayer.code == vm.players[i].code){
              document.querySelector('.failId').innerHTML = 'El código ya  está registrado, por favor ingrese otro';
              return;
            }
            else{
              console.log(newPlayer);
              playerService.setPlayers(newPlayer);
              document.querySelector('.failId').innerHTML = '';
              console.log(vm.players);
              clear();
              loadPlayers();
              return;
            }
          }
        }
      }// Cierre de la función save.

      // Inicio: de la función getInfo, que se encarga de obtener los datos.
      vm.getInfo = function(pPlayer){
        vm.id = pPlayer._id;
        vm.code = pPlayer.code;
        vm.name = pPlayer.name;
        vm.alias = pPlayer.alias;
        vm.money = 1500;
        vm.photo = pPlayer.photo;
      }// Cierre de la función getInfo.

      // Inicio dinamismo de botones.
      vm.hideButton = function(){
        document.querySelector('#actualizar').classList.remove('displayNone');
        document.querySelector('#registrar').classList.add('displayNone');
      }// Cierre dinamismo de botones.

      // Inicio de la función update, que se encarga de devolver los datos para ser editados.
      vm.update = function(){
        var playerEdited = {
          _id : vm.id,
          code: vm.code,
          name: vm.name,
          alias: vm.alias,
          money: 1500,
          photo: vm.photo
        }// Cierre de playerEdited.
        playerService.updatePlayer(playerEdited);
        loadPlayers();
        clear();
      }// Cierre de la función update.

      // Inicio de la función clear, que se encarga de limpiar los datos despúes de un registro.
      function clear(){
        vm.code = '';
        vm.name =  '';
        vm.alias =  '';
        vm.photo = '';
      }// Cierre de la función clear.
    }// Cierre de playerController.
  })();
