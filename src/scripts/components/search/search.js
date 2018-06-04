(function(app) {
    'use strict';
    var searchComponent = {
        templateUrl: "src/scripts/components/search/search.html",
        controller: 'searchCtrl'
    };
    app.component("search", searchComponent);
})(angular.module("testFront"));