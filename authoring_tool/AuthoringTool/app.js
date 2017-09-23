(function () {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'ngCookies']);
    app.config(config);
    app.run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'src/html/Login/Login.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'src/html/Login/Register.html',
                controllerAs: 'vm'
            })
            
            .when('/admin', {
                controller: 'AdminController',
                templateUrl: 'src/html/Admin/Admin.html',
                controllerAs: 'vm'
            })

            .when('/operator', {
	            controller: 'OperatorController',
	            templateUrl: 'src/html/Operator/Operator.html',			
	            controllerAs: 'vm'
	        })
            
            .when('/organization', {
	            controller: 'OrganizationController',
	            templateUrl: 'src/html/Organization/Organization.html',			
	            controllerAs: 'vm'
	        })
        
            .otherwise({ redirectTo: '/login' });

    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {	
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();