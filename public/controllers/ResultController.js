_myApp
.factory('ResultFactory', ['$resource', function ($resource) {
    return $resource('/places/:id', null, {
        'getWinner': { method: 'GET', url: '/places/winner' },
        'allAvailable': { method: 'GET', url: '/places/allAvailableForVote' }
    });
}])
.controller('ResultCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'ResultFactory', '$route',
    function ($scope, $routeParams, $location, $localStorage, ResultFactory, $route) {

        $scope.isProcessing = true;
        $scope.winner = {};
        $scope.placesForTomorrow = [];
        $scope.hasWinner = false;

        angular.element(document).ready(function () {

            var Winner = ResultFactory.getWinner({}, 
              function(){
                  if(Winner.error){
                      alert('Unable to get the winner :(.');
                  }else{
                     $scope.isProcessing = false;                   
                     $scope.winner =  Winner.result[0] == undefined ? Winner.result : Winner.result[0];
                     $scope.hasWinner = $scope.winner._id != undefined;
                 }
             });


            var Places = ResultFactory.allAvailable({}, 
            function(){
                if(Places.error){
                    alert('Unable to get places for tomorrow :(.');
                }else{
                    $scope.placesForTomorrow = Places.result;
                }
            });
        });
    }]);