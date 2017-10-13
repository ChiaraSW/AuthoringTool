(function () {
    'use strict';

    angular
        .module('app')
        .controller('OperatorController', OperatorController);

    OperatorController.$inject = ['UserService', '$rootScope', '$location', '$window', '$http', '$scope'];
    function OperatorController(UserService, $rootScope, $location, $window, $http, $scope) {
    	
    	var loggedInRole=UserService.getUser().role;
    	if(loggedInRole=='operator'){

    		setWidthAndHeight();				//per settare le dimensioni dell'iFrame in base alla dimensione della finestra
    		$($window).resize(function(){		//per settare le dimensioni dell'iFrame in base alla ridimensionamento della finestra
    			$rootScope.$apply(function(){	   			
    				setWidthAndHeight();
			    });
    		});
    		
	    	$rootScope.logged = true;
	    	$rootScope.showNotification = false;
	        $rootScope.username = UserService.getUser().email;		//Keeps visible the logged user's username  
	        
	        var code = null;
	        var path = null;
	
	    	var vm = this;
	    	vm.CulturalHeritages = true;
	    	vm.CardsPackets = true;
	    	vm.DrawVA = true;
	    	vm.Paths = true;
	    	vm.Reviews = true;
	
	    	vm.getCulturalHeritages = function(){ 
				document.getElementById('mainFrame').src = "src/html/Operator/CulturalHeritages.html";	
			}
	
			vm.addCulturalHeritage = function(){		 	
				document.getElementById('mainFrame').src = "src/html/Operator/CulturalHeritage_Add.html";	
			}
			
			vm.delCulturalHeritage = function(){		 	
				document.getElementById('mainFrame').src = "src/html/Operator/CulturalHeritage_Del.html";	
			}
			
			vm.getCardsPackets = function(){
				document.getElementById('mainFrame').src = "src/html/Operator/CardsPackets_CHs.html";	
			}
			
			vm.getDrawVA = function(){ 
				document.getElementById('mainFrame').src = "src/html/Operator/DrawValidityArea_CHs.html";	
			}	
	
			vm.getPaths = function(){ 
				document.getElementById('mainFrame').src = "src/html/Operator/Paths_CHs.html";	
			}	
	
			vm.getReviews = function(){ 
				document.getElementById('mainFrame').src = "src/html/Operator/Reviews_CHs.html";	
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
			
			$window.setCode = function (chCode){
				code = chCode;
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
    	}
    	else{
    		$location.path('/'+loggedInRole);		
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
			
		/* NON BUTTARE (prendo il valore di un determinato campo del frame)!!!
		document.getElementById('mainFrame').src = "src/html/Operator/Game1_SiteInformation.html";		
		document.getElementById('mainFrame').onload = function() {			  	
			var check = document.getElementById('mainFrame').contentWindow.document.getElementById('chCode').innerHTML;		
			alert(check);
		}	*/

    }
})();
