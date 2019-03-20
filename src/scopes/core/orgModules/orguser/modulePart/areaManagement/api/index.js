const BASE_URL = 'org/orguser/areaManagementRestService/'
export default {
  // 查询可管理的组织树列表
  queryAllArea (_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'queryAllArea',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  // 通过菜单id查询拥有该权限的角色列表
  queryAreaByParentId (_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'queryAreaByParentId',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  queryAreaByCondition (_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'queryAreaByCondition',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  // 更新标签
  addArea (_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'addArea',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  // 批量删除行政区划通过区域id列表
  deleteBatchAreaByAreaIds (_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'deleteBatchAreaByAreaIds',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  // 批量更新区域状态信息
  updateBatchAreaStatus (_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'updateBatchEffectiveByAreaIdPath',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  updateArea (_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'updateArea',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  }

}
