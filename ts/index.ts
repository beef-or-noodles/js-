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
class Site {
   name():void{
       console.log("Runoob");
   }
}
var obj = new Site()
obj.name()