const BASE_URL = '/appMg/appMgRestService/'

export default {
  /* 查询表格 */
  queryAppVosByCondition (_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'queryAppVosByCondition',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: (data) => {
        if (data.errors === null) {
          callBack(data)
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _source.$message.error(data.errors[i].msg)
          }
        }
      }
    })
  },
  /* 新增 */
  addApp (_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'addApp',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: (data) => {
        if (data.errors === null) {
          callBack(data)
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _source.$message.error(data.errors[i].msg)
          }
        }
      }
    })
  },
  /* 修改 */
  updateAppByCondition (_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'updateAppByCondition',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: (data) => {
        if (data.errors === null) {
          callBack(data)
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _source.$message.error(data.errors[i].msg)
          }
        }
      }
    })
  },
  /* 删除 */
  removeAppById (_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + 'removeAppById',
      data: data
    }
    _source.Base.submit(_source, submitParameter, {
      successCallback: (data) => {
        if (data.errors === null) {
          callBack(data)
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _source.$message.error(data.errors[i].msg)
          }
        }
      }
    })
  }
}
