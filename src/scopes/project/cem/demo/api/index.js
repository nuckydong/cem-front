const BASE_URL = "/org/orguser/userManagementRestService/";
export default {
  /*获取用户标签*/
  queryTagByUserId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryTagByUserId",
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
  /*新增*/
  insert(_source, data, callBack) {
    let submitParameter = {
      url: "/demo/insert",
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
  /*编辑*/
  update(_source, data, callBack) {
    let submitParameter = {
      url: "/demo/updateById",
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
  /*查头像*/
  queryAvatar(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryAvatar",
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
  /*批量删除*/
  deleteBatchUserByUserIds(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "deleteBatchUserByUserIds",
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
  /*更改组织*/
  updateUserOrgByUserId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "updateUserOrgByUserId",
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
  /*启用1 禁用2 解锁3*/
  changeEffectiveUnlock(_source, data, callBack) {
    let url = '';
    if(data.type == 1){
      url = "updateBatchUserAbleByUserIds"
    }else if(data.type == 2){
      url = "updateBatchUserDisabledByUserIds"
    } else {
      url = "updateBatchUserUnLockByUserIds"
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
  /*解锁*/
  updateBatchUserUnLockByUserIds(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "updateBatchUserUnLockByUserIds",
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
  /*修改密码*/
  updateUserPwdByUserId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "updateUserPwdByUserId",
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
  queryUserSettingTable (_source, successCall) {

    let submitParameter = {
      url: "org/sysmg/manageableFieldsRestService/queryManageableFields",
      data: {type:'1'}
    }
    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        successCall(result.data)
      }
    })
  },
}
