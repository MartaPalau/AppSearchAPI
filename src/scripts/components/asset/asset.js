(function(app){

    assetCtrl.$inject = ['$state','$localStorage'];
    function assetCtrl($state,$localStorage){
        var vm = this;
        vm.$onInit = function () {
            vm.assetDetail = $state.params.assetData;

            if($state.params.assetData){
                vm.assetDetail = $state.params.assetData;
                $localStorage.assetStore = vm.assetDetail;
            }else if($localStorage.assetStore){
                vm.assetDetail = $localStorage.assetStore;
            }

        };
    }
    var assetComponent = {
        controller: assetCtrl,
        templateUrl: 'scripts/components/asset/asset.html'
    };
    app.component('asset', assetComponent);
})(angular.module("testFront"));