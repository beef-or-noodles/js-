/**
 * Created by dev2 on 2019/11/8.
 */
var http = require("http");
var fs = require("fs")
http.createServer(function(request,respones){
    respones.writeHead(200,{'Content-Type':'text/html'})
    fs.readFile('./tree.html','utf-8',function(err,data){
        if(err){throw err}
        respones.end(data);
    })
}).listen(3000);
console.log("启动成功过 3000");