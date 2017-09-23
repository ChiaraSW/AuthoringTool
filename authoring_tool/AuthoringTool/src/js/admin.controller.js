(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['UserService', '$rootScope', '$location', '$window', '$http', '$interval'];
    function AdminController(UserService, $rootScope, $location, $window, $http, $interval) {
    	
    	$rootScope.logged = true;
    	$rootScope.showNotification=true;
        $rootScope.username = UserService.getUser().email;		//Keeps visible the logged user's username
        $rootScope.notifications = 0;
        
        $http({
   			method : "GET",
   		    url : "/getAllNotEnabledCulturalOrganizations"
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
   			//ErrorHandling("Error on the query: getAllNotEnabledCulturalOrganizations SELECT");
   		});
        $interval(function () {		//loop per controllare ogni minuto il numero di organizzazioni culturali non ancora abilitate
        	$http({
       			method : "GET",
       		    url : "/getAllNotEnabledCulturalOrganizations"
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
       			//ErrorHandling("Error on the query: getAllNotEnabledCulturalOrganizations SELECT");
       		});
        }, 60000);
        
        $rootScope.enable = function(){
        	document.getElementById('mainFrame').src = "src/html/Admin/EnableCulturalOrganizations.html";	
        	vm.Medals_subButtons=false; 
        	vm.Cards_subButtons=false; 
        	vm.Missions_subButtons=false;
        }

        var vm = this;
        vm.Medals = true;
    	vm.Cards = true;
    	vm.Missions = true;
    	vm.Leaderboard = true;
    	vm.GamesStatistics = true;
    	vm.UsersStatistics = true;
    	
    	var mission = null;

    	vm.getMedals = function(){ 
    		document.getElementById('mainFrame').src = "src/html/Admin/Medals_Template.html";	
    	}

    	vm.addMedal = function(){		 	
    		document.getElementById('mainFrame').src = "src/html/Admin/Medal_Add.html";	
    	}
    	
    	vm.delMedal = function(){		 	
    		document.getElementById('mainFrame').src = "src/html/Admin/Medal_Del.html";	
    	}

    	vm.getCards = function(){ 
    		document.getElementById('mainFrame').src = "src/html/Admin/Cards_Template.html";	
    	}

    	vm.addCard = function(){		 	
    		document.getElementById('mainFrame').src = "src/html/Admin/Card_Add.html";	
    	}
    	
    	vm.delCard = function(){		 	
    		document.getElementById('mainFrame').src = "src/html/Admin/Card_Del.html";	
    	}

    	vm.getMissions = function(){ 
    		document.getElementById('mainFrame').src = "src/html/Admin/Missions_Template.html";	
    	}
    	
    	vm.addMission = function(){		 	
    		document.getElementById('mainFrame').src = "src/html/Admin/Mission_Add.html";	
    	}

    	$window.setMissionCode = function (missionCode){
    		mission=missionCode;
    	}
    	
    	$window.getMissionCode = function (){
    		return mission;
    	}

    	vm.getLeaderboard = function(){ 
    		document.getElementById('mainFrame').src = "src/html/Admin/Leaderboard.html";	
    	}
    	
    	vm.getGamesStatistics = function(){ 
    		document.getElementById('mainFrame').src = "src/html/Admin/GameStatistics_Template.html";	
    	}
    	
    	vm.getUsersStatistics = function(){ 
    		document.getElementById('mainFrame').src = "src/html/Admin/UsersStatistics_Template.html";	
    	}
       	
    }
})();
