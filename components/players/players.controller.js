(function(){
  angular
    .module('myApp')
    .controller('playerController', playerController);

    function playerController(playerService,ImageService,Upload){

      var vm = this;
      vm.cloudObj = ImageService.getConfiguration();

      // Inicio de la función init que es la que se inicializa de primero.(Pamela)
      function init(){
        vm.players = playerService.getPlayers();
        vm.to = new Date();
      }init();

      // Inicio de la función presave.(Pamela)
      vm.presave= function(newPlayer){
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data){
            newPlayer.photo = data.url;
            vm.save(newPlayer);
          }); // Cierre de la función success.(Pamela)
      } // Cierre de la función presave.(Pamela)

    // Inicio de la función save, que se encarga de obtener los datos y enviarlos para ser guardados.(Pamela)
      vm.save= function(){
        var newPlayer = {
          code: vm.code,
          name: vm.name,
          alias: vm.alias,
          money: vm.money,
          photo: vm.photo,
        }// Cierre de jugadores.(Pamela)

        // intento de restringir los usuarios que se registran
          if(vm.players.length == 0){
            playerService.setPlayers(newPlayer);
            document.querySelector('.Accepted').innerHTML = 'Registro completado!';
            console.log(vm.players);
            clear();
            init();
            return;
          }else{
            for(var i = 0; i < vm.players.length; i++){
              if(newPlayer.code == vm.players[i].code){
                document.querySelector('.failId').innerHTML = '**El número de cédula ya  está registrado, por favor ingrese otro**';
                return;
              }
              else{
                console.log(newPlayer);
                playerService.setPlayers(newPlayer);
                document.querySelector('.failId').innerHTML = '';
                document.querySelector('.Accepted').innerHTML = 'Registro completado!';
                console.log(vm.players);
                clear();
                init();
                return;
              }
            }
          }

        }// Cierre de la función save.(Pamela)

      // Inicio: de la función getInfo, que se encarga de obtener los datos.(Pamela)
      vm.getInfo = function(pPlayer){
        vm.code = pPlayer.code;
        vm.name = pPlayer.name;
        vm.alias = pPlayer.alias;
        vm.money = pPlayer.money;
        vm.photo = pPlayer.photo;
      }// Cierre de la función getInfo.(Pamela)

      // Inicio de la función update, que se encarga de devolver los datos para ser editados.(Pamela)
      vm.update = function(){
        var playerEdited = {
          code: vm.code,
          name: vm.name,
          alias: vm.alias,
          money: vm.money,
          photo: vm.photo
        }// Cierre de jugadores.(Pamela)
        playerService.updatePlayer(playerEdited);
        init();
        clear();
      }// Cierre de la función update.(Pamela)

      // Inicio de la función clear, que se encarga de limpiar los datos despúes de un registro.(Pamela)
      function clear(){
        vm.code = '';
        vm.name =  '';
        vm.alias =  '';
        vm.money =  '';
        vm.photo = '';
      }// Cierre de la función clear.(Pamela)


    }// Cierre de la función jugadores.(Pamela)
  })();
