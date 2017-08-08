(function(){
  angular
    .module('myApp')
    .controller('purchaseController', purchaseController);

    // Inicio de purchaseController.
    function purchaseController(purchaseService,playerService,propertyService,$scope){
      var vm = this;

      // Inicio de la función init que es la que se inicializa de primero.
      function init(){
        vm.purchases = purchaseService.getPurchases();
        vm.playersRel = playerService.getPlayers();
        vm.propertiesRel = propertyService.getProperties();
      }init();

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

      // Inicio de la función DiscountPrice  que es la resta los valores.
      vm.DiscountPrice = function(){
        var playersList = playerService.getPlayers();
        var purchasesList = purchaseService.getPurchases();
        var disponible = 0;

        for (var i = 0; i < purchasesList.length; i++) {
          if (purchasesList[i].players = playersList[i].name) {
            disponible = playersList[i].money - purchasesList[i].kkk;
            updateDescuento(disponible);
          }
        }
      }// Cierre de la función DiscountPrice  que es la resta los valores.

      // Inicio de la función updateDescuento  que es la resta los valores en la card.
      function updateDescuento(pdisponible){
        var playersList = playerService.getPlayers();
        var purchasesList = purchaseService.getPurchases();

        for (var i = 0; i < purchasesList.length; i++) {
          if (purchasesList[i].players = playersList[i].name) {
            playersList[i].money = pdisponible;
            localStorage.setItem('lsUsersList', JSON.stringify(playersList));
          }
        }
      }// Cierre de la función updateDescuento  que es la resta los valores en la card.

      // Inicio de la función save, que se encarga de obtener los datos y enviarlos para ser guardados.
      vm.save= function(){
        var newPurchase = {
          players: vm.players,
          price: vm.price,
        }// Cierre de newPurchase.
        purchaseService.setPurchases(newPurchase);
        init();
        clear();
        }// Cierre de la función save.

        // Inicio: de la función getInfo, que se encarga de obtener los datos.
        vm.getInfo = function(pPurchase){
          vm.players = pPurchase.players;
          vm.price = pPurchase.price;
        }// Cierre de la función getInfo.

        // Inicio dinamismo de botones.
        vm.hideButton = function(){
          document.querySelector('#actualizar').classList.remove('displayNone');
          document.querySelector('#registrar').classList.add('displayNone');
        }// Cierre dinamismo de botones.

        // Inicio de la función update, que se encarga de devolver los datos para ser editados.
        vm.update = function(){
          var purchaseEdited = {
            players: vm.players,
            price: vm.price
          }// Cierre de update.
          purchaseService.updatePurchase(purchaseEdited);
          init();
          clear();
        }// Cierre de la función update.

        // Inicio de la función clear, que se encarga de limpiar los datos despúes de un registro.
        function clear(){
          vm.players = '';
          vm.price =  '';
        }// Cierre de la función clear.
      }// Cierre de la función purchaseController.
    })();