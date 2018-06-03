(function (app) {
    'use strict';
    onError.$inject = [];

    function onError() {
        return {
            restrict:'A',
            link: function(scope, element, attr) {
                element.on('error', function() {
                    element.attr('src', attr.onError);
                })
            }
        }
    }

    app.directive('onError', onError);

})(angular.module('testFront'));