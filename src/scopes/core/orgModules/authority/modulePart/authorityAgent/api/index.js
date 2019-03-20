export default {
  queryAllAgentRole(_source, successCall){
    let submitParameter = {
      url: "org/authority/authorityAgentRestService/queryAllAgentRole",
      data:{
        roleType:"03"
      }
    }
    _source.Base.submit( null, submitParameter, {
      successCallback: (result)=> {
        successCall(result.data)
      }
    });
  },
  updateAgentRoleAuthority(_source, param, successCall){
    let submitParameter = {
      url:"org/authority/authorityAgentRestService/updateAgentRoleAuthority",
      data:{
        roleId: param.roleId,
        effectTime:param.effectiveTime,
      }
    };
    _source.Base.submit(null,submitParameter,{
      successCallback: (result)=> {
        _source.$message.success("修改成功");
        successCall(result.data)
      }
    });
  },
  /**
   * 加载
   * @param _source
   * @param param
   * @param successCall
   */
  loadAuthorityTree(_source, param, successCall){
    let submitParameter = {
      url:"org/authority/authorityAgentRestService/queryAgentRoleAuthority",
      data:{
        targetRoleId: param,
      }
    };
    _source.Base.submit(null,submitParameter,{
      successCallback: (result)=> {
        successCall(result.data)
      }
    });
  },
  /**
   * 批量删除代理角色
   * @param _source
   * @param param
   * @param successCall
   */
  batchDeleteAgentRole(_source, param, successCall){
    let submitParameter = {
      url: "org/authority/authorityAgentRestService/deleteBatchAgentRole",
      data: {
        roleIds: param.join(",")
      }
    };
    _source.Base.submit(null, submitParameter, {
      successCallback:  (result)=> {
        _source.$message.success('删除代理角色成功')
        successCall(result.data)
      }
    });
  },
  /**
   * 查询人员权限 根据userId获取当前用户可授权的菜单权限
   * @param _source
   * @param param
   * @param successCall
   */
  queryUsePermissionByUserId(_source, param, successCall){
    let submitParameter = {
      url: "org/authority/authorityAgentRestService/queryUsePermissionByUserId",
      data:{
        userId:param.userId,
        resourceId:param.resourceId
      }
    };
    _source.Base.submit(null, submitParameter, {
      successCallback:  (result)=> {
        successCall(result.data)
      }
    });
  },
  /**
   * 根据userId获取当前用户可授权的授权对象权限
   * @param _source
   * @param param
   * @param successCall
   */
  queryCustomUsePermissionByUserId(_source, param, successCall){
    let submitParameter = {
      url: "org/authority/authorityAgentRestService/queryCustomUsePermissionByUserId",
      data:{
        userId:param.userId,
        resourceId:param.resourceId
      }
    };
    _source.Base.submit(null, submitParameter, {
      successCallback:  (result)=> {
        successCall(result.data)
      }
    });
  },
  /**
   * 加载组织结构
   * @param _source
   * @param successCall
   */
  loadOrgTree(_source, orgId, successCall) {
    let submitParameter = {
      url: "org/authority/authorityAgentRestService/getOrgByAsync",
      data:{
        orgId:orgId
      }
    };
    _source.Base.submit(null, submitParameter, {
      successCallback: (result) => {
        successCall(result.data)
      }
    });
  },
  /**
   * 查询用户角色
   * @param _source
   * @param param
   * @param successCall
   */
  queryUserList(_source, param, successCall){
    let submitParameter = {
      url: "org/authority/authorityAgentRestService/queryReAgentUsersByOrgId",
      data: {
        orgId: param.orgId,
        userId: param.userId,
        includeChild: param.includeChild ? 1 : 0,
        pageSize:param.pageSize,
        pageNumber:param.pageNum,
        name: param.searchVal
      }
    };
    _source.Base.submit(null, submitParameter, {
      successCallback:  (result)=> {
        successCall(result.data)
      }
    });
  },
  /**
   * 新增代理角色
   * @param _source
   * @param param
   * @param successCall
   */
  addAuthorityAgent(_source, param, successCall){
    let submitParameter = {
      url:"org/authority/authorityAgentRestService/addAgentRole",
      data:{
        userId: param.targetUserId,
        resourceIds:param.authoritySelectArray.join(","),
        customResourceIds: param.authorityCustomSelectArray.join(","),
        effectTime:param.effectiveTime,
        theAgent: param.theAgent,
        resourceId: param.resourceId
      }
    };
    _source.Base.submit(null,submitParameter,{
      successCallback:  (result)=> {
        _source.$message.success("新增代理角色成功");
        successCall(result.data)
      }
    });
  }
}
