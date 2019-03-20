export default {
  getJobInfo(_source, data, callBack) {
    let submitParameter = {
      url: "jobmg/elasticjob/jobOperateRestService/getJobInfo",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (result) => {
        if (!result.errors) {
          callBack(result);
        } else {
          for (let i = 0; i < result.errors.length; i++) {
            _source.$message.error(result.errors[i].msg);
          }
        }
      }
    });
  },

  getJobDetailInfo(_source, data, callBack) {
    let submitParameter = {
      url: "jobmg/elasticjob/jobOperateRestService/getJobDetailInfo",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (result) => {
        if (!result.errors) {
          callBack(result);
        } else {
          for (let i = 0; i < result.errors.length; i++) {
            _source.$message.error(result.errors[i].msg);
          }
        }
      }
    });
  },

  saveJobDetailInfo(_source, data, callBack) {
    let submitParameter = {
      url: "jobmg/elasticjob/jobOperateRestService/saveJobDetailInfo",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: (result) => {
        if (!result.errors) {
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
