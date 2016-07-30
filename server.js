var express = require('express');
var bodyParser = require('body-parser');    // this can't handle multipart
var port = 8000 || process.env.PORT;

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
});


app.listen(port);