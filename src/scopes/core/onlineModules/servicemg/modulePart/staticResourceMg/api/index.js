const BASE_URL = "fileResource/fileResourceManageRestService/";
export default {
  //加载静态资源树
  loadFileResourceTree(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "loadFileResourceTree",
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
  //查询文件列表
  listFileResource(_source,data,callBack){
    let submitParameter = {
      url: BASE_URL + "listFileResource",
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
  //新建文件夹
  addFileDirectoryResource(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "addFileDirectoryResource",
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
  //新建文件（通过上传）
  addFileResource(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "addFileResource",
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
  //新建文件（通过在线创建）
  addFileResourceText(_source, data, callBack){
    let submitParameter = {
      url: BASE_URL + "addFileResourceText",
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
  //删除文件
  removeFileResource(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "removeFileResource",
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
  //删除文件夹
  removeFileDirectoryResource(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "removeFileDirectoryResource",
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
  }

}
