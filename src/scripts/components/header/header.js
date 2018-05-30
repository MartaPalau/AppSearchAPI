(function(app) {
    'use strict';

    controller.$inject = ['$scope', '$http'];
    function controller($http){

        var vm = this;

    }

    var component = {
        templateUrl: "scripts/components/header/header.html",
        controller: controller
    };
    app.component("header", component);
})(angular.module("testFront"));