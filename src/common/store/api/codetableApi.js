import {formUtil} from '@yh/ta404-ui'
const Base = {...formUtil}
export default {
  removeCode (codeType, successCall, errorCall) {
    let submitParam = {
      url: "codetable!removeCodeByType",
      data: {codeType: codeType}
    };
    let callBack = {
      successCallback:  (result) =>{
        successCall()
      },
      failCallback:errorCall
    };
    Base.submit(null, submitParam, callBack);
  },
  addCode (codeObj, successCall, errorCall) {
    let submitParam = {
      url: "codetable!addCode",
      data: codeObj
    };
    let callBack = {
      successCallback:  (result) =>{
        successCall(codeObj)
      },
      failCallback:errorCall
    };
    Base.submit(null, submitParam, callBack);
  },
  updateCode (codeObj, successCall, errorCall){
    let submitParam = {
      url: "codetable!updateCode",
      data: codeObj
    };
    let callBack = {
      successCallback:  (result) =>{
        successCall(codeObj)
      },
      failCallback:errorCall
    };
    Base.submit(null, submitParam, callBack);
  },
  loadCode(codeType, successCall, errorCall){
    console.log("loadCode api ...",codeType)

    var submitParam = {
      method: 'POST',
      responseType: 'json', // 默认的
      baseURL: faceConfig ? (faceConfig.basePath ? faceConfig.basePath : '/api') : "/api",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      url: "codetable/getCode",
      data: {codeType: codeType}
    };
    let callBack = {
      successCallback:  (result) =>{
        successCall(result.data.codeList)
      },
      failCallback:errorCall
    };
    Base.submit(null, submitParam, callBack);
  },
  loadAllCode(successCall, errorCall){
    let submitParam = {
      url: "codetable!loadAllCode",
    };
    let callBack = {
      successCallback:  () =>{
        successCall()
      },
      failCallback:errorCall
    };
    Base.submit(null, submitParam, callBack);
  },
  clearCodeCache(successCall, errorCall){
    let submitParam = {
      url: "codetable!clearCodeCache",
    };
    let callBack = {
      successCallback:  () =>{
        successCall()
      },
      failCallback:errorCall
    };
    Base.submit(null, submitParam, callBack);
  }
}
