(function(app) {
    'use strict';

    headerCtrl.$inject = ['$state'];
    function headerCtrl($state){
        var vm = this;
        vm.stateParams = $state.params;
        vm.searchBack = function(){
            window.history.back();
        }
    }
    var headerComponent = {
        templateUrl: "scripts/components/header/header.html",
        controller: headerCtrl
    };
    app.component("header", headerComponent);
})(angular.module("testFront"));