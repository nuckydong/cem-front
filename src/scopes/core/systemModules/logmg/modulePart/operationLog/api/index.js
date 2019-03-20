export default {
  getChangeContent(_source, data, callBack) {
    let submitParameter = {
      url: "org/sysmg/orgOpLogRestService/getChangeContent",
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
}
