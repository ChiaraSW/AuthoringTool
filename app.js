var express = require ('express');
var bodyparser = require ('body-parser');
//var connection = require('/root/connection');
//var routes = require ('/root/routes');
var connection = require('C:\\Users\\Chiara\\Documents\\WinSCP\\Server-AuthoringTool\\connection');
var routes = require ('C:\\Users\\Chiara\\Documents\\WinSCP\\Server-AuthoringTool\\routes');



var app = express ();
app.use(express.static(__dirname + '/authoring_tool')); //aggiunto da Chiara!
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

var server = app.listen(8000, function() {
	console.log('Server listening on port '+server.address().port);
});

connection.init();
routes.configure(app);