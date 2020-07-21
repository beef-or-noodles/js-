/**
 * Created by Administrator on 2020/3/27.
 * js的七种继承方式
 */
//一、原型链继承
//将原型链作为实现继承的主要方法。其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。
/*缺点：
（1）、包含引用类型值的原型属性会被所有实例共享，这会导致对一个实例的修改会影响另一个实例；
（2）、在创建子类型的实例时，不能向超类型的构造函数中传递参数。
　　由于这两个问题的存在，实践中很少单独使用原型链*/
function SuperType() {
    this.name = "小明"
    this.color = ["red", "bule"]
}

SuperType.prototype.getName = function () {
    return this.name
}

function SubType() {
    this.age = "35岁"
}

SubType.prototype = new SuperType()
SubType.prototype.getAge = function () {
    return this.age
}
var people = new SubType()
var people2 = new SubType()
people.color.push("black")
console.log(people.getAge(), people.getName(), people.color, people2.color);


//二、借用构造函数实现继承
//函数只不过是在特定环境中执行代码的对象，
// 因此通过使用 apply() 和 call() 方法可以在新创建的对象上执行构造函数。
/*缺点：
（1）、无法避免构造函数模式存在的问题，方法都在构造函数中定义，因此无法复用函数；
（2）、在超类型的原型中定义的方法，对子类型而言是不可见的。
　　因此这种技术很少单独使用。*/
function SuperType2(name) {
    this.name = name
}

function SubType2() {
    SuperType2.call(this, "小吴")
    this.age = "25"
}

var people3 = new SubType2()
console.log(people3.name, people3.age);

//三、组合继承
/*组合继承，指的是将原型链和借用构造函数的技术组合到一起。
　思路是使用原型链实现对原型方法的继承，而通过借用构造函数来实现对实例属性的继承。
　这样，既通过在原型上定义方法实现了函数的复用，又能够保证每个实例都有它自己的属性。*/

/*
* 缺点：无论在什么情况下，都会调用两次超类型构造函数
* ，一次是在创建子类型原型的时候，一次是在子类型构造函数的内部*/
function SuperType3(name) {
    this.name = name
    this.color = ["red", "black"]
}

SuperType3.prototype.sayName = function () {
    return this.name
}

function SubType3(name, age) {
    SuperType3.call(this, name) //第一次调用
    this.age = age
}

SubType3.prototype = new SuperType3(); //第二次调用

SubType3.prototype.sayAge = function () {
    return this.age
}
var people4 = new SubType3('小刚', '24岁')
people4.color.push("bule")
console.log(people4.sayName(), people4.sayAge(), people4.color);
var people5 = new SubType3("小邹", "18岁")
console.log(people5.sayName(), people5.sayAge(), people5.color);

//四、原型式继承
//原型式继承是借助原型可以基于已有的对象创建新对象
/*
在 object 函数内部，先创建一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，
最后返回这个临时类型的一个新实例。
本质上来说，object对传入其中的对象执行了一次浅复制。
*/
function object(o) {
    function f() {
    }

    f.prototype = o
    return new f()
}

var person = {
    name: "哈哈",
    color: ["red", "bule"]
}
var people6 = object(person)
person.color.push("black")
console.log(people6.color);

/*Object.create()方法
　  ES5通过Object.create()方法规范了原型式继承，可以接受两个参数，
    一个是用作新对象原型的对象和一个可选的为新对象定义额外属性的对象，行为相同，
    基本用法和上面的object一样，除了object不能接受第二个参数以外。
* */

var person2 = {
    name: "嘿嘿",
    color: ["red", "bule"]
}
var people7 = Object.create(person2)
person2.color.push("black")
console.log(people7.color);

//七、ES6中 Class ...  extends 关键字实现继承
class Animal {
    //构造函数里面写上对象的属性
    constructor(props) {
        this.name = props.name || "小红"
    }

    //父类共有的方法
    sayName() {
        return this.name
    }
}

//class继承
class Bird extends Animal {
    //props是继承过来的属性，myProps是自己的属性
    constructor(props, myProps) {
        super(props);
        this.age = myProps.age || "30岁"
    }

    sayAge() {
        return this.age
    }
}

//通过new实例化
var myBird = new Bird({name: "小燕子"}, {age: "18岁"})
console.log(myBird.sayName(), myBird.sayAge());

console.log("new关键字的实现原理-----------------------");

function newFn(name) {
    this.name = name
}

var New = function (P, name) {
    //1.创建一个空对象
    var obj = new Object()
    //2.绑定this
    var result = P.call(obj, name)
    //3.设置原型链 将obj的__proto__成员指向了Person函数对象的prototype成员对象
    obj.__proto__ = P.prototype
    //4.判断返回类型 如果是引用类型就返回这个引用类型的值，如果是值类型就返回创建的obj
    if (typeof (result) == "object") {
        return result
    } else {
        return obj
    }
}
var people8 = New(newFn, "小吴")
console.log(people8.name);