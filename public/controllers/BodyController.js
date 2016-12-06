_myApp
.controller('BodyCtrl', ['$scope', '$rootScope', '$localStorage','$location', function ($scope, $rootScope, $localStorage, $location) {
    $scope.showHideMenu = function(){
        if(!angular.element( document.querySelector( 'body' ) ).hasClass('mini-navbar')){
            angular.element( document.querySelector( 'body' ) ).addClass('mini-navbar')
        }else{
            angular.element( document.querySelector( 'body' ) ).removeClass('mini-navbar')
        }
    }

    $scope.addActive = function(item){
        $scope.cssFunc = '';
        $scope.cssRecep = '';
        $scope.cssForn = '';
        $scope.cssCli = '';
        $scope.cssAgen = '';
        $scope.cssCad = '';

        switch(item){
            case 'func':
                $scope.cssCad = 'active';
                $scope.cssFunc = 'active'
            break;
            case 'recep':
                $scope.cssCad = 'active';
                $scope.cssRecep = 'active'
            break;
            case 'forn':
                $scope.cssCad = 'active';
                $scope.cssForn = 'active'
            break;
            case 'cli':
                $scope.cssCad = 'active';
                $scope.cssCli = 'active'
            break;
            case 'agen':
                $scope.cssCad = '';
                $scope.cssAgen = 'active';
            break;
        }
    }
}]);