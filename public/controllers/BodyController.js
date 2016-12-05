_myApp
.controller('BodyCtrl', ['$scope', '$rootScope', '$localStorage','$location', function ($scope, $rootScope, $localStorage, $location) {
    $scope.cssAdd = $rootScope.addMinicss;
}]);