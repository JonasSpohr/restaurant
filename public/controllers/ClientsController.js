_myApp
.factory('ClientsFactory', ['$resource', function($resource){
    return $resource('/clients/:id', null, {
        'all': { method:'GET', url : '/clients/all' }
    });
}])
.controller('ClientsCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'ClientsFactory', '$route', 
    function ($scope, $routeParams,  $location, $localStorage, ClientsFactory, $route) {
    
    $scope.isLoading = true;
    $scope.isProcessing = false;
    $scope.items = [];
    $scope.isAdmin = $localStorage.user.type == 'admin';

    $scope.delete = function(_id){
        if(confirm('Você confirma a exclusão?')){
            $scope.isProcessing = true;
            var client = ClientsFactory.delete({
                id : _id
            }, function(){
                $scope.isProcessing = false;
                if(client.error){
                    alert('Não foi possível excluir os dados.');
                }else{
                    alert('Operação efetuada com sucesso.');
                    $route.reload();
                }
            });
        }
    }

    $scope.new = function() {
        $location.url('/client?id=0');
    }

    $scope.edit = function(_id) {
        $location.url('/client?id=' + _id);
    }

    angular.element(document).ready(function () {
        var Clients = ClientsFactory.all({
            companyId : $localStorage.user.companyId
        }, function(){
            if(Clients.error){
                alert('Não foi possível consultar os funcionários.');
            }else{
                $scope.items = Clients.result; 
            }
            $scope.isLoading = false;
        });
    });

}]);