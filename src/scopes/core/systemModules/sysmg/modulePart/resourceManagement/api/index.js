import isPlainObject from 'lodash/isPlainObject'

export default {
  /**
   * 有参查询功能资源
   * @param _source
   * @param param
   * @param successCall
   */
  queryResourceList (_source, param, successCall) {
    let data = {}
    if(typeof param == 'string'){
      if (param.trim() !== '') {
        data.name = param
        data.code = param
      }
    }else if(isPlainObject(param)){
      Object.assign(data,param);
    }else{
      // 暂不允许不带条件的全部查询
      _source.$message.info('缺少参数, 操作无效');
    }


    let submitParameter = {
      url: '/org/sysmg/resourceManagementRestService/queryTaResourceByParameters',
      data: data
    }
    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        successCall(result.data)
      },
      failCallback: (result) => {
        _source.$message.success('请求出错，请联系管理员！', 2);
      }
    })
  },
  /**
   * 无参查询功能资源
   * @param _source
   * @param successCall
   */
  queryResourceListNoParam (_source, successCall) {
    let submitParameter = {
      url: '/org/sysmg/resourceManagementRestService/queryTaResourceByParameters'
    }

    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        successCall(result.data)
      },
      failCallback: (result) => {
        _source.$message.success('请求出错，请联系管理员！', 2);
      }
    })
  },
  /**
   * 加载子节点资源
   * @param _source
   * @param record
   */
  loadChildResource(_source, record, successCall){
    let submitParameter = {
      url: "/org/sysmg/resourceManagementRestService/queryChildResource",
      data: {resourceId: record.resourceId}
    };
    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        if (!result.data.resourceList[0].children) {
          _source.$message.warning('当前功能资源不存在下级功能资源!', 2);
          return;
        }
        successCall(result.data)
      }
    });
  },
  /**
   * 批量禁用资源
   * @param _source
   * @param resourceIds
   * @param successCall
   */
  disableResourceBatch(_source, resourceIds, successCall){
    let submitParameter = {
      url: "/org/sysmg/resourceManagementRestService/disabledResourceByResourceIds",
      data: {"resourceIds": resourceIds.join(",")},
    };
    _source.Base.submit(null, submitParameter, {
      successCallback: result => {
        _source.$message.success('禁用资源管理成功', 2);
        successCall(result.data)
      },
      failCallback: result => {

      }
    });
  },
  /**
   * 批量启用资源
   * @param _source
   * @param resourceIds
   * @param successCall
   */
  enableResourceBatch(_source, resourceIds, successCall){
    let submitParameter = {
      url: "/org/sysmg/resourceManagementRestService/enabledResourceByResourceIds",
      data: {"resourceIds": resourceIds.join(",")},
    };
    _source.Base.submit(null, submitParameter, {
      successCallback:  (result) => {
        _source.$message.success('启用资源管理成功', 2);
        successCall(result.data)
      },
    });
  },
  /**
   * 批量删除功能资源
   * @param _source
   * @param resourceIds
   * @param successCall
   */
  deleteResourceBatch(_source, resourceIds, successCall){
    let submitParameter = {
      url: "/org/sysmg/resourceManagementRestService/deleteResourceByResourceIds",
      data: {"resourceIds": resourceIds.join(',')},
    };

    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        _source.$message.success('删除成功', 2);
        successCall(result.data)
      },
      failCallback: function (result) {

      }
    });
  },
  /**
   * 删除功能资源
   * @param obj
   * @param type
   */
  deleteResource(_source, paramObject, successCall) {
    if (paramObject.pResourceId == '0') {
      _source.$message.error('功能资源顶级节点不允许删除', 2);
      return;
    }
    let submitParameter = {
      url: "/org/sysmg/resourceManagementRestService/deleteResourceByResourceIds",
      data: {resourceIds: paramObject.resourceId},
    }
    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        _source.$message.success('删除成功', 2);
        successCall(result.data);
      },
      failCallback: (result) => {
        _source.$message.success('请求出错，请联系管理员！', 2);
      }
    });
  },
  /**
   * 加载所属系统资源
   * @param _source
   * @param successCall
   */
  queryAllAccessSystem(_source, successCall){
    let submitParameter = {
      url: "/org/sysmg/resourceManagementRestService/queryAllAccessSystem",
    }
    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        successCall(result.data);
      }
    });
  },
  queryResourceSettingTable (_source, successCall) {

    let submitParameter = {
      url: "org/sysmg/manageableFieldsRestService/queryManageableFields",
      data: {type:'3'}
    }
    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        successCall(result.data)
      }
    })
  },
}
