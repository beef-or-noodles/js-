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

let cheerio = require('cheerio');
const request = require('request')
var http = require('http');

//文件模块
let fs = require('fs');
//系统路径模块
let path = require('path');

var index = 0 //分页
var dataList = [] // 存放数据
var pagesize = 0
function startGOGO() {
    // 查找列表url
    index+=1
    let url = `http://www.tulishe.com/simo/scsy/page/${index}`
    console.log(`开始抓取第${index}页-----------`);
    request(url, function (err, response, body) {
        console.log(url);
        if (!err && response.statusCode == 200) {
            let $ = cheerio.load(body, {ignoreWhitespace: true})
            let children = $('#posts').children('.post')
            let fistArr = [] // 列表链接
            if (children.length) {
                if(index == 1){
                    pagesize = children.length  // 记录下第一页的条数
                }
                children.each(function (i, item) {
                    let a = children.eq(i).find('h3').eq(0).find('a').attr("href")
                    let title = children.eq(i).find('h3').eq(0).find('a').attr("title")
                    if (a) {
                        fistArr.push(a)
                        dataList.push({
                            title: title,
                            href: a,
                            childImgList: []
                        })
                    }
                })
                console.log(`第${index}页加载完毕++++++++++++`);
                if (fistArr.length) {
                    var j = 0
                    function contentLoop(url) {
                        console.log(`正在抓取第${index}页第${j}条-----------${url}`);
                        request(url, function (err, response, body) {
                            if (!err && response.statusCode == 200) {
                                let $c = cheerio.load(body, {ignoreWhitespace: true})
                                let chid = $c('#gallery-1').children('.gallery-item')
                                let childUrl = []
                                chid.each(function (i, item) {
                                    let src = chid.eq(i).find('img').eq(0).attr("src")
                                    if (src) {
                                        let href = src.split('src=')[1].split('&')[0]
                                        childUrl.push(href)
                                    }
                                })
                                let jNun = j + ((index-1)*pagesize)
                                console.log(`访问第${jNun}条子元素抓取完毕`);
                                dataList[jNun].childImgList = childUrl
                                j += 1
                                if (j < fistArr.length) {
                                    contentLoop(fistArr[jNun+1])
                                } else {
                                    startGOGO()
                                }
                            } else {
                                console.error(`第${index}页第${j}条出错`);
                                // 出错后继续爬取下一页
                                startGOGO()
                            }
                        })
                    }
                    contentLoop(fistArr[j])
                }
            }else{

            }
        } else {
            console.error(`第${index}页出错 可能是最后一页`);
            console.log("----------------------抓取数据-------------------------");
            // 保存json文件
            saveJson(dataList)
        }
    })
}


function saveJson(jsonData) {
// 格式化json
    let text = JSON.stringify(jsonData)
// 指定要创建的目录和文件名称 __dirname为执行当前js文件的目录
    let file = path.join('./', 'scsy.json');
    //写入文件
    fs.writeFile(file, text, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('文件创建成功~' + file);
        }
    });
}
try{
    startGOGO()
}catch (e) {
    saveJson(dataList)
    console.log(e);
}


http.createServer(function (req, res) {
    res.writeHead(200, {"Content-type": "text/html;charset=utf-8"});
    request('http://www.tulishe.com/280721.html', function (err, response, body) {
        /*
          response 响应信息的集合
        */
        if (!err && response.statusCode == 200) {

            // let $ = cheerio.load(body, {ignoreWhitespace: true})
            // console.log($('#posts').length);
            res.write(body);
        } else {
            console.log(err);
        }
    })
}).listen(8888);
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');