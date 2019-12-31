var http = require('http');
var mysql = require('mysql');

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

server.listen(3000)