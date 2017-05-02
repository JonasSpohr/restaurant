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
        .when('/places', {
            templateUrl: '/places.html',
            controller: 'PlacesCtrl',
            auth: function (user) {
                return (user != null && user != undefined);
            }
        })
        .when('/place', {
            templateUrl: '/place.html',
            controller: 'PlaceCtrl',
            auth: function (user) {
                return (user != null && user != undefined);
            }
        })
        .when('/result', {
            templateUrl: '/result.html',
            controller: 'ResultCtrl',
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