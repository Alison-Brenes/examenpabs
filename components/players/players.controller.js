(function(){
  angular
    .module('myApp')
    .controller('playersController', playersController);
    function playersController(playersService,ImageService,Upload,userService,AuthService,$cookies){

      var vm = this;
      vm.cloudObj = ImageService.getConfiguration();

      // Inicio de la función init que es la que se inicializa de primero.(Pamela)
      function init(){
        vm.players = playersService.getPlayers();
        vm.foundCredentials = userService.findUsers(userService.getCookie());
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

             vm.show= function(){
        document.querySelector('#showRanking').classList.remove('displayNone');
      }

         vm.hide= function(){
        document.querySelector('#showRanking').classList.add('displayNone');
      }


    // Inicio de la función save, que se encarga de obtener los datos y enviarlos para ser guardados.(Pamela)
      vm.save= function(){
        var newPlayer = {
          code: vm.code,
          name: vm.name,
          alias: vm.alias,
          money: vm.money,
          photo: vm.photo,
        }// Cierre de newStudent.(Pamela)

    // intento de restringir los usuarios que se registran
      if(vm.players.length == 0){
         studentService.setStudents(newPlayer);
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
          /*else if(newStudent.email == vm.students[i].email){
                  document.querySelector('.failEmail').innerHTML = 'El correo electrónico ya está registrado, por favor ingrese otro';
                  document.querySelector('.failId').innerHTML = '';
                  return;
                }*/
                else{
                  console.log(newStudent);
                  studentService.setStudents(newStudent);
                  document.querySelector('.failId').innerHTML = '';
                  document.querySelector('.failEmail').innerHTML = '';
                  document.querySelector('.Accepted').innerHTML = 'Registro completado!';
                  console.log(vm.students);
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
    //función que cambia boton segun la información para modificar Pili
    vm.hideButton = function(){
      document.querySelector('#actualizar').classList.remove('displayNone');
      document.querySelector('#registrar').classList.add('displayNone');
    }

      // Inicio de la función update, que se encarga de devolver los datos para ser editados.(Pamela)
      vm.update = function(){
        document.querySelector('#actualizar').classList.add('displayNone');
        document.querySelector('#registrar').classList.remove('displayNone');
        var playerEdited = {
          code: vm.code,
          name: vm.name,
          alias: vm.alias,
          money: vm.money,
          photo: vm.photo
        }// Cierre de studentEdited.(Pamela)
        playersService.updatePlayer(playerEdited);
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

      /* Inicio de la función inactive, que se encarga de cambiar el estado del profesor.(Pamela)
      //función que cambia el estado a inabilitado.(Pamela)
      vm.inactive = function(pStudent){
        var studentsList = studentService.getStudents();
        for (var i = 0; i < studentsList.length; i++) {
          if (studentsList[i].email == pStudent.email) {
            studentsList[i].status = 'inhabilitado';
            console.log(studentsList[i].status)
          }// Cierre del if.(Pamela)
        }// Cierre del ciclo.(Pamela)
        studentService.updateState(studentsList);
        init();
      }// Cierre de la funcion inactive.(Pamela)

      //función que cambia el estado a activo.(Pamela)
      vm.active = function(pStudent){
        var studentsList = studentService.getStudents();
        for (var i = 0; i < studentsList.length; i++) {
          if (studentsList[i].email == pStudent.email) {
            studentsList[i].status = 'Activo';
            console.log(studentsList[i].status)
          }// Cierre del if.(Pamela)
        }// Cierre del ciclo.(Pamela)
        studentService.updateState(studentsList);
        init();
      }// Cierre de la funcion active.(Pamela)

      vm.logOut = function(){
        AuthService.logOut();
      }*/

    }// Cierre de la función studentController.(Pamela)
})();
