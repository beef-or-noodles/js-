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


interface People {
    name:string,
    sayHi:()=>string
}
var person:People={
    name:'小吴',
    sayHi:():string=>'sayHi'
}
console.log(person.sayHi(),'接口interface');

/*接口继承*/
interface Animate {
    _name:string,
    eat:()=>string
}
interface Dog extends Animate{
    say:string
}
var dog:Dog={
    say:"汪汪汪",
    _name:"小小狗",
    eat:():string=>{return '小狗吃骨头'}
}
console.log(dog.eat(),"接口继承");


class Game {
    game_name:string
    constructor(game_name:string){
        this.game_name = game_name
    }
    play():void{
        console.log("玩儿"+this.game_name,"Class类");
    }
}
var xiao = new Game("英雄联盟")
xiao.play()

class Mobel extends Game{
    static phone:string
    private money:number = 9000
    static phoneCode():void{
        console.log("手机的型号是："+Mobel.phone,"静态static可以直接通过类名调用");
    }
    show():void{
        console.log('private私有的属性'+this.money);
    }
}

var Ming = new Mobel("王者荣耀继承Game类")
Ming.play()

Mobel.phone="Ipad"
Mobel.phoneCode()
console.log(Ming instanceof Mobel,"instancof判断对象是Mobek实例化来的吗");
Ming.show()


/// <reference path = "circle.ts" />
/// <reference path = "shape.ts" />
function drawAllShapes(shape:Drawing.IShape) {
    shape.draw();
}
drawAllShapes(new Drawing.Circle());