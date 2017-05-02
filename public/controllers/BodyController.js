_myApp
.controller('BodyCtrl', ['$scope', '$rootScope', '$localStorage','$location', function ($scope, $rootScope, $localStorage, $location) {
    $scope.cssHome = 'active';
    
    $scope.showHideMenu = function(){
        if(!angular.element( document.querySelector( 'body' ) ).hasClass('mini-navbar')){
            angular.element( document.querySelector( 'body' ) ).addClass('mini-navbar')
        }else{
            angular.element( document.querySelector( 'body' ) ).removeClass('mini-navbar')
        }
    }

    $scope.showProfile = function(){
        if(!angular.element( document.querySelector( '.profile-element' ) ).hasClass('open')){
            angular.element( document.querySelector( '.profile-element' ) ).addClass('open')
        }else{
            angular.element( document.querySelector( '.profile-element' ) ).removeClass('open')
        }
    }

    $scope.addActive = function(item){
        $scope.cssFunc = '';
        $scope.cssRecep = '';
        $scope.cssForn = '';
        $scope.cssCli = '';
        $scope.cssAgen = '';
        $scope.cssCad = '';
        $scope.cssHome = '';

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
             case 'home':
                $scope.cssCad = '';
                $scope.cssHome = 'active';
            break;
        }
    }
}]);