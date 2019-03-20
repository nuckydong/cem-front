const BASE_URL = '/org/orguser/customOrgManagementRestService/'
export default {
  // 通过parentid查询组织信息
  queryCustomOrgByParentId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'queryCustomOrgByParentId',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },
  //根据条件查询
  queryCustomOrgByCondition(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'queryCustomOrgByCondition',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },
  // 查询标签组id查询标签
  queryCustomOrgTypeName(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'queryCustomOrgTypeName',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },
  // 根据条件查询组织类型
  queryCustomOrgTypeNameByCondition(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'queryCustomOrgTypeNameByCondition',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },
  queryCustomOrgByValidId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'queryCustomOrgByValidId',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },
  // 删除标签
  deleteBatchCustomOrg(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'deleteBatchCustomOrg',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },
  updateBatchCustomOrgStatus(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'updateBatchCustomOrgStatus',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },
  // 批量添加自定义组织人员
  addBatchCustomOrgUser(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'addBatchCustomOrgUser',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },
  //批量删除自定义组织人员
  deleteBatchCustomOrgUser(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'deleteBatchCustomOrgUser',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },

  addCustomOrg(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'addCustomOrg',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },

  updateCustomOrg(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'updateCustomOrg',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },
  // 更新标签
  queryAllTaOrg(_source, data, callBack) {
    let submitParameter = {
      url: 'org/orguser/orgManagementRestService/getOrgByAsync',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },

  // 查询组织人员信息
  queryOrgUser(_source, data, callBack) {
    let submitParameter = {
      url: 'org/orguser/userManagementRestService/queryUserByConditon',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },
  queryBatchUserByCustomOrgId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'queryBatchUserByCustomOrgId',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },
  queryBatchUserByOrgId(_source, data, callBack) {
    let submitParameter = {
      url: 'org/orguser/userManagementRestService/queryEffectiveUser',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },
  deleteBatchCustomOrgTypeName(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'deleteBatchCustomOrgTypeName',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },
  // 添加自定义组织类型
  addCustomOrgTypeName(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'addCustomOrgTypeName',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },
  updateCustomOrgTypeName(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'updateCustomOrgTypeName',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  }
}
