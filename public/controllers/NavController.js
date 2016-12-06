_myApp
.controller('NavCrtl', ['$scope', '$rootScope', '$localStorage','$location', function ($scope, $rootScope, $localStorage, $location) {
    $scope.UserName = $localStorage.user.name;
    $scope.MyId = $localStorage.user.id;

    $scope.logout = function(){
        if(confirm('Sair do sistema?')){
            delete $localStorage.user;    
            $location.path('/login');
        }
    }

   
}]);