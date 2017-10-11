(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['UserService', '$rootScope', '$location', '$window', '$http', '$interval'];
    function AdminController(UserService, $rootScope, $location, $window, $http, $interval) {
    	
    	var loggedInRole=UserService.getUser().role;
    	if(loggedInRole=='admin'){

    		document.getElementById('mainFrame').width = ($window.innerWidth * 0.85) + "px";
    		document.getElementById('mainFrame').height = ($window.innerHeight - 70) + "px";
    		$($window).resize(function(){
			    $rootScope.$apply(function(){
			    	document.getElementById('mainFrame').width = ($window.innerWidth * 0.85) + "px";
		    		document.getElementById('mainFrame').height = ($window.innerHeight - 70) + "px";
			    });
			});

	    	$rootScope.logged = true;
	    	$rootScope.showNotification=true;
	        $rootScope.username = UserService.getUser().email;		//Keeps visible the logged user's username
	        $rootScope.notifications = 0;
	        
	        getNotifications();
	        
	        $interval(function () {		//loop per controllare ogni minuto il numero di organizzazioni culturali non ancora abilitate
	        	getNotifications();
	        }, 60000);
	        
	        $rootScope.enable = function(){
	        	document.getElementById('mainFrame').src = "src/html/Admin/EnableCulturalOrganizations.html";	
	        	vm.Medals_subButtons=false; 
	        	vm.Cards_subButtons=false; 
	        	vm.Missions_subButtons=false;
	        }
	
	        var vm = this;

	    	var medal = null;
	    	var card = null;
	    	var mission = null;
	
	    	vm.getMedals = function(){ 
	    		document.getElementById('mainFrame').src = "src/html/Admin/Medals.html";	
	    	}
	
	    	vm.addMedal = function(){		 	
	    		document.getElementById('mainFrame').src = "src/html/Admin/Medal_Add.html";	
	    	}
	    	
	    	vm.delMedal = function(){		 	
	    		document.getElementById('mainFrame').src = "src/html/Admin/Medal_Del.html";	
	    	}
	
	    	vm.getCards = function(){ 
	    		document.getElementById('mainFrame').src = "src/html/Admin/Cards.html";	
	    	}
	
	    	vm.addCard = function(){		 	
	    		document.getElementById('mainFrame').src = "src/html/Admin/Card_Add.html";	
	    	}
	    	
	    	vm.delCard = function(){		 	
	    		document.getElementById('mainFrame').src = "src/html/Admin/Card_Del.html";	
	    	}
	
	    	vm.getMissions = function(){ 
	    		document.getElementById('mainFrame').src = "src/html/Admin/Missions.html";	
	    	}
	    	
	    	vm.addMission = function(){		 	
	    		document.getElementById('mainFrame').src = "src/html/Admin/Mission_Add.html";	
	    	}
	
	    	vm.getLeaderboard = function(){ 
	    		document.getElementById('mainFrame').src = "src/html/Admin/Leaderboard.html";	
	    	}
	    	
	    	vm.getGamesStatistics = function(){ 
	    		document.getElementById('mainFrame').src = "src/html/Admin/GameStatistics.html";	
	    	}
	    	
	    	vm.getPlayersStatistics = function(){ 
	    		document.getElementById('mainFrame').src = "src/html/Admin/PlayersStatistics.html";	
	    	}
	    	
	    	$window.setMedalCode = function (medalCode){
	    		medal=medalCode;
	    	}
	    	
	    	$window.getMedalCode = function (){
	    		return medal;
	    	}
	    	
	    	$window.setCardCode = function (cardCode){
	    		card=cardCode;
	    	}
	    	
	    	$window.getCardCode = function (){
	    		return card;
	    	}
	    	
	    	$window.setMissionCode = function (missionCode){
	    		mission=missionCode;
	    	}
	    	
	    	$window.getMissionCode = function (){
	    		return mission;
	    	}
	    	
	    	$window.getUserCode = function (){
	    		return UserService.getUser().code;
	    	}
	    	
	    	$window.updNotification = function (){
				getNotifications();
			}
	
			function getNotifications(){
				$http({
	       			method : "GET",
	       		    url : "/getAllNotEnabledCulturalOrganizationsCount"
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
	       			//ErrorHandling("Error on the query: getAllNotEnabledCulturalOrganizationsCount SELECT");
	       		});
			}
	
    	}
    	else{
    		$location.path('/'+loggedInRole);		
    	}
    }
})();
