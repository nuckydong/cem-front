export default {
  getLogConfig(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/logconfig/logConfigRestService/getLogConfig",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (result) => {
        if (result.errors === null) {
          callBack(result);
        } else {
          _source.gridLoading = false;
          for (let i = 0; i < result.errors.length; i++) {
            _source.$message.error(result.errors[i].msg);
          }
        }
      }
    });
  },

  configLevelAndAppenderType(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/logconfig/logConfigRestService/configLevelAndAppenderType",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (result) => {
        if (result.errors === null) {
          callBack(result);
        } else {
          _source.gridLoading=false;
          for (let i = 0; i < result.errors.length; i++) {
            _source.$message.error(result.errors[i].msg);
          }
        }
      }
    });
  },

  configFileNamePattern(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/logconfig/logConfigRestService/configFileNamePattern",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (result) => {
        if (result.errors === null) {
          callBack(result);
        } else {
          _source.fileLoading=false;
          _source.fileVisible = false;
          for (let i = 0; i < result.errors.length; i++) {
            _source.$message.error(result.errors[i].msg);
          }
        }
      }
    });
  },

  deleteLogConfigByName(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/logconfig/logConfigRestService/deleteLogConfigByName",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (result) => {
        if (result.errors === null) {
          callBack(result);
        } else {
          for (let i = 0; i < result.errors.length; i++) {
            _source.$message.error(result.errors[i].msg);
          }
        }
      }
    });
  },

  addLogConfig(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/logconfig/logConfigRestService/addLogConfig",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (result) => {
        if (result.errors === null) {
          callBack(result);
        } else {
          for (let i = 0; i < result.errors.length; i++) {
            _source.$message.error(result.errors[i].msg);
          }
        }
      }
    });
  },

}
