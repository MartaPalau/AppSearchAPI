(function(app) {
    'use strict';
    var component = {
        templateUrl: "scripts/components/search/search.html",
        controller: 'searchCtrl'
    };
    app.component("search", component);
})(angular.module("testFront"));