(function(app) {
    'use strict';

    controller.$inject = ['$scope', '$http'];
    function controller($http){

        var vm = this;

    }

    var component = {
        templateUrl: "scripts/components/footer/footer.html",
        controller: controller
    };
    app.component("footer", component);
})(angular.module("testFront"));