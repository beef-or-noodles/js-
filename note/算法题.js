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
// dec 保留几位小数
// num 计算数
function f2(num){
    let dec = 1 // 保留几位小数
    let arr=new Array(dec+1).fill(0)
    for(let i=0;i<=dec;i++){
        let condition = true
        let j=0
        while (condition){
            j++
            var x = 0
            if(i==1){
                 var y = Number(`${arr[0]}.${j}`)
                 x = y * y * y
            }else{
                 x = j * j * j
            }
            if(x>num){
                arr[i] = j-1
                condition = false
            }
        }
    }
    return Number(arr.join('.'))
}
console.log(f2(99),'立方根')