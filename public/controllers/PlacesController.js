_myApp
.factory('PlacesFactory', ['$resource', function($resource){
    return $resource('/places/:id', null, {
        'all': { method:'GET', url : '/places/all' }
    });
}])
.controller('PlacesCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'PlacesFactory', '$route', 
    function ($scope, $routeParams,  $location, $localStorage, PlacesFactory, $route) {
    
    $scope.isLoading = true;
    $scope.isProcessing = false;
    $scope.items = [];

    $scope.delete = function(_id){
        if(confirm('Confirm delete?')){
            $scope.isProcessing = true;
            var place = PlacesFactory.delete({
                id : _id
            }, function(){
                $scope.isProcessing = false;
                if(place.error){
                    alert('Unable to delete the place.');
                }else{
                    alert('Place deleted successfully.');
                    $route.reload();
                }
            });
        }
    }

    $scope.new = function() {
        $location.url('/place?id=0');
    }

    $scope.edit = function(_id) {
        $location.url('/place?id=' + _id);
    }

    angular.element(document).ready(function () {
        var Places = PlacesFactory.all({
            companyId : $localStorage.user.companyId
        }, function(){
            if(Places.error){
                alert('Unable to get places.');
            }else{
                $scope.items = Places.result; 
            }
            $scope.isLoading = false;
        });
    });

}]);