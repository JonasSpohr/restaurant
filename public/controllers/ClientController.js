_myApp
    .factory('ClientFactory', ['$resource', function ($resource) {
        return $resource('/clients/:id', null, {
            'update': { method: 'PUT' },
            'find': { method: 'GET', url: '/clients/byId/:id' }
        });
    }])
    .controller('ClientCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'ClientFactory',
        function ($scope, $routeParams, $location, $localStorage, ClientFactory) {

            $scope.newEvent = function () {
                $location.url('/event?id=0&clientId=' + $routeParams.id);
            }

            $scope.editEvent = function (id) {
                $location.url('/event?id=' + id + '&clientId=' + $routeParams.id);
            }

            $scope.deleteEvent = function (id) {
                if (confirm('Você confirma a exclusão?')) {
                    var _client = ClientFactory.find({
                        id: $routeParams.id
                    }, function () {
                        for (i = 0; i < _client.result.events.length; i++) {
                            if (_client.result.events[i]._id == id) {
                                _client.result.events.splice(i, 1);
                                break;
                            }
                        }

                        ClientFactory.update({ id: $routeParams.id }, _client.result, function () {
                            alert('Operação efetuada com sucesso.');
                            for (i = 0; i < $scope.Client.events.length; i++) {
                                if ($scope.Client.events[i]._id == id) {
                                    $scope.Client.events.splice(i, 1);
                                    break;
                                }
                            }
                        });
                    });
                }
            }

            $scope.Client = { address: {} };

            $scope.isAdmin = $localStorage.user.type == 'admin';

            $scope.delete = function () {
                if (confirm('Você confirma a exclusão?')) {
                    var Client = ClientFactory.delete({
                        id: $routeParams.id
                    }, function () {
                        if (Client.error) {
                            alert('Não foi possível excluir os dados do funcionário.');
                        } else {
                            alert('Operação efetuada com sucesso.');
                            $location.url('/Clients');
                        }
                    });
                }
            }

            $scope.save = function () {
                if (!$scope.Client.companyName || $scope.Client.companyName == '') {
                    alert('A empresa deve ser informada');
                    return;
                }
                if (!$scope.Client.name || $scope.Client.name == '') {
                    alert('O nome deve ser informado');
                    return;
                }
                if (!$scope.Client.email || $scope.Client.email == '') {
                    alert('O email deve ser informado');
                    return;
                }
                if (!$scope.Client.phone || $scope.Client.phone == '') {
                    alert('O telefone comercial deve ser informado');
                    return;
                }
                if (!$scope.Client.cnpj || $scope.Client.cnpj == '') {
                    alert('O CNPJ deve ser informado');
                    return;
                }
                if (!$scope.Client.contact1 || $scope.Client.contact1 == '') {
                    alert('O contato 1 deve ser informado');
                    return;
                }

                $scope.Client.companyId = $localStorage.user.companyId;
                if ($routeParams.id == 0) {
                    var Client = new ClientFactory($scope.Client);

                    Client.$save(function (err) {
                        alert('Operação efetuada com sucesso.');
                        $location.url('/client?id=' + Client.result._id);
                    });
                } else {
                    ClientFactory.update({ id: $routeParams.id }, $scope.Client, function () {
                        alert('Operação efetuada com sucesso.');
                    });
                }
            }

            if ($routeParams.id != 0) {
                angular.element(document).ready(function () {
                    var Client = ClientFactory.find({
                        id: $routeParams.id
                    }, function () {
                        if (Client.error) {
                            alert('Não foi possível consultar os dados do fornecedor.');
                        } else {
                            $scope.Client = Client.result;
                        }
                    });
                });
            }
        }]);