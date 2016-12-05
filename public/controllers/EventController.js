_myApp
    .factory('EventFactory', ['$resource', function ($resource) {
        return $resource('/clients/:id', null, {
            'update': { method: 'PUT' },
            'find': { method: 'GET', url: '/clients/byId/:id' }
        });
    }])
    .controller('EventCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'EventFactory',
        function ($scope, $routeParams, $location, $localStorage, EventFactory) {

            $scope.ClientId = $routeParams.clientId;
            $scope.ClientEvent = { };

            $scope.isAdmin = $localStorage.user.type == 'admin';

            $scope.delete = function () {
                if (confirm('Você confirma a exclusão?')) {
                    var _client = EventFactory.find({
                        id: $routeParams.clientId
                    }, function () {
                        for (i = 0; i < _client.result.events.length; i++) {
                            if (_client.result.events[i]._id == $routeParams.id) {
                                _client.result.events.splice(i, 1);
                                break;
                            }
                        }

                        EventFactory.update({ id: $routeParams.clientId }, _client.result, function () {
                            alert('Operação efetuada com sucesso.');
                            $location.url('/client?id=' + $routeParams.clientId);
                        });
                    });
                }
            }

            $scope.save = function () {
                if (!$scope.ClientEvent.contactName || $scope.ClientEvent.contactName == '') {
                    alert('O nome do contato deve ser informado');
                    return;
                }
                if(!$scope.ClientEvent.event){
                    alert('Os dados do evento devem ser informados.');
                    return;
                }
                if (!$scope.ClientEvent.event.type || $scope.ClientEvent.event.type == '') {
                    alert('O tipo do evento deve ser informado');
                    return;
                }
                if (!$scope.ClientEvent.event.title || $scope.ClientEvent.event.title == '') {
                    alert('O evento deve ser informado');
                    return;
                }
                if (!$scope.ClientEvent.event.place || $scope.ClientEvent.event.place == '') {
                    alert('O local deve ser informado');
                    return;
                }
                if (!$scope.ClientEvent.event.date || $scope.ClientEvent.event.date == '') {
                    alert('A data deve ser informada');
                    return;
                }

                //$scope.ClientEvent.companyId = $localStorage.user.companyId;
                if ($routeParams.id == 0) {
                    var _client = EventFactory.find({
                        id: $routeParams.clientId
                    }, function () {
                        _client.result.events.push($scope.ClientEvent);
                        EventFactory.update({ id: $routeParams.clientId }, _client.result, function (data) {
                            if(!data.result){
                                alert('Não foi possível salvar os dados. Erro:' + JSON.stringify(data));
                            }else{
                                alert('Operação efetuada com sucesso.');
                                $location.url('/client?id=' + $routeParams.clientId);
                            }
                        });
                    });

                } else {
                    var _client = EventFactory.find({
                        id: $routeParams.clientId
                    }, function () {
                        for (i = 0; i < _client.result.events.length; i++) {
                            if (_client.result.events[i]._id == $routeParams.id) {
                                _client.result.events[i] = $scope.ClientEvent;
                                break;
                            }
                        }

                        EventFactory.update({ id: $routeParams.clientId }, _client.result, function (data) {
                            if(!data.result){
                                alert('Não foi possível salvar os dados. Erro:' + JSON.stringify(data));
                            }else{
                                alert('Operação efetuada com sucesso.');
                            }
                        });
                    });
                }
            }

            if ($routeParams.id != 0) {
                angular.element(document).ready(function () {
                    var _client = EventFactory.find({
                        id: $routeParams.clientId
                    }, function () {
                        for (i = 0; i < _client.result.events.length; i++) {
                            if (_client.result.events[i]._id == $routeParams.id) {
                                $scope.ClientEvent = _client.result.events[i];
                                break;
                            }
                        }

                    });
                });
            }
        }]);