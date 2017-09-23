(function () {
    'use strict';

    angular
        .module('app')
        .controller('OrganizationController', OrganizationController);

    OrganizationController.$inject = ['UserService', '$rootScope', '$location', '$window', '$http', '$scope', '$interval'];
    function OrganizationController(UserService, $rootScope, $location, $window, $http, $scope, $interval) {
    	
    	$rootScope.logged = true;
    	$rootScope.showNotification = true;
        $rootScope.username = UserService.getUser().email;		//Keeps visible the logged user's username  
        $rootScope.notifications = 0;

        $http({
   			method : "GET",
   		    url : "/getAllNotEnabledCulturalOperators/"+$rootScope.username
   		}).then(function successCallback(response) {
   			if(response.data[0].count <= 0){
   				$rootScope.notifications = 0;
   				$rootScope.notification = "btn-success";
   			}
   			else{
   				$rootScope.notifications = response.data[0].count;
   				$rootScope.notification = "btn-danger";
   			}	
   		}, function errorCallback(response) {
   			//ErrorHandling("Error on the query: getAllNotEnabledCulturalOperators SELECT");
   		});

        $interval(function () {		//loop per controllare ogni minuto il numero di operatori culturali non ancora abilitati
        	$http({
       			method : "GET",
       		    url : "/getAllNotEnabledCulturalOperators/"+$rootScope.username
       		}).then(function successCallback(response) {
       			if(response.data[0].count <= 0){
       				$rootScope.notifications = 0;
       				$rootScope.notification = "btn-success";
       			}
       			else{
       				$rootScope.notifications = response.data[0].count;
       				$rootScope.notification = "btn-danger";
       			}	
       		}, function errorCallback(response) {
       			//ErrorHandling("Error on the query: getAllNotEnabledCulturalOperators SELECT");
       		});
        }, 60000);
        
        $rootScope.enable = function(){
        	document.getElementById('mainFrame').src = "src/html/Organization/EnableCulturalOperators.html";	
        }
    	
        var vm = this;

    }
})();
