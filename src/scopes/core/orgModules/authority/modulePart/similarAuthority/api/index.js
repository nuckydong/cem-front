const BASE_URL = "/org/authority/similarAuthorityManagementRestService/";
export default {
  //查询可管理的组织树列表
  querySimilarAuthority(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryCurrentUserRePermission",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (result) {
        callBack(result.data);
      }
    })
  },
  //通过菜单id查询拥有该权限的角色列表
  queryRoleByMenuIds(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryUsePermissionRoleByResourceId",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (result) {
        callBack(result.data);
      }
    })
  },
  queryRePermissionResource(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryRePermissionResource",
      data: data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (result) {
        callBack(result.data);
      }
    })
  },
  addBatchSimilarAuthority(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "addBatchSimilarAuthority",
      data: data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (result) {
        callBack(result.data);
      }
    })
  },
}
