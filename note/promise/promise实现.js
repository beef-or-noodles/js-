/**
 * Created by Administrator on 2020/10/20.
 */

/*
* 原理解释：
* Promise也是使用回调函数，只不过是把回调封在了内部，
* 使用上一只通过then方法的链式调用，
* 使得多层的回调函数看起来变成了同一层的，
* 书写上和理解上更为直观
* */

/*
* 实现步骤
* 1.判断参数是否是function
* 2.三个状态值 pending fulfilled rejected
*   状态变化只能有
*   --- resolve：pending=>fulfilled
*   --- reject：pending=>rejected
*   --- 传入的handle函数包含resolve和reject两个函数，用于改变promise的状态和传入Promise的值
*   --- 添加状态改变的执行逻辑
*
* 3.实现promise的then方法
* */


// 定义一个判断参数是否为函数的方法
function isFunction(fn){
    return typeof fn === 'function'
}
// 定义状态常量
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
class MyPromise {
    constructor(handle){
        // 判断参数是否是function
        if(!isFunction(handle)){
            throw new Error('必须传入一个function')
        }
        // 添加状态值
        this._status = PENDING
        // 添加状态
        this._value = undefined
        // 执行handle
        try{
            handle(this._resolve.bind(this),this._reject.bind(this))
        } catch(err){
            this._reject(err)
        }
    }
    // 成功方法
    _resolve(val) {
        if (this._status !== PENDING) return
        this._status = FULFILLED
        this._value = val
    }
    // 失败方法
    _reject(err){
        if (this._status !== PENDING) return
        this._status = REJECTED
        this._value = err
    }
}
let p = new MyPromise(()=>{})