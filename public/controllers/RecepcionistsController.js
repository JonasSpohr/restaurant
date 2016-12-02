_myApp
.factory('RecepcionistsFactory', ['$resource', function($resource){
    return $resource('/recepcionists/:id', null, {
        'all': { method:'GET', url : '/recepcionists/all' }
    });
}])
.controller('RecepcionistsCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'RecepcionistsFactory', '$route', 
    function ($scope, $routeParams,  $location, $localStorage, RecepcionistsFactory, $route) {
    
    $scope.isLoading = true;
    $scope.isProcessing = false;
    $scope.items = [];
    $scope.isAdmin = $localStorage.user.type == 'admin';

    $scope.delete = function(_id){
        if(confirm('Você confirma a exclusão?')){
            $scope.isProcessing = true;
            var recepcionist = RecepcionistsFactory.delete({
                id : _id
            }, function(){
                $scope.isProcessing = false;
                if(recepcionist.error){
                    alert('Não foi possível excluir os dados.');
                }else{
                    alert('Operação efetuada com sucesso.');
                    $route.reload();
                }
            });
        }
    }

    $scope.new = function() {
        $location.url('/recepcionist?id=0');
    }

    $scope.edit = function(_id) {
        $location.url('/recepcionist?id=' + _id);
    }

    angular.element(document).ready(function () {
        var Recepcionists = RecepcionistsFactory.all({
            companyId : $localStorage.user.companyId
        }, function(){
            if(Recepcionists.error){
                alert('Não foi possível consultar os funcionários.');
            }else{
                $scope.items = Recepcionists.result; 
            }
            $scope.isLoading = false;
        });
    });

}]);