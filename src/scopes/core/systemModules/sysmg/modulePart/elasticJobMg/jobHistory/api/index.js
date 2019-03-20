export default {
    addJobDatasource(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/jobDatasourceManagementRestService/addJobDatasource",
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

    deleteJobDatasource(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/jobDatasourceManagementRestService/deleteJobDatasource",
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

    getJobExecutionTrace(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/jobDatasourceManagementRestService/getJobExecutionTrace",
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

    getJobStatusTrace(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/jobDatasourceManagementRestService/getJobStatusTrace",
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
    }
}
