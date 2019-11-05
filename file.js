/**
 * Created by dev2 on 2019/9/20. node操作文件
 */
var fs = require("fs");
var data = fs.readFileSync("file.txt");
console.log(data.toString(),"同步读取");

let txt = " 肖 邦 Op.42 "
function textString(txt){
    let str = /.*[\u4e00-\u9fa5]+.*$/;
    let tx = /^[a-zA-Z]/;
    console.log(str.test(txt) , tx.test(txt));
    if(str.test(txt) || tx.test(txt)){
        let str = txt.replace(/\s/g,"");
        return str;
    }else{
        return false;
    }
}
console.log(textString(txt));