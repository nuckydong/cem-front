<template>
  <ta-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
    <template v-if="form">
      <ta-form-item
        label='form5_21'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form5_21"
        :fieldDecoratorOptions="{ initialValue: '第一条' }"
      >
        <ta-input/>
      </ta-form-item>
      <ta-form-item
        label='form5_22'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form5_22"
        :fieldDecoratorOptions="{ initialValue: '第二条' }"
      >
        <ta-input/>
      </ta-form-item>
      <ta-form-item
        label='form5_23'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form5_23"
        :fieldDecoratorOptions="{ initialValue: '第三条' }"
      >
        <ta-input/>
      </ta-form-item>
      <ta-form-item label='结果显示' :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 20 }">
        <div>{{ result }}</div>
      </ta-form-item>
      <ta-form-item :labelCol="buttonItemLayout.labelCol" :wrapperCol="buttonItemLayout.wrapperCol">
        <ta-button type='primary' htmlType='submit'>提交</ta-button>
        <ta-button style="margin-left: 10px;" @click="result = form.getFieldValue('form5_21')">getFieldValue('form5_21')</ta-button>
        <ta-button style="margin-left: 10px;" @click="result = form.getFieldsValue()">getFieldsValue()</ta-button>
        <ta-button style="margin-left: 10px;" @click="result = form.getFieldsValue(['form5_21','form5_22'])">getFieldsValue(['form5_21','form5_22'])</ta-button>
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
        result: {}
      }
    },
    methods: {
      handleSubmit  (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            this.result = values;
          }
        })
      },
    },
  }
</script>
