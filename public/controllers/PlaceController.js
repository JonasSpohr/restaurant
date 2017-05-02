_myApp
    .factory('PlaceFactory', ['$resource', function ($resource) {
        return $resource('/places/:id', null, {
            'update': { method: 'PUT' },
            'find': { method: 'GET', url: '/places/byId/:id' }
        });
    }])
    .controller('PlaceCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'PlaceFactory',
        function ($scope, $routeParams, $location, $localStorage, PlaceFactory) {
            $scope.Place = { };
            $scope.isProcessing = false;

            $scope.delete = function () {
                if (confirm('Confirm delete?')) {
                    $scope.isProcessing = true;
                    var Place = PlaceFactory.delete({
                        id: $routeParams.id
                    }, function () {
                        if (Place.error) {
                            $scope.isProcessing = false;
                            alert('Unable to delete the place.');
                        } else {
                            alert('Place deleted successfully.');
                            $location.url('/Places');
                        }
                    });
                }
            }

            $scope.save = function () {
                if (!$scope.Place.name || $scope.Place.name == '') {
                    alert('The name must be informed');
                    return;
                }                

                $scope.isProcessing = true;
                if ($routeParams.id == 0) {
                    var Place = new PlaceFactory($scope.Place);

                    Place.$save(function (err) {
                        alert('Place saved successfully.');
                        $location.url('/place?id=' + Place.result._id);
                    });
                } else {
                    PlaceFactory.update({ id: $routeParams.id }, $scope.Place, function () {
                        alert('Place saved successfully.');
                        $scope.isProcessing = false;
                    });
                }
            }

            if ($routeParams.id != 0) {
                angular.element(document).ready(function () {
                    var Place = PlaceFactory.find({
                        id: $routeParams.id
                    }, function () {
                        if (Place.error) {
                            alert('Unable to get the place data');
                        } else {
                            $scope.Place = Place.result;
                        }
                    });
                });
            }
        }]);