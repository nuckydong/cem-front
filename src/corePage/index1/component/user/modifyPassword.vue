<template>
  <ta-form :autoFormCreate="(form)=>{this.form = form}" layout="horizontal" style="padding: 10px">

    <ta-form-item label='原密码'
                  :labelCol="formItemLayout.labelCol"
                  :wrapperCol="formItemLayout.wrapperCol"
                  fieldDecoratorId="oldPassword"
                  :fieldDecoratorOptions="{rules: [{ required: true, message: '密码不能为空' }]}"
    >
      <ta-input placeholder="原密码" type="password"/>
    </ta-form-item>
    <ta-form-item label='新密码'
                  :labelCol="formItemLayout.labelCol"
                  :wrapperCol="formItemLayout.wrapperCol"
                  fieldDecoratorId="newPassword"
                  :fieldDecoratorOptions="{rules: [{ required: true, message: '密码不能为空' },
                        {validator: compareToNextPassword}]}"

    >
      <ta-input placeholder="新密码" type="password"/>
    </ta-form-item>
    <ta-form-item label='确认'
                  :labelCol="formItemLayout.labelCol"
                  :wrapperCol="formItemLayout.wrapperCol"
                  fieldDecoratorId="confirm"
                  :fieldDecoratorOptions="{rules: [{ required: true, message: '密码不能为空' },
                        {validator:compareToFirstPassword}]}"

    >
      <ta-input placeholder="确认密码" type="password" @blur="handleConfirmBlur"/>
    </ta-form-item>
    <ta-form-item :wrapperCol="{ offset: 5 }">

      <ta-button type='primary' @click="closePane">取消</ta-button>

      <ta-button type='primary' style="margin-left: 20px" @click="handleSubmit">提交</ta-button>

    </ta-form-item>

  </ta-form>

</template>

<script>
  import {mapGetters} from 'vuex'
  import dealData from '@/corePage/login/js/dealData'

  export default {
    name: 'modify-password',
    props: {},
    data() {
      return {
        formItemLayout: {
          labelCol: {span: 5},
          wrapperCol: {span: 19}
        },
        confirmDirty: false,
        dealData
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo'
      })
    },
    methods: {
      compareToNextPassword(rule, value, callback) {
        const form = this.form
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], {force: true})
        }
        callback()
      },
      compareToFirstPassword(rule, value, callback) {
        const form = this.form
        if (value && value !== form.getFieldValue('newPassword')) {
          callback('两次密码不同!')
        } else {
          callback()
        }
      },
      handleConfirmBlur(e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      },
      handleSubmit() {
        this.form.validateFields((err, values) => {
          if (!err) {
            let formData = this.form.getFieldsValue()
            formData.userId = this.userInfo.userId || ''
            if (this.userInfo.passwordRSA) {
              formData.oldPassword = this.dealData.encryptPwd(formData.oldPassword);
              formData.newPassword = this.dealData.encryptPwd(formData.newPassword);
            }

            this.Base.submit(null, {
              url: 'indexRestService!changePassword.do',
              data: formData
            }, {
              successCallback: (data) => {
                this.$message.success('密码修改成功!')
                this.form.resetFields()
                this.closePane()
              }
            })
          }
        })
      },
      closePane() {
        this.$emit('modifyPaneStatus', false)
      }
    }
  }
</script>

<style scoped>

</style>
