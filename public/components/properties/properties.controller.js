(function(){
  angular
  .module('myApp')
  .controller('propertyController', propertyController);

  propertyController.$inject = ['propertyService','ImageService','Upload','$scope'];

  // Inicio de propertyController.
  function
  propertyController(propertyService,$scope){
    var vm = this;
    vm.properties = "";
    loadProperties();

    function loadProperties(){
      propertyService.getProperties().then(function(response){
        vm.properties = response.data;
       });
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

    // Inicio: de la función getInfo, que se encarga de obtener los datos.
    vm.getInfo = function(pProperty){
      vm.name = pProperty.name;
      vm.id = pProperty.id;
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
  }// Cierre de la función jugadores.
})();
