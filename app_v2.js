var express = require ('express');
var bodyparser = require ('body-parser');

//var connection = require('/root/connection'); //NON CANCELLARE (server)
//var routes = require ('/root/routes');		//NON CANCELLARE (server)


//var connection = require('/root/connection'); //NON CANCELLARE (server)
//var routes = require ('/root/routes');		//NON CANCELLARE (server)
var connection = require('C:\\Users\\Chiara\\Documents\\WinSCP\\Server-AuthoringTool\\connection_v2');
var routes = require ('C:\\Users\\Chiara\\Documents\\WinSCP\\Server-AuthoringTool\\routes_v2');
var http = require('http'); 				//aggiunto da Chiara!
var multer = require('multer'); 			//aggiunto da Chiara!

var app = express ();
app.use(express.static(__dirname + '/authoring_tool')); 		//aggiunto da Chiara!
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


//Upload file
var imageToSave;
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
    	var type = file.fieldname.split('-')[0];
    	callback(null, './authoring_tool/images/'+type+'/');
    },
    filename: function (req, file, callback) {
        //imageToSave = file.fieldname + '-' + Date.now(); + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];	
        imageToSave = file.fieldname + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];    	
        callback(null, imageToSave);
    }
});

var upload = multer({storage: storage}).any(); //oppure .single('file');

app.post('/upload', function(req, res) {
    upload(req,res,function(err){
        return;
    });
});


var server = app.listen(8000, function() {
	console.log('Server listening on port '+server.address().port);
});

connection.init();
routes.configure(app);