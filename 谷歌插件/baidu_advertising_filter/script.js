/*
 * @Author: your name
 * @Date: 2021-01-27 12:13:29
 * @LastEditTime: 2021-01-27 17:18:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \baidu_advertising_filter\script.js
 */

 window.onload = function init(){
    filter()
    //  监听子元素变化
    document.getElementById("kw").addEventListener('blur',function(){
        go()
    })

    function go(){
         setTimeout(()=>{
                filter()
            },1000)
    }
    // 过滤广告
    function filter(){
        try{
            let classDom = $("#content_left .new-pmd")
            for(dom in classDom){
                let childArr = classDom[dom].children
                loop(childArr)
                function loop(list){
                    for(i in list){
                        let tagArr = list[i]
                        if(tagArr.localName == "font"){
                            if(tagArr.innerText.indexOf("广告")!=-1){
                                classDom[dom].style.opacity = "0"
                                classDom[dom].style.position = "fixed"
                                classDom[dom].style.left = "-800px"
                            }
                        }else if(tagArr.localName == "div"){
                            loop(tagArr.children) 
                        }
                        
                    }
                }  
            }
        }catch(err){
            console.log(err);
        }
       
    }
 }