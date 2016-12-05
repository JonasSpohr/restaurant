_myApp
    .factory('EventFactory', ['$resource', function ($resource) {
        return $resource('/Events/:id', null, {
            'update': { method: 'PUT' },
            'find': { method: 'GET', url: '/Events/byId/:id' }
        });
    }])
    .controller('EventCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'EventFactory',
        function ($scope, $routeParams, $location, $localStorage, EventFactory) {

            $scope.ClientId = $routeParams.clientId;
            $scope.Event = { address: {} };

            $scope.isAdmin = $localStorage.user.type == 'admin';

            $scope.delete = function () {
                if (confirm('Você confirma a exclusão?')) {
                    var Event = EventFactory.delete({
                        id: $routeParams.id
                    }, function () {
                        if (Event.error) {
                            alert('Não foi possível excluir os dados do funcionário.');
                        } else {
                            alert('Operação efetuada com sucesso.');
                            $location.url('/Events');
                        }
                    });
                }
            }

            $scope.save = function () {
                if (!$scope.Event.companyName || $scope.Event.companyName == '') {
                    alert('A empresa deve ser informada');
                    return;
                }                

                $scope.Event.companyId = $localStorage.user.companyId;
                if ($routeParams.id == 0) {
                    var Event = new EventFactory($scope.Event);

                    Event.$save(function (err) {
                        alert('Operação efetuada com sucesso.');
                        $location.url('/Event?id=' + Event.result._id);
                    });
                } else {
                    EventFactory.update({ id: $routeParams.id }, $scope.Event, function () {
                        alert('Operação efetuada com sucesso.');
                    });
                }
            }

            if ($routeParams.id != 0) {
                angular.element(document).ready(function () {
                    var Event = EventFactory.find({
                        id: $routeParams.id
                    }, function () {
                        if (Event.error) {
                            alert('Não foi possível consultar os dados do fornecedor.');
                        } else {
                            $scope.Event = Event.result;
                        }
                    });
                });
            }
        }]);