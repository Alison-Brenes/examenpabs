(function(){
  angular
  .module('myApp')
  .controller('propertyController', propertyController);

  propertyController.$inject = ['propertyService','ImageService','Upload','$scope'];

  // Inicio de playerController.
  function propertyController(propertyService,ImageService,Upload,$scope){

    var vm = this;
    vm.properties ="";
    loadProperties();

    function loadProperties(){
        propertyService.getProperties().then(function (response) {
            vm.properties = response.data;
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
    vm.presave= function(newProperty){
      vm.cloudObj.data.file = document.getElementById("photo").files[0];
      Upload.upload(vm.cloudObj)
        .success(function(data){
          newProperty.photo = data.url;
          vm.save(newProperty);
        }); // Cierre de la función success.
    } // Cierre de la función presave.

    // Inicio de la función save, que se encarga de obtener los datos y enviarlos para ser guardados.
    vm.save= function(){
      var newProperty = {
        code: vm.code,
        name: vm.name,
        alias: vm.alias,
        money: 1500,
        photo: vm.photo,
      }// Cierre de newPlayer.

      // intento de restringir los usuarios que se registran
        if(vm.properties.length == 0){
          propertyService.setProperties(newProperty);
          console.log(vm.properties);
          clear();
          loadProperties();
          return;
        }else{
          for(var i = 0; i < vm.properties.length; i++){
            if(newProperty.code == vm.properties[i].code){
              document.querySelector('.failId').innerHTML = 'El código ya  está registrado, por favor ingrese otro';
              return;
            }
            else{
              console.log(newProperty);
              propertyService.setProperties(newProperty);
              document.querySelector('.failId').innerHTML = '';
              console.log(vm.properties);
              clear();
              loadProperties();
            }
            clear();
            loadProperties();
            return;
          }
        }
      }// Cierre de la función save.

      // Inicio: de la función getInfo, que se encarga de obtener los datos.
      vm.getInfo = function(pProperty){
        vm.id = pProperty._id;
        vm.code = pProperty.code;
        vm.name = pProperty.name;
        vm.alias = pProperty.alias;
        vm.money = 1500;
        vm.photo = pProperty.photo;
      }// Cierre de la función getInfo.

      // Inicio dinamismo de botones.
      vm.hideButton = function(){
        document.querySelector('#actualizar').classList.remove('displayNone');
        document.querySelector('#registrar').classList.add('displayNone');
      }// Cierre dinamismo de botones.

      // Inicio de la función update, que se encarga de devolver los datos para ser editados.
      vm.update = function(){
        document.querySelector('#actualizar').classList.add('displayNone');
        document.querySelector('#registrar').classList.remove('displayNone');
        var propertyEdited = {
          _id : vm.id,
          code: vm.code,
          name: vm.name,
          alias: vm.alias,
          money: 1500,
          photo: vm.photo
        }// Cierre de playerEdited.
        propertyService.updateProperty(propertyEdited).then(function(response){
        propertyService.getProperties()
            .then(function(response){
              vm.properties = response.data;
            })
            .catch(function(err){
              console.log(err);
            })
         });
        loadProperties();
        clear();
      }//cierre funcion update

      // Inicio de la función clear, que se encarga de limpiar los datos despúes de un registro.
      function clear(){
        vm.code = '';
        vm.name =  '';
        vm.alias =  '';
        vm.photo = '';
      }// Cierre de la función clear.
    }// Cierre de playerController.
  })();
