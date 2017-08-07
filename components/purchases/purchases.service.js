(function(){
  angular
  .module('myApp')
  .service('purchaseService', purchaseService);

  // Inicio de función purchaseService.
  function purchaseService(){
    var purchases = [];
    var publicAPI = {
      setPurchases : _setPurchases,
      getPurchases : _getPurchases,
      updatePurchase : _updatePurchase
    }; // Cierre del publicAPI.
    return publicAPI;

    // Inicio de la funcion _setPurchases, que se encarga de registar los datos en el localStorage.
    function _setPurchases(pPurchase){
      var purchasesList = _getPurchases();

      purchasesList.push(pPurchase);
      localStorage.setItem('lsPurchaseList', JSON.stringify(purchasesList));
    }// Cierre de la función _setPurchases.

    // Inicio de la función _getPurchases, que se encarga de obtener los datos más actualizados.
    function _getPurchases(){
      var purchasesList = JSON.parse(localStorage.getItem('lsPurchaseList'));
      if(purchasesList == null){
        purchasesList = purchases;
      }
      return purchasesList;
    }// Cierre de la función _getPurchases.

    // Inicio de la función _updatePurchase, que se encarga de permitir la edición de datos.
    function _updatePurchase(pobjPurchase){
      var purchasesList = _getPurchases();
      for(var i = 0; i < purchasesList.length; i++){
        if(purchasesList[i].code == pobjPurchase.code){
          purchasesList[i] = pobjPurchase;
        }
      }
      localStorage.setItem('lsPurchaseList', JSON.stringify(purchasesList));
    }// Cierre de la función _updatePurchase.
  }//Cierre de la  función purchaseService.
})();
