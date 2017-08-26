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
        name  : vm.name,
        idproperty  : vm.idproperty,
        posistion  : vm.posistion,
        price  :  vm.price,
        rent  :  vm.rent,
        multpliedrent :  vm.multpliedrent,
        housecost  :  vm.housecost,
        group  :  vm.group,
        ownedby :  vm.ownedby,
        buildings :  vm.buildings,
        mortgaged :  vm.mortgaged,
        probability :  vm.probability,
        rel :  vm.rel,
        ohousecost :  vm.ohousecost,
        oprice :  vm.oprice,
        averageProbability :  vm.averageProbability,

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
            if(newProperty.idproperty == vm.properties[i].idproperty){
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
        vm.name = pProperty.name;
        vm.idproperty = pProperty.idproperty;
        vm.posistion = pProperty.posistion;
        vm.price =  pProperty.price;
        vm.rent =  pProperty.rent;
        vm.multpliedrent=  pProperty.multpliedrent;
        vm.housecost =  pProperty.housecost;
        vm.group =  pProperty.group;
        vm.ownedby=  pProperty.ownedby;
        vm.buildings=  pProperty.buildings;
        vm.mortgaged=  pProperty.mortgaged;
        vm.probability=  pProperty.probability;
        vm.rel=  pProperty.rel;
        vm.ohousecost=  pProperty.ohousecost;
        vm.oprice=  pProperty.oprice;
        vm.averageProbability=  pProperty.averageProbability;

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
          name  : vm.name,
          idproperty  : vm.idproperty,
          posistion  : vm.posistion,
          price  :  vm.price,
          rent  :  vm.rent,
          multpliedrent :  vm.multpliedrent,
          housecost  :  vm.housecost,
          group  :  vm.group,
          ownedby :  vm.ownedby,
          buildings :  vm.buildings,
          mortgaged :  vm.mortgaged,
          probability :  vm.probability,
          rel :  vm.rel,
          ohousecost :  vm.ohousecost,
          oprice :  vm.oprice,
          averageProbability :  vm.averageProbability,
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
        vm.name = '';
        vm.idproperty = '';
        vm.posistion ='';
        vm.price =  '';
        vm.rent =  '';
        vm.multpliedrent=  '';
        vm.housecost =  '';
        vm.group =  '';
        vm.ownedby= '';
        vm.buildings= '';
        vm.mortgaged=  '';
        vm.probability= '';
        vm.rel=  '';
        vm.ohousecost= '';
        vm.oprice=  '';
        vm.averageProbability=  '';

      }// Cierre de la función clear.
    }// Cierre de playerController.
  })();
