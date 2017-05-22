﻿(function () {
    'use strict';
    

    
    var app = angular.module('app', ['ngRoute', 'ngCookies']);
    app.config(config);
    app.run(run);
    
    config.$inject = ['$routeProvider', '$locationProvider', '$cookiesProvider'];	//aggiunto $cookiesProvider
    function config($routeProvider, $locationProvider, $cookiesProvider) {		//aggiunto $cookiesProvider
    	
        $routeProvider
            /*.when('/', {
                controller: 'HomeController',
                templateUrl: 'src/html/Home/Home.html',
                controllerAs: 'vm'
            })*/

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'src/html/Login/Login.html',
                controllerAs: 'vm',
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'src/html/Login/Registration.html',
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
            
            .otherwise({ redirectTo: '/login' });
    }

   
    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $scope, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/admin','/operator']) === -1; 		// controllare se /admin e /operator vanno veramente qui
            var loggedIn = $rootScope.globals.currentUser;														
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }


    
    
    
    
    
    
    
    
    // LOGIN --------------------------------------------------------------------------------------------------------------------------------------------------------------------
    app.controller('LoginController', function($scope, $http, $location, $rootScope, $cookies){
    	var results;
    	
    	$scope.vm = this;
    	$scope.roles = ["Admin", "Organization", "Operator"];		//Mettere una query che legge i vari ruoli presenti nel db
    	    	
    	(function initController() {	// reset login status
            
    		ClearCredentials();
            
    		function ClearCredentials() {
    			//alert($cookies.get('globals'));  //<---------------------------------------------------------QUI!!
    			$rootScope.globals = {};
                $cookies.remove('globals');
                //$http.defaults.headers.common.Authorization = 'Basic';
                $http.defaults.headers.common['Authorization'] = 'Basic';
                
            }
        })();

    	$scope.login = function(){
    		$http({
				method : "GET",
			    url : "/getCulturalOrganization/"+$scope.vm.email
			}).then(function successCallback(response) {
				results  = response.data;
				
				if (results.length > 0){
					if((results[0].email == $scope.vm.email) && (results[0].password == $scope.vm.password) && (results[0].role == $scope.vm.role) ){
						
						
						
						
						
						function SetCredentials(username, password) {
				            var authdata = Base64.encode(username + ':' + password);

				            $rootScope.globals = {
				                currentUser: {
				                    username: username,
				                    authdata: authdata
				                }
				            };

				            // set default auth header for http requests
				            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

				            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
				            var cookieExp = new Date();
				            cookieExp.setDate(cookieExp.getDate() + 1);
				            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
				        }
						
						
						
						if ($scope.vm.role == "Admin"){			
			        		$rootScope.email = $scope.vm.email;
			        		$rootScope.password = $scope.vm.password;
			        		$rootScope.role = $scope.vm.role;
			    			$rootScope.loggedIn = true;
			    			$rootScope.username = $scope.vm.email;
			    			$location.path('/admin');			
			    		}
						/*if ($scope.vm.role == "Organization"){
							$rootScope.loggedIn = true;
			    			$location.path('/organization');
			    		}*/
						if ($scope.vm.role == "Operator"){
							$rootScope.loggedIn = true;
			    			$location.path('/operator');
			    		}
	    				
	    			}
					else{
						$rootScope.loggedIn = false;
						alert('Wrong password or role.');
					}
	    		}
	    		else{
	    			$rootScope.loggedIn = false;
	    			alert('User "'+ $scope.vm.email +'" not found.');
	    		}			
				
			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				results  = response.statusText;
				$rootScope.loggedIn = false;
			});
    	}
    });
    
    
	// REGISTRATION --------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
	app.controller('RegisterController', function($scope, $http, $location, $rootScope, $window){
		var results, organization;
		
		$scope.vm = this;
    	$scope.showOrganization = false;
    	$scope.roles = ["Admin", "Organization", "Operator"];		//Mettere una query che legge i vari ruoli presenti nel db
        
    	$scope.isOperator = function(){
			if($scope.vm.user.role == 'Operator') {
				$scope.organizations = ["Ministero Beni Culturali", "Ministero2", "Ministero3"]; 	//Mettere una query che legge le varie organizzazioni presenti nel db
				$scope.showOrganization = true;
			}
			else{
				$scope.organizations = [];
				$scope.showOrganization = false;
			}
		}        
        
    	$scope.register = function(){
    		
    		if ($scope.vm.user.password == $scope.vm.user.repassword){ //check if the inserted passwords match

    			$http({
    				method : "GET",
    			    url : "/getCulturalOrganization/"+$scope.vm.user.email
    			}).then(function successCallback(response) {
    				results  = response.data;
    				
    				if (results.length > 0){		//check if the email is already registered
    					alert('E-mail already registered.');
    	    		}	
    				else{
    					if ($scope.vm.user.role == "Admin"|| $scope.vm.user.role == "Organization"){ organization = "Admin"; }	//Set the "Organization" field
    					else{ organization = $scope.vm.user.organization; }

    					$http({
    	    				method : "GET",
    	    			    url : "/addCulturalOrganization/"+$scope.vm.user.email+"/"+$scope.vm.user.password+"/"+$scope.vm.user.role+"/"+organization
    	    			}).then(function successCallback(response) {
	
    	    				$rootScope.loggedIn = false;	
    	    				$location.path('/login');		//User successfully registered

    	    			}, function errorCallback(response) {
    	    				// called asynchronously if an error occurs
    	    				// or server returns response with an error status.
    	    				results  = response.statusText;
    	    			});
    				}
    			}, function errorCallback(response) {
    				// called asynchronously if an error occurs
    				// or server returns response with an error status.
    				results  = response.statusText;
    				$rootScope.loggedIn = false;
    			});
    			

    		}
    		else{
    			alert("Passwords don't match.");
    		}

    	}
    });  
	

	
	//ADMIN -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	app.controller('AdminController', function($scope, $http, $location, $rootScope, $window){

		
		$scope.Medals = true;
		$scope.Cards = true;
		$scope.Titles = true;
		$scope.Missions = true;
		$scope.Achievements = true;
		$scope.Rankings = true;
		$scope.GamesStatistics = true;
		$scope.UsersStatistics = true;
		$scope.Organizations = true;
		
		
		
		$scope.getMedals = function(){ 
			document.getElementById('mainFrame').src = "src/html/Admin/Medals_Template.html";	
		}

		$scope.addMedal = function(){		 	
			document.getElementById('mainFrame').src = "src/html/Admin/Medal_Add.html";	
		}
		
		$scope.delMedal = function(){		 	
			document.getElementById('mainFrame').src = "src/html/Admin/Medal_Del.html";	
		}
		
		$scope.getCards = function(){ 
			document.getElementById('mainFrame').src = "src/html/Admin/Cards_Template.html";	
		}

		$scope.addCard = function(){		 	
			document.getElementById('mainFrame').src = "src/html/Admin/Card_Add.html";	
		}
		
		$scope.delCard = function(){		 	
			document.getElementById('mainFrame').src = "src/html/Admin/Card_Del.html";	
		}
		
		$scope.getTitles = function(){ 
			document.getElementById('mainFrame').src = "src/html/Admin/Titles_Template.html";	
		}
		
		
		
		
    }); 
	
	
	//OPERATOR -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	app.controller('OperatorController', function($scope, $http, $location, $rootScope, $window){
		var code = null;
		
		$scope.CulturalHeritages = true;
		$scope.Game1 = true;
		$scope.Game2 = true;
		$scope.Game3 = true;
		$scope.Game4 = true;
				
		$scope.getCulturalHeritages = function(){ 
			document.getElementById('mainFrame').src = "src/html/Operator/CulturalHeritages_Template.html";	
		}

		$scope.addCulturalHeritage = function(){		 	
			document.getElementById('mainFrame').src = "src/html/Operator/CulturalHeritage_Add.html";	
		}
		
		$scope.delCulturalHeritage = function(){		 	
			document.getElementById('mainFrame').src = "src/html/Operator/CulturalHeritage_Del.html";	
		}
		
		$scope.getGame1 = function(){
			document.getElementById('mainFrame').src = "src/html/Operator/Game1_Template.html";	
		}
		
		$window.enableGame1SubButtons = function (enable, chCode){
			code = chCode;
			$scope.Game1_subButtons = enable;
			$scope.$apply();
		}

		$scope.siteInfo = function(){
			document.getElementById('mainFrame').src = "src/html/Operator/Game1_SiteInformation.html";		
			/* NON BUTTARE (prendo il valore di un determinato campo del frame)!!!
			document.getElementById('mainFrame').src = "src/html/Operator/Game1_SiteInformation.html";		
			document.getElementById('mainFrame').onload = function() {			  	
				var check = document.getElementById('mainFrame').contentWindow.document.getElementById('chCode').innerHTML;		
				alert(check);
			}*/		
		}
		
		$scope.chests = function(){
			document.getElementById('mainFrame').src = "src/html/Operator/Game1_Chests.html";	
		}

		$scope.getGame2 = function(){ 
			document.getElementById('mainFrame').src = "src/html/Operator/Game2_Template.html";	
		}		

		$scope.getGame3 = function(){ 
			document.getElementById('mainFrame').src = "src/html/Operator/Game3_Template.html";	
		}		
		
		$window.enableGame3SubButtons = function (enable, chCode){
			code = chCode;
			$scope.Game3_subButtons = enable;
			$scope.$apply();
		}		
		
		$scope.addStory = function(){
			document.getElementById('mainFrame').src = "src/html/Operator/Game3_AddStory.html";	
		}
		
		$scope.delStory = function(){
			document.getElementById('mainFrame').src = "src/html/Operator/Game3_DelStory.html";	
		}		

		$scope.getGame4 = function(){ 
			document.getElementById('mainFrame').src = "src/html/Operator/Game4_Template.html";	
		}

		$window.enableGame4SubButtons = function (enable, chCode){
			code = chCode;
			$scope.Game4_subButtons = enable;
			$scope.$apply();
		}
		
		$scope.reviewsList = function(){
			document.getElementById('mainFrame').src = "src/html/Operator/Game4_ReviewList.html";	
		}
		
		$scope.infopoints = function(){
			document.getElementById('mainFrame').src = "src/html/Operator/Game4_Infopoints.html";	
		}
		
		$scope.enciclopedicPage = function(){
			document.getElementById('mainFrame').src = "src/html/Operator/Game4_EnciclopedicPage.html";	
		}
		
		$window.getCode = function (){
			return code;
		}

    });  
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// Base64 encoding service used by AuthenticationService
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };
 
})();