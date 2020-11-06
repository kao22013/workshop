'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var https = require('https');
var http = require('http');

var PORT  = process.env.PORT || 5000;

var app = express();

//router
const router = express.Router();
router.get('/', function (req, res) {
    console.log(api);
    res.send("TEST.");
});

router.post('/', function(req, res){

});
//get_data
const api = [
    {
        firstName: "A",
        lastName: "B",
        age: 25
    },{
        firstName: "C",
        lastName: "D",
        age: 25
    }
]

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router);
app.use('/css', express.static(__dirname+'public/css'));
app.use('/js', express.static(__dirname+'public/js'));
app.use('/img', express.static(__dirname+'public/img'));

app.engine('.ejs', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render('index', {fname: 'CS264', lName: 'GROUP1'});
});

app.get('/test1', function (req, res) {
    res.render('test1', {fname: 'CS264', lName: 'GROUP1'});
});

app.get('/ht', function (req, res) {
    res.render('ht', {fname: 'CS264', lName: 'GROUP1'});
});

app.listen(PORT, function () {
    console.log(`Listening on ${PORT}`)
});

/*app.get('/apix', function (req, res) {
    const input = req.query;
    //console.log('HELLO');
    res.send('');

});*/

var options = {
    'method': 'POST',
    'hostname': 'restapi.tu.ac.th',
    'path': '/api/v1/auth/Ad/verify',
    'headers': {
      'Content-Type': 'application/json',
      'Application-Key': 'TUa4e553b83aa271d3411a4ad88395265801fcfb074110e8b0e03962c01f2aed6ab1662db3a0e1451df7835880c6828fcf'
    }
  };
  
var req = https.request(options, function (res) {

    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      //console.log("body.toString()");
    });
  
    res.on("error", function (error) {
      console.error(error);
    });

});

req.end();