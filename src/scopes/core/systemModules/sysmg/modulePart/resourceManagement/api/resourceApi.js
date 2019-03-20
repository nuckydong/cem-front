export default {
  /**
   * 查询功能资源详情
   * @param _source
   * @param param
   * @param successCall
   */
  queryResource(_source, param, successCall){
    let submitParameter = {
      url: "/org/sysmg/resourceManagementRestService/queryResourceByResourceID",
      data: {
        resourceId: param.resourceId,
        operationType: param.operationType
      },
    }
    _source.Base.submit(null, submitParameter, {
      successCallback:(result) => {
        successCall(result.data)
      }
    });
  },
  /**
   * 功能资源更新 (新增/修改)
   * @param _source
   * @param param
   * @param successCall
   */
  saveResource(_source, param, successCall){
    let url = "";
    if(param.operationType == '1'){
      url = "/org/sysmg/resourceManagementRestService/addResource";
    }else{
      url = "/org/sysmg/resourceManagementRestService/updateResourceByResourceId";
    }

    let submitParameter = {
      url: url,
      data: param

    }

    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        _source.$message.success('保存成功', 2);
        successCall(result.data)
      }
    });
  }
}
