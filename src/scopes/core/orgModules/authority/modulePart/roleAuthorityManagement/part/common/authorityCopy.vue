<template>
  <div id="authrityCopy" style="height: 100%">
    <ta-row class="fit">
      <ta-col :span="12" class="fit">
        <ta-border-layout :layout="{header:'50px'}">
          <template slot="header">
            {{this.roleObj.roleName}}下的权限
          </template>
          <ta-tabs defaultActiveKey="1" class="fit">
            <ta-tab-pane tab="功能菜单权限" key="1">
              <ta-table :columns="menuAuthorityColumns"
                        :dataSource="menuAuthorityData"
                        defaultExpandAllRows
                        size="small"
                        :pagination=false>
              </ta-table>
            </ta-tab-pane>
            <ta-tab-pane tab="自定义对象权限" key="2">
              <ta-table :columns="customAuthorityColumns"
                        :dataSource="customAuthorityData"
                        defaultExpandAllRows
                        size="small"
                        :pagination=false>
              </ta-table>
            </ta-tab-pane>
          </ta-tabs>
        </ta-border-layout>
      </ta-col>
      <ta-col :span="12" class="fit">
        <ta-border-layout :layout="{header:'50px'}">
          <template slot="header">
            权限复制的目标角色
          </template>
          <ta-form :autoFormCreate="(form)=>{this.form = form}" style="padding-top: 10px">
            <ta-form-item
              label='目标角色'
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 16 }"
              fieldDecoratorId="targetRole"
              :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择目标角色' }]}"
            >
              <ta-input-search
                placeholder="请选择目标角色"
                @search="fnShowUserSelect"
              />
              <ta-user-select title="目标角色选择" width="800px" :is-show="isUserShow"
                              include-child-title="包含子部门下角色"
                              @close="fnClose"
                              :user-tree-data="orgOptions"
                              :user-list-data="roleListData"
                              @queryUserList="fnQueryRoleList"
                              :props="selectRoleProps"
                              :is-multi=true
                              @getUserListResult="fnGetRoleListResult"
                              id="targetRoleSelect"
                              :load="loadNode"
                              :is-select="false"
              >
              </ta-user-select>
            </ta-form-item>
          </ta-form>
        </ta-border-layout>
      </ta-col>
    </ta-row>


  </div>
</template>
<script>

  const menuAuthorityColumns = [{
    title: '功能名称',
    dataIndex: 'resourceName',
  }, {
    title: '有效期',
    dataIndex: 'effectTime',
    customRender:function (text) {
      return text?text.split(" ")[0]:"永久";
    }
  }];

  const customAuthorityColumns = [{
    title: '功能名称',
    dataIndex: 'resourceName',
  }, {
    title: '有效期',
    dataIndex: 'effectTime',
    customRender:function (text) {
      return text?text.split(" ")[0]:"永久";
    }
  }];


  export default {
    name:"authorityCopy",
    props:["roleObj"],
    data() {
      return {
        roleListData:[],
        orgOptions:[],
        isUserShow:false,
        menuAuthorityColumns,
        menuAuthorityData: [],
        customAuthorityColumns,
        customAuthorityData: [],
        targetRoleIds:"",
        selectRoleProps:{
          treeNodeKey: 'value', // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
          treeLabel: 'label', // 树节点的属性名称
          treeChildren: 'children', // 树子节点对象的属性名称
          listKey: 'roleId', // 每条用户信息的唯一标识（默认：userId）
          listTitle: 'roleName', // 用户信息第一行显示内容
          listSubTitle: 'mobile', // 用户信息第二行显示内容
          listDescription: "namePath", // 用户信息鼠标移上去显示描述信息
        }
      }
    },
    methods:{
      loadNode(node,resolve){
        let submitParam = {
          url:"org/authority/roleAuthorityManagementRestService/queryCurrentAdminRoleWrapeOrgTree",
          data:{
            orgId:node.data?node.data.value:null
          }
        };
        let callBack = {
          successCallback:(data) => {
            resolve(data.data.orgVos)
          }
        };
        this.Base.submit(null,submitParam,callBack);
      },
      fnGetRoleListResult(data){
        let roleNameArry = [];
        let roleIdArry = [];
        data.forEach(function (value,index) {
          roleNameArry.push(value.roleName);
          roleIdArry.push(value.roleId);
        });
        this.form.setFieldsValue({
          targetRole: roleNameArry.join(",")
        });
        this.targetRoleIds = roleIdArry.join(",");
      },
      fnQueryRoleList(id,includeChild,pageNum){
        var submitParam = {
          url:"org/authority/roleAuthorityManagementRestService/queryRolesByOrgId",
          data:{
            pageNumber:pageNum,
            pageSize:10,
            orgId:id,
            isSub:includeChild,
            roleType:this.roleObj.roleType
          }
        };
        var callBack = {
          successCallback: (data)=> {
            this.roleListData = data.data.pageBean.list;
          }
        };
        this.Base.submit(null,submitParam,callBack);
      },
      fnShowUserSelect(){
        this.isUserShow = true;
      },
      fnClose(){
        this.isUserShow = false;
      },
      filter(inputValue, path) {
        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
      },
      fnSave(){
        this.form.validateFields((err, values) => {
          if(err){
            return;
          }
          let submitParam = {
            url:"org/authority/roleAuthorityManagementRestService/copyResource",
            data:{
              sourceRoleId:this.roleObj.roleId,
              targetRoleIds: this.targetRoleIds
            }
          };
          let callBack = {
            successCallback: (data) =>{
              if(data.errors){
                this.$message.error('权限复制失败')
              }else{
                this.$message.success('权限复制成功')
              }
            }
          };
          this.Base.submit(null,submitParam,callBack);
        });
      },
      fnQueryAuthorityByRoleId() {
        let submitParameter = {
          url: "org/authority/roleAuthorityManagementRestService/queryUsePermissionByRoleId",
          data: {
            roleId: this.roleObj.roleId,
          }
        };
        let callBack = {
          successCallback: (data) => {
            this.menuAuthorityData = data.data.usePermissionPos;
          }
        }
        this.Base.submit(null, submitParameter, callBack);
      },
      fnQueryCustomUsePermissionByRoleId() {
        let submitParameter = {
          url: "org/authority/roleAuthorityManagementRestService/queryCustomUsePermissionByRoleId",
          data: {
            roleId: this.roleObj.roleId,
          }
        };
        let callBack = {
          successCallback: (data) => {
            this.customAuthorityData = data.data.customUsePermissionPos;
          }
        }
        this.Base.submit(null, submitParameter, callBack);
      },
    },
    mounted(){
      this.fnQueryAuthorityByRoleId();
      this.fnQueryCustomUsePermissionByRoleId();
      // this.form.setFieldsValue({
      //   roleName: this.roleObj.roleName,
      // });
    }
  }
</script>

<style scoped lang="scss"  type="text/scss">

</style>
