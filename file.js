/**
 * Created by dev2 on 2019/9/20. node操作文件
 */
var fs = require("fs");


function readFile(url,sync=true){
    return new Promise(function(resolve, reject){
        if(sync){
            try{
                var data = fs.readFileSync(url);
                console.log(data.toString(),"同步读取");
                let params = {
                    fileContent:data.toString(),
                    sync:true,
                }
                resolve(params);
            }catch(err){
                if(err) throw err
                reject(err);
            }
        }else{
            fs.readFile(url, (err, data) => {
                if (err) throw err;
                let params = {
                    fileContent:data.toString(),
                    sync:false,
                }
                resolve(params);
            });
        }
    });
}
/*读取文件内容*/
/*readFile("file.txt",false).then(data=>{
    console.log(data);
});*/
/*----------创建目录----------*/
/*fs.mkdir('fsDir', function (err) {
    if(err) throw err;
    console.log('创建目录成功')
});*/
/*fs.mkdirSync("fsDir");*/

var basePath = "fsDir/"
function readdir(path){
    fs.readdir(path, function (err, files) {
        if(err) {console.error(err);return;}
        files.forEach(function(item){
            //获取文件信息
            fs.stat(path+'/'+item,function(err,stat){
                if (err) {
                    console.error(err);
                    throw err;
                }
                if(stat.isFile()){
                    console.log(item,"我是文件");
                }else if(stat.isDirectory()){
                    console.log(item,"我是文件夹");
                }else{
                    console.log(item,"我是其他文件");
                }
            })
        })
    })
}
