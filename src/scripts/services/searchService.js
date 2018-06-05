(function (angular) {
    'use strict';

    searchService.$inject = ['$http'];

    function searchService($http) {
        var urlBase = 'https://images-api.nasa.gov/search?q=';
        var searchQueryObj = {};


        searchQueryObj.getQuery = function (searchModel, mediaType) {
          return $http.get(urlBase + searchModel + '&media_type=' + mediaType);
        };

        return  {
            getQuery : searchQueryObj.getQuery
        };

}

    angular.module('testFront').service('searchService',searchService);
})(angular);
