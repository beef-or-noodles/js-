/**
 * Created by admin on 2020/11/19.
 * node爬虫 实现
 *
 * 思路爬取头条,知乎我关注的文章
 * 1.寻找目标链接 (头条，知乎)
 * 2.探究数据获取方式 (网页dom解析，抓包）
 * 3.数据处理（dom解析，接口数据）
 * 4.过滤所需数据 （文字，图片，音频。。。。）
 * 5.存入数据库 （主要mysql）
 * 6.设计后台控制爬虫功能（后台管理页面）
 *
 * 需求技术
 * request 网络请求模块
 * cheerio 将网页转成可操作dom 与jquery操作dom相似
 * iconv-lite 解决字符乱码问题
 */
// cosnt fs = require('fs')
// request('imgUrl').pipe(fs.createWriteStream('./flower.png')) // 下载文件到本地

let cheerio = require('cheerio'); //let $ = cheerio.load(body, {ignoreWhitespace: true}) 转换dome
const request = require('request')
var http = require('http');
let util = require('util');

//文件模块
let fs = require('fs');
//系统路径模块
let path = require('path');

// 请求封装
function GET(url){
    return new Promise((resolve, reject) => {
        let proxy_ip = '60.208.44.228';
        let proxy_port = 80;
        let proxy = util.format('http://%s:%d', proxy_ip, proxy_port);
        request(url, function (err, response, body) {
            if(err){
                reject(err)
            }else{
                resolve(body)
            }
        })
    })
}

/*文件下载*/
/*
* url 网络文件地址
* filename 文件名
* callback 回调函数
*/
function downloadFile(uri,filename,callback){
    var stream = fs.createWriteStream(filename);
    request(uri).pipe(stream).on('close', callback);
}

function saveJson(jsonData,fileName) {
// 格式化json
    let text = JSON.stringify(jsonData)
// 指定要创建的目录和文件名称 __dirname为执行当前js文件的目录
    let file = path.join('./', fileName+'.json');
    //写入文件
    fs.writeFile(file, text, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('文件创建成功~' + file);
        }
    });
}



function startGOGO() {
    let videoJson = []
    GET('http://www.51shiping.com/3g/list.asp?id=711').then(body=>{

        /*抓取列表数据*/
        let $ = cheerio.load(body, {ignoreWhitespace: true})
        let domeList = $('.box02>a')
        let urlList = []

        domeList.each(function (i, item) {
           let href = domeList.eq(i).attr('href')
            urlList.push(href)
        })

        /* 递归抓取内容数据 */
        let index = 0
        loop(urlList[index])
        function loop(url){
            GET(url).then(res=>{
                let $chide = cheerio.load(res, {ignoreWhitespace: true})
                let script = $chide('script')
                let strArr = script.eq(script.length-1).html().split(';')
                eval(strArr[0])
                eval(strArr[1])
                eval(strArr[2])
                //var muu='ae2017';  var mp='.mp4';   var wenn='0-0';
                let title = $chide('.content>h1').eq(0).text()
                let src = `https://www8.51shiping.com:444/${muu}/mp9/${wenn}${mp}`
                videoJson.push({
                    title,
                    src
                })
                index++
                console.log(title,src);
                if(index < urlList.length){
                    console.log("--------执行文件下载");
                    /*执行文件下载*/
                    let fileName = title+'.mp4'
                    downloadFile(src,fileName,function(){
                        console.log(fileName+'-----下载完毕 -------继续执行抓取');
                        loop(urlList[index])
                    });
                }else{
                    saveJson(videoJson,'Premiere2017视频教程')
                    console.log("++++++++抓取完成");
                }

            }).catch(err=>{
                console.log(err);
                saveJson(videoJson,'Premiere2017视频教程')
            })
        }
    })
}

startGOGO()

// http.createServer(function (req, res) {
//     res.writeHead(200, {"Content-type": "text/html;charset=utf-8"});
//     request('http://react.ailion.cn', function (err, response, body) {
//         /*
//           response 响应信息的集合
//         */
//         if (!err && response.statusCode == 200) {
//
//             // let $ = cheerio.load(body, {ignoreWhitespace: true})
//             // console.log($('#posts').length);
//             res.write(body);
//         } else {
//             console.log(err);
//         }
//     })
// }).listen(8888);
// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8888/');