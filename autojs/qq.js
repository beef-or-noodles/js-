
//requestScreenCapture();
 console.show()
 console.setPosition(0,1100)
 console.setSize(device.width/2, 200);
// 开启自动抢红包操作
launchApp("微信")
sleep(500)
start()

function start(){
       while(true){
            var dom = id('ga3').find()
            sleep(1000)
            console.log(dom.length,'检查未读消息')
            if(dom.length>0){
            let x = dom[0].bounds().centerX()
            let y = dom[0].bounds().centerY()
            // 进入消息页面
            click(x,y)
            // 判断是否是消息页面
            mesPage()
            }
      }
     
}


// 消息页面操作
function mesPage(){
        sleep(300)
        var is_mes= id('g78').find()
        console.log(is_mes.length,'是否消息页面');
        if(is_mes.length){
          // 执行红包判断
          //swipe(300, 300, 300, 1400, 1000)
          rob()
        }else{
          // 点击返回 继续等待新消息
          back()
        }
}
// 抢红包操作
function rob(){
      var package = id('al7').find()
      console.log(package.length,'页面红包个数');
      if(package.length>0){
         package[package.length-1].click()
         sleep(500)
         var open = desc('开').find()
         console.log(open.length,'点击开启')
         if(open.length>0){
            open[0].click()
            sleep(500)
            back()
            back()
         }else{
            back()
            back()
         }
      }else{
         back()
      }
}

function back(){
   sleep(500)
   click(36,94)
}