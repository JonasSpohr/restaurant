_myApp
.factory('EmployeesFactory', ['$resource', function($resource){
    return $resource('/users/:id', null, {
        'all': { method:'GET', url : '/users/all' }
    });
}])
.controller('EmployeesCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'EmployeesFactory', '$route', 
    function ($scope, $routeParams,  $location, $localStorage, EmployeesFactory, $route) {
    
    $scope.isLoading = true;
    $scope.isProcessing = false;
    $scope.items = [];
    $scope.MyId = $localStorage.user.id;
    $scope.isAdmin = $localStorage.user.type == 'admin';

    $scope.delete = function(_id){
        if(confirm('Você confirma a exclusão?')){
            $scope.isProcessing = true;
            var employee = EmployeesFactory.delete({
                id : _id
            }, function(){
                $scope.isProcessing = false;
                if(employee.error){
                    alert('Não foi possível excluir os dados do funcionário.');
                }else{
                    alert('Operação efetuada com sucesso.');
                    $route.reload();
                }
            });
        }
    }

    $scope.new = function() {
        $location.url('/employee?id=0');
    }

    $scope.edit = function(_id) {
        $location.url('/employee?id=' + _id);
    }

    angular.element(document).ready(function () {
        var employees = EmployeesFactory.all({
            companyId : $localStorage.user.companyId
        }, function(){
            if(employees.error){
                alert('Não foi possível consultar os funcionários.');
            }else{
                $scope.items = employees.result; 
            }
            $scope.isLoading = false;
        });
    });

}]);