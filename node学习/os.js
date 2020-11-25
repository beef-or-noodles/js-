/**
 * Created by admin on 2020/11/25.
 * 操作系统模块 os
 */

const os = require('os')

//console.log('系统可用cpu的信息',os.cpus());
console.log("",os.endianness());
console.log("以整数的形式返回空闲的系统内存量",Number(os.freemem())/1024/1024/1024);
console.log("操作系统主机名",os.hostname());
console.log("该对象包含已分配了网络地址的网络接口",os.networkInterfaces());
console.log("操作平台",os.platform());
console.log("以整数的形式返回系统的内存总量（以字节为单位）",os.totalmem()/1024/1024/1024);
console.log("返回为 Node.js 编译的平台：",os.platform());
console.log('系统正常运行时间',os.uptime())