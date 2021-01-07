
//requestScreenCapture();
// console.show()
// 开启自动抢红包操作
start()

function start(){
       while(true){
            var dom = id('ga3').find()
            console.log(dom.length);
            if(dom.length>0){
            let x = dom[0].bounds().centerX()
            let y = dom[0].bounds().centerY() 
            // 进入消息页面
            sleep(200)
            click(x-30,y+30)
            // 判断是否是消息页面
            mesPage()
            }
            sleep(2000)
      }
     
}


// 消息页面操作
function mesPage(){
        var is_mes= id('g78').find()
            console.log(is_mes.length,'消息');
        if(is_mes.length){
          // 执行红包判断
          swipe(300, 300, 300, 1400, 1000)
          
         // rob()
        }else{
          // 点击返回 继续等待新消息
          click(36,94)
        }
}

// 抢红包操作
function rob(){
         var package = id('al7').find()
         package.forEach((element,index) => {
            package[index].click()
            var open = desc('开').find()
            if(open.length>0){
               open[0].click()
               sleep(500)         
               var back = desc('返回').findOne()
               click(back.bounds().centerX(), back.bounds().centerY())  
            }else{
              var back = desc('返回').findOne()
              click(back.bounds().centerX(), back.bounds().centerY())  
            }
            sleep(500)
         });

         console.log(package.length,'红包个数');      
}