export default {
    addZookeeperRegistryCenter(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/zookeeperAddressManagementRestService/addZookeeperRegistryCenter",
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

    batchDeleteZookeeperRegistryCenter(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/zookeeperAddressManagementRestService/deleteZookeeperRegistryCenter",
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

    connectZookeeperRegistryCenter(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/zookeeperAddressManagementRestService/connectZookeeperRegistryCenter",
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

    getJobServerDetail(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/jobOperateRestService/getJobServerDetail",
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

    disabledSharding(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/jobOperateRestService/disabledSharding",
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

    effectSharding(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/jobOperateRestService/effectSharding",
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

    triggerJob(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/jobOperateRestService/triggerJob",
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

    disableJob(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/jobOperateRestService/disableJob",
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

    enableJob(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/jobOperateRestService/enableJob",
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

    shutdownJob(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/jobOperateRestService/shutdownJob",
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

    removeJob(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/jobOperateRestService/removeJob",
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

    getServerInfo(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/serverOperateRestService/getServerInfo",
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

    disableServer(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/serverOperateRestService/disableServer",
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

    enableServer(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/serverOperateRestService/enableServer",
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

    shutdownServer(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/serverOperateRestService/shutdownServer",
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

    removeServer(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/serverOperateRestService/removeServer",
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

    getServerJobDetail(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/serverOperateRestService/getServerJobDetail",
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

    disabledServerJob(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/serverOperateRestService/disabledServerJob",
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

    enableServerJob(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/serverOperateRestService/enableServerJob",
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

    shutdownServerJob(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/serverOperateRestService/shutdownServerJob",
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

    removeServerJob(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/serverOperateRestService/removeServerJob",
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

    getJobNameByZkId(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/freeBusyJobManagerRestService/getJobNameByZkId",
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

    getServerIpsByJobName(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/freeBusyJobManagerRestService/getServerIpsByJobName",
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

    addFreeBusyJob(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/freeBusyJobManagerRestService/addFreeBusyJob",
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

    deleteFreeBusyJob(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/freeBusyJobManagerRestService/deleteFreeBusyJob",
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

    getAllServerIpsByJobName(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/freeBusyJobManagerRestService/getAllServerIpsByJobName",
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

    updateFreeBusyJob(_source, data, callBack) {
        let submitParameter = {
            url: "jobmg/elasticjob/freeBusyJobManagerRestService/updateFreeBusyJob",
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
