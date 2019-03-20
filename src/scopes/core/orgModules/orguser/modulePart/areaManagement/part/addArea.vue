<template>
  <div>
    <ta-form  :autoFormCreate="(form)=>{this.form = form}">

      <ta-form-item v-if="area === '0'?false:true" label="上级行政区划" :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol">
        <ta-input :value="area.areaName" disabled/>
      </ta-form-item>

      <ta-form-item label='行政区划名称：' :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="areaName"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: '行政区划名称不能为空!' }]}">
        <ta-input v-model="areaName" placeholder="请输入行政区划名称"/>
      </ta-form-item>

      <ta-form-item label='行政区划编码：' :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="areaCode"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: '行政区划编码不能为空!' }]}">
        <ta-input v-model="areaCode" placeholder="请输入行政区划编码"/>
      </ta-form-item>
    </ta-form>

    <!--<ta-row type="flex" justify="end">-->
      <!--<ta-col style="bottom: 0;position:fixed; float: right">-->
        <!--<ta-button-group>-->
          <!--<ta-button @click="onResetForm">重置</ta-button>-->
          <!--<ta-button type="primary" @click="handleSubmit">保存</ta-button>-->
        <!--</ta-button-group>-->
      <!--</ta-col>-->
    <!--</ta-row>-->
  </div>

</template>
<script>

import $api from '../api/index'
const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 18}
}
const tailFormItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 8, offset: 4}
}

export default {
  props: ['area'],
  data () {
    return {
      editFlag: false, // 是否是编辑行政区划
      areaName: '',
      areaCode: '',
      formItemLayout,
      tailFormItemLayout

    }
  },
  methods: {
    // 重置表单
    onResetForm () {
      this.form.resetFields()
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          // 如果没有错误
          let self = this
          let data = self.form.getFieldsValue()
          data.parentId = self.area.areaId

          $api.addArea(self, data, (data)=> {
            this.$emit('addSuccess', self.area, data.data.result)
            // 提示
            self.$message.success('新增行政区划成功')
          })
        }
      })
    }
  }
}
</script>
<style>

</style>
