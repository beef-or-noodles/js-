/**
 * Created by Administrator on 2020/10/20.
 */
function* test(x){
    yield x+1;
    yield x+2;
    yield x+3
    return
}

for (let x of test(3)){
    console.log(x);
}
// 打印{ value: 2, done: false } done = false 表示是否执行完成
console.log(test(1).next())