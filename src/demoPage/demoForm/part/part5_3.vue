<template>
  <ta-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
    <template v-if="form">
      <ta-form-item
        label='form5_31'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form5_31"
        :help="form.getFieldError('form5_31')"
      >
        <ta-input/>
      </ta-form-item>
      <ta-form-item
        label='form5_32'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form5_32"
      >
        <ta-input/>
      </ta-form-item>
      <ta-form-item
        label='form5_33'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form5_33"
        :fieldDecoratorOptions="{ initialValue: '初始值，重置' }"
      >
        <ta-input/>
      </ta-form-item>
      <ta-form-item :labelCol="buttonItemLayout.labelCol" :wrapperCol="buttonItemLayout.wrapperCol">
        <ta-button type='primary' htmlType='submit'>提交</ta-button>
        <ta-button style="margin-left: 10px;" @click="fnSetFields()">setFields('form5_31')</ta-button>
        <ta-button style="margin-left: 10px;" @click="fnSetFieldsValue">setFieldsValue()</ta-button>
        <ta-button style="margin-left: 10px;" @click="form.resetFields()">resetFields()</ta-button>
      </ta-form-item>
    </template>
  </ta-form>
</template>

<script>
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  }
  const buttonItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20, offset: 4 },
  }
  export default {
    data () {
      return {
        form: null,
        formItemLayout,
        buttonItemLayout,
      }
    },
    methods: {
      fnSetFields(){
        this.form.setFields({
          form5_31: {
            value: '这是通过setFields设置的value',
            errors: [ "这是通过setFields设置的Error" ],
          }
        })
      },
      fnSetFieldsValue(){
        this.form.setFieldsValue({
          form5_31: "这是通过setFieldsValue设置的value",
          form5_32: "这是通过setFieldsValue设置的value",
          form5_33: "这是通过setFieldsValue设置的value",
        })
      },

      handleSubmit  (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values)
          }
        })
      },
    },
  }
</script>
