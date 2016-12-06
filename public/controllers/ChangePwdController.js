_myApp
.factory('ChangePwdFactory', ['$resource', function($resource){
    return $resource('/users/:id', null, {
        'update' : {method : 'PUT'},
        'find': { method:'GET', url : '/users/byId/:id' }
    });
}])
.controller('ChangePwdCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'ChangePwdFactory', 'md5',
    function ($scope, $routeParams,  $location, $localStorage, ChangePwdFactory, md5) {    
    $scope.isProcessing = false;
    $scope.pwd = {};

    $scope.save = function (){
        if(!$scope.pwd.actual || $scope.pwd.actual == ''){
            alert('A senha atual deve ser informada');
            return;
        }
        if(!$scope.pwd.new || $scope.pwd.new == ''){
            alert('A nova senha deve ser informada');
            return;
        }
        if($scope.pwd.new.length < 8){
            alert('A nova senha deve ter pelo menos 8 digitos');
            return;
        }
        if(!$scope.pwd.confirmNew || $scope.pwd.confirmNew == ''){
            alert('A confirmação da nova senha deve ser informada');
            return;
        }

        if($scope.pwd.new !== $scope.pwd.confirmNew){
            alert('As confirmação da nova senha não é igual a nova senha');
            return;
        }        

        $scope.isProcessing = true;
        var employee = ChangePwdFactory.find({
            id : $localStorage.user.id
        }, function(){
            if(employee.error){
                alert('Não foi possível consultar os dados do funcionário.');
            }else{
                if(md5.createHash($scope.pwd.actual || '') !== employee.result.pwd){
                    $scope.isProcessing = false;
                    alert('A senha atual que você informou esta errada.');
                }else{
                    employee.result.pwd = md5.createHash($scope.pwd.new || '');

                    ChangePwdFactory.update({id: $localStorage.user.id}, employee.result, function(){
                        alert('Operação efetuada com sucesso.');
                        $location.url('/home');
                    });
                }
                 
            }
        });

            
       
    }

}]);