var buttons, main;

window.onload=function() {
	buttons = document.getElementById('buttonsFrame');
	main = document.getElementById('pagesFrame');
}  

function onButtonClick(url){	
	document.getElementById('pagesFrame').src = url;
}