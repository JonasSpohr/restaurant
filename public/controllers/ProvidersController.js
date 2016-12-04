_myApp
.factory('ProvidersFactory', ['$resource', function($resource){
    return $resource('/providers/:id', null, {
        'all': { method:'GET', url : '/providers/all' }
    });
}])
.controller('ProvidersCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'ProvidersFactory', '$route', 
    function ($scope, $routeParams,  $location, $localStorage, ProvidersFactory, $route) {
    
    $scope.isLoading = true;
    $scope.isProcessing = false;
    $scope.items = [];
    $scope.isAdmin = $localStorage.user.type == 'admin';

    $scope.delete = function(_id){
        if(confirm('Você confirma a exclusão?')){
            $scope.isProcessing = true;
            var provider = ProvidersFactory.delete({
                id : _id
            }, function(){
                $scope.isProcessing = false;
                if(provider.error){
                    alert('Não foi possível excluir os dados.');
                }else{
                    alert('Operação efetuada com sucesso.');
                    $route.reload();
                }
            });
        }
    }

    $scope.new = function() {
        $location.url('/provider?id=0');
    }

    $scope.edit = function(_id) {
        $location.url('/provider?id=' + _id);
    }

    angular.element(document).ready(function () {
        var Providers = ProvidersFactory.all({
            companyId : $localStorage.user.companyId
        }, function(){
            if(Providers.error){
                alert('Não foi possível consultar os funcionários.');
            }else{
                $scope.items = Providers.result; 
            }
            $scope.isLoading = false;
        });
    });

}]);