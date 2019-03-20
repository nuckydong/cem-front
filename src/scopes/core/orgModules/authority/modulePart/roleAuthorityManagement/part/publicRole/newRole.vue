<template>
  <div id="newRole">
        <ta-form :autoFormCreate="(form)=>{this.form = form}">
          <ta-form-item
            label='角色名称'
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
            fieldDecoratorId="roleName"
            required
            :fieldDecoratorOptions="{rules: [{ validator: roleNameValidator }]}"
          >
            <ta-input/>
          </ta-form-item>
          <ta-form-item
            label='所属组织'
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
            fieldDecoratorId="orgId"
            required
            :fieldDecoratorOptions="{rules: [{ validator: customValidator }]}"
            style="margin-bottom: 0"
          >
            <ta-cascader
                         :value="casValue"
                         :options.sync="orgOptions"
                         :showSearch="{filter}"
                         @change="onChange"
                         changeOnSelect
                         :placeholder="casPlaceholder"
                         expandTrigger="hover"
                         class="vertical-space cascader-box"
                         :fieldNames="{label:'orgName',value:'orgId',children:'children'}"
                         url="org/authority/roleAuthorityManagementRestService/queryCurrentAdminRoleWrapeOrgTree"
                         treeId="orgVos"
            />
          </ta-form-item>
          <ta-form-item
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20,offset: 4 }"
          >
            <ta-checkbox
              :checked="isSubordinate"
              @change="onCheckChange"
            >
              可分配该角色到子组织人员
            </ta-checkbox>
          </ta-form-item>
          <ta-form-item
            label="有效期"
            :labelCol="{span:4}"
            :wrapperCol="{span:20}"
            fieldDecoratorId="effectiveTime"
          >
            <ta-date-picker style="width: 100%" />
          </ta-form-item>
          <ta-form-item
            label="角色标识"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
            fieldDecoratorId="roleSign"
          >
            <ta-select>
              <ta-select-option
                v-for="item in CollectionData('ROLESIGN')"
                :key="item.value"
                :value="item.value">
                {{item.label}}
              </ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item
            label="角色描述"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
            fieldDecoratorId="roleDesc"
          >
            <ta-textarea  :rows="4"/>
          </ta-form-item>
        </ta-form>



  </div>
</template>
<script>

  import moment from 'moment';

  export default {
    name: "newRole",
    props:["updateObj"],
    data() {
      return {
        orgOptions: [],
        isSubordinate:false,
        casPlaceholder:"请选择组织机构",
        casValue: [],
      }
    },
    methods: {
      moment,
      customValidator(rule,value,callBack){
        if(!value&&this.casValue.length<1){
          callBack("请选择所属组织")
        }else{
          callBack();
        }
      },
      roleNameValidator(rule,value,callBack){
        if(value==null||value.trim()===''||value===undefined){
          callBack("请输入角色名称")
        }else{
          callBack();
        }
      },
      onCheckChange(e){
        this.isSubordinate = e.target.checked
      },
      fnResetForm() {
        this.form.resetFields();
        if(this.updateObj.isUpdate){
          let obj = this.updateObj.roleObj;
          this.form.setFieldsValue({
            roleName: obj.roleName,
            // roleType:obj.roleType,
            // orgId:obj.idPath.split("/"),
            roleSign:obj.roleSign,
            roleDesc:obj.roleDesc
          });
          this.casValue = this.updateObj.roleObj.idPath.split("/");
          obj.subordinate=="1"?this.isSubordinate=true:this.isSubordinate=false;
        }
      },
      onChange(value,selectedOptions) {
        if (selectedOptions && selectedOptions[selectedOptions.length - 1].isAuthority == "0") {
          this.$message.error('没有权限在该组织下新增角色');
          this.form.setFieldsValue({
            orgId: [],
          });
          this.casValue = [];
        }else{
          this.casValue = value;
        }
      },
      filter(inputValue, path) {
        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
      },
      loadOrgTree(){
        var submitParam = {
          url: "org/authority/roleAuthorityManagementRestService/queryCurrentAdminRoleWrapeOrgTree",
        };
        var callBack = {
          successCallback:  (data) =>{
            this.orgOptions = data.data.orgVos;
          }
        };
        this.Base.submit(null, submitParam, callBack);
      },
      fnNewRole(){
        this.form.validateFields((err, values) => {
          if(err){
            return;
          }
          let params = this.form.getFieldsValue();
          params.orgId = this.form.getFieldValue("orgId")?this.form.getFieldValue("orgId")[this.form.getFieldValue("orgId").length-1]:null;
          params.subordinate = this.isSubordinate?"1":"0";
          params.roleType = "01";
          let effectiveTime = this.form.getFieldValue("effectiveTime");
          if(effectiveTime){
            params.effectiveTime = effectiveTime.format("YYYY-MM-DD");
          }
          let submitParam = {
            url:"org/authority/roleAuthorityManagementRestService/addRole",
            data:{
              ...params,
              effective:"1"
            }
          };
          let callBack = {
            successCallback: (data) =>{
              this.$message.success("新增角色成功");
              this.$emit("fnQueryRolesByOrgId");
              this.$emit("onNewRoleClose");
            },
            failCallback:(data)=>{
              this.$message.success("新增角色失败");
            }
          };
          this.Base.submit(null,submitParam,callBack);
        });
      },
      fnUpdateRole(){
        this.form.validateFields((err, values) => {
          if(err){
            return;
          }
          let params = this.form.getFieldsValue();
          params.orgId = this.casValue?this.casValue[this.casValue.length-1]:null;
          params.subordinate = this.isSubordinate?"1":"0";
          params.roleType = "01";
          let effectiveTime = this.form.getFieldValue("effectiveTime");
          if(effectiveTime){
            params.effectiveTime = effectiveTime.format("YYYY-MM-DD");
          }
          let submitParam = {
            url:"org/authority/roleAuthorityManagementRestService/updateRoleByRoleId",
            data:{
              roleId:this.updateObj.roleObj.roleId,
              ...params,
              effective:"1"
            }
          };
          let callBack = {
            successCallback: (data)=> {
              this.$message.success("修改角色成功");
              this.$emit("fnQueryRolesByOrgId");
              this.$emit("onNewRoleClose");
            },
            failCallback:(data)=>{
              this.$message.success("修改角色失败");
            }
          };
          this.Base.submit(null,submitParam,callBack);
        });
      },
      fnAddOrUpdateRole(){
        if(this.updateObj.isUpdate){
          this.fnUpdateRole();
        }else{
          this.fnNewRole();
        }
      },
    },
    computed:{
    },
    mounted() {
      if(this.updateObj.isUpdate){
        let obj = this.updateObj.roleObj;

        this.casPlaceholder = obj.namePath;
        this.form.setFieldsValue({
          roleName: obj.roleName,
          // roleType:obj.roleType,
          // orgId:obj.idPath.split("/"),
          roleSign:obj.roleSign,
          roleDesc:obj.roleDesc,
          effectiveTime:obj.effectiveTime?moment(obj.effectiveTime,'YYYY-MM-DD'):null
        });
        this.casValue = obj.idPath.split("/");
        obj.subordinate=="1"?this.isSubordinate=true:this.isSubordinate=false;
      }
    }
  }
</script>

<style scoped lang="scss" type="text/scss">

</style>
