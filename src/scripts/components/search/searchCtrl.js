(function (app) {
    'use strict';

    app.controller('searchCtrl', function($http){
        var vm = this;
        vm.assetData = [];
        vm.assetCollection = [];
        vm.assetCollectionImages = [];
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
        vm.getItemCollection = function(collection){
            $http.get(collection).then(function (res) {
                var assetCol = res.data;
                vm.assetCollection.push(assetCol);
                angular.forEach(vm.assetCollection, function (asset) {
                    vm.assetOrig = asset[0];
                    vm.assetLarge= asset[1];
                    vm.assetMedium = asset[2];
                    vm.assetSmall = asset[3];
                    vm.assetThumb= asset[4];
                });
                vm.assetCollectionImages.push({
                    assetSmall: vm.assetSmall,
                    assetThumb: vm.assetThumb
                });
                angular.forEach(vm.assetData, function (asset, key) {
                    vm.assetData[key].assetHref = vm.assetCollectionImages[key];
                });
            }, function (res) {
                console.log(res);
            });
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
            vm.assetData = [];
            if(vm.search != undefined){
                vm.searchIsEmpty();
                var getQuery ='https://images-api.nasa.gov/search?q='+vm.search+'&media_type='+vm.mediaSelected;
                $http.get(getQuery)
                    .then(function (res) {
                        var collItem = res.data.collection.items;
                        angular.forEach(collItem, function (item) {
                            var data = item.data;
                            vm.getItemData(data);
                            var urlCollection = item.href;
                            vm.getItemCollection(urlCollection);
                            vm.assetData.push({
                                assetId: vm.id,
                                assetHref: null,
                                description: vm.description,
                                title: vm.title,
                                media: vm.media
                            });
                        });
                });
            }else{
                vm.isEmpty = true;
            }

        };

        //vm.getImages = function(){
        //    angular.forEach(vm.assetData, function (item) {
        //        var asset = item.assetHref;
        //        angular.forEach(asset, function (item) {
        //            item.assetOrig = asset[0];
        //        });
        //    });
        //};

        vm.searchIsEmpty = function(){
            vm.isEmpty = false;
            vm.mediaSelected = [];
            angular.forEach(vm.mediaType, function (type) {
                vm.mediaTypeActive = type.checked;
                if(vm.mediaTypeActive){
                    vm.mediaSelected.push(type.type).toString();
                }
            });
        };
        vm.getItemData = function(data){
            angular.forEach(data, function (itemData) {
                vm.id = itemData.nasa_id;
                vm.description =  itemData.description;
                vm.title =  itemData.title;
                vm.media = itemData.media_type;
            });
        };
    });

}(angular.module('testFront')));
