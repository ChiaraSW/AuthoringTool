(function () {
    'use strict';

    angular
	    .module('app')
	    .controller('RegisterController', RegisterController);
	
	RegisterController.$inject = ['$location', '$rootScope', 'FlashService', '$http', '$scope'];
	function RegisterController($location, $rootScope, FlashService, $http, $scope) {    	
	    
		$rootScope.logged = false;
		$scope.margintop="100px";
		
		var vm = this;
	    vm.isOperator = isOperator; 
		vm.register = register;	    
	    vm.showOrganization = false;
	    vm.showOrganizationName = false;
	    
	    
	    $http({
   			method : "GET",
   		    url : "/getAllRoles"
   		}).then(function successCallback(response) {
   			$scope.roles = response.data;
   		}, function errorCallback(response) {
   			ErrorHandling("Error on the query: getAllRoles SELECT");
   		});
	    
	   function isOperator() {	   
		   if(vm.user.role.name == 'Admin') {	
  				vm.showOrganization = false;
  				vm.showOrganizationName = false;
  			} 	 		
  	 		if(vm.user.role.name == 'Cultural Operator') {				
				$http({
					method : "GET",
				    url : "/getAllOrganizations"
				}).then(function successCallback(response) {
					$scope.organizations = response.data;
				}, function errorCallback(response) {
					ErrorHandling("Error on the query: getAllOrganizations SELECT");
				});
				vm.showOrganization = true;
				vm.showOrganizationName = false;
			}	 		
  	 		if(vm.user.role.name == 'Cultural Organization') {			
  	 			vm.showOrganization = false;
				vm.showOrganizationName = true;						
			} 
  	 		initialize();
	   }
	    
	   function register() { 

		   if (vm.user.password == vm.user.repassword){ //check if the inserted passwords match
			   
			   $http({
	 				method : "GET",
	 			    url : "/getUser/"+vm.user.email
	 			}).then(function successCallback(response) { 				
	 				if (response.data.length > 0){		//check if the email is already registered
	 					ErrorHandling("E-mail already registered.");
	 	    		}	
	 				else{
	 					
 						vm.dataLoading = true;
	 					$http({
    	    				method : "GET",
    	    			    url : "/addUser/0/"+vm.user.email+"/"+vm.user.password+"/"+vm.user.role.code				//Memorizzare il token e non la password in chiaro!!!!
    	    			}).then(function successCallback(response) {	//User successfully registered
    	    				var userCodeDB = response.data.insertId; 
			   
    	    				if (vm.user.role.name == "Admin"){
    	    					$http({
            	    				method : "GET",
            	    			    url : "/addAdmin/0/"+userCodeDB
            	    			}).then(function successCallback(response) {		
            	    				SuccessHandling();									//Admin successfully registered
            	    			}, function errorCallback(response) {
            	    				ErrorHandling("ADMIN NOT INSERTED.");
            	    			});
    	    				}

    	    				if (vm.user.role.name == "Cultural Organization"){
    	    					$http({
            	    				method : "GET",
            	    			    url : '/addCulturalOrganization/0/'+userCodeDB+'/'+vm.user.orgname
            	    			}).then(function successCallback(response) {
            	    				SuccessHandling();									//Cultural Organization successfully registered
            	    			}, function errorCallback(response) {
            	    				ErrorHandling("CULTURAL ORGANIZATION NOT INSERTED.");
            	    			});
    	    				}
			   
    	    				if (vm.user.role.name == "Cultural Operator"){
    	    					$http({
            	    				method : "GET",
            	    			    url : '/addCulturalOperator/0/'+userCodeDB+'/'+vm.user.organization.code
            	    			}).then(function successCallback(response) {
            	    				SuccessHandling();									//Cultural Operator successfully registered
            	    			}, function errorCallback(response) {
            	    				ErrorHandling("CULTURAL OPERATOR NOT INSERTED.");
            	    			});
    	    				}

    	    			}, function errorCallback(response) {   
    	    				ErrorHandling("USER NOT INSERTED.");
    	    			});
	 					
	 				}
	 				
 				}, function errorCallback(response) {
 					ErrorHandling("Error on the query: getUser SELECT");
	 			});
		   }
		   else{
			   ErrorHandling("Passwords don't match.");
		   }
		   vm.dataLoading = false;
		   $rootScope.loggedIn = false;
		}
	   
	   function ErrorHandling(text){
		   $scope.margintop="30px";
		   FlashService.Error(text);
		   //alert(text);
		   initialize();
	   }
	   
	   function SuccessHandling(){
		   $scope.margintop="30px";
		   FlashService.Success('User \"'+vm.user.email+'\" successfully registered.', true);
		   //alert('User \"'+vm.user.email+'\" successfully registered.');	
		   $location.path('/login');	
	   }
	   
	   function initialize(){
		   vm.user.organization = null;
		   vm.user.orgname='';
		   vm.user.email='';
		   vm.user.password='';
		   vm.user.repassword='';
	   }
	}

})();
