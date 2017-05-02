_myApp
.factory('SignupFactory', ['$resource', function($resource){
    return $resource('/signup/:id', null, {
        'save' : {method : 'POST'}
    });
}])
.controller('SignupCtrl', ['$scope', '$routeParams', '$location', 'SignupFactory', 'md5', function ($scope, $routeParams,  $location, SignupFactory, md5) {
    $scope.user = {};

    $scope.save = function(){
        if(!$scope.user.name || $scope.user.name == ''){
            alert('The name must be informed');
            return;
        }        

        if(!$scope.user.email || $scope.user.email == ''){
            alert('The email must be informed');
            return;
        }

        if(!$scope.user.pwd || $scope.user.pwd == ''){
            alert('The password must be informed');
            return;
        }

        $scope.isProcessing = true;
        var user = SignupFactory.save({
            name : $scope.user.name,            
            email : $scope.user.email,
            pwd: md5.createHash($scope.user.pwd || '')
        }, function(){
            if(user.error){
                alert('Sorry, unable to create the user!');
            }else{
                alert('User created successfully :)');
                $location.url('/login');
            }

            $scope.isProcessing = false;
        });
    }
}]);