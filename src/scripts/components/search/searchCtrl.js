(function (app) {
    'use strict';

    searchCtrl.$inject = ['$scope','angularGridInstance','$localStorage','searchService','toastr'];
    function searchCtrl($scope,angularGridInstance,$localStorage,searchService,toastr){
        //init variables from controller and image routes
        var vm = this,
        imgBaseUrl = 'http://images-assets.nasa.gov/image/',
        videoBaseUrl = 'http://images-assets.nasa.gov/video/',
        imgThumbExt = '~thumb.jpg',
        imgLargeExt = '~small.jpg',
        videoThumbExt = '~small_thumb_00002.png',
        videoMediaExt = '~small.mp4';

        vm.$onInit = function(){
            //init parameters object as empty array
            vm.assetData = [];
            vm.results = false;
            vm.showLoading = false;
            vm.mediaType = [
                {
                    id: 1,
                    type: 'image'
                },
                {
                    id: 2,
                    type: 'video'
                }
            ];
            //init both media type as true
            vm.initMediaType();
            //init storage data
            vm.getQueryStorage();
        };
        //refresh image masonry gallery
        $scope.refresh = function(){
            angularGridInstance.gallery.refresh();
        };

        vm.initMediaType = function(){
            angular.forEach(vm.mediaType, function (typeId) {
                typeId.id = true;
            });
        };

        vm.getQueryStorage = function(){
            if($localStorage.mediaTypeIdSelected){
                angular.forEach($localStorage.mediaTypeIdSelected, function (typeId,key) {
                    vm.mediaType[key].id = typeId;
                });
            }
            if($localStorage.mediaTypeSelected){
                vm.mediaSelected = $localStorage.mediaTypeSelected;
            }
            if($localStorage.searchQuery){
                vm.getQuery($localStorage.searchQuery);
                vm.search = $localStorage.searchQuery;
                vm.showLoading = true;
            }
        };
        //save media type selected
        vm.mediaTypeQuery = function(index){
            $localStorage.mediaTypeIdSelected = [];
            angular.forEach(vm.mediaType, function (type, key) {
                if(index == key) {
                    type.id = !type.id;
                }
                $localStorage.mediaTypeIdSelected.push(type.id);
            });
        };
        //get search query http get comes from searchService service file
       vm.getQuery = function (search){
            vm.setMediaType();
            vm.showLoading = true;
            vm.assetData = [];
           if(search) {
               $localStorage.searchQuery = search;
               searchService.getQuery(search,vm.mediaSelected).then(function(res){
                   vm.showLoading = false;
                   vm.collItem = res.data.collection.items;
                   vm.noResults(vm.collItem);
                   vm.iterateAssetItems(vm.collItem);
               },function(){
               toastr.error('ERROR');
           });
           }else{
               vm.searchIsEmpty(search);
           }
        };
        //iterate assets to generate asset object with useful data
        vm.iterateAssetItems = function(collItem){
            angular.forEach(collItem, function (item) {
                var data = item.data;
                vm.getAssetData(data);
                vm.assetData.push({assetId: vm.id, assetHref: vm.assetHref, description: vm.description, title: vm.title, media: vm.media});
            });
        };
        //bolean parameter to control search results
        vm.noResults = function(assetItems){
            vm.results = (assetItems.length > 0) ? false : true;
        };
        //bolean parameter to control input
        vm.searchIsEmpty = function(search){
            vm.isEmpty = (search)? false : true;
            vm.showLoading = false;
        };
        //set media type for search query
        vm.setMediaType = function(){
            vm.mediaSelected = [];
            angular.forEach(vm.mediaType, function (type) {
                if(type.id){
                    vm.mediaSelected.push(type.type).toString();
                    $localStorage.mediaTypeSelected = vm.mediaSelected;
                }
            });
        };
        //get useful asset information
        vm.getAssetData = function(data){
            angular.forEach(data, function (itemData) {
                vm.id = itemData.nasa_id;
                vm.description = itemData.description;
                vm.title = itemData.title;
                vm.media = itemData.media_type;
                vm.getAssetSrc(vm.media, vm.id);
            });
        };
        //get assets source based on type
        vm.getAssetSrc = function(mediaType, id){
            if(mediaType == 'image'){
                vm.imageSrc(id);
            } else if (mediaType == 'video'){
                vm.videoSrc(id);
            }
        };
        //set image sources
        vm.imageSrc = function(id){
            vm.assetThumb = imgBaseUrl + id + '/' + id + imgThumbExt;
            vm.assetLarge = imgBaseUrl + id + '/' + id + imgLargeExt;
            vm.assetHref = {
                assetThumb: vm.assetThumb,
                assetLarge: vm.assetLarge
            };
        };
        //set video sources
        vm.videoSrc = function(id){
            vm.assetThumbPng = videoBaseUrl + id + '/' + id + videoThumbExt;
            vm.assetVideo = videoBaseUrl + id + '/' + id + videoMediaExt;
            vm.assetHref = {
                assetThumb: vm.assetThumbPng,
                assetVideo: vm.assetVideo
            };
        };
    }

    app.controller('searchCtrl', searchCtrl);

}(angular.module('testFront')));
