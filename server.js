var express = require('express');
var bodyParser = require('body-parser');    // this can't handle multipart
var fs = require('fs');
var port = process.env.PORT || 8000 ;

var multer  = require('multer');
var upload = multer();

var app = express();

app.use(express.static("public/"));  //for static html/css files

app.use(bodyParser.json());                        //for express 4, use of middleware to parse body data
app.use(bodyParser.urlencoded({extended: true}));  //but this doesn't handle multipart data due to their complex and large nature  


app.get("/", function(req, res){
	req.statusCode = 200;
	res.setHeader("Content-Type", "text/html");
	res.render("index.html");
});

app.post("/api/fileanalyse", multer({ dest: './uploads/'}).single('uploadedFile'), function(req, res){
	//console.log(req.body);
	//console.log(req.file.size);
	req.statusCode = 200;
	res.setHeader("Content-Type", "text/json");
	res.send({"size": req.file.size, "form-input":req.body}); 
	fs.unlinkSync(req.file.path); //delete the file after it is used from the uploads directory
});


app.listen(port);
