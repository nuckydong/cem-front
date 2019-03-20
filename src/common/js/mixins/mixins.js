//所有页面需要执行的mixins
const taMixins = {
  mounted() {
    document.body.addEventListener('mousedown',(e)=>{
      sendMessage(window.top,'indexTool.closeIndexPops')
    });
  },
  beforeUpdate(){
    let queryString = document.location.href.split('?')[1];
    if (queryString){
      let parts = queryString.split('&');
      let params = Object.create(null);
      for (let i = 0, ii = parts.length; i < ii; ++i) {
        let param = parts[i].split('=');
        let key = param[0];
        let value = param.length > 1 ? param[1] : null;
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      }
      //现在只取 modulePartId 如果有需要,后面可以改成配置型
      if(params['_modulePartId_']){
        let indexParam = this.Global.getProperty('TA$indexParam',{})
        this.Global.setProperty('TA$indexParam',{
          '_modulePartId_': params['_modulePartId_']
        })
      }

    }

  }
}

export default taMixins
