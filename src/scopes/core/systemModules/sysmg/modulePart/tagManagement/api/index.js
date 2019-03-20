const BASE_URL = "/org/sysmg/tagManagementRestService/";
export default {
  //查询标签组id查询标签
  queryTagByTagGroupId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryTag",
      data: data
    };
    _source.Base.submit(_source, submitParameter, callBack)
  },
  queryTagByCondition(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryTagByCondition",
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
  queryAllTagGroup(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryAllTagGroup",
      data: data
    };
    _source.Base.submit(_source, submitParameter, callBack)
  },
  updateBatchTagStatus(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "updateBatchTagStatus",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data);
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _source.$message.error(data.errors[i].msg);
          }
        }
      }
    })
  },
  //删除标签
  deleteBatchTag(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "deleteBatchTag",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data);
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _source.$message.error(data.errors[i].msg);
          }
        }
      }
    })
  },
  addTag(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "addTag",
      data: data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data);
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _source.$message.error(data.errors[i].msg);
          }
        }
      }
    })
  },
  //更新标签
  updateTag(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "updateTag",
      data: data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data);
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _source.$message.error(data.errors[i].msg);
          }
        }
      }
    })
  },
}
