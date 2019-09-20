/**
 * Created by dev2 on 2019/9/20. node操作文件
 */
var fs = require("fs");
var data = fs.readFileSync("index.html");
console.log(data.toString(),"同步读取");