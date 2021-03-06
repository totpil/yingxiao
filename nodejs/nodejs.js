﻿var http = require('http');
var https = require('https');
var mysql = require('mysql');
var querystring = require('querystring');
var fs = require('fs');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs',
    password : 'nodejs',
    database : 'test'
});
  connection.connect();

var server = http.createServer(function(req,res){


  
  console.log("get a user");
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;  //一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
    console.log("chunk:",chunk);
  });
  req.on('end', function () {
    body = querystring.parse(body);
    console.log("body:",body);
    if(body.tj){
      console.log(body.tj);console.log("tj exists");
      var par = body.tj;
      var sql = 'SELECT * FROM test where tj = ?'
      console.log('SELECT * FROM test where tj = '+body.tj);
      connection.query(sql,par,function (err,result) {
        if(err||result === undefined){
          console.log('[SELECT ERROR] - ',err.message);
          res.end()
          return;
        }else{
          console.log('--------------------------SELECT----------------------------');
          console.log(result[0]);
          var str = JSON.stringify(result[0]);
          console.log(str);
          if (str === undefined){res.write("{\"name\":\"根据工号未查询到人员\"}");}else{res.write(str);}
          console.log('------------------------------------------------------------\n\n');  
          res.end()
        }
      });
    }else{
      res.write("{name:'根据工号未查询到人员'}");
      res.end();
    }
  });

    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});

})



var options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
};

https.createServer(options, function (req, res) {
  console.log("get a user");
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;  //一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
    console.log("chunk:",chunk);
  });
  req.on('end', function () {
    body = querystring.parse(body);
    console.log("body:",body);
    if(body.tj){
      console.log(body.tj);console.log("tj exists");
      var par = body.tj;
      var sql = 'SELECT * FROM test where tj = ?'
      console.log('SELECT * FROM test where tj = '+body.tj);
      connection.query(sql,par,function (err,result) {
        if(err||result === undefined){
          console.log('[SELECT ERROR] - ',err.message);
          res.end()
          return;
        }else{
          console.log('--------------------------SELECT----------------------------');
          console.log(result[0]);
          var str = JSON.stringify(result[0]);
          console.log(str);
          if (str === undefined){res.write("{\"name\":\"根据工号未查询到人员\"}");}else{res.write(str);}
          console.log('------------------------------------------------------------\n\n');  
          res.end()
        }
      });
    }else{
      res.write("{name:'根据工号未查询到人员'}");
      res.end();
    }
  });

    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
}).listen(443);
server.listen(3000)