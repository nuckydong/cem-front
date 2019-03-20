export default {
  querySettingTable (_source, param, successCall, completeCall) {

    let submitParameter = {
      url: "org/sysmg/manageableFieldsRestService/queryManageableFields",
      data: param
    }
    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        successCall(result.data)
        completeCall(result)
      },
      failCallback: (result) => {
        completeCall(result)
      }
    })
  },
  saveDefaultSetting(_source, param, successCall){
    let submitParameter = {
      url: "org/sysmg/manageableFieldsRestService/saveDefaultManageableFields",
      data: {
        settingListJson: JSON.stringify(param.settingList),
        type: param.type
      }
    }
    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        _source.$message.success('配置已重载');
        successCall(result.data)
      }
    })
  },
  saveSettingTable(_source, param, successCall, completeCall){
    let submitParameter = {
      url: "org/sysmg/manageableFieldsRestService/updateManageableFieldsDetailByFieldId",
      data: param
    }
    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        _source.$message.success('编辑成功');
        successCall(result.data)
        completeCall(result)
      },
      failCallback: (result) => {
        _source.$message.success('编辑失败');
        completeCall(result)
      }
    })
  },
  saveAllSettingTable(_source, param, successCall, completeCall){
    let msg = '';
    switch (param.tabsKey) {
      case '1':
        msg = '用户';
        break;
      case '2':
        msg = '组织';
        break;
      case '3':
        msg = '功能';
        break;
    }

    let submitParameter = {
      url: 'org/sysmg/manageableFieldsRestService/updateManageableFieldsByFieldsId',
      data: {
        changeListJson: JSON.stringify(param.changeList),
        type: param.tabsKey
      },
    }
    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        _source.$message.success(msg + '信息简单项编辑成功');
        successCall(result.data)
        completeCall(result)
      },
      failCallback: (result) => {
        _source.$message.error(msg + '信息简单项编辑失败');
        completeCall(result)
      }
    })
  }
}
