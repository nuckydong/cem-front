<template>
  <ta-modal title="更改组织" :visible="visible" okText="确认" cancelText="关闭" @ok="resetOrgId" width="500px" @cancel="closeModal" :bodyStyle="{'height': '200px'}" size="small" destroyOnClose>
    <ta-form id="orgForm" :autoFormCreate="(form)=>{this.formOrg = form}">
      <ta-form-item label='所属组织' :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" fieldDecoratorId="orgId" required>
        <ta-cascader
          url="org/orguser/orgManagementRestService/getOrgByAsync"
          treeId="orgTreeData"
          :options.sync="changeOptions"
          changeOnSelect
          expandTrigger="hover"
          :fieldNames="{ label: 'orgName', value: 'orgId', children: 'children' }"
          :placeholder="rowData.namePath"/>
      </ta-form-item>
    </ta-form>
  </ta-modal>
</template>
<script>
  import $api from '../api/index'

  export default {
    name: 'changeOrg',
    props:['visible','rowData'],
    data() {
      return {
        formOrg: null,
        changeOptions:[],
      }
    },
    methods: {
      resetOrgId() {
        let param = {}, orgId = this.formOrg.getFieldValue('orgId');
        if(orgId && orgId.length){
          param.orgId = orgId[orgId.length - 1];
        } else {
          param.orgId = this.rowData.orgId;
        }
        param.userId = this.rowData.userId;
        $api.updateUserOrgByUserId(this, param, (data) => {
          this.$message.success('重置所属组织成功');
          this.$emit('queryTable')
          this.closeModal();
        });
      },
      closeModal(){
        this.formOrg.resetFields()
        this.$emit('close')
      },
    }
  }
</script>
