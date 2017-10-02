(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$timeout', '$filter', '$q'];
    function UserService($timeout, $filter, $q) {

        var service = {};       
        service.getUser = getUser;
        service.setUser = setUser;
        return service;

        function getUser() {
            if(!localStorage.user){
                localStorage.user = JSON.stringify([]);
            }
            return JSON.parse(localStorage.user);
        }

        function setUser(email, password, role, code) {
        	var user = {};
            user.id = 0;
            user.email = email;
            user.password = password;
            user.role = role;
            user.code = code;

            localStorage.user = JSON.stringify(user);
        }
    }
})();