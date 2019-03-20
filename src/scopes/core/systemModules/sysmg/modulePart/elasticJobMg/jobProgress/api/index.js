export default {
  getJobProgress(_source, data, callBack) {
    let submitParameter = {
      url: "jobmg/elasticjob/jobOperateRestService/getJobProgress",
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

  refreshProgress(_source, data, callBack) {
    let submitParameter = {
      url: "jobmg/elasticjob/jobOperateRestService/refreshProgress",
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

  clearCache(_source, data, callBack) {
    let submitParameter = {
      url: "jobmg/elasticjob/jobOperateRestService/clearCache",
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
