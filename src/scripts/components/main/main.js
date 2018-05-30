(function(app) {
    'use strict';

    controller.$inject = ['$scope', '$http'];
    function controller($http){

        var vm = this;

    }

    var component = {
        templateUrl: "scripts/components/main/main.html",
        controller: controller
    };
    app.component("main", component);
})(angular.module("testFront"));
