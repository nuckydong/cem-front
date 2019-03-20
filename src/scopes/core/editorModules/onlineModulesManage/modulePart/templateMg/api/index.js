const BASE_URL = "templateMg/templateMgRestService/";
export default {
  //加载模板资源树
  loadTemplateCatalogTree(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "loadTemplateCatalogTree",
      data: data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (data) => {
        if (data.errors === null) {
          callBack(data);
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _source.$message.error(data.errors[i].msg);
          }
        }
      }
    });
  },
  //查询模板列表
  listTemplate(_source,data,callBack){
    let submitParameter = {
      url: BASE_URL + "queryTemplateByCatalogId",
      data:data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (data) => {
        if (data.errors === null) {
          callBack(data);
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _source.$message.error(data.errors[i].msg);
          }
        }
      }
    });
  },
  //新建功能模块
  addTemplateCatalog(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "addTemplateCatalog",
      data:data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (data) => {
        if (data.errors === null) {
          callBack(data);
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _source.$message.error(data.errors[i].msg);
          }
        }
      }
    });
  },
  //移除功能模块
  removeTemplateCatalog(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "removeTemplateCatalog",
      data:data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (data) => {
        if (data.errors === null) {
          callBack(data);
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _source.$message.error(data.errors[i].msg);
          }
        }
      }
    });
  },
  //新增模板
  addTemplate(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "addTemplate",
      data: data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (data) => {
        if (data.errors === null) {
          callBack(data);
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _source.$message.error(data.errors[i].msg);
          }
        }
      }
    });
  },
  //上传模板
  uploadTemplate(_source,data,callBack){
    let submitParameter = {
      url: BASE_URL + "uploadTemplate",
      data: data,
      isFormData:true
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (data) => {
        if (data.errors === null) {
          callBack(data);
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _source.$message.error(data.errors[i].msg);
          }
        }
      }
    });
  },
  //删除模板
  removeTempalte(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "removeTemplateByTemplateId",
      data: data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (data) => {
        if (data.errors === null) {
          callBack(data);
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _source.$message.error(data.errors[i].msg);
          }
        }
      }
    });
  },
  //查询模板内容content
  getTemplateContent(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryTemplateContentByTemplateId",
      data: data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (data) => {
        if (data.errors === null) {
          callBack(data);
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _source.$message.error(data.errors[i].msg);
          }
        }
      }
    });
  },

}
