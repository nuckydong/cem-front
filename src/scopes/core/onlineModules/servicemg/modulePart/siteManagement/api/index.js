const BASE_URL = "/sitemg/siteManagementRestService/";

export default {
  /*查询表格*/
  querySiteByCondition(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "querySiteByCondition",
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
  /*新增 修改*/
  addOrEditSite(_source, data, callBack) {
    let url = ''
    if(data.editType == '1'){
      url = "updateSite"
    } else {
      url = "addSite"
    }
    let submitParameter = {
      url: BASE_URL + url,
      data: data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (data) => {
        callBack(data);
      },
      failCallback: (data) => {
        callBack(data);
      },
    });
  },
  /*批量删除*/
  deleteBatchSite(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "deleteBatchSite",
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
  /*批量禁用 启用*/
  disableOrEnableOrgs(_source, data, callBack) {
    let url = ''
    if(data.type == '1'){
      url = "enableBatchOrgs"
    } else {
      url = "disableBatchOrgs"
    }
    let submitParameter = {
      url: BASE_URL + url,
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
  /*异步加载表格*/
  querySiteByParentId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "querySiteByParentId",
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
