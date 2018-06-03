(function (app) {
    'use strict';

    app.controller('searchCtrl', function($http){
        var vm = this;
        vm.assetData = [];
        vm.assetCollection = [];
        vm.assetCollectionImages = [];
        vm.assetCollectionVideos = [];
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
        vm.getImgCollection = function(collection){
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
                    assetLarge: vm.assetLarge,
                    assetThumb: vm.assetThumb
                });

                vm.setAssetCollection(vm.assetCollectionImages);

            }, function (res) {
                console.log(res);
            });
        };
        vm.getVideoCollection = function(collection, assetId){
            $http.get(collection).then(function (res) {
                var assetCol = res.data;
                vm.assetCollection.push(assetCol);
                angular.forEach(vm.assetCollection, function (asset) {
                    vm.assetThumb = 'http://images-assets.nasa.gov/video/' + assetId + '/' + assetId + '~mobile_thumb_00001.png';
                    vm.assetVideo = assetId + '~small.mp4';
                });
                vm.assetCollectionVideos.push({
                    assetThumb: vm.assetThumb,
                    assetVideo: vm.assetVideo
                });

                vm.setAssetCollection(vm.assetCollectionVideos);

            }, function (res) {
                console.log(res);
            });
        };
        vm.setAssetCollection = function(assetCollection){
            angular.forEach(vm.assetData, function (asset, key) {
                vm.assetData[key].assetHref = assetCollection[key];
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
                            var urlCollection = item.href;
                            vm.getAssetData(data,urlCollection);
                            vm.assetData.push({
                                assetId: vm.id,
                                assetHref: {},
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
        
        vm.getAssetData = function(data, urlCollection){
            angular.forEach(data, function (itemData) {
                vm.id = itemData.nasa_id;
                vm.description =  itemData.description;
                vm.title =  itemData.title;
                vm.media = itemData.media_type;
                if(vm.media == 'image'){
                    vm.getImgCollection(urlCollection);
                } else {
                    vm.getVideoCollection(urlCollection);
                }
            });
        };

        vm.getAssetHeight = function (){
            angular.forEach(vm.assetData,function(asset,key){
                vm.assetData[key].assetHeight = document.querySelectorAll('.asset_list_item img')[key].offsetHeight;
                vm.assetData[key].assetTop = document.querySelectorAll('.asset_list_item img')[key].offsetTop;
                vm.assetData[key].assetLeft = document.querySelectorAll('.asset_list_item img')[key].offsetLeft;
                vm.setAssetPosition();
            });
        };
        vm.setAssetPosition = function(){
            angular.forEach(vm.assetData,function(asset,key){
                var currentAsset = vm.assetData[0];
                var previousAsset = currentAsset -1;
                if(asset[key] != 0) {
                    if (asset.assetTop != 163 && asset.assetLeft != 279) {

                    }
                }
            });
        };
    });

}(angular.module('testFront')));
