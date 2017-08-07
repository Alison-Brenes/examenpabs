(function(){
  'use strict';
  angular
  .module('myRoutes', ['ui.router', 'oc.lazyLoad', 'angularCSS','ngMessages'])
  .config(configuration)


  configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configuration($stateProvider, $urlRouterProvider){
    $stateProvider

    .state('players',{
      url : '/players',
      templateUrl: './components/players/players.view.html',
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('./components/players/players.controller.js')
        }]
      },
      controller: 'playerController',
      controllerAs: 'vm',
      css:'css/style.css'
    })


    .state('purchases',{
      url : '/purchases',
      templateUrl: './components/purchases/purchases.view.html',
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('./components/purchases/purchases.controller.js')
        }]
      },
      controller: 'purchaseController',
      controllerAs: 'vm',
      css:'css/style.css'
    })

    .state('properties',{
      url : '/properties',
      templateUrl: './components/properties/properties.view.html',
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('./components/properties/properties.controller.js')
        }]
      },
      controller: 'propertyController',
      controllerAs: 'vm',
      css:'css/style.css'
    })


    $urlRouterProvider.otherwise('/players');
  }//cierre de las rutas
})();
