﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('OrganizationController', OrganizationController);

    OrganizationController.$inject = ['UserService', '$rootScope', '$location', '$window', '$http', '$scope', '$interval'];
    function OrganizationController(UserService, $rootScope, $location, $window, $http, $scope, $interval) {
    	
    	var loggedInRole=UserService.getUser().role;
    	if(loggedInRole=='organization'){
    		   	
    		setWidthAndHeight();				//per settare le dimensioni dell'iFrame in base alla dimensione della finestra
    		$($window).resize(function(){		//per settare le dimensioni dell'iFrame in base alla ridimensionamento della finestra
    			$rootScope.$apply(function(){	   			
    				setWidthAndHeight();
			    });
    		});
    		
	    	$rootScope.logged = true;
	    	$rootScope.showNotification = true;
	        $rootScope.username = UserService.getUser().email;		//Keeps visible the logged user's username  
	        $rootScope.notifications = 0;
	
	        getNotifications();
	
	        $interval(function () {		//loop per controllare ogni minuto il numero di operatori culturali non ancora abilitati
	        	getNotifications();
	        }, 60000);
	        
	        
	        var vm = this;
	        var code = null;
	        var path = null;
	        
	    	vm.CulturalHeritages = true;
	    	vm.CardsPackets = true;
	    	vm.DrawVA = true;
	    	vm.Paths = true;
	    	vm.Reviews = true;
	        
	    	$rootScope.enable = function(){
	        	document.getElementById('mainFrame').src = "src/html/Organization/EnableCulturalOperators.html";	
	        }
	        
	    	vm.getCulturalHeritages = function(){ 
				document.getElementById('mainFrame').src = "src/html/Organization/CulturalHeritages.html";	
			}
	        
	    	vm.addCulturalHeritage = function(){		 	
				document.getElementById('mainFrame').src = "src/html/Organization/CulturalHeritage_Add.html";	
			}
			
			vm.delCulturalHeritage = function(){		 	
				document.getElementById('mainFrame').src = "src/html/Organization/CulturalHeritage_Del.html";	
			}
			
			vm.getCardsPackets = function(){
				document.getElementById('mainFrame').src = "src/html/Organization/CardsPackets_CHs.html";	
			}
	        
			vm.getDrawVA = function(){ 
				document.getElementById('mainFrame').src = "src/html/Organization/DrawValidityArea_CHs.html";	
			}	
	
			vm.getPaths = function(){ 
				document.getElementById('mainFrame').src = "src/html/Organization/Paths_CHs.html";	
			}	
	
			vm.getReviews = function(){ 
				document.getElementById('mainFrame').src = "src/html/Organization/Reviews_CHs.html";	
			}
	        
			$window.setCode = function (chCode){
				code = chCode;
				$scope.$apply();
	    	}
			$window.getCode = function (){
				return code;
			}
			
			$window.setPathCode = function (pathCode){
				path=pathCode;
			}
			
			$window.getPathCode = function (){
				return path;
			}
			
			$window.getUsername = function (){
	    		return $rootScope.username;
	    	}
			
			$window.getUserCode = function (){
	    		return UserService.getUser().code;
	    	}
			
			$window.getUserCodeNellaTabellaDelRuolo = function (){
	    		return UserService.getUser().codeNellaTabellaDelRuolo;
	    	}
			
			$window.updNotification = function (){
				getNotifications();
			}
	
			function getNotifications(){
				$http({
	       			method : "GET",
	       		    url : "/getAllNotEnabledCulturalOperatorsCount/"+$rootScope.username
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
	       			//ErrorHandling("Error on the query: getAllNotEnabledCulturalOperatorsCount SELECT");
	       		});
			}
			
			function setWidthAndHeight(){
	    		if($window.innerWidth > 1024){
					document.getElementById('mainFrame').height = ($window.innerHeight- 81) + "px";		
					document.getElementById('mainFrame').width = ($window.innerWidth - 315) + "px";
				}
				else{ 
					if($window.innerWidth >= 768){
						document.getElementById('mainFrame').height = ($window.innerHeight- 95) + "px";		
				    	document.getElementById('mainFrame').width = "950px"; 
					}
					else{
						document.getElementById('mainFrame').width = "855px"; 
						document.getElementById('mainFrame').height = ($window.innerHeight- 115) + "px";		
					}
				}
			}
    	}
    	else{
    		$location.path('/'+loggedInRole);		
    	}
		/* NON BUTTARE (prendo il valore di un determinato campo del frame)!!!
		document.getElementById('mainFrame').src = "src/html/Operator/Game1_SiteInformation.html";		
		document.getElementById('mainFrame').onload = function() {			  	
			var check = document.getElementById('mainFrame').contentWindow.document.getElementById('chCode').innerHTML;		
			alert(check);
		}	*/

    }
})();
