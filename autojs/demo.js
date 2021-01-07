
//  打开应用
// console.show()
// function openApp(name){
//     launchApp(name)
// }

// openApp("今日头条极速版")

launchApp("今日头条极速版")

// var up = true
// setInterval(() => {
//     let y1 = up?1120:200
//     let y2 = up?200:1120
//     swipe(500, y1, 400, y2, 6000)
//     up = !up
// }, 6000);

function loop(){
    // 刷新
    click('首页')
    // 休眠一秒
    sleep(3000)
    // 点击第一条
    click(300,912)
    sleep(3000)
    // // 浏览10秒
    swipe(300, 1400, 600, 300, 1000)
    sleep(1000)
    swipe(300, 1400, 600, 300, 10000)
    sleep(1000)
    swipe(300, 1400, 600, 300, 5000)

    // // 休眠13秒
    // sleep(12000)
    // // 返回 40 80
    click(40,80)
    
    sleep(1000)
    // 重复执行
    loop()
}
loop()


// 查找demo
// click('任务')
/*
* console.show() // 打开控制台
* launchApp(name) // 打开App
* swipe(x1, y1, x2, y2, time) // 滑动屏幕
* click() // 点击事件
* press(x, y, duration) // 长按事件
* // 控件选择器
* text('文本')
* desc('描述')
* id('id')
* 
* */