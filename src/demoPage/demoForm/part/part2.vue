<template>
  <div>
    <ta-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
      <ta-form-item
        label='标题1'
        :colon="isColon"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form2_1"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入信息!' }]}"
      >
        <ta-input />
      </ta-form-item>
      <ta-form-item
        label='标题2'
        :colon="isColon"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form2_2"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入信息!' }]}"
        extra="extra提示文案"
      >
        <ta-input />
      </ta-form-item>
      <ta-form-item
        label='标题3'
        :colon="isColon"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form2_3"
        :required="true"
        extra="仅显示必输样式，而无验证"
      >
        <ta-input />
      </ta-form-item>
      <ta-form-item
        label='校验状态'
        :colon="isColon"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form2_4"
        :validateStatus="status"
      >
        <ta-input />
      </ta-form-item>
      <ta-form-item
        label='校验状态(含图标)'
        :colon="isColon"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form2_5"
        :validateStatus="status"
        hasFeedback
      >
        <ta-input />
      </ta-form-item>
      <ta-form-item :labelCol="buttonItemLayout.labelCol" :wrapperCol="buttonItemLayout.wrapperCol">
        <ta-button type='primary' htmlType='submit'>提交</ta-button>
        <ta-button style="margin-left: 10px;" @click="isColon = !isColon">是否显示 label 后的冒号</ta-button>
        <ta-button style="margin-left: 10px;" @click="status = 'success'">校验状态：success</ta-button>
        <ta-button style="margin-left: 10px;" @click="status = 'warning'">校验状态：warning</ta-button>
        <ta-button style="margin-left: 10px;" @click="status = 'error'">校验状态：error</ta-button>
        <ta-button style="margin-left: 10px;" @click="status = 'validating'">校验状态：validating</ta-button>
      </ta-form-item>
    </ta-form>
    <div class="title">注意事项</div>
    <p>1.<span class="code-box">fieldDecoratorId：</span>对应getFieldDecorator(id, options)的第一个参数id，如需收集数据需要设置该字段</p>
    <p>2.<span class="code-box">fieldDecoratorOptions：</span>对应getFieldDecorator(id, options)的第二个参数options</p>
  </div>
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
        formItemLayout,
        buttonItemLayout,
        isColon: false,
        status:'success',
      }
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values)
          }
        })
      }
    }
  }
</script>
