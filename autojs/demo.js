
//  打开应用
// console.show()
// function openApp(name){
//     launchApp(name)
// }

// openApp("今日头条极速版")

var up = true
setInterval(() => {
    let y1 = up?1120:200
    let y2 = up?200:1120
    swipe(500, y1, 400, y2, 6000)
    up = !up
}, 6000);

/*
* console.show() // 打开控制台
* launchApp(name) // 打开App
* swipe(x1, y1, x2, y2, time) // 滑动屏幕
* click() // 点击事件
* press(x, y, duration) // 长按事件
* */