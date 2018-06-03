(function (app) {
    'use strict';

    searchCtrl.$inject = ['$http','$localStorage','$scope','angularGridInstance'];
    function searchCtrl($http,$localStorage,$scope,angularGridInstance){
        var vm = this;

        vm.$onInit = function(){
            vm.assetData = [];
            vm.isEmpty = false;
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
            }
        };

        vm.mediaTypeQuery = function(index){
            angular.forEach(vm.mediaType, function (type, key) {
                if(index == key) {
                    if (type.checked) {
                        type.checked = false;
                    } else {
                        type.checked = true;
                    }
                }
            });
        };

        vm.searchQuery = function() {
            angularGridInstance.gallery.refresh();
            vm.assetData = [];
            $localStorage.$reset();
            if(vm.search != undefined){
                vm.showLoading = true;
                vm.setMediaType();
                var getQuery ='https://images-api.nasa.gov/search?q='+vm.search+'&media_type='+vm.mediaSelected;
                $http.get(getQuery)
                    .then(function (res) {
                        vm.showLoading = false;
                        vm.collItem = res.data.collection.items;
                        vm.noResults(vm.collItem);
                        angular.forEach(vm.collItem, function (item) {
                            var data = item.data;
                            //var urlCollection = item.href;
                            vm.getAssetData(data);
                            vm.assetData.push({
                                assetId: vm.id,
                                assetHref: vm.assetHref,
                                description: vm.description,
                                title: vm.title,
                                media: vm.media,
                            });
                        });
                    });
            }else{
                vm.isEmpty = true;
            }

        };

        vm.noResults = function(assetItems){
            if(assetItems.length > 0){
                vm.results = false;
            } else {
                vm.results = true;
            }
        };

        vm.searchIsEmpty = function(){
            if(vm.search != undefined){
                vm.isEmpty = true;
            }else{
                vm.isEmpty = false;
            }
        };

        vm.setMediaType = function(){
            vm.isEmpty = false;
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
                if(vm.media == 'image'){
                    vm.assetThumb = 'http://images-assets.nasa.gov/image/' + vm.id + '/' + vm.id + '~thumb.jpg';
                    vm.assetLarge = 'http://images-assets.nasa.gov/image/' + vm.id + '/' + vm.id + '~small.jpg';
                    vm.assetHref = {
                        assetThumb: vm.assetThumb,
                        assetLarge: vm.assetLarge
                    };
                } else if (vm.media == 'video'){
                    vm.assetThumbPng = 'http://images-assets.nasa.gov/video/' + vm.id + '/' + vm.id + '~small_thumb_00002.png';
                    vm.assetVideo = 'http://images-assets.nasa.gov/video/' + vm.id + '/' + vm.id + '~small.mp4';
                    vm.assetHref = {
                        assetThumb: vm.assetThumbPng,
                        assetVideo: vm.assetVideo
                    };
                }
            });
        };
    }

    app.controller('searchCtrl', searchCtrl);

}(angular.module('testFront')));
