(function(angular) {
    'use strict';
    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state({name: 'testFront',
            abstract: true,
            template: '<div ui-view></div>'
        });
        $stateProvider.state({name: 'testFront.search',
            url: '/',
            template: '<search></search>'
        });
        $stateProvider.state({name: 'testFront.asset',
            url: '/asset/:id/',
            template: '<asset></asset>',
            params: { assetData : null},
            controller: 'searchCtrl',
            controllerAs: '$ctrl'
        });
    }
    angular.module('testFront').config(routeConfig);
})(angular);
