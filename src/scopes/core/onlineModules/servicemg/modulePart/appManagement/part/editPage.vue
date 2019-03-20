<template>
  <ta-modal :visible="visible" :title="editType == 'add' ? '新增页面' : '编辑页面'" @cancel="closeModal">
    <ta-form :autoFormCreate="(form)=>{this.form = form}">
      <ta-form-item label="页面名称"
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="pageName"
                    :fieldDecoratorOptions="{ rules: [{ required: true, message: '页面名称不能为空' }], initialValue: formData.pageName}">
        <ta-input placeholder="请输入页面名称"/>
      </ta-form-item>
    </ta-form>
    <template slot="footer">
      <ta-button @click="closeModal">取消</ta-button>
      <ta-button type="primary" @click="fnSave">保存</ta-button>
    </template>
  </ta-modal>
</template>
<script>
import $api from '../api/index'
export default {
  name: 'editPage',
  props: ['visible', 'rowData', 'editType'],
  data () {
    return {
      formItemLayout: {
        labelCol: {span: 6},
        wrapperCol: {span: 18}
      },
      formData: {}
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.setValue()
      }
    }
  },
  methods: {
    setValue () {
      const { label, children } = this.rowData
      if (this.editType == 'edit') {
        this.formData = {
          pageName: label
        }
      } else {
        let num = children ? children.length + 1 : 1
        this.formData = {
          pageName: label + '-' + num
        }
      }
    },
    // 提交修改或者新增应用
    fnSave () {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.editType == 'add') {
            this.closeModal('add', values)
            /*     $api.addTag(this, values, (data) => {
              this.$message.success('新增应用成功')
              this.closeModal()
            }) */
          } else {
            this.closeModal('edit', values)
            /*     $api.updateTag(this, values, (data) => {
              this.$message.success('修改应用成功')
              this.$emit('search', {})
              this.closeModal()
            }) */
          }
        }
      })
    },
    closeModal (type, data) {
      this.formData = {}
      this.form.resetFields()
      this.$emit('close', type, data)
    }
  }
}
</script>
