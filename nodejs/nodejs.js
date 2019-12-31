var http = require('http');

function mysqlask(){
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs',
    password : 'nodejs',
    database : 'dmcnew'
  });

  connection.connect();


  var  sql = 'SELECT * FROM test';

  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }

  console.log('--------------------------SELECT----------------------------');
  console.log(result);
  console.log('------------------------------------------------------------\n\n');  
  });
}


var server = http.createServer(function(req,res){
    mysqlask();
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
    res.write("hello node.js!");
    res.end()
})

server.listen(3000)