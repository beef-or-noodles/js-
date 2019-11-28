/**
 * 全局加密解密
 * @module Core
 */
const CryptoJS = require('crypto-js');
export default class basecryptojs {
	constructor (parameter={}){
		let {secretkey,ivkey}=parameter
		if(!secretkey || !ivkey){
			throw new Error('系统错误,参数异常');
			return false;
		}
		this.key = CryptoJS.enc.Utf8.parse(secretkey)
		this.iv = CryptoJS.enc.Utf8.parse(ivkey)
	}
	parametercheck() {
		const key = this.key;
		const iv = this.iv;
		if(key && iv){
			return true;
		}else {
			throw new Error('系统错误,参数异常');
			return false;
		}
	}
	/**
	 * [encrypt 加密]
	 * @return {[type]} [description]
	 */
	encrypt(word) {
		const state = this.parametercheck();
		if(!state){
			return false;
		}
	    const encrypted = CryptoJS.AES.encrypt(word, this.key, {
	        iv:this.iv,
	        mode: CryptoJS.mode.CBC,
	        padding: CryptoJS.pad.Pkcs7
	    });
	    return encrypted.toString(); //返回的是base64格式的密文
	}
	/**
	 * [decrypt 解密]
	 * @return {[type]} [description]
	 */
	decrypt(word,istype=1) {
		const state = this.parametercheck();
		if(!state){
			return false;
		}
		word = word.replace(/[\r\n]/g, "");
	    const decrypted = CryptoJS.AES.decrypt(word, this.key, {
	        iv:this.iv,
	        mode: CryptoJS.mode.CBC,
	        padding: CryptoJS.pad.Pkcs7
	    });
		const string = decrypted.toString(CryptoJS.enc.Utf8);
		if(istype == 1){
			return JSON.parse(string);
		}else{
			return string;
		}
	}
	/**
	 * [base64encrypt base64加密]
	 * @return {[type]} [description]
	 */
	base64encrypt(data){
	    var encrypted =CryptoJS.AES.encrypt(data,this.key,{
			iv:this.iv,
			mode:CryptoJS.mode.CBC,
			padding:CryptoJS.pad.Pkcs7
		});
	    return encrypted.toString();    //返回的是base64格式的密文
	}
	/**
	 * [base64decrypt base64解密]
	 * @return {[type]} [description]
	 */
	base64decrypt(encrypted){
	    var decrypted =CryptoJS.AES.decrypt(encrypted,this.key,{
			iv:this.iv,
			mode:CryptoJS.mode.CBC,
			padding:CryptoJS.pad.Pkcs7
		});
		console.log(CryptoJS.enc.Utf8);
	    return decrypted.toString(CryptoJS.enc.Utf8);
	}
}
