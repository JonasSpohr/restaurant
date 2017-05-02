_myApp
.factory('RecoverFactory', ['$resource', function($resource){
    return $resource('/users/:id', null, {
        'recover': { method:'POST', url : '/users/recover' }
    });
}])
.controller('PwdRecoverCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'RecoverFactory', 'md5','$localStorage', 
function ($scope, $rootScope, $routeParams,  $location, RecoverFactory, md5, $localStorage) {
    $scope.data = {};

    $scope.recover = function () {
        if(!$scope.data.email || $scope.data.email == ''){
            alert('O email deve ser informado');
            return;
        }

        $scope.isProcessing = true;
        var user = RecoverFactory.recover({ 
            email : $scope.data.email
        }, function(){
            if(user.error){
                alert('Não foi possível enviar a senha para o email informado. Verifique se esta correto.');
            }else{               
                alert('Uma nova senha foi enviada para seu email');
                $location.url('/login');                                
            }
            $scope.isProcessing = false;
        });
    }
}]);