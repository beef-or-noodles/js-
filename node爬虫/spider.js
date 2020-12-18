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
function GET(url) {
    return new Promise((resolve, reject) => {
        let proxy_ip = '218.89.76.103';
        let proxy_port = 80;
        let proxy = util.format('http://%s:%d', proxy_ip, proxy_port);

        let option = {
            url,
            method: "GET",
            headers: {
                "Content-Type": 'application/json'
            }
        }
        request(url, function (err, response, body) {
            if (err) {
                reject(err)
            } else {
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
function downloadFile(uri, filename, callback) {
    var stream = fs.createWriteStream(filename);
    request(uri).pipe(stream).on('close', callback);
}

function saveJson(jsonData, fileName) {
// 格式化json
    let text = JSON.stringify(jsonData)
// 指定要创建的目录和文件名称 __dirname为执行当前js文件的目录
    let file = path.join('./', fileName + '.json');
    //写入文件
    fs.writeFile(file, text, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('文件创建成功~' + file);
        }
    });
}

/* 过滤特殊字符 */
var stripscript = function (s) {
    var pattern = new RegExp("[`~!@#$^&*()=|�{}':;'\\[\\].<>/?~！@#￥……&* （）——|{}【】‘；：”“'。，、？↵\r\n]");
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/* 两数之间的随机数 */
function getRandomNumber(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}


var index = 1
let dataJson = []

function startGOGO() {
    GET(`https://www.16788.cn/ssq/lishi.asp?sort=%CB%AB%C9%AB%C7%F2&sortid=2&page=${index < 10 ? `0${index}` : index}`).then(body => {
        /*抓取列表数据*/
        let $ = cheerio.load(body, {ignoreWhitespace: true})
        let domeList = $('.font-14 tr')
        for (let i in domeList) {
            let tdArr = domeList.eq(i).find('td[align=center]')
            if (tdArr.length > 0) {
                let time = stripscript(tdArr.eq(1).text())
                let red = stripscript(tdArr.eq(2).find('b').eq(0).text())
                let bule = stripscript(tdArr.eq(3).find('b').eq(0).text())
                dataJson.push({
                    time,
                    red,
                    bule
                })
            }
        }
        if (domeList.length >= 25) {
            index += 1
            let random = getRandomNumber(0, 4) * 1000
            console.log(`第${index}"页；开始抓取间隔时间：${random / 1000}'秒'`);
            setTimeout(() => {
                startGOGO(index)
            }, random)
        } else {
            console.log("抓取完成================");
            saveJson(dataJson, '双色球历史开奖')
        }
    }).catch(err => {
        // 抓取出错
        console.log(`第${index}页，抓取出错×××××××××××××××××××××`);
        saveJson(dataJson, 'data')
    })
}
//startGOGO()

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