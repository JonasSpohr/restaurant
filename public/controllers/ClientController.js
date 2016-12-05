_myApp
    .factory('ClientFactory', ['$resource', function ($resource) {
        return $resource('/clients/:id', null, {
            'update': { method: 'PUT' },
            'find': { method: 'GET', url: '/clients/byId/:id' }
        });
    }])
    .controller('ClientCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'ClientFactory',
        function ($scope, $routeParams, $location, $localStorage, ClientFactory) {
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