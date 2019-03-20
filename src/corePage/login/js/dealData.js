//add by cy 添加密码加密公用方法 做个简单封装
import './Barrett'
import {setMaxDigits} from './BigInt'
import './jQuery.md5'
import {RSAKeyPair, encryptedString} from './RSA'
import {BrowserInfo, SystemInfo} from './clientEnvironment'
import './passwordCheck'
import './SlideCheckCode'
//系统信息
const systemInfo = {
  clientsystem: SystemInfo.System,
  clientscreensize: SystemInfo.ScreenSize,
  clientbrowser: BrowserInfo.Browser
}
//初始化rsaKey
const bodyRSA = () => {
  setMaxDigits(130);
  let key = new RSAKeyPair('10001', '', '906C793510FB049452764740B21B97A51DAEA794AB6E43836269D5E6317D49226C12362BA22DAB5EC3BC79553A8A098B01F3C4D81A87B3EE5BD2F4F1431CC495EE2FE54688B212145BB32D56EEEEE1430CE26234331B291CFC53C9B84FAFFDF0B44371A032880C3D567F588D2CD5FCE28D9CDD2923CB547DAD219A6A1B8B5D3D')
  return key;
}
//rsaKey
const rsaKey = bodyRSA();

//加密方法
const encryptPwd = (pwd) => {
 return encryptedString(rsaKey, encodeURI(pwd))
}
//生成验证码图片src
const refreshCodeSrc=()=> {
   let src=faceConfig.basePath + '/CaptchaImg?r=' + Math.random()
  return src;
}

const dealData= {
  //系统信息
  systemInfo,
  //rsakey
  rsaKey,
  //加密方法
  encryptPwd,
  //生成验证码图片src
  refreshCodeSrc
}
export default dealData;

