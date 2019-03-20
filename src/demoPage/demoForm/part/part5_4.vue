<template>
  <ta-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
    <template v-if="form">
      <ta-form-item
        label='form5_41'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form5_41"

        :fieldDecoratorOptions="{rules: [{validator: this.validateSelf}]  }"
      >
        <ta-input/>
      </ta-form-item>
      <ta-form-item
        label='form5_42'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form5_42"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入信息!' }]}"
      >
        <ta-input/>
      </ta-form-item>
      <ta-form-item
        :labelCol="buttonItemLayout.labelCol"
        :wrapperCol="buttonItemLayout.wrapperCol"
      >
        <div>form5_41是否经历过 getFieldDecorator 的值收集时机：  {{this.form.isFieldTouched('form5_41')}}</div>
        <div>任一控件是否经历过 getFieldDecorator 的值收集时机：  {{this.form.isFieldsTouched()}}</div>
        <div>form5_41是否在校验状态(form5_41在2秒后停止校验)： {{this.form.isFieldValidating('form5_41')}}</div>
      </ta-form-item>
      <ta-form-item :labelCol="buttonItemLayout.labelCol" :wrapperCol="buttonItemLayout.wrapperCol">
        <ta-button type='primary' htmlType='submit'>提交</ta-button>
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
          form5_41: {
            value: '这是通过setFields设置的value',
            errors: [ "这是通过setFields设置的Error" ],
          }
        })
      },
      fnSetFieldsValue(){
        this.form.setFieldsValue({
          form5_41: "这是通过setFieldsValue设置的value",
          form5_42: "这是通过setFieldsValue设置的value",
          form5_43: "这是通过setFieldsValue设置的value",
        })
      },
      validateSelf(rule, value, callback){
        setTimeout(function () {
          callback()
        },2000)
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
