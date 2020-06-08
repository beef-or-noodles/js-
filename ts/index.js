/*我的typeScript*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var message = "Hello Word";
var num = 1;
var judge = true;
var any = 4.3333333;
any.toFixed(2);
var arr = [1, 2];
var arr1 = ["a", "b"];
var arr2 = ["a", 1]; //原组类型
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["bule"] = 1] = "bule";
    Color[Color["black"] = 2] = "black";
})(Color || (Color = {})); //枚举类型
var c = Color.black;
function say() {
    console.log("Hello Word Void");
}
console.log(message, num, judge, any, arr, arr1, arr2, c, say());
// TypeScript 面向对象编程实例
var Site = /** @class */ (function () {
    function Site() {
    }
    Site.prototype.name = function () {
        console.log("我是面向对象编程实例");
    };
    return Site;
}());
var obj = new Site();
obj.name();
function fn() {
    console.log("我是无返回值得函数");
}
function return_fn() {
    return "返回指定类型的值";
}
fn();
console.log(return_fn());
// 带参数的方法
function fun_value(x, y, z) {
    if (y === void 0) { y = 1; }
    return x + y;
}
console.log(fun_value(2, 5), '带参数的方法  z是可选参数');
var person = {
    name: '小吴',
    sayHi: function () { return 'sayHi'; }
};
console.log(person.sayHi(), '接口interface');
var dog = {
    say: "汪汪汪",
    _name: "小小狗",
    eat: function () { return '小狗吃骨头'; }
};
console.log(dog.eat(), "接口继承");
var Game = /** @class */ (function () {
    function Game(game_name) {
        this.game_name = game_name;
    }
    Game.prototype.play = function () {
        console.log("玩儿" + this.game_name, "Class类");
    };
    return Game;
}());
var xiao = new Game("英雄联盟");
xiao.play();
var Mobel = /** @class */ (function (_super) {
    __extends(Mobel, _super);
    function Mobel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.money = 9000;
        return _this;
    }
    Mobel.phoneCode = function () {
        console.log("手机的型号是：" + Mobel.phone, "静态static可以直接通过类名调用");
    };
    Mobel.prototype.show = function () {
        console.log('private私有的属性' + this.money);
    };
    return Mobel;
}(Game));
var Ming = new Mobel("王者荣耀继承Game类");
Ming.play();
Mobel.phone = "Ipad";
Mobel.phoneCode();
console.log(Ming instanceof Mobel, "instancof判断对象是Mobek实例化来的吗");
Ming.show();
/// <reference path = "circle.ts" />
/// <reference path = "shape.ts" />
function drawAllShapes(shape) {
    shape.draw();
}
drawAllShapes(new Drawing.Circle());
