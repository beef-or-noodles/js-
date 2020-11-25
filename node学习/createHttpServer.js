/**
 * Created by admin on 2020/11/25.
 */
/*创建一个http服务器*/
const http = require('http')
const port = 3000
http.createServer((req, res)=>{
    res.statusCode = 200
    res.setHeader('Content-Type','text/html; charset=utf-8')
    res.end('创建了一个简易的http服务器')
}).listen(port,()=>{
    console.log(`服务器正在运行http://10.0.0.53:${port}`);
})