_myApp
    .factory('RecepcionistFactory', ['$resource', function ($resource) {
        return $resource('/recepcionists/:id', null, {
            'update': { method: 'PUT' },
            'find': { method: 'GET', url: '/recepcionists/byId/:id' }
        });
    }])
    .controller('RecepcionistCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'RecepcionistFactory',
        function ($scope, $routeParams, $location, $localStorage, RecepcionistFactory) {
            $scope.recepcionist = { profile: {}, address: {} };
            $scope.isProcessing = false;

            $scope.isAdmin = $localStorage.user.type == 'admin';

            $scope.delete = function () {
                if (confirm('Você confirma a exclusão?')) {
                    $scope.isProcessing = true;
                    var Recepcionist = RecepcionistFactory.delete({
                        id: $routeParams.id
                    }, function () {
                        if (Recepcionist.error) {
                            alert('Não foi possível excluir os dados do funcionário.');
                            $scope.isProcessing = false;
                        } else {
                            alert('Operação efetuada com sucesso.');
                            $location.url('/recepcionists');
                        }
                    });
                }
            }

            $scope.save = function () {
                if (!$scope.recepcionist.name || $scope.recepcionist.name == '') {
                    alert('O nome deve ser informado');
                    return;
                }
                if (!$scope.recepcionist.gender || $scope.recepcionist.gender == '') {
                    alert('O gênero deve ser informado');
                    return;
                }
                if (!$scope.recepcionist.gender || $scope.recepcionist.dateOfBirth == '') {
                    alert('A data de nascimento deve ser informada');
                    return;
                }
                if (!$scope.recepcionist.email || $scope.recepcionist.email == '') {
                    alert('O email deve ser informado');
                    return;
                }
                if (!$scope.recepcionist.mobile || $scope.recepcionist.mobile == '') {
                    alert('O celular deve ser informado');
                    return;
                }
                if (!$scope.recepcionist.cpf || $scope.recepcionist.cpf == '') {
                    alert('cpf deve ser informado');
                    return;
                }

                $scope.isProcessing = true;
                $scope.recepcionist.companyId = $localStorage.user.companyId;
                if ($routeParams.id == 0) {
                    var Recepcionist = new RecepcionistFactory($scope.recepcionist);

                    Recepcionist.$save(function (err) {
                        alert('Operação efetuada com sucesso.');
                        $location.url('/recepcionist?id=' + Recepcionist.result._id);
                    });
                } else {
                    RecepcionistFactory.update({ id: $routeParams.id }, $scope.recepcionist, function () {
                        alert('Operação efetuada com sucesso.');
                        $scope.isProcessing = false;
                    });
                }
            }

            if ($routeParams.id != 0) {
                angular.element(document).ready(function () {
                    var Recepcionist = RecepcionistFactory.find({
                        id: $routeParams.id
                    }, function () {
                        if (Recepcionist.error) {
                            alert('Não foi possível consultar os dados do funcionário.');
                        } else {
                            $scope.recepcionist = Recepcionist.result;
                        }
                    });
                });
            }
        }]);