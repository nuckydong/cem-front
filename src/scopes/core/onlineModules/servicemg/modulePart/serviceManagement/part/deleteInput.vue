<template>
  <ta-modal title="服务项删除" :visible="visible" @cancel="closeModal">
    <p>此操作将删除该服务项及其所有下级服务项，请输入"delete/删除"</p>
    <ta-form :autoFormCreate="(form)=>{this.deleteForm = form}">
      <ta-form-item fieldDecoratorId="deleteInput" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入 \'delete\' / \'删除\'' },{type: 'enum', enum: ['delete', '删除'], message: '只能输入 \'delete\' 或 \'删除\' ' }]}">
        <ta-input placeholder="请输入'delete'或者'删除'"></ta-input>
      </ta-form-item>
    </ta-form>
    <template slot="footer">
      <ta-button type="primary" @click="deleteTree">确定</ta-button>
      <ta-button @click="closeModal">取消</ta-button>
    </template>
  </ta-modal>
</template>
<script>
  import $api from '../api/index'
  export default {
    name: 'deleteInput',
    props:['visible','deleteId'],
    data() {
      return {
        deleteForm: null
      }
    },
    methods: {
      deleteTree(){
        $api.deleteBatchOnlineServiceName(this, {serviceNameIds: this.deleteId}, (data) => {
          if(data.data.result == 1){
            this.closeModal({'deleteId':this.deleteId, 'type':'delete'})
          }
        });
      },
      closeModal(data){
        this.deleteForm.resetFields()
        this.$emit('close',data)
      }
    }
  }
</script>
