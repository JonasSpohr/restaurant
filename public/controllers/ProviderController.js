_myApp
    .factory('ProviderFactory', ['$resource', function ($resource) {
        return $resource('/providers/:id', null, {
            'update': { method: 'PUT' },
            'find': { method: 'GET', url: '/Providers/byId/:id' }
        });
    }])
    .controller('ProviderCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'ProviderFactory',
        function ($scope, $routeParams, $location, $localStorage, ProviderFactory) {
            $scope.Provider = { profile: {}, address: {} };

            $scope.isAdmin = $localStorage.user.type == 'admin';

            $scope.delete = function () {
                if (confirm('Você confirma a exclusão?')) {
                    var Provider = ProviderFactory.delete({
                        id: $routeParams.id
                    }, function () {
                        if (Provider.error) {
                            alert('Não foi possível excluir os dados do funcionário.');
                        } else {
                            alert('Operação efetuada com sucesso.');
                            $location.url('/Providers');
                        }
                    });
                }
            }

            $scope.save = function () {
                if (!$scope.Provider.razaoSocial || $scope.Provider.razaoSocial == '') {
                    alert('A razão social deve ser informada');
                    return;
                }
                if (!$scope.Provider.phone || $scope.Provider.phone == '') {
                    alert('O telefone deve ser informado');
                    return;
                }
                if (!$scope.Provider.cnpj || $scope.Provider.cnpj == '') {
                    alert('O cnpj deve ser informado');
                    return;
                }
                if (!$scope.Provider.gender || $scope.Provider.dateOfBirth == '') {
                    alert('A data de nascimento deve ser informada');
                    return;
                }
                if (!$scope.Provider.email || $scope.Provider.email == '') {
                    alert('O email deve ser informado');
                    return;
                }
                if (!$scope.Provider.mobile || $scope.Provider.mobile == '') {
                    alert('O celular deve ser informado');
                    return;
                }
                if (!$scope.Provider.cpf || $scope.Provider.cpf == '') {
                    alert('cpf deve ser informado');
                    return;
                }

                $scope.Provider.companyId = $localStorage.user.companyId;
                if ($routeParams.id == 0) {
                    var Provider = new ProviderFactory($scope.Provider);

                    Provider.$save(function (err) {
                        alert('Operação efetuada com sucesso.');
                        $location.url('/provider?id=' + Provider.result._id);
                    });
                } else {
                    ProviderFactory.update({ id: $routeParams.id }, $scope.Provider, function () {
                        alert('Operação efetuada com sucesso.');
                    });
                }
            }

            if ($routeParams.id != 0) {
                angular.element(document).ready(function () {
                    var Provider = ProviderFactory.find({
                        id: $routeParams.id
                    }, function () {
                        if (Provider.error) {
                            alert('Não foi possível consultar os dados do fornecedor.');
                        } else {
                            $scope.Provider = Provider.result;
                        }
                    });
                });
            }
        }]);