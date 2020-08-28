/**
 * Created by Administrator on 2020/7/21.
 */
/*
* OJ   javascript输出方式
* while(line=readline()){
    var lines = line.split(' ');
    var A = parseInt(lines[0]);
    var B = parseInt(lines[1]);
    print(init(A,B));
}
* */
/*
* 题目描述
* 正整数A和正整数B 的最小公倍数是指 能被A和B整除的最小的正整数值，设计一个算法，求输入A和B的最小公倍数。
*
* 使用分解质因数法
* */
function f1(A,B) {
    if(typeof A != 'number'&&typeof B != 'number') return '请输入正确的数据'
    let arr = [] //用于公因数
    let divisor=[1,1] // 存放余数
    function fo(x,y){
        let min =  x>y?x:y // 取得参数的最小值
        for (let i = 2; i <= min ;i++) {
            if((x%i == 0)&&(y%i==0)){ // 判断能同时余尽的i
                arr.push(i)
                divisor[0] = x/i
                divisor[1] = y/i
                fo(divisor[0],divisor[1])
                return
            }
        }
    }
    fo(A,B)
    // 如果没有公因数，就直接使用原始值
    if(!arr.length){
        arr = [A,B]
    }
    //使用高阶函数进行累乘
    let num = arr.concat(divisor).reduce((total,cur)=>{
        return cur * total
    },1)
   return num
}
console.log(f1(8,50),'公倍数'); // 200

/*题目二
* •计算一个数字的立方根，不使用库函数
* 详细描述：
* •接口说明
* 原型：
* public static double getCubeRoot(double input)
* 输入:double 待求解参数
* 返回值:double  输入参数的立方根，保留一位小数
* */
// 解题思路二分法
// Math.ceil()向上取整
// Math.floor()向下取整
// Number.toFixed(2) 四舍五入保留两位小数

function f2(x){
    let pre = 0.01 // 精度区间
    if(x==0||x==1||x==-1)return x //这些数都会返回本身
    let min = x<0?x:0, max = x>0?x:0 // min最小 max最大
    while(min<max){
        let m = (min + max)/2
        let value = m*m*m
        if(value == x || (x+pre>value&&value>x-pre)){
            // 计算值等于输入值或则 计算值在这个精度之间 就返回  否则修改最大最小值继续循环
            let z = m.toFixed(1)
            return z
        }else if(value>x){
            max = m
        }else if(value < x){
            min = m
        }
    }
}
console.log(f2(20),'立方根') // 2.7

/*
*  35 头 94足
*  现在笼子里一共有36只脚 35个头
*  计算鸡兔各有多少只
* */
function f3() {
    let arr = []
    let x = 0, y = 35
    for (let i = 0; i < 35; i++) {
        let x1 = x++, y1 = y--
        let t = 4 * x1
        let j = 2 * y1
        if (t + j == 94) {
            arr.push([x1, y1])
            break
        }
    }
    return arr
}

console.log(f3(), '鸡兔同笼');//[ [ 12, 23 ] ] 兔12 鸡23

/*
* 题目描述
* 将一个字符串str的内容颠倒过来，并输出。str的长度不超过100个字符。
*  如：输入“I am a student”，输出“tneduts a ma I”。
* reverse() 颠倒数组 split() 分割数组  join() 拼接数组
*
* */
function f4(str){
    let arr = str.split('')
    let length = arr.length
    let n_arr = new Array(length).fill(0)
    for (var i=0;i<length;i++){
        n_arr[length-i-1] = arr[i]
    }
    let result = n_arr.join('')
    return result
}
console.log(f4('wu wan qiang'),'颠倒字符串'); // gnaiq naw uw

/*
* 从输入任意个整型数，统计其中的负数个数并求所有非负数的平均值，结果保留一位小数，
* 如果没有非负数，则平均值为0
* Number.toFixed(1) 保留一位小数
* */
function f5(result){
    let arr = result.split(' ')
    let minus = 0 // 负数
    let positive = [] // 正数
    if(arr.length){
        for (let i = 0 ; i<arr.length ;i++) {
            if(arr[i]<0){
                minus++
            }else if(arr[i]>0){
                positive.push(arr[i])
            }
        }
    }
    let length = positive.length
    let total = 0
    for (let i in positive){
        total = total + Number(positive[i])
    }
    let mean = 0
    if(minus != 0){
        mean =  total/length
    }
    console.log(minus);
    console.log(mean.toFixed(1))
}
f5('18259 3386 -3490 64453 -1571 10708')
//2  24201.5
/*
    计算24点是一种扑克牌益智游戏，随机抽出4张扑克牌，通过加(+)，减(-)，乘(*),
    除(/)四种运算法则计算得到整数24，
    本问题中，扑克牌通过如下字符或者字符串表示，其中，小写joker表示小王，大写JOKER表示大王：
    3 4 5 6 7 8 9 10 J Q K A 2 joker JOKER
    本程序要求实现：输入4张牌，输出一个算式，算式的结果为24点。
    详细说明：
    1.运算只考虑加减乘除运算，没有阶乘等特殊运算符号，友情提醒，整数除法要当心；
    2.牌面2~10对应的权值为2~10, J、Q、K、A权值分别为为11、12、13、1；
    3.输入4张牌为字符串形式，以一个空格隔开，首尾无空格；如果输入的4张牌中包含大小王，
      则输出字符串“ERROR”，表示无法运算；
    4.输出的算式格式为4张牌通过+-*!/四个运算符相连，中间无空格，4张牌出现顺序任意，只要结果正确；
    5.输出算式的运算顺序从左至右，不包含括号，如1+2+3*4的结果为24
    6.如果存在多种算式都能计算得出24，只需输出一种即可，如果无法得出24，则输出“NONE”表示无解。

    new Set() 去除重复
    eval() 将字符串转换为可执行代码
*/

function f6(arr){
    /* 大小王返回Error */
    if(arr.indexOf('joker')!=-1||arr.indexOf('joker')!=-1||arr.length!=4) return 'ERROR'

    let computed = ['+','-','*','/']
    let com_arr = [] //存放计算符号穷举值

    /*输入值*/
    let data  = arr
    let data_arr = []  //存放数组穷举值

    /*穷举所有可能 存在重复  长度为三*/
    for (let i in computed){
        for (let j in computed){
            for (let l in computed){
                 com_arr.push([computed[i],computed[j],computed[l]])
            }
        }
    }
    //穷举所有数字组合数据 有重复
    for (let i in data){
        for (let j in data){
            for (let l in data){
                for (let k in data){
                    data_arr.push([data[i],data[j],data[l],data[k]])
                }
            }
        }
    }

    /*去重复*/
    let new_data = []
    for (let i in data_arr){
        let set = new Set(data_arr[i])
        let res = [...set]
        if(res.length == data.length){
            new_data.push(data_arr[i])
        }
    }

    // 计算结果集
    let result = []
    for (let i in com_arr){
        for (let k in new_data){
            //  将所有可能拼接成运算字符串  如：1+2*3/4  判断是否等于24
            if(eval(`((${com_str(new_data[k][0])}${com_arr[i][0]}${com_str(new_data[k][1])})${com_arr[i][1]}${com_str(new_data[k][2])})${com_arr[i][2]}${com_str(new_data[k][3])}`) == 24){
                result.push(`${new_data[k][0]}${com_arr[i][0]}${new_data[k][1]}${com_arr[i][1]}${new_data[k][2]}${com_arr[i][2]}${new_data[k][3]}`)
            }
        }
    }

    // 转换权重值
    function com_str(str){
        let num = str
        switch (str) {
            case 'J':
                num = 11
                break
            case 'Q':
                num = 12
                break
            case 'K':
                num = 13
                break
            case 'A':
                num = 1
                break
        }
        return Number(num)
    }
    // 返回结果
    if(result.length) {
        return result[0]+'=24'
    }else{
        return 'NONE'
    }
}

console.log(f6([4,2,'K','A']),'计算24点');// 输出：K+A*2-4=24

/*
* 输入描述: 输入一串字符。
* 输出描述:
* 对字符中的各个英文字符（大小写分开统计），数字，空格进行统计，
* 并按照统计个数由多到少输出,如果统计的个数相同，
* 则按照ASCII码由小到大排序输出 。如果有其他字符，则对这些字符不用进行统计。
* str.charCodeAt(i) //字符转换ASCII码\
* split('') ,字符串分割数组
* 正则替换非数字字母大小写空格 的字符串
* */

function f7(str){
    var ruler = /[^A-Za-z0-9 ]/g
    let re = str.replace(ruler,'')
    let arr = re.split('')
    let obj = {}
    for(let i in arr){ //统计字符出现次数
        if(obj.hasOwnProperty(arr[i])){
            obj[arr[i]]++
        }else{
            obj[arr[i]] = 1
        }
    }
    let n_array = []
    for (let key in obj){ // 转化为数组进行排序
        let r_obj = {}
        r_obj['key'] = key
        r_obj['num'] = obj[key]
        //转换ASCII码
        r_obj['ascii'] = key.charCodeAt(0)
        n_array.push(r_obj)
    }
    /*进行排序*/

    let temp;//临时变量
    for(let i=0; i<n_array.length-1; i++){   //表示趟数，一共arr.length-1次。
        for(let j=n_array.length-1; j>i; j--){
            console.log(i,j);
            if(n_array[j].num < n_array[j-1].num){
                temp = n_array[j];
                n_array[j] = n_array[j-1];
                n_array[j-1] = temp;
            }
        }
    }
    // 提取出排序字符串
    let str_arr = []
    for(key in n_array){
        str_arr.push(n_array[key].key)
    }

    return str_arr.join('')
}
console.log(f7('aadddccddc'),'统计规定字符串')

/*
* 实现 斐波那契数列
* 0，1，1，2，3，5，8，13 ...  后一位数是前两位数相加
* */
// num 多少位数的数列
console.time();
function f8(num) {
    let arr = [] // 数组答案
    for (let i=0;i<num;i++){
        if(i<2){
            arr.push(i)
        }else{
            arr.push(arr[i-2] + arr[i-1])
        }
    }
    return arr.join(',')
}
f8(10)
// console.log("斐波那契数列",);
console.timeEnd();

/*
* 分苹果 《递归、动态规划》
* 输入 苹果 x 个 篮子 y 个 如果输入非法返回-1
* 将苹果分放在篮子中允许存在空篮子
* 求总共有多少种可能  不重复
* */
function f9(x,y){
    // 判断是否为整数
    function isInteger(obj) {
        return !Math.floor(obj) === obj
    }
    if(typeof x != 'number' || typeof y != 'number' || x<=0 || y<=0 || isInteger(x) || isInteger(y)) return -1
    // x+y+z=7
    let basket = new Array(y).fill([])
    return basket
}
console.log("分苹果可能性统计",f9(7,3));