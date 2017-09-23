(function () {
    'use strict';

    angular
        .module('app')
        .controller('OperatorController', OperatorController);

    OperatorController.$inject = ['UserService', '$rootScope', '$location', '$window', '$http', '$scope'];
    function OperatorController(UserService, $rootScope, $location, $window, $http, $scope) {
    	
    	$rootScope.logged = true;
    	$rootScope.showNotification = false;
        $rootScope.username = UserService.getUser().email;		//Keeps visible the logged user's username  
        
        var code = null;
        var path = null;

    	var vm = this;
    	vm.CulturalHeritages = true;
    	vm.Game1 = true;
    	vm.Game2 = true;
		vm.Game3 = true;
		vm.Game4 = true;
    	
    	
    	
    	vm.getCulturalHeritages = function(){ 
			document.getElementById('mainFrame').src = "src/html/Operator/CulturalHeritages_Template.html";	
		}

		vm.addCulturalHeritage = function(){		 	
			document.getElementById('mainFrame').src = "src/html/Operator/CulturalHeritage_Add.html";	
		}
		
		vm.delCulturalHeritage = function(){		 	
			document.getElementById('mainFrame').src = "src/html/Operator/CulturalHeritage_Del.html";	
		}
		
		vm.getGame1 = function(){
			document.getElementById('mainFrame').src = "src/html/Operator/Game1_Template.html";	
		}
		
		$window.enableGame1SubButtons = function (enable, chCode){
			code = chCode;
			vm.Game1_subButtons = enable;
			$scope.$apply();
		}

		vm.siteInfo = function(){
			document.getElementById('mainFrame').src = "src/html/Operator/Game1_SiteInformation.html";		
			/* NON BUTTARE (prendo il valore di un determinato campo del frame)!!!
			document.getElementById('mainFrame').src = "src/html/Operator/Game1_SiteInformation.html";		
			document.getElementById('mainFrame').onload = function() {			  	
				var check = document.getElementById('mainFrame').contentWindow.document.getElementById('chCode').innerHTML;		
				alert(check);
			}	*/
		}
		
		vm.chests = function(){
			document.getElementById('mainFrame').src = "src/html/Operator/Game1_Chests.html";	
		}
		
		vm.getGame2 = function(){ 
			document.getElementById('mainFrame').src = "src/html/Operator/Game2_Template.html";	
		}	
		
		$window.enableGame2SubButtons = function (enable, chCode){
			code = chCode;
			vm.Game2_subButtons = enable;
			$scope.$apply();
		}	
		
		vm.drawPolygon = function(){
			document.getElementById('mainFrame').src = "src/html/Operator/Game2_DrawValidityArea.html";	
		}

		vm.getGame3 = function(){ 
			document.getElementById('mainFrame').src = "src/html/Operator/Game3_Template.html";	
		}		
		
		$window.enableGame3SubButtons = function (enable, chCode){
			code = chCode;
			vm.Game3_subButtons = enable;
			$scope.$apply();
		}		
		
		vm.paths = function(){
			document.getElementById('mainFrame').src = "src/html/Operator/Game3_Paths.html";	
		}

		vm.getGame4 = function(){ 
			document.getElementById('mainFrame').src = "src/html/Operator/Game4_Template.html";	
		}
		
		$window.enableGame4SubButtons = function (enable, chCode){
			code = chCode;
			vm.Game4_subButtons = enable;
			$scope.$apply();
		}
		
		vm.reviewsList = function(){
			document.getElementById('mainFrame').src = "src/html/Operator/Game4_ReviewsList.html";	
		}
		
		vm.infopoints = function(){
			document.getElementById('mainFrame').src = "src/html/Operator/Game4_Infopoints.html";	
		}
		
		vm.enciclopedicPage = function(){
			document.getElementById('mainFrame').src = "src/html/Operator/Game4_EnciclopedicPage.html";	
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
})();
