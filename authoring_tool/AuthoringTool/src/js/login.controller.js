(function () {
    'use strict';


    angular
	    .module('app')
	    .controller('LoginController', LoginController);
	
	LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', '$http', '$scope', '$rootScope'];
	function LoginController($location, AuthenticationService, FlashService, $http, $scope, $rootScope) {
	    
		$rootScope.logged = false;
		$scope.margintop="100px";
		
		var vm = this;
	    vm.login = login;
	    
	    $http({
   			method : "GET",
   		    url : "/getAllRoles"
   		}).then(function successCallback(response) {
   			$scope.roles = response.data;
   		}, function errorCallback(response) {
   			ErrorHandling("Error on the query: getAllRoles SELECT");
   		});

	    (function initController() {			        
	        AuthenticationService.ClearCredentials();	// reset login status
	    })();
	
	    function login() {
	        vm.dataLoading = true;
	        
	        $http({
				method : "GET",
			    url : "/getUser/"+vm.email
			}).then(function successCallback(response) {
				var user = response.data;
				if (user.length > 0){
					if(user[0].enabled != null){
						
						if(user[0].enabled == 1){
						
							if((user[0].email == vm.email) && (user[0].password == vm.password)  && (user[0].role == vm.role.code) ){		//la password va trasformata in token e confrontata con quello nel db!!!
								
								AuthenticationService.SetCredentials(vm.email, vm.password); 
								
								if (vm.role.name == "Admin"){
					    			$rootScope.loggedIn = true;
					    			$rootScope.username = vm.email;
					    			AuthenticationService.SaveCurrentUserLocally(vm.email, vm.password, "admin", user[0].code, user[0].codeNellaTabellaDelRuolo);
					    			$location.path('/admin');			
					    		}
								
								if (vm.role.name == "Cultural Organization"){
									$rootScope.loggedIn = true;
									$rootScope.username = vm.email;
									AuthenticationService.SaveCurrentUserLocally(vm.email, vm.password, "organization", user[0].code, user[0].codeNellaTabellaDelRuolo);
					    			$location.path('/organization');
					    		}
	
								if (vm.role.name == "Cultural Operator"){
									$rootScope.loggedIn = true;
									$rootScope.username = vm.email;
									AuthenticationService.SaveCurrentUserLocally(vm.email, vm.password, "operator", user[0].code, user[0].codeNellaTabellaDelRuolo);
					    			$location.path('/operator');
					    		}
							}
							else{
								ErrorHandling("Wrong password or role.");
							}
						}
						else{
							ErrorHandling("User \""+ vm.email +"\" has been rejected.");
						}	
					}
					else{
						ErrorHandling("User \""+ vm.email +"\" not yet enabled.");
					}
				}
	    		else{
	    			ErrorHandling("User \""+ vm.email +"\" not found.");
	    		}	
				
			}, function errorCallback(response) {
				ErrorHandling("Error on the query: getUser SELECT");
			});	        
	        vm.dataLoading = false;
			$rootScope.loggedIn = false;
	    };
	    
	    function ErrorHandling(text){
		   $scope.margintop="30px";
		   FlashService.Error(text);
		   //alert(text);
	    }

	}

})();
