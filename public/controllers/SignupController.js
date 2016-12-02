_myApp
.factory('SignupFactory', ['$resource', function($resource){
    return $resource('/signup/:id', null, {
        'save' : {method : 'PUT'}
    });
}])
.controller('SignupCtrl', ['$scope', '$routeParams', '$location', 'SignupFactory', function ($scope, $routeParams,  $location, SignupFactory) {
    $scope.contact = {};

    $scope.save = function(){
        if(!$scope.contact.name || $scope.contact.name == ''){
            alert('O nome deve ser informado');
            return;
        }

        if(!$scope.contact.companyName || $scope.contact.companyName == ''){
            alert('O nome da empresa deve ser informado');
            return;
        }

        if(!$scope.contact.state || $scope.contact.state == ''){
            alert('O estado deve ser informado');
            return;
        }

        if(!$scope.contact.city || $scope.contact.city == ''){
            alert('A cidade deve ser informada');
            return;
        }

        if(!$scope.contact.phone || $scope.contact.phone == ''){
            alert('O telefone deve ser informado');
            return;
        }

        if(!$scope.contact.email || $scope.contact.email == ''){
            alert('O email deve ser informado');
            return;
        }

        $scope.isProcessing = true;
        var contact = SignupFactory.save({
            name : $scope.contact.name,
            companyName : $scope.contact.companyName,
            state : $scope.contact.state,
            city : $scope.contact.city,
            phone : $scope.contact.phone,
            email : $scope.contact.email
        }, function(){
            if(contact.error){
                alert('Não foi possivel salvar o contato!');
            }else{
                alert('Contato enviado com sucesso. Em breve entratemos em contato :)');
                $location.url('/login');
            }

            $scope.isProcessing = false;
        });
    }
}]);