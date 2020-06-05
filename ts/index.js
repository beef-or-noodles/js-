/*我的typeScript*/
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
function fun_value(x, y) {
    return x + y;
}
console.log(fun_value(2, 5));
