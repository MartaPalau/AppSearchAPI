(function(app){

    assetCtrl.$inject = ['$state','$localStorage','$timeout'];
    function assetCtrl($state,$localStorage,$timeout){
        var vm = this;
        vm.$onInit = function () {
            vm.assetDetail = $state.params.assetData;
            vm.animation = false;
            vm.showLoading = true;
            $timeout(function () {
                vm.animation = true;
                vm.showLoading = false;
            }, 100);

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
        templateUrl: 'src/scripts/components/asset/asset.html'
    };
    app.component('asset', assetComponent);
})(angular.module("testFront"));