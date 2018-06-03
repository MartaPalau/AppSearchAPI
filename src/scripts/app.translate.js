(function (angular) {
    'use strict';

    translateConfig.$inject = ['$translateProvider'];

    function translateConfig($translateProvider) {
        $translateProvider.translations('en', {
            'SEARCH_PLACEHOLDER': 'Search...',
            'NO_RESULTS': 'Your search has no results, please try again',
            'BACK_TO_SEARCH': "Back to search"
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('escape');
    }

    angular.module('testFront').config(translateConfig);
})(angular);