_myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: '/login.html',
            controller: 'LoginCtrl',
            redirect: '/home',
            auth: function (user) {
                return (user != null && user != undefined);
            }
        })
        .when('/home', {
            templateUrl: '/home.html',
            controller: 'HomeCtrl',
            auth: function (user) {
                return (user != null && user != undefined);
            }
        })
        .when('/employees', {
            templateUrl: '/employees.html',
            controller: 'EmployeesCtrl',
            auth: function (user) {
                return (user != null && user != undefined);
            }
        })
        .when('/employee', {
            templateUrl: '/employee.html',
            controller: 'EmployeeCtrl',
            auth: function (user) {
                return (user != null && user != undefined);
            }
        })
        .when('/recepcionists', {
            templateUrl: '/recepcionists.html',
            controller: 'RecepcionistsCtrl',
            auth: function (user) {
                return (user != null && user != undefined);
            }
        })
        .when('/recepcionist', {
            templateUrl: '/recepcionist.html',
            controller: 'RecepcionistCtrl',
            auth: function (user) {
                return (user != null && user != undefined);
            }
        })
        .when('/providers', {
            templateUrl: '/providers.html',
            controller: 'ProvidersCtrl',
            auth: function (user) {
                return (user != null && user != undefined);
            }
        })
        .when('/provider', {
            templateUrl: '/provider.html',
            controller: 'ProviderCtrl',
            auth: function (user) {
                return (user != null && user != undefined);
            }
        })
        .when('/clients', {
            templateUrl: '/clients.html',
            controller: 'ClientsCtrl',
            auth: function (user) {
                return (user != null && user != undefined);
            }
        })
        .when('/client', {
            templateUrl: '/client.html',
            controller: 'ClientCtrl',
            auth: function (user) {
                return (user != null && user != undefined);
            }
        })
        .when('/event', {
            templateUrl: '/event.html',
            controller: 'EventCtrl',
            auth: function (user) {
                return (user != null && user != undefined);
            }
        })
        .when('/signup', {
            templateUrl: '/signup.html',
            controller: 'SignupCtrl'
        })
        .when('/logout', {
            controller: 'LogoutCtrl'
        })
        .otherwise({
            redirectTo: '/login'
        });
}])
    .run(function ($rootScope, $location, $localStorage) {
        $rootScope.$on('$routeChangeStart', function (ev, next, curr) {
            if (next.$$route) {
                var user = $localStorage.user
                var auth = next.$$route.auth

                if (auth && !auth(user)) {
                    $location.path('/login')
                } else {
                    if (next.$$route.redirect && auth(user)) {
                        $location.path(next.$$route.redirect)
                    }
                }
            }
        })
    })
    ;