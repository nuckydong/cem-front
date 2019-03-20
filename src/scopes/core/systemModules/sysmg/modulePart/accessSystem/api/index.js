const BASE_URL = "/org/sysmg/accessSystemManagementRestService/";
export default {
  /*新增保存*/
  addTaAccessSystem(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "addTaAccessSystem",
      data: data
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
  /*删除*/
  deleteTaAccessSystemById(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "deleteTaAccessSystemById",
      data: data
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
  /*批量删除*/
  deleteBatchTaAccessSystemById(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "deleteBatchTaAccessSystemById",
      data: data
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
  /*禁用启用*/
  updateTaAccessSystemById(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "updateTaAccessSystemById",
      data: data
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
