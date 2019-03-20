const BASE_URL = "cacheMg/cacheMgRestService/";
export default {

  queryKeyList(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryKeyList",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data);
        } else {
          // for (let i = 0; i < data.errors.length; i++) {
          //   _source.$message.error(data.errors[i].msg);
          // }
        }
      }
    })
  },
  //TODO 查询缓存列表,后续会更改
  queryCacheNameList(_source, data, callBack) {
    let submitParameter = {
      url: 'cacheMg/cacheMgRestService',
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
  queryCacheContent(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryCacheContent",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data);
        } else {
          // for (let i = 0; i < data.errors.length; i++) {
          //   _source.$message.error(data.errors[i].msg);
          // }
        }
      }
    })
  },
  //查询缓存节点
  queryCacheNodeList(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryCacheNodeList",
      data: data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data);
        } else {
          // for (let i = 0; i < data.errors.length; i++) {
          //   _source.$message.error(data.errors[i].msg);
          // }
        }
      }
    })
  },
}
