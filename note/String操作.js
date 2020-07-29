/**
 * Created by Administrator on 2020/7/29.
 * JavaScript 字符串（String）对象
 */

var str = 'Hello Word '

// 1.使用位置索引
console.log(str[1],'位置索引');
console.log(str.length,'取得长度')
console.log(str.indexOf('Hello'),'查找指定字符串首次出现的位子，如果没找到就返回-1');
console.log(str.match('Word'),"查找指定字符串，找到就返回 数据 [ 'Word', index: 6, input: 'Hello Word', groups: undefined ]")

console.log(str.replace(/l/g,'ADN'),'使用replace替换指定字符串,可传入正则表达式,如果没找到指定字符串 就返回原字符串')

console.log(str.toUpperCase(),'转换大写')
console.log(str.toLowerCase(),'转换小写')
console.log(str.split(''),'字符串分割数组')
console.log(str.trim(),'去除两边空格')
console.log(str.substr(0,3),'截取字符串，从0开始截取长度为5的字符')
console.log(str.substring(3,5),'截取字符串，从位置3到位置5的字符')