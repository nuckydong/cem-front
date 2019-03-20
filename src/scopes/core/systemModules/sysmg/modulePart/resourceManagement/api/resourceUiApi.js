export default {
  /**
   * 查询功能资源界面元素信息
   * @param _source
   * @param resourceId
   * @param successCall
   */
  queryResourceUi(_source, resourceId, successCall){
    let submitParameter = {
      url: "/org/sysmg/resourceManagementRestService/queryTaResourceUi",
      data: {resourceId: resourceId},
    }
    _source.Base.submit(null, submitParameter, {
      successCallback:  (result) => {
        successCall(result.data)
      }
    });
  },
  /**
   * 界面元素保存成功
   * @param _source
   * @param param
   * @param successCall
   */
  saveResourceUi(_source, param, successCall){
    let url = "",desc = "";
    if (param.elementDataAddOrEdit == '1') {
      url = '/org/sysmg/resourceManagementRestService/addTaResourceUi'
      desc = '添加'
    } else if (param.elementDataAddOrEdit == '2') {
      url = '/org/sysmg/resourceManagementRestService/updateTaResourceUi'
      desc = '修改'
    }

    let submitParameter = {
      url: url,
      data: {
        pageElementId: param.pageElementId,
        resourceId: param.resourceId,
        elementName: param.elementName,
        elementId: param.elementId,
        code: param.code,
        authorityPolicy: param.authorityPolicy
      },
    }

    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        _source.$message.success('表单元素'+desc+'成功', 2);
        successCall(result.data)
      }
    });
  },
  /**
   * 删除界面元素资源
   * @param _source
   * @param param
   * @param successCall
   */
  deleteResourceUi(_source, param, successCall){
    let submitParameter = {
      url: "/org/sysmg/resourceManagementRestService/deleteTaResourceUi",
      data: {
        pageElementIds: param.pageElementId,
        elementId: param.elementId,
        resourceId: param.resourceId
      },
    }

    _source.Base.submit(null, submitParameter, {
      successCallback: (result)  => {
        _source.$message.success('表单元素删除成功', 2);
        successCall(result.data);
      },
      failCallback: (result) => {

      }
    });
  }
}
