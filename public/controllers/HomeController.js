_myApp
.factory('HomeFactory', ['$resource', function ($resource) {
    return $resource('/places/:id', null, {
        'allAvailable': { method: 'GET', url: '/places/allAvailableForVote' }
    });
}])
.factory('VoteFactory', ['$resource', function ($resource) {
    return $resource('/votes/:id', null, {
        'vote': { method: 'POST', url: '/votes' },
        'hasVoted': { method: 'GET', url: '/votes/findTodayByUserId' }
    });
}])
.controller('HomeCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'HomeFactory', '$route', 'VoteFactory',
    function ($scope, $routeParams, $location, $localStorage, HomeFactory, $route, VoteFactory) {

        $scope.places = [];           
        $scope.canVote = false;
        $scope.model = {};
        $scope.isProcessing = true;

        var dateLimit = new Date(new Date().setHours(11,45,0,0));

        angular.element(document).ready(function () {

            var Places = HomeFactory.allAvailable({}, 
            function(){
                if(Places.error){
                    alert('Unable to get places for voting :(.');
                }else{
                    $scope.places = Places.result;                    

                    //check is user can vote today
                    var hasVoted = VoteFactory.hasVoted({
                        userId : $localStorage.user.id
                    }, 
                    function(){
                         $scope.isProcessing = false;
                        if(hasVoted.error){
                            //alert('Unable to get places for voting :(.');
                        }else{
                            //the can vote if he didnt vote and is the time is before 11:45
                            $scope.canVote = hasVoted.result.length == 0 && (new Date() < dateLimit);
                        }
                    });
                }
            });
        });

        $scope.vote = function() {
            if(!$scope.model.placeSelected || $scope.model.placeSelected == ''){
                alert('Please select a place to vote!');
                return;
            }

            if(confirm('Do yuo confirm your vote?')){
                $scope.isProcessing = true;
                var Vote = VoteFactory.vote({
                    placeId : $scope.model.placeSelected,
                    userId : $localStorage.user.id
                },
                function(){
                    if(Vote.error){
                        alert('Unable to vote :(.');
                    }else{
                        alert('Your vote has been saved.');
                        $scope.canVote = false;
                        $scope.isProcessing = false;
                    }
                });
            }
        }
    }]);