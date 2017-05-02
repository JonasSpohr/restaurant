_myApp
.controller('LogoutCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'UserFactory', 'md5','$localStorage', function ($scope, $rootScope, $routeParams,  $location, UserFactory, md5, $localStorage) {
    angular.element(document).ready(function () {
        alert('das')
        delete $localStorage.user;    
        $location.path('/login') 
    });
}]);