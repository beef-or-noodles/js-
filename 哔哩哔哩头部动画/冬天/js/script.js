
window.onload = function(){
    
    let dom = document.getElementById('bilibanner')
    let img = document.getElementById('ImgHeight')
    dom.style.height = img.height+'px'
    snowInit()
    /* 鼠标移动事件 */
    let start = 0 // 鼠标移入初始值
    //初始数据
    let styleObj=[{
        name:'早上',
        opacity:0, //透明度
        moveX:0, // 移动距离
        filterBlur:0 // 模糊度
    },{
        name:'中午',
        opacity:1, //透明度
        moveX:0, // 移动距离
        filterBlur:0 // 模糊度
    },{
        name:'雪球',
        opacity:1, //透明度
        moveX:0, // 移动距离
        filterBlur:0 // 模糊度
    },{
        name:'晚上',
        opacity:0, //透明度
        moveX:0, // 移动距离
        filterBlur:0 // 模糊度
    },{
        name:'有雾气的窗',
        opacity:0, //透明度
        moveX:0, // 移动距离
        filterBlur:0 // 模糊度
    },{
        name:'上午的树',
        opacity:0, //透明度
        moveX:0, // 移动距离
        filterBlur:2 // 模糊度
    },{
        name:'中午的树',
        opacity:1, //透明度
        moveX:0, // 移动距离
        filterBlur:2 // 模糊度
    },{
        name:'晚上的树',
        opacity:0, //透明度
        moveX:0, // 移动距离
        filterBlur:2 // 模糊度
    }]
    initAnimate(styleObj)
    // 初始效果
    function initAnimate(obj){
        var imgArr = dom.getElementsByClassName('layer')
        for (i in imgArr) {
            if(!isNaN(i)){
                let img = imgArr[i]
                let mmon = obj[i]
                let style = `
                transform: translate(${mmon.moveX}px,0px);
                filter: blur(${mmon.filterBlur}px);
                opacity:${mmon.opacity}
                `
                img.style = style
            }
        }
    }

    // 计算移动值
    function moveAnimate(moveX){
        let damp = 200// 阻尼值
        let styles = JSON.parse(JSON.stringify(styleObj))
        /*
         * opacity:0, //透明度
         * moveX:0, // 移动距离
         * filterBlur:0 // 模糊度
         */
        // 树运动
        styles[5].moveX = 0 - moveX/13
        styles[6].moveX = 0 - moveX/13
        styles[7].moveX = 0 - moveX/13
        var tree5 = styles[5].opacity
        var tree6 = styles[6].opacity
        var tree7 = styles[7].opacity
        styles[5].opacity = tree5 - moveX/500
        styles[6].opacity = tree6 - Math.abs(moveX/500)
        styles[7].opacity = tree7 + moveX/500
        // 雪球运动
        styles[2].moveX = 0 - moveX/3
        styles[2].opacity = 1 - Math.abs(moveX/500)
        // 中午
        styles[1].moveX = -moveX/8
        styles[1].opacity =  1+moveX/500
        // 晚上
        styles[3].moveX = 0 - moveX/8
        styles[3].opacity = moveX/500
        // 早上
        styles[0].moveX = Math.abs(moveX/8)
        styles[0].opacity =  Math.abs(moveX/500)
         // 窗
        styles[4].moveX = 0 - moveX/8
        styles[4].opacity = moveX/1000
        initAnimate(styles)
    }
    // 鼠标移动
    dom.onmousemove = function(event){
        dom.setAttribute('class',`bili-banner`)
        var event = event || window.event;  //标准化事件对象
        if (event.offsetX || event.offsetY) {
            offsetX = event.offsetX
        } else if (event.layerX || event.layerY) {
            offsetX = event.layerX-1
        }
        let moveX = offsetX - start //左右移动坐标
        moveAnimate(moveX)
    }

    // 鼠标移入
    dom.onmouseover = function (event){
        var event = event || window.event;  //标准化事件对象
        if (event.offsetX || event.offsetY) {
            start = event.offsetX
        } else if (event.layerX || event.layerY) {
            start = event.layerX-1
        }
    }
    // 鼠标移出 恢复默认设置
    dom.onmouseout = function (event){
        dom.setAttribute('class',`bili-banner moueout`)
        initAnimate(styleObj)
        setTimeout(()=>{
            dom.setAttribute('class',`bili-banner`)
        },1000)
    }
    function snowInit(maxParticles = 90){
      var canvas = document.getElementById('snowCanvas')
      var ctx = canvas.getContext('2d')
      console.log(dom.offsetWidth);
      var canvasW = dom.offsetWidth-20
      var canvasH = dom.offsetHeight-30
      var particles = []
      var maxParticles = maxParticles

      var random = function (min, max) {
        return Math.random() * (max - min) + min
      }

      window.requestAnimationFrame = (function () {
        var FPS = 80

        return window.requestAnimationFrame  ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.oRequestAnimationFrame ||
               window.msRequestAnimationFrame ||
               function (callBack) {
                 window.setTimeout(callBack, 1000/FPS)
               }
      })()

      var Particle = function () {
        this.x = Math.random() * canvasW
        this.y = Math.random() * canvasH
        this.r = random(1, 5)
        this.alpha = random(0.3, 1)
        this.velocity = {
          x: random(-0.35, 0.35),
          y: random(0.75, 1.5)
        }

        this.draw = function () {
          ctx.fillStyle = 'rgba(255, 255, 255, '+this.alpha+')'
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
          ctx.closePath()
          ctx.fill()
        }

        this.moving = function () {
          this.x += this.velocity.x
          this.y += this.velocity.y

          if (this.y > canvasH) {
            this.x = Math.random() * canvasW
            this.y = 0
          }

          this.draw()
        }
      }

      init()

      function init() {
        canvas.width = canvasW
        canvas.height = canvasH

        for (var i = 0; i < maxParticles; i++) {
          particles.push(new Particle())
        }

        animate()
      }

      function animate() {
        ctx.clearRect(0, 0, canvasW, canvasH)
        particles.forEach(function (particle) {
          particle.moving()
        })

        requestAnimationFrame(animate)
      }
    }

}