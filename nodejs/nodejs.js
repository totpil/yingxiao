var http = require('http');
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


  
  var  sql = 'SELECT * FROM test';
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    console.log('--------------------------SELECT----------------------------');
    var str = JSON.stringify(result[0]);
    console.log(str);res.write(str);
    console.log('------------------------------------------------------------\n\n');  
    res.end()
  });

    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});

})



var options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
};

https.createServer(options, function (req, res) {

  var body = "";
  req.on('data', function (chunk) {
    body += chunk;  //一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
    console.log("chunk:",chunk);
  });
  req.on('end', function () {
    body = querystring.parse(body);
    console.log("body:",body);
    if(body.tj){
      console.log(body.tj);
      var par = body.tj;
      var  sql = 'SELECT * FROM test where tj = ？';
      connection.query(sql,function (err,par,result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        console.log('--------------------------SELECT----------------------------');
        var str = JSON.stringify(result[0]);
        console.log(str);res.write(str);
        console.log('------------------------------------------------------------\n\n');  
        res.end()
      });
    }
  });

    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
}).listen(443);
server.listen(3000)