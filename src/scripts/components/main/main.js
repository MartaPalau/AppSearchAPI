(function(app) {
    'use strict';
    mainCtrl.$inject = ['$scope', '$http'];
    function mainCtrl(){
    }
    var mainComponent = {
        templateUrl: "scripts/components/main/main.html",
        controller: mainCtrl
    };
    app.component("main", mainComponent);
})(angular.module("testFront"));
