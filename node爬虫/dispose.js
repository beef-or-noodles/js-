/**
 * Created by admin on 2020/12/17.
 */
const request = require('request')
//文件模块
let fs = require('fs');
var path = require('path'); //系统路径模块
var file = path.join(__dirname, './data.json'); //文件路径，__dirname为当前运行js文件的目录
//var file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径

//读取json文件
fs.readFile(file, 'utf-8', function(err, data) {
    console.time('计算结束')
    if (err) {
        res.send('文件读取失败');
    } else {
        let list = JSON.parse(data)
        let total = list.length // 历史总期数
        let obj = {}
        let redObj = {}
        let redBall = {}
        list.forEach(item=>{
            if(obj.hasOwnProperty(item.bule)){
                obj[item.bule]+=1
            }else{
                obj[item.bule] = 1
            }
            if(redObj.hasOwnProperty(item.red)){
                redObj[item.red]+=1
            }else{
                redObj[item.red]=1
            }
            // 多次出现次数
            let arr = item.red.split(',')
            arr.forEach(ls=>{
                if(redBall.hasOwnProperty(ls)){
                    redBall[ls]+=1
                }else{
                    redBall[ls]=1
                }
            })

        })
        // 转成数组 然后进行排序
        /* 篮球出现机率 */
        var objArr = []
        for(let key in obj){
            objArr.push({
                label:key,
                value:obj[key],
                ratio:(obj[key]/total) * 100  // 历史出现占比
            })
        }

        /* 组合红球出现机率 */
        var redArr = []
        for(let key in redObj){
            redArr.push({
                label:key,
                value:redObj[key]
            })
        }
        /* 单个红球出现机率 */
        let redBallArr = []
        for(let key in redBall){
            redBallArr.push({
                label:key,
                value:redBall[key]
            })
        }

        redArr.sort((ls,el)=>{
            return el.value - ls.value
        })
        // 进行排序
        objArr.sort((ls,el)=>{
            return el.value - ls.value
        })

        redBallArr.sort((ls,el)=>{
            return el.value - ls.value
        })
        console.log(objArr);
        console.log(redArr);
        console.log(redBallArr);

        let select = ['08',10,15,16,23,26] //01,06,09,14,19,22
        let buleBall = '10'
        let pitch = redArr.filter(item=>item.label == select.join(',')) // 组合出现机率
        let pitchBule = objArr.filter(item=>{return item.label == buleBall})
        let pitchRed = redBallArr.filter(item=>{return select.some(ls=> item.label == ls)})

        console.log(pitch);
        console.log('红球组合历史出现次数',pitch);
        console.log('单个红球历史出现次数',pitchRed);
        console.log('单个蓝球历史出现次数',pitchBule)

    }
    console.timeEnd('计算结束')
});