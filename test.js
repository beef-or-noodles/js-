/**
 * Created by Administrator on 2019/12/30.
 */
class Comput {
    //1.JS找字符串中出现最多的字符
     f1(){
        let name = "nininihaoa";
        let arr = name.split("");
        let obj = arr.reduce(function(prev,cur){
            if(prev.hasOwnProperty(cur)){
                prev[cur] = prev[cur]+1
                return prev
            }else{
                prev[cur] = 1
                return prev
            }
        },{});
        console.log(obj);
    }

//打印99乘法表
     f2(){
        let str = ""
        for (let i=1;i<=9;i++){
            for (let j = 1;j<=i;j++){
                str+=`${i}*${j}=${i*j}  `
            }
            str+="\n"
        }
        console.log(str);
    }
    f3(){
        var fun = function(){
            this.name = 'peter';
            return {
                name: 'jack'
            };
        }
        var p = new fun();
        console.log("请问p.name是：jack",p.name);
    }
    f4(){
        var fun = function(){
            this.name = 'peter';
            return 'jack';
        }
        var p = new fun();
        console.log("请问p.name是：peter",p.name);
    }
    f5(){
        var fun = function(){}
        fun.prototype = {
            info : {
                name : 'peter',
                age : 25
            }
        }
        var a = new fun();
        var b = new fun();
        a.info.name = 'jack';
        b.info.name = 'tom';
        console.log("1.先查找构造函数实例里的属性或方法，如果有，就立即返回。\n2.如果构造函数的实例没有，就去它的原型对象里找，如果有，就立即返回");
        console.log("请问a.info.name和b.info.name分别是：tom,tom：",a.info.name, b.info.name);
        //请问a.info.name和b.info.name分别是：
    }
    f6(){
        var fun = function(){
            this.info = {
                name : 'peter',
                age : 25
            }
        }
        var a = new fun();
        var b = new fun();
        a.info.name = 'jack';
        b.info.name = 'tom';
        console.log("请问a.info.name和b.info.name分别是：jack,tom：",a.info.name,b.info.name);
        //请问a.info.name和b.info.name分别是：
    }
    f7(){
        var fun = function(){}
        fun.prototype = {
            name : 'peter',
            age : 25
        }
        var a = new fun();
        var b = new fun();
        a.name = 'jack';
        b.name = 'tom';
        console.log("请问a.name和b.name分别是：jack,tom:",a.name,b.name);
    }
    f8(){
        var fun = function(){
            this.info = {
                name : 'peter',
                age : 25
            }
        }
        fun.prototype = {
            info : {
                name : 'peter',
                age : 25
            }
        }
        var a = new fun();
        var b = new fun();
        a.info.name = 'jack';
        b.info.name = 'tom';
        console.log("请问a.info.name和b.info.name分别是：",a.info.name,b.info.name);
    }
    f9(){
         console.log("解析：通过执行buildList函数，返回了一个result，那么这个result存放的是3个匿名函数。然而这三个匿名函数其实就是三个闭包，因为它可以访问到父函数的局部变量。所以闭包内的保留的i是最终的值为3.所以list[3]肯定是undefined. item变量值为item3.");
        function buildList(list) {
            var result = [];
            for(var i = 0; i < list.length; i++) {//var 换成let可以解决
                var item = 'item' + list[i];
                result.push(
                    function() {
                        console.log(item + ' ' + list[i]);
                    }
                )
            }
            return result;
        }
        var fnlist = buildList([1,2,3]);
        for (var j = 0; j < fnlist.length; j++) {
            fnlist[j]();
        }
    }
    f10(){
        function newClosure(someNum, someRef){
            var anArray = [1,2,3];
            var num = someNum;
            var ref = someRef;
            return function(x){
                num += x;
                anArray.push(num);
                console.log('num: ' + num + "; " + 'anArray ' + anArray.toString() + "; " + 'ref.someVar ' + ref.someVar);
            }
        }
        var closure1 = newClosure(40, {someVar: "closure 1"});
        var closure2 = newClosure(1000, {someVar: "closure 2"});
        closure1(5); // 打印"num: 45; anArray 1,2,3,45; ref.someVar closure 1"
        closure2(-10); // 打印"num: 990; anArray 1,2,3,990; ref.someVar closure 2"
        console.log("每次调用newClosure()都会创建独立的闭包，它们的局部变量num与ref的值并不相同。");
    }
    f11(){
        function sayAlice(){
            var sayAlert = function() { console.log(alice)}
            var alice = 'Hello Alice,alice变量在sayAlert函数之后定义，这并未影响代码执行。因为返回函数sayAlice2所指向的闭包会包含sayAlice()函数中的所有局部变量，这自然包括了alice变量，因此可以正常打印”Hello Alice”。';
            return sayAlert;
        }
        var sayAlice2 = sayAlice();
        sayAlice2(); // 输出"Hello Alice"
    }
    f12(){
         var gAlertNumber="",gIncreaseNumber="",gSetNumber=""
        function setupSomeGlobals() {
            var num = 666;
             gAlertNumber = function() { console.log(num); }
             gIncreaseNumber = function() { num++; }
             gSetNumber = function(x) { num = x; }
        }
        setupSomeGlobals();
        gAlertNumber(); // 输出666
        gIncreaseNumber();
        gAlertNumber(); // 输出667
        gSetNumber(5);
        gAlertNumber(); // 输出5
        console.log("解释：首先gAlertNumber，gIncreaseNumber，gSetNumber是三个全局变量，并且其三个值都是匿名函数，然而这三个匿名函数本身都是闭包。他们操作的num都是保存在内存中的同一个num，所有会得出上面的结果。");
    }
    f13(){
         /*变量提升
         * 这个结果的原因是，变量和函数都被提升(hoisted) 到了函数体的顶部。因此，当打印变量a时，它虽存在于函数体（因为a已经被声明），但仍然是undefined。
         * */
        console.log(a);
        console.log(foo());
        var a = 1;
        function foo() {
            return 2;
        }
    }


}

var init = new Comput();
init.f1()
init.f2()
init.f3()
init.f4()
init.f5()
init.f6()
init.f7()
init.f8()
init.f9()
init.f10()
init.f11()
init.f12()
init.f13()