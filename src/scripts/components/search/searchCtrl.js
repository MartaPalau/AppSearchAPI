(function (app) {
    'use strict';

    searchCtrl.$inject = ['$http','$scope','angularGridInstance','$localStorage'];
    function searchCtrl($http,$scope,angularGridInstance,$localStorage){
        var vm = this;

        vm.$onInit = function(){
            vm.assetData = [];
            vm.results = false;
            vm.showLoading = false;
            vm.mediaType = [
                {
                    type: 'image',
                    checked: true,
                    label: 'Images'
                },
                {
                    type: 'video',
                    checked: true,
                    label: 'Videos'
                }
            ];

            $scope.refresh = function(){
                angularGridInstance.gallery.refresh();
            };

            vm.getQueryStorage();
        };

        vm.getQueryStorage = function(){
            if($localStorage.searchQuery){
                vm.getQuery($localStorage.searchQuery);
                vm.search = $localStorage.searchQuery;
            }
        };

        vm.mediaTypeQuery = function(index){
            angular.forEach(vm.mediaType, function (type, key) {
                if(index == key) {
                    (type.checked) ? type.checked = false : type.checked = true;
                }
            });
        };

       vm.getQuery = function (search){
            vm.setMediaType();
           if(search) {
               $localStorage.searchQuery = search;
               vm.getQuerySrc = 'https://images-api.nasa.gov/search?q=' + search + '&media_type=' + vm.mediaSelected;
               vm.searchQuery(vm.getQuerySrc);
           }
           vm.searchIsEmpty(search);
        };

        vm.searchQuery = function(resultQuery) {
            vm.assetData = [];
            vm.showLoading = true;
            $http.get(resultQuery)
                .then(function (res) {
                    vm.showLoading = false;
                    vm.collItem = res.data.collection.items;
                    vm.noResults(vm.collItem);
                    vm.iterateAssetItems(vm.collItem);
                },function(res){
                    console.log("ERROR")
            });

        };

        vm.iterateAssetItems = function(collItem){
            angular.forEach(collItem, function (item) {
                var data = item.data;
                vm.getAssetData(data);
                vm.assetData.push({assetId: vm.id, assetHref: vm.assetHref, description: vm.description, title: vm.title, media: vm.media});
            });
        };

        vm.noResults = function(assetItems){
            (assetItems.length > 0) ? vm.results = false : vm.results = true;
        };

        vm.searchIsEmpty = function(search){
            (search) ? vm.isEmpty = false : vm.isEmpty = true;
        };

        vm.setMediaType = function(){
            vm.mediaSelected = [];
            angular.forEach(vm.mediaType, function (type) {
                vm.mediaTypeActive = type.checked;
                if(vm.mediaTypeActive){
                    vm.mediaSelected.push(type.type).toString();
                }
            });
        };

        vm.getAssetData = function(data){
            angular.forEach(data, function (itemData) {
                vm.id = itemData.nasa_id;
                vm.description =  itemData.description;
                vm.title =  itemData.title;
                vm.media = itemData.media_type;
                vm.getAssetSrc(vm.media, vm.id);
            });
        };

        vm.getAssetSrc = function(mediaType, id){
            if(mediaType == 'image'){
                vm.assetThumb = 'http://images-assets.nasa.gov/image/' + id + '/' + id + '~thumb.jpg';
                vm.assetLarge = 'http://images-assets.nasa.gov/image/' + id + '/' + id + '~small.jpg';
                vm.assetHref = {
                    assetThumb: vm.assetThumb,
                    assetLarge: vm.assetLarge
                };
            } else if (mediaType == 'video'){
                vm.assetThumbPng = 'http://images-assets.nasa.gov/video/' + id + '/' + id + '~small_thumb_00002.png';
                vm.assetVideo = 'http://images-assets.nasa.gov/video/' + id + '/' + id + '~small.mp4';
                vm.assetHref = {
                    assetThumb: vm.assetThumbPng,
                    assetVideo: vm.assetVideo
                };
            }
        };
    }

    app.controller('searchCtrl', searchCtrl);

}(angular.module('testFront')));
