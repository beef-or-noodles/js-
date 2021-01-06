
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
