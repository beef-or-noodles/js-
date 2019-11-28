/**
 * Created by dev2 on 2019/11/26. 加密文件
 */
/*** 资源数据安全处理 ***/
import basecryptojs from './module_cryptojs'
const axioscryptojs = new basecryptojs({
    secretkey:'GcRHG7pGgepXXOOU',//密钥
    ivkey:'W5yt6WthEs2mQlSn'
});
/*
* file对象转Base64
* */
export function fileToBase64(file){
    return new Promise((resolve, reject)=>{
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            let baser64 = this.result.substring(this.result.indexOf(',')+1);
            resolve(baser64);
        }
    });
}
/*
* blob对象转arraybuffer
* */
export function blobToArraybuffer(blob){
    return new Promise((resolve, reject)=>{
        var reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onload = function (e) {
            var buf = new Uint8Array(this.result);
            resolve(buf);
        }
    });
}
/*
* file对象转ArrayBuffer
* */
export function fileToArrayBuffer(file){
    return new Promise((resolve, reject)=>{
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function (e) {
            let ArrayBuffer = this.result
            resolve(new Uint8Array(ArrayBuffer));
        }
    });
}

/*
* base64转byteArray
* */
export function base64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
/*
* arrayBuffer 转base64
* */
export function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

/*base64转blob*/
export function dataURLtoBlob(base64) {
    var arr = base64.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}


/*
* 下载指定文件得到arraybuffer
* */
export function onloadFile(url){
    return new Promise((resolve, reject)=>{
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    resolve(xhr.response)
                }else{
                    reject(xhr.status)
                }
            }
        }
        xhr.responseType = "arraybuffer";
        xhr.send();
    });
}
/**
 * Blob转base64 并加密
 **/
function Blobbase64(data){
    return new Promise((resolve, reject) => {
        let binary = '';
        let bytes = new Uint8Array(data);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        const data1 = axioscryptojs.encrypt(window.btoa(binary));
        resolve(data1);
    });
}

//生产彩虹表
export async function wpatable(type = 1) {
    let k = 256;
    let tmp = [];
    for (let i=0;i<k;i++) {
        tmp.push(i);
    }
    while (k) {
        let j = Math.floor(Math.random() * k--);
        [tmp[j], tmp[k]] = [tmp[k], tmp[j]];
    }
    if(type === 2){
        return await Blobbase64(tmp)
    }else{
        return new Promise((resolve, reject) => {
            resolve(tmp);
        });
    }
}

/**
 * 加密字节数据
 * bytearray 字节数据源
 * decrypt  解密字符串
 * **/
export async function encryptedbyte(data) {
    let {bytearray,decodearray} = {bytearray:[],decodearray:'',...data};
    let iswpatable = [];
    if(!decodearray){
        iswpatable = await wpatable();
    }else{
        iswpatable = await decodebyte({type:2,decodearray:decodearray})
    }
    for (let i=0;i<bytearray.length;i++) {
        const item=bytearray[i];
        bytearray[i] = iswpatable[item];
    }
    let data2 = await Blobbase64(iswpatable)
    return [bytearray,data2];
}


/**
 * 解密字节数据
 * type 1解密数据 2解密彩虹表
 * bytearray 字节数据源  字节数组
 * decodearray 彩虹数据表 字符串
 * **/
export function decodebyte(data={}) {
    let {type,decodearray,bytearray} = {type:1,bytearray:[],decodearray:'',...data};
    return new Promise((resolve, reject) => {
        let data1 = axioscryptojs.decrypt(decodearray,2)
        let data2 = base64ToUint8Array(data1);
        if(type === 1){
            let dv = new DataView(bytearray)
            for (let i=0;i<bytearray.byteLength;i++) {
                const item = dv.getUint8(i);
                const index = data2.indexOf(item);
                if(index >= 0){
                    dv.setUint8(i,index)
                }else{
                    console.info('解密失败',index)
                    break;
                }
            }
            resolve(dv.buffer);
        }else{
            resolve(data2);
        }
    });
}




/*
* 得到加密后的file对象
* */
export function getEncryptionFile(file,arrTable){
    var type = file.type;
    var format = file.type.split("/")[1]
    return new Promise((resolve, reject)=>{
        fileToArrayBuffer(file).then(base=>{
            let params = {
                bytearray:base,
                decodearray:arrTable
            }
            encryptedbyte(params).then(bar=>{
                    let base64 = arrayBufferToBase64(bar[0])
                    let newbase64 = `data:${type};base64,${base64}`
                    let blob = dataURLtoBlob(newbase64)
                    let num = Math.floor(Math.random()*1000);
                    let newFile = new File([blob], `file${num}.${format}`,[{type:type}]);
                    resolve(newFile) //返回新的加密文件
            });
        })
    })
}

/*
* 解密下载文件
* status:1, 1：blob链接 2：arrayBuffer
* url:"", //解密文件url
* arrTable:"", //彩虹表
*
* */
export function decodefile(data){
    let {status,url,arrTable} = {status:1,url:"",arrTable:"",...data}
    return new Promise((resolve, reject)=>{
        let types=[{
            name:"midi",
            type:"audio/mid"
        },{
            name:"mp3",
            type:"audio/mp3"
        },{
            name:"pdf",
            type:"application/pdf"
        },{
            name:"png",
            type:"image/png"
        },{
            name:"jpg",
            type:"image/jpeg"
        },{
            name:"xml",
            type:"text/xml"
        }];
        let nameArr = url.split('.');
        let length = nameArr.length
        let name = nameArr[length-1]
        var type = ""
        if(name){
            types.forEach(item=>{
                if(item.name == name){
                    type = item.type;
                }
            })
        }
        onloadFile(url).then(data=>{
            let params = {
                bytearray:data,
                decodearray:arrTable
            }
            decodebyte(params).then(res=>{
                if(status == 1){
                    let blob = new Blob([res],{type:type})
                    var strs = URL.createObjectURL(blob);
                    resolve(strs)
                }else if(status == 2){
                    resolve(res)
                }
            })
        })
    })
}

