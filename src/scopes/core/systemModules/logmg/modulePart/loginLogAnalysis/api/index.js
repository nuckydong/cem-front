export default {
  getSysTime(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/loginLog/loginLogAnalysisRestService/getSysTime",
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

  analysisOnlineStatInfo(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/loginLog/loginLogAnalysisRestService/analysisOnlineStatInfo",
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

  getOnlineInfo(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/loginLog/loginLogAnalysisRestService/getOnlineInfo",
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

  analysisLoginStatInfo(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/loginLog/loginLogAnalysisRestService/analysisLoginStatInfo",
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

  getLoginInfo(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/loginLog/loginLogAnalysisRestService/getLoginInfo",
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

  getStatLogInfoXdata(_source, tabId) {
    let start = [];
    let end = [];
    if (tabId === "online") {
      start = _source.onlineStartTime.format("HH:mm").split(':');
      end = _source.onlineEndTime.format("HH:mm").split(':');
    } else if (tabId === "login") {
      start = _source.loginStartTime.format("HH:mm").split(':');
      end = _source.loginEndTime.format("HH:mm").split(':');
    }
    let start_hour = parseInt(start[0]);
    let start_minut = parseInt(start[1]);
    let end_hour = parseInt(end[0]);
    let end_minut = parseInt(end[1]);
    let rdata = [];
    do {
      rdata.push(formatXdata(start_hour, start_minut));
      if (start_hour == end_hour && start_minut == end_minut) {
        break;
      }
      if (start_minut < 59 && start_minut >= 0) {
        start_minut++;
      } else if (start_minut = 59) {
        start_hour++;
        start_minut = 0;
      } else {
        _source.$message.error("在线时点分析图表构造出错！");
        break;
      }
    } while (true);

    function formatXdata(start_hour, start_minut) {
      let tmp_hour = "" + start_hour;
      let tmp_minut = "" + start_minut;
      if (tmp_hour.length < 2)
        tmp_hour = "0" + tmp_hour;
      if (tmp_minut.length < 2)
        tmp_minut = "0" + tmp_minut;

      return tmp_hour + ":" + tmp_minut;
    }

    if (60 >= rdata.length) {
      if (tabId === "online") {
        _source.onlineXInterval = 4;
      } else if (tabId === "login") {
        _source.loginXInterval = 4;
      }
    } else if (60 < rdata.length) {
      if (tabId === "online") {
        _source.onlineXInterval = parseInt(rdata.length / 10 - 1);
      } else if (tabId === "login") {
        _source.loginXInterval = parseInt(rdata.length / 10 - 1);
      }
    }
    return rdata;
  },

  sortStatLogDataByHours(_source, tabId) {
    let data = [];
    let start = [];
    let end = [];
    if (tabId === "online") {
      data = _source.onlineChartData;
      start = _source.onlineStartTime.format("HH:mm").split(':');
      end = _source.onlineEndTime.format("HH:mm").split(':');
    } else if (tabId === "login") {
      data = _source.loginChartData;
      start = _source.loginStartTime.format("HH:mm").split(':');
      end = _source.loginEndTime.format("HH:mm").split(':');
    }
    let start_hour = parseInt(start[0]);
    let start_minut = parseInt(start[1]);
    let end_hour = parseInt(end[0]);
    let end_minut = parseInt(end[1]);
    let rdata = [];

    let con = 0;
    do {
      let tmp_hour = "" + start_hour;
      let tmp_minut = "" + start_minut;
      if (tmp_hour.length < 2)
        tmp_hour = "0" + tmp_hour;
      if (tmp_minut.length < 2)
        tmp_minut = "0" + tmp_minut;
      let result_time = tmp_hour + ":" + tmp_minut;
      for (let i in data) {
        if (result_time == data[i].type)
          rdata.push(data[i].count);
      }
      con++;
      if (rdata.length < con)
        rdata.push(0);
      if (start_hour === end_hour && start_minut === end_minut) {
        break;
      }
      if (start_minut < 59 && start_minut >= 0) {
        start_minut++;
      } else if (start_minut = 59) {
        start_hour++;
        start_minut = 0;
      } else {
        _source.$message.error("时点分析图表构造出错！");
        break;
      }
    } while (true);
    return rdata;
  },

  analysisClientSystemInfo(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/loginLog/loginLogAnalysisRestService/analysisClientSystemInfo",
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

  analysisClientScreenInfo(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/loginLog/loginLogAnalysisRestService/analysisClientScreenInfo",
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

  analysisClientBrowserInfo(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/loginLog/loginLogAnalysisRestService/analysisClientBrowserInfo",
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

  queryLoginEnvironmentDetail(_source, data, callBack) {
    let submitParameter = {
      url: "logmg/loginLog/loginLogAnalysisRestService/queryLoginEnvironmentDetail",
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
