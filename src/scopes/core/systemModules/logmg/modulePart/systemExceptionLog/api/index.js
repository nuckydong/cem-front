export default {
  deleteExceptionLogByLogId(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/exceptionlog/serverExceptionLogRestService/deleteExceptionLogByLogId",
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

  getDetalExceptionLog(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/exceptionlog/serverExceptionLogRestService/getDetalExceptionLog",
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

  batchDeleteExceptionLog(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/exceptionlog/serverExceptionLogRestService/batchDeleteExceptionLog",
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
