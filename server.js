'use strict';

//var bodyParser = require('body-parser');
/*GLOBAL.document = new JSDOM(html).window.document;*/
var express = require('express');
var path = require('path');
var https = require('https');
var http = require('http');
let stdData;
var PORT  = process.env.PORT || 5000;
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname+'public/css'));
app.use('/js', express.static(__dirname+'public/js'));
app.use('/img', express.static(__dirname+'public/img'));

app.engine('.ejs', require('ejs').renderFile);

app.get('/', function (req, res) {res.render('login', {fname: 'CS264', lName: 'GROUP1'});});

app.get('/test1', function (req, res) {res.render('test1', {fname: 'CS264', lName: 'GROUP1'});});

app.get('/ht', function (req, res) {res.render('ht', {fname: 'CS264', lName: 'GROUP1'});});

app.get('/login', function (req, res) {res.render('login', {fname: 'CS264', lName: 'GROUP1'});})

app.listen(PORT, function () { console.log(`Listening on ${PORT}`) });

/*const form = document.getElementById('form');*/

app.get('/api', async (req, res)=>{
    const ques = req.query;

    const getData = await loginAuthen(ques['user'], ques['pwd']);
    
    //console.log(getData);
    if(getData){
       let datax=JSON.parse(getData);
       stdData=JSON.parse(getData);
       if(datax.status==true){
           console.log(datax.status);
           //res.render('login',{datax:status});
           res.send('success.')
       }else{
           //res.send('fail');
           /*return res.render('login', {
               title: "var name",
               status: datax.status
            });*/

            return res.redirect('/login');
            
       }
       
    }else{
        return false;
    }
    
});

const loginAuthen = (user, password)=>{
    return new Promise((resolve, reject)=>{
        var options = {
            'method': 'POST',
            'hostname': 'restapi.tu.ac.th',
            'path': '/api/v1/auth/Ad/verify',
            'headers': {
                'Content-Type': 'application/json',
                'Application-Key': 'TU5815b44223ac5e0414a9ebd07189e32c9984410e627890e41b6ddce0d711b0bb558fdfb73578cd9155ddfd4c7ccd7c80'
            }
        };
    
        var req = https.request(options, function (res) {
            
            var chunks = [];
        
            res.on("data", function (chunk) {
                chunks.push(chunk);
                console.log('this is data : '+chunk);
            });
        
            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                //let j = JSON.parse(body);
                resolve(body.toString());
                //console.log('stdData : '+stdData.username);
            });
    
            res.on("error", function (error) {
                console.error(error);
                reject(error);
            });
    
        });
        //revieved_data
        var postData =  "{\n\t\"UserName\":"+user+",\n\t\"PassWord\":"+password+"\n}";
        req.write(postData);
        req.end();
    });
    
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