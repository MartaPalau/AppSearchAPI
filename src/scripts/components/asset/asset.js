(function(app){

    controller.$inject = ['$state'];
    function controller($state){
        var vm = this;
        vm.$onInit = function () {
            vm.assetDetail = $state.params.assetData;
        };

    }

    var component = {
        controller: controller,
        bindings: {
            description: '='
        },
        templateUrl: 'scripts/components/asset/asset.html'
    };
    app.component('asset', component);
})(angular.module("testFront"));