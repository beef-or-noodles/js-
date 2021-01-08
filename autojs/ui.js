auto()
toast('请开启无障碍模式,然后重启软件')

// 开启截图权限
if(!requestScreenCapture(false)){
  toast("请求截图权限失败");
  exit();
}

var path = "./model.js";
var phone = "./phone.js"
if(!files.exists(path)){
    toast("脚本文件不存在: " + path);
    exit();
}
var window = floaty.window(
    <frame>
        <button id="action" text="模拟器脚本" w="90" h="40" bg="#77ffffff"/>
        <button id="phone" margin="0 60" text="手机脚本" w="90" h="40" bg="#77ffffff"/>
        <button id="exit" margin="0 120" text="退出脚本" w="90" h="40" bg="#77ffffff"/>
    </frame>
);
window.setPosition(50, 193)
window.exitOnClose();

var execution = null;

window.action.click(()=>{
    if(window.action.getText() == '模拟器脚本'){
        execution = engines.execScriptFile(path);
        window.action.setText('停止运行');
    }else if(window.action.getText() == '停止运行'){
        if(execution){
            execution.getEngine().forceStop();
        }
        window.action.setText('模拟器脚本');
    }
});

window.phone.click(()=>{
    if(window.phone.getText() == '手机脚本'){
        execution = engines.execScriptFile(phone);
        window.phone.setText('停止运行');
    }else if(window.phone.getText() == '停止运行'){
        if(execution){
            execution.getEngine().forceStop();
        }
        window.phone.setText('手机脚本');
    }
});


window.exit.click(()=>{
if(window.exit.getText() == '退出脚本'){
engines.stopAll()
}
})

setInterval(()=>{}, 1000);