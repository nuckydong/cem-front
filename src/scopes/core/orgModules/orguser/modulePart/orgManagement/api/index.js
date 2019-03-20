const BASE_URL = "/org/orguser/orgManagementRestService/";
export default {
  /*查询表格*/
  queryAllOrgByOrgId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryAllOrgByOrgId",
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
  /*编辑时查询信息*/
  queryTaOrgByOrgId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryTaOrgByOrgId",
      data: data,
      showPageLoading:false
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
  /*人员选择*/
  queryAllTaOrg(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryAllTaOrg",
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
  /*点击树显示用户*/
  queryBatchUserByOrgId(_source, data, callBack) {
    let submitParameter = {
      url: "org/orguser/userManagementRestService/queryBatchUserByOrgId",
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
  /*新增 修改*/
  addOrUpdateTaOrg(_source, data, callBack) {
    let url = ''
    if(data.editType == '1'){
      url = "addTaOrg"
    } else {
      url = "updateTaOrgByOrgId"
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
  deleteBatchOrgs(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "deleteBatchOrgs",
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
  queryChildOrgByOrgId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryChildOrgByOrgId",
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
  /*删除*/
  deleteOrgByOrgId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "deleteOrgByOrgId",
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
  /*加载组织结构*/
  loadOrgTree(_source, orgId, successCall) {
    let submitParameter = {
      url: BASE_URL + "getOrgByAsync",
      data:{
        orgId:orgId
      }
    };
    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        successCall(result.data)
      }
    });
  },
  /*查询用户角色*/
  queryUserList(_source, {orgId,userId,includeChild,pageSize,pageNum,searchVal,searchType,searchParam}, successCall){
    let param = {
      orgId: orgId,
      userId: userId,
      showChildUser: includeChild ? 1 : 0,
      pageSize:pageSize,
      pageNumber:pageNum,
      name: searchVal
    }
    if(searchType){
      param[searchType] = searchParam
    }
    let submitParameter = {
      url: "org/orguser/userManagementRestService/queryEffectiveUser",
      data: param
    };
    _source.Base.submit(null, submitParameter, {
      successCallback:  (result)=> {
        successCall(result.data)
      }
    });
  },
  queryOrgSettingTable (_source, successCall) {

    let submitParameter = {
      url: "org/sysmg/manageableFieldsRestService/queryManageableFields",
      data: {type:'2'}
    }
    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        successCall(result.data)
      }
    })
  },
}
