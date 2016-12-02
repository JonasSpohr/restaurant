_myApp
.factory('EmployeeFactory', ['$resource', function($resource){
    return $resource('/users/:id', null, {
        'update' : {method : 'PUT'},
        'find': { method:'GET', url : '/users/byId/:id' }
     });
}])
.controller('EmployeeCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'EmployeeFactory',  
function ($scope, $routeParams,  $location, $localStorage, EmployeeFactory) {
    $scope.user = {};

    $scope.MyId = $localStorage.user.id;
    $scope.Me = $localStorage.user.id == $routeParams.id;
    $scope.isAdmin = $localStorage.user.type == 'admin';

    $scope.delete = function(){
        if(confirm('Você confirma a exclusão?')){
            var employee = EmployeeFactory.delete({
                id : $routeParams.id
            }, function(){
                if(employee.error){
                    alert('Não foi possível excluir os dados do funcionário.');
                }else{
                    alert('Operação efetuada com sucesso.');
                    $location.url('/employees');
                }
            });
        }
    }

    $scope.save = function (){
        if(!$scope.user.name || $scope.user.name == ''){
            alert('O nome deve ser informado');
            return;
        }
        if(!$scope.user.email || $scope.user.email == ''){
            alert('O email deve ser informado');
            return;
        }
        if(!$scope.user.phone || $scope.user.phone == ''){
            alert('O telefone deve ser informado');
            return;
        }
        if(!$scope.user.type || $scope.user.type == ''){
            alert('O tipo deve ser informado');
            return;
        }

        if($routeParams.id == 0){
            var employee = new EmployeeFactory({ 
                name: $scope.user.name,
                email:  $scope.user.email,
                pwd: 'c90796369a77805cf3c2131228ba749b',
                type: $scope.user.type,
                phone: $scope.user.phone,
                active: $scope.user.active ? 1 : 0,
                companyId: $localStorage.user.companyId
            });

            employee.$save(function(){
              alert('Operação efetuada com sucesso.');
              $location.url('/employee?id=' + employee.result._id);
            });
        }else{
            EmployeeFactory.update({id: $routeParams.id}, $scope.user, function(){
                alert('Operação efetuada com sucesso.');
            });
        }
    }

    if($routeParams.id != 0){
        angular.element(document).ready(function () {
            var employee = EmployeeFactory.find({
                id : $routeParams.id
            }, function(){
                if(employee.error){
                    alert('Não foi possível consultar os dados do funcionário.');
                }else{
                    $scope.user = employee.result; 
                    $scope.user.active = $scope.user.active == 1 ? true : false; 
                }
            });
        });
    }    
}]);