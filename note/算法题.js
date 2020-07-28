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
* */
function f1(A,B) {
    if(typeof A != 'number'&&typeof B != 'number') return '请输入正确的数据'
    let arr = [] //用于存放合理值
    let divisor=[1,1]
    function fo(x,y){
        let min =  x>y?x:y // 取得最小值
        for (let i = 2; i <= min ;i++) {
            if((x%i == 0)&&(y%i==0)){
                arr.push(i)
                divisor[0] = x/i
                divisor[1] = y/i
                fo(divisor[0],divisor[1])
                return
            }
        }
    }
    fo(A,B)
    if(!arr.length){
        arr = [A,B]
    }
    let num = arr.concat(divisor).reduce((total,cur)=>{
        return cur * total
    },1)
   return num
}
console.log(f1(7,7),'公倍数');

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
//  计算数x
function f2(x){
    let pre = 0.01 // 精度区间
    if(x==0||x==1||x==-1)return x
    let min = x<0?x:0, max = x>0?x:0 // min最小 max最大
    while(min<max){
        let m = (min + max)/2
        let value = m*m*m
        if(value == x || (x+pre>value&&value>x-pre)){
            let z = m.toFixed(1)
            return z
        }else if(value>x){
            max = m
        }else if(value < x){
            min = m
        }
    }
}
console.log(f2(27),'立方根')

/*
*   35 头 96足
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

console.log(f3(), '鸡兔同笼');

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
console.log(f4('wu wan qiang'),'颠倒字符串');

/*
* 从输入任意个整型数，统计其中的负数个数并求所有非负数的平均值，结果保留一位小数，
* 如果没有非负数，则平均值为0
* 本题有多组输入数据，输入到文件末尾，请使用while(cin>>)读入
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
f5('18259 3386 -3490 64453 -1571 57543 12151 2186 -17851 56212 42919 48020 -409 13979 49103 -4985 28018 -13005 21866 48272 17400 76308 49960 22177 -19074 40860 35215 -1608 69665 70068 1127 16417 42894 36660 66927 24406 -8651 34582 57412 -5440 -2059 26052 11727 68881 30676 19227 -13007 67727 13582 72918 66762 -15575 25595 -8260 68470 75520 10708')

/*
    计算24点是一种扑克牌益智游戏，随机抽出4张扑克牌，通过加(+)，减(-)，乘(*),
    除(/)四种运算法则计算得到整数24，
    本问题中，扑克牌通过如下字符或者字符串表示，其中，小写joker表示小王，大写JOKER表示大王：
    3 4 5 6 7 8 9 10 J Q K A 2 joker JOKER
    本程序要求实现：输入4张牌，输出一个算式，算式的结果为24点。
    详细说明：
    1.运算只考虑加减乘除运算，没有阶乘等特殊运算符号，友情提醒，整数除法要当心；
    2.牌面2~10对应的权值为2~10, J、Q、K、A权值分别为为11、12、13、1；
    3.输入4张牌为字符串形式，以一个空格隔开，首尾无空格；如果输入的4张牌中包含大小王，则输出字符串“ERROR”，表示无法运算；
    4.输出的算式格式为4张牌通过+-*!/四个运算符相连，中间无空格，4张牌出现顺序任意，只要结果正确；
    5.输出算式的运算顺序从左至右，不包含括号，如1+2+3*4的结果为24
    6.如果存在多种算式都能计算得出24，只需输出一种即可，如果无法得出24，则输出“NONE”表示无解。
*/

function f6(arr){
    let computed = ['+','-','*','/']
    let com_arr = []

    /*穷举所有可能 存在重复*/
    for (let i in computed){
        for (let j in computed){
            for (let l in computed){
                for (let k in computed){
                    com_arr.push([computed[i],computed[j],computed[l],computed[k]])
                }
            }
        }
    }
    return com_arr
}

console.log(f6([1,2,3,4]),'计算24点');
