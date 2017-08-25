(function(){
  angular
  .module('myApp')
  .service('purchaseService', purchaseService);

  // Inicio de función purchaseService.
  function purchaseService($http){
    var purchases = [];
    var publicAPI = {
      setPurchases : _setPurchases,
      getPurchases : _getPurchases,
      updatePurchase : _updatePurchase
    }; // Cierre del publicAPI.
    return publicAPI;

    // Inicio de la funcion _setPurchases, que se encarga de registar los datos en el localStorage.
    function _setPurchases(pPurchase){
      return $http.post('http://localhost:3000/api/sasave_purchase',pPurchase)

    }// Cierre de la función _setPurchases.

    // Inicio de la función _getPurchases, que se encarga de obtener los datos más actualizados.
    function _getPurchases(){
      return $http.get('http://localhost:3000/api/get_all_purchases');

    }// Cierre de la función _getPurchases.

    // Inicio de la función _updatePurchase, que se encarga de permitir la edición de datos.
    function _updatePurchase(pobjPurchase){
      console.log(pobjPurchase);
            return $http.put('http://localhost:3000/api/update_purchases',pobjPurchase);
      }
  }//Cierre de la  función purchaseService.
})();
