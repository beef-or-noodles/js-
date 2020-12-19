/**
 * Created by admin on 2020/12/18.
 */

const request = require('request');
httprequest('http://www.cwl.gov.cn/cwl_admin/kjxx/findDrawNotice?name=ssq&issueCount=&issueStart=&issueEnd=&dayStart=2003-10-01&dayEnd=2020-12-18&pageNo=2');

function httprequest(url){
    const options = {
        url: url,
        proxy:'http://218.89.76.103:80',
        headers: {
            'User-Agent': 'request',
            'content-type': 'application/json'
        }
    };
    request(options, (error, response, body)=>{
        if (!error && response.statusCode == 200) {
            const info = JSON.stringify(body);
            console.log(info);
        }
    });
};
