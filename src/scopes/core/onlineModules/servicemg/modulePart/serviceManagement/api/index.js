const BASE_URL = "onlinedev/onlineServiceManagementRestService/";
export default {
  /*查询在线服务项列表*/
  queryOnlineServiceName(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryOnlineServiceName",
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
  /*新增在线服务项*/
  addOnlineServiceName(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "addOnlineServiceName",
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
  /*更新在线服务项*/
  updateOnlineServiceName(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "updateOnlineServiceName",
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
  /*批量删除服务项*/
  deleteBatchOnlineServiceName(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "deleteBatchOnlineServiceName",
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

  /*通过条件查询在线服务列表信息*/
  queryOnlineServiceByCondition(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryOnlineServiceByCondition",
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
  /*新增在线服务信息*/
  addOnlineService(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "addOnlineService",
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
  /*更新在线服务信息*/
  updateOnlineService(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "updateOnlineService",
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
  /*批量删除在线服务信息列表*/
  deleteBatchOnlineService(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "deleteBatchOnlineService",
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
