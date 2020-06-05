/*我的typeScript*/

var message:string="Hello Word"
var num:number=1
var judge:boolean=true
var any:any = 4.3333333
any.toFixed(2)
var arr:Array<number>=[1,2]
var arr1:string[]=["a","b"]
var arr2:[string,number]=["a",1]//原组类型

enum Color {red,bule,black} //枚举类型
let c:Color = Color.black

function say():void{ //表示该方法没有返回值。
   console.log("Hello Word Void");
}

console.log(message,num,judge,any,arr,arr1,arr2,c,say());
// TypeScript 面向对象编程实例
class Site {
   name():void{
       console.log("我是面向对象编程实例");
   }
}
var obj = new Site()
obj.name()

function fn(){
    console.log("我是无返回值得函数");
}
function return_fn():string{
    return "返回指定类型的值"
}
fn()
console.log(return_fn());

// 带参数的方法
function fun_value(x:number,y:number=1,z?:number):number{
    return x + y;
}
console.log(fun_value(2,5),'带参数的方法  z是可选参数')

