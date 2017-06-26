var express = require ('express');
var bodyparser = require ('body-parser');
//var connection = require('/root/connection'); //NON CANCELLARE
//var routes = require ('/root/routes');		//NON CANCELLARE
var connection = require('C:\\Users\\Chiara\\Documents\\WinSCP\\Server-AuthoringTool\\connection');
var routes = require ('C:\\Users\\Chiara\\Documents\\WinSCP\\Server-AuthoringTool\\routes');
var http = require('http'); 				//aggiunto da Chiara!




var medal = require('multer'); 	//aggiunto da Chiara!
//var multer2 = require('multer');


var app = express ();
app.use(express.static(__dirname + '/authoring_tool')); //aggiunto da Chiara!
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());












//----MEDAL---------------------------------------------------------------
var medalImgToSave;
var medalStorage = medal.diskStorage({
    destination: function (req, file, callback) {
    	callback(null, './authoring_tool/AuthoringTool/src/images/medals');
    },
    filename: function (req, file, callback) {
        datetimestamp = Date.now();
        //fileToSave = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        medalImgToSave = file.fieldname + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        callback(null, medalImgToSave);
    }
});

var upload = medal({ //multer settings
                storage: medalStorage
            //}).single('medal');
			}).any();


app.post('/uploadMedal', function(req, res) {
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
       }
        //res.json({error_code:0,err_desc:null});
        return;
    });
});
//------------------------------------------------------------------------









// file index2.html

/*var storage2 = multer2.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/medal/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload2 = multer({ //multer settings
                storage: storage2
            }).single('file');


app.post('/upload2', function(req, res) {
    upload2(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
    });
});*/




var server = app.listen(8000, function() {
	console.log('Server listening on port '+server.address().port);
});

connection.init();
routes.configure(app);