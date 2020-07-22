/**
 * Created by Administrator on 2020/7/21.
 */

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
console.log(f1(1,7));
