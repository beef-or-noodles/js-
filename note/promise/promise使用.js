/**
 * Created by Administrator on 2020/10/20.
 */


/*
* promise状态 等待，成功，失败  只有下面两种变化 且只能改变一次状态
* pending （等待）
* pending => fulfilled （满足成功）
* pending => redected (失败)
* */

// type成功或失败
function test(type=true){
    return new Promise((resolve ,reject)=> {
        if(type){
            resolve('成功')
        }else{
            reject('失败')
        }
    })
}
function test1(type=true){
    return new Promise((resolve ,reject)=> {
        if(type){
            resolve('链式调用')
        }else{
            reject('失败')
        }
    })
}

test(true).then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
})

/* promise链式操作 */

test(true).then(data=>{
        return test1()
}).then(txt=>{
    console.log(txt);
})

/* Promise.all  必须都为true状态为fulfilled 否则返回rejected */
var p = Promise.all([test(true),test1(true)])
p.then(data=>{
    console.log(data,'all');
}).catch(err=>{
    console.log(err);
})

/* Promise.race 有一个返回true 状态为fulfilled  */
var p1 = Promise.race([test(true),test1(false)])
p1.then(data=>{
    console.log(data,'race')
}).catch(err=>{
    console.log(err)
})





