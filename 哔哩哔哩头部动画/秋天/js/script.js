/**
 * Created by Administrator on 2020/10/10.
 */
window.onload = function(){
    // 眨眼动画
    childAnimate()
    // 鼠标移动动画
    movueAnimate()
}

// 人物眨眼动画图片切换
function childAnimate(){
    let dom = document.getElementById('childIcon')
    var arr = ['./image/2-1.png','./image/2-2.png','./image/2-3.png','./image/2-4.png','./image/2-1.png']
    let len = arr.length -1
    let i = 0
    function fun(i) {
        i++
        if(i<=len){
            setTimeout(()=>{
                dom.setAttribute('src',arr[i])
                fun(i)
            },120)
        }
    }
    setInterval(()=>{
        fun(i)
    },5000)
}
// 鼠标移动动画
function movueAnimate(){
    var dom = document.getElementById('bilibanner')
    var start = 0; //起始位置
    var current = 0; //当前位置
    // 图片位移 模糊 初始·      参数
    var styleObj=[{
        id:1,
        translateX:0,
        translateY:0,
        filterBlur:4
    },{
        id:2,
        translateX:0,
        translateY:0,
        filterBlur:0
    },{
        id:3,
        translateX:-50,
        translateY:0,
        filterBlur:1
    },{
        id:4,
        translateX:0,
        translateY:4.2,
        filterBlur:4
    },{
        id:5,
        translateX:0,
        translateY:-1.8,
        filterBlur:5
    },{
        id:6,
        translateX:0,
        translateY:0,
        filterBlur:6
    }]

    setImgStyle(styleObj)

    // 设置图片样式
    function setImgStyle(obj){
        var imgArr = dom.getElementsByTagName('img')
        for (i in imgArr) {
            if(!isNaN(i)){
                let img = imgArr[i]
                let mmon = obj[i]
                let style = `transform: translate(${mmon.translateX}px,${mmon.translateY}px);filter: blur(${mmon.filterBlur}px)`
                img.style = style
            }
        }
    }
    dom.onmousemove = function(event){
        var event = event || window.event;  //标准化事件对象
        var offsetX = 0
        if (event.offsetX || event.offsetY) {
            offsetX = event.offsetX
        } else if (event.layerX || event.layerY) {
            offsetX = event.layerX-1
        }
        var copyStyle = JSON.parse(JSON.stringify(styleObj))
        // 计算偏移量
        var offset = start - offsetX
        var t1Blur = copyStyle[0].filterBlur
        copyStyle[0].filterBlur = t1Blur - offset/200

        var t1X = copyStyle[1].translateX
        var t1Blur = copyStyle[1].filterBlur
        copyStyle[1].translateX = t1X - offset/100
        copyStyle[1].filterBlur = Math.abs(t1Blur + offset/100)

        var t2X = copyStyle[2].translateX
        var t2Blur = copyStyle[2].filterBlur
        copyStyle[2].translateX = t2X - offset/100
        copyStyle[2].filterBlur = Math.abs(t2Blur + offset/400)

        var t3X = copyStyle[3].translateX
        var t3Blur = copyStyle[3].filterBlur
        copyStyle[3].translateX = t3X - offset/50
        copyStyle[3].filterBlur = Math.abs(t3Blur + offset/250)

        var t4X = copyStyle[4].translateX
        var t4Blur = copyStyle[4].filterBlur
        copyStyle[4].translateX = t4X - offset/10
        copyStyle[4].filterBlur = t4Blur + offset/200

        var t5X = copyStyle[5].translateX
        var t5Blur = copyStyle[5].filterBlur
        copyStyle[5].translateX = t5X - offset/30
        copyStyle[5].filterBlur = t5Blur + offset/250

        setImgStyle(copyStyle)
    }
    // 鼠标移入
    dom.onmouseover = function (event){
        dom.setAttribute('class',`bili-banner`)
        var event = event || window.event;  //标准化事件对象
        if (event.offsetX || event.offsetY) {
            start = event.offsetX
        } else if (event.layerX || event.layerY) {
            start = event.layerX-1
        }
        console.log("移入",start);
    }
    // 鼠标移出 恢复默认设置
    dom.onmouseout = function (event){
        dom.setAttribute('class',`bili-banner moueout`)
        setImgStyle(styleObj)
        setTimeout(()=>{
            dom.setAttribute('class',`bili-banner`)
        },1000)
    }
}
