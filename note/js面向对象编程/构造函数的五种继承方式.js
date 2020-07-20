/**
 * Created by Administrator on 2020/7/20.
 */
//创建一个动物对象的构造函数
function Animal(){
    this.species = "动物"
}
/*-----------第一种
* 一、构造函数绑定
* 继承使用 call或apply 方法 将父对象的构造函数绑定在子对象上
* ----------*/
function Cat1(name,color){
    Animal.apply(this,arguments)
    this.name = name
    this.color = color
}
var cat1 = new Cat1('毛毛','黑色')
console.log(cat1.species); // 动物


/*--------
* 二、prototype模式
* 将cat的prototype对象，指向Animal实例
* --------*/
function Cat2(name,color){
    this.name = name
    this.color = color
}
Cat2.prototype = new Animal()
// 任何一个prototype里面都有一个constructor 上面那一行改变了constructor指向Animal  所以下方需要将constructor从新指会Cat2
Cat2.prototype.constructor = Cat2
var cat2 = new Cat2()
// 注意每一个实例也有一个constructor属性默认调用prototype对象的constructor属性
console.log(cat2.constructor == Cat2.prototype.constructor); //true
console.log(cat2.constructor == Cat2); // true
console.log(cat2.species); // 动物


/*--------------
* 三、直接继承prototype
* 第三种方法是对第二种方法的改进，由于Animal1对象中
* 不变的属性都可以直接写入Animal1.prototype
* 所以我们直接让Cat2()跳过Animal1()直接继承Animal1.prototype
*----------------- */
// 改写Animal
function Animal1(){}
Animal1.prototype.species = '猫科动物'
function Cat3(name,color){
    this.name = name
    this.color = color
}
// 与前一种方法相比，这样做的优点是效率比较高（不用执行和建立Animal1的实例了），比较省内存。
// 缺点是 Cat3.prototype和Animal1.prototype现在指向了同一个对象，
// 那么任何对Cat3.prototype的修改，都会反映到Animal1.prototype。
Cat3.prototype = Animal1.prototype
Cat3.prototype.constructor = Cat3
console.log(Animal1.prototype.constructor); // Cat3
var cat3 = new Cat3('大猫','白猫')
console.log(cat3.species); // 猫科动物

/*-------------------
* 四、利用空对象作为中介
*
* ------------------*/
function Cat4(name,color){
    this.name = name
    this.color = color
}
var F = function(){}
F.prototype = new Animal()
Cat4.prototype = new F()
Cat4.prototype.constructor = Cat4
var cat4 = new Cat4('小猫咪','花猫')
console.log(cat4.species); // 动物
console.log(Animal.prototype.constructor) // Animal  不会改变原对象

/*------------
* 五、拷贝继承
* 需要把Animate3不变的属性都放在prototype对象上
*-------------*/
function Animate3(){}
Animate3.prototype.species = "动物"

function Cat5(name,color){
    this.name = name
    this.color = color
}
// 这个函数的作用就是将父对象的prototype对象中的属性一一拷贝给Child对象的prototype对象
function extend(Child,Parent){
    var c = Child.prototype
    var p = Parent.prototype
    for(var key in p){
        c[key] = p[key]
    }
}
extend(Cat5,Animate3)
var cat5 = new Cat5("八哥",'灰色')
console.log(cat5.species,cat5.name); // 动物 八哥
