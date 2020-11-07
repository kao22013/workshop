'use strict';

//var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var https = require('https');
var http = require('http');
/*const { resolve } = require('path');
const { rejects } = require('assert');*/

var PORT  = process.env.PORT || 5000;
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname+'public/css'));
app.use('/js', express.static(__dirname+'public/js'));
app.use('/img', express.static(__dirname+'public/img'));

app.engine('.ejs', require('ejs').renderFile);

app.get('/', function (req, res) {res.render('index', {fname: 'CS264', lName: 'GROUP1'});});

app.get('/test1', function (req, res) {res.render('test1', {fname: 'CS264', lName: 'GROUP1'});});

app.get('/ht', function (req, res) {res.render('ht', {fname: 'CS264', lName: 'GROUP1'});});

app.listen(PORT, function () { console.log(`Listening on ${PORT}`) }); 

app.get('/api', async (req, res)=>{
    const ques = req.query;
    var options = {
        'method': 'POST',
        'hostname': 'restapi.tu.ac.th',
        'path': '/api/v1/auth/Ad/verify',
        'headers': {
            'Content-Type': 'application/json',
            'Application-Key': 'TU5815b44223ac5e0414a9ebd07189e32c9984410e627890e41b6ddce0d711b0bb558fdfb73578cd9155ddfd4c7ccd7c80'
        }/*,
        'body':{
            'UserName' : ques['user'],
            'PassWord' : ques['pwd'],
        }*/
    };
    var x=false;
    var req = https.request(options, function (res) {

        var chunks = [];
        
    
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            //console.log('this is chunks : '+chunks[0]);
            console.log('this is body : '+body.toString());
            //console.log('status : '+chunks);
            if(body['status']){x=true};
        });
        
        res.on("error", function (error) {
        console.error(error);
        });

    });
    //revieved_data
    var postData =  "{\n\t\"UserName\":"+ques['user']+",\n\t\"PassWord\":"+ques['pwd']+"\n}";
    console.log('this is postData : '+postData);
    req.write(postData);

    
    let result="";
    //const temp= await login(ques['user'], ques['pwd']);
    //console.log('temp = '+temp);
    if(x){
        res.send("success");
        /*let j = JSON.parse(temp);
        console.log(j);
        if(j.status == true){
            res.send("Success "+j.displayname_th);
        }else{
            res.send("Fail.");
        }*/
    }else{
        res.send("Login Fail.");
    }
    req.end();
});

const login = (user, password)=>{
    if(options){
        return true;
    }else{
        return false;
    }
    //res.send(userName);
    /*return new Promise((resolve, reject)=>{
        
        var options = {
            'method': 'POST',
            'hostname': 'restapi.tu.ac.th',
            'path': '/api/v1/auth/Ad/verify',
            'headers': {
                'Content-Type': 'application/json',
                'Application-Key': 'TU5815b44223ac5e0414a9ebd07189e32c9984410e627890e41b6ddce0d711b0bb558fdfb73578cd9155ddfd4c7ccd7c80'
            },
            'body':{
                'UserName' : user,
                'PassWord' : password,
            }
        };
        
        var req = https.request(options, (res)=>{
            var chunks = [];
            //chunks.push
            //console.log(chunks);
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
        
            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                console.log('this is body '+body.toString);
                resolve(body.toString());
            });
        
            res.on("error", function (error) {
                //console.error(error);
                reject("Hello"+error);
            });

        });
        var postData =  "{\n\t\"UserName\":\"{username}\",\n\t\"PassWord\":\"{password}\"\n}";
        req.write(postData);
        req.end();*
    });*/
    
};


    /*var options = {
            'method': 'POST',
            'hostname': 'restapi.tu.ac.th',
            'path': '/api/v1/auth/Ad/verify',
            'headers': {
                'Content-Type': 'application/json',
                'Application-Key': 'TU5815b44223ac5e0414a9ebd07189e32c9984410e627890e41b6ddce0d711b0bb558fdfb73578cd9155ddfd4c7ccd7c80'
            },
            'body':{
                'UserName' : res.query['user'],
                'PassWord' : res.query['pwd'],
            }
    };
    
    var req = https.request(options, function (res) {

        var chunks = [];
    
        res.on("data", function (chunk) {
        chunks.push(chunk);
        });
    
        res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        });
    
        res.on("error", function (error) {
        console.error(error);
        });

    });

    var postData =  "{\n\t\"UserName\":\"{username}\",\n\t\"PassWord\":\"{password}\"\n}";
    req.write(postData);
    req.end();*/