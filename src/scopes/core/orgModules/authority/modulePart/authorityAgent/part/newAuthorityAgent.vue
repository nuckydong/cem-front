<template>
  <div id="newAuthorityAgent">
    <ta-form :autoFormCreate="(form)=>{this.form = form}">
      <ta-row :gutter="row.gutter">
        <ta-col :span="row.formCol.span">
          <ta-form-item label="被代理人员"
                        :labelCol="formItemLayout.labelCol"
                        :wrapperCol="formItemLayout.wrapperCol"
                        fieldDecoratorId="resourceUser"
                        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择被代理人员' }]}">
            <ta-user-input selectTitle="被代理人员选择" :orgLoadFn="handleLoadOrgNode" :userLoadFn="handleQueryUserList" :userSelectCall="handleGetUserListResult"></ta-user-input>
          </ta-form-item>
        </ta-col>
        <ta-col :span="row.formCol.span">
          <ta-form-item label="委派人员"
                        :labelCol="formItemLayout.labelCol"
                        :wrapperCol="formItemLayout.wrapperCol"
                        fieldDecoratorId="targetUser"
                        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择委派人员' }]}">
            <ta-user-input selectTitle="委派人员选择" :orgLoadFn="handleLoadOrgNode" :userLoadFn="handleQueryTargetUserList" :userSelectCall="handleGetTargetUserListResult"></ta-user-input>
          </ta-form-item>
        </ta-col>
      </ta-row>
      <ta-row :gutter="row.gutter">
        <ta-col :span="row.formCol.span">
          <ta-form-item label="委派截止日期"
                        :labelCol="formItemLayout.labelCol"
                        :wrapperCol="formItemLayout.wrapperCol"
                        fieldDecoratorId="effectiveTime"
                        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择委派截止日期' }]}">
            <ta-date-picker/>
          </ta-form-item>
        </ta-col>
      </ta-row>
    </ta-form>

    <ta-tabs defaultActiveKey="1">
      <ta-tab-pane tab="功能菜单权限" key="1">
        <ta-row style="height: 300px;">
          <ta-col :span="4" class="fit" style="border-right: 1px solid #eee;">
            <ta-menu mode="inline" @select="handleLoadUserPermission">
              <ta-menu-item :key="menu.resourceId" v-for="menu in authorityMenuList">
                <ta-icon type="appstore" />{{menu.resourceName}}
              </ta-menu-item>
            </ta-menu>
          </ta-col>
          <ta-col class="fit row-tree-context" :span="20">
            <ta-e-tree :data="authorityTree"
                       show-checkbox
                       node-key="resourceId"
                       default-expand-all
                       ref="authorityTreeRef"
                       highlight-current
                       :props="defaultProps"
                       :default-checked-keys="checkedList">
            </ta-e-tree>
          </ta-col>
        </ta-row>
      </ta-tab-pane>
      <ta-tab-pane tab="授权对象权限" key="2">
        <ta-row style="height: 300px;">
          <ta-col :span="4" class="fit" style="border-right: 1px solid #eee;">
            <ta-menu mode="inline" @select="handleLoadCustomUserPermission">
              <ta-menu-item :key="menu.resourceId" v-for="menu in authorityCustomMenuList">
                <ta-icon type="appstore" />{{menu.resourceName}}
              </ta-menu-item>
            </ta-menu>
          </ta-col>
          <ta-col class="fit row-tree-context" :span="20">
            <ta-e-tree :data="authorityCustomTree"
                       show-checkbox
                       node-key="resourceId"
                       default-expand-all
                       ref="authorityCustomTreeRef"
                       highlight-current
                       :props="defaultCustomProps"
                       :default-checked-keys="checkedCustomList">
            </ta-e-tree>
          </ta-col>
        </ta-row>
      </ta-tab-pane>
    </ta-tabs>
  </div>
</template>
<script>
  import api from '../api'

  export default {
    name:"newAuthorityAgent",
    data(){
      return {
        //布局相关参数
        row:{
          gutter:16,
          formCol:{
            span:11
          },
          col:{
            span:12
          }
        },
        formItemLayout: {
          labelCol: {span: 6},
          wrapperCol: {span: 18},
        },
        //被代理人员与委派人员
        curUserId:"",
        targetUserId: "",

        //功能菜单权限 树
        authorityMenuList:[],
        authorityTree:[],
        defaultProps: {
          children: "children",
          label: "resourceName",
          id:"resourceId"
        },
        checkedList:[],
        //授权对象权限 树
        authorityCustomMenuList:[],
        authorityCustomTree:[],
        defaultCustomProps:{
          children: "children",
          label:"resourceName",
          id:"resourceId"
        },
        checkedCustomList:[],
        resourceId:''
      }
    },
    methods: {
      handleLoadOrgNode (node, resolve){
        let nodeOrgId = (node.data && node.data.orgId) || '';
        api.loadOrgTree(this,nodeOrgId,(data) => {
          resolve(data.orgTree)
        })
      },
      handleGetTargetUserListResult(dataObj){
        this.targetUserId = dataObj.userId;
      },
      handleGetUserListResult(dataObj){
        this.curUserId = dataObj.userId;
        api.queryUsePermissionByUserId(this,{
          userId:dataObj.userId
        },(data) => {
          this.authorityMenuList = data.usePermissionPos;
          this.authorityTree = [];
        })
        api.queryCustomUsePermissionByUserId(this, {
          userId:dataObj.userId
        }, (data) => {
          this.authorityCustomMenuList = data.customUsePermissionPos;
          this.authorityCustomTree = [];
        })
      },
      handleLoadUserPermission(menuItem){
        this.resourceId = menuItem.key
        api.queryUsePermissionByUserId(this,{
          userId:this.curUserId,
          resourceId:menuItem.key
        },(data) => {
          this.authorityTree = data.usePermissionPos;
        })
      },
      handleLoadCustomUserPermission(menuItem){
        this.resourceId = menuItem.key
        api.queryCustomUsePermissionByUserId(this,{
          userId:this.curUserId,
          resourceId:menuItem.key
        },(data) => {
          this.authorityCustomTree = data.customUsePermissionPos;
        })
      },
      handleQueryUserList({orgId,userId,includeChild,pageSize,pageNum,searchVal}, resolve){
        api.queryUserList(this,{
          orgId,
          userId,
          includeChild,
          pageSize,
          pageNum,
          searchVal
        },(data) => {
          resolve(data.reAgentVos.list)
        })
      },
      handleQueryTargetUserList({orgId,userId,includeChild,pageSize,pageNum,searchVal}, resolve){
        api.queryUserList(this,{
          orgId,
          userId,
          includeChild,
          pageSize,
          pageNum,
          searchVal
        },(data) => {
          let list = data.reAgentVos.list && data.reAgentVos.list.filter(el => {
            if (this.curUserId == el.userId) {
              return false
            }else{
              return true;
            }
          }) || [];
          resolve(list)
        })
      },
      fnNewAgentRole(){
        this.form.validateFields((err, values) => {
          if(!err){
            this.fnSave();
          }
        });
      },
      fnSave(){
        let authorityTreeCheck = this.$refs.authorityTreeRef && this.$refs.authorityTreeRef.getCheckedKeys() || []
        let authorityTreeHalfCheck = this.$refs.authorityTreeRef && this.$refs.authorityTreeRef.getHalfCheckedKeys() || []

        let authorityCustomTreeCheck = this.$refs.authorityCustomTreeRef && this.$refs.authorityCustomTreeRef.getCheckedKeys() || [];
        let authorityCustomTreeHalfCheck = this.$refs.authorityCustomTreeRef && this.$refs.authorityCustomTreeRef.getHalfCheckedKeys() || [];

        api.addAuthorityAgent(this,{
          targetUserId:this.targetUserId,
          authoritySelectArray:[...authorityTreeCheck,...authorityTreeHalfCheck],
          authorityCustomSelectArray: [...authorityCustomTreeCheck,...authorityCustomTreeHalfCheck],
          effectiveTime:this.form.getFieldValue("effectiveTime").format('YYYY-MM-DD'),
          theAgent:this.curUserId,
          resourceId: this.resourceId
        },(data) => {
          this.$emit("refreshAgentRole");
        })
      }
    }
  }
</script>

<style lang="scss"  type="text/scss" scoped>
.row-tree-context {
  overflow: auto;
  @include beautifyScrollbar()
}
</style>
