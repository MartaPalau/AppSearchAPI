(function(app){

    assetListCtrl.$inject = [];
    function assetListCtrl(){
    }
    var assetListComponent = {
        controller: assetListCtrl,
        require: {
            sCtrl: '^search'
        },
        templateUrl: 'scripts/components/search/asset-list/asset-list.html'
    };
    app.component('assetList', assetListComponent);
})(angular.module("testFront"));
