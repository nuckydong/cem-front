<template>
<div>
  <ta-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
    <template v-if="form">
      <ta-form-item
        label='form5_51'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form5_51"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入form5_51的信息!' }]}"
      >
        <ta-input/>
      </ta-form-item>
      <ta-form-item
        label='form5_52'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form5_52"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入form5_52的信息!' }]}"
      >
        <ta-input/>
      </ta-form-item>
      <ta-form-item
        label='form5_53'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form5_53"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入form5_53的信息!' }]}"
      >
        <ta-input/>
      </ta-form-item>
      <ta-form-item
        label='form5_54'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form5_54"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入form5_54的信息!' }]}"
      >
        <ta-input/>
      </ta-form-item>
      <ta-form-item
        label='form5_55'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form5_55"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入form5_55的信息!' }]}"
      >
        <ta-input/>
      </ta-form-item>
      <ta-form-item :labelCol="buttonItemLayout.labelCol" :wrapperCol="buttonItemLayout.wrapperCol">
        <ta-button type='primary' htmlType='submit'>提交（validateFields 控制台查看值与Error）</ta-button>
        <ta-button style="margin-left: 10px;" @click="fnValidateFieldsAndScroll()">validateFieldsAndScroll</ta-button>
        <ta-button style="margin-left: 10px;" @click="fnValidateForm5_53()">只校验form5_53</ta-button>
        <ta-button style="margin-left: 10px;" @click="fnFirst()">first</ta-button>
        <!--<ta-button style="margin-left: 10px;" @click="fnFirstFields()">firstFields</ta-button>-->
        <ta-button style="margin-left: 10px;" @click="fnForce()">force</ta-button>
        <ta-button style="margin-left: 10px;" @click="form.resetFields()">重置信息</ta-button>
      </ta-form-item>
    </template>
  </ta-form>
  <div class="title">注意事项：</div>
  <p>1.<span class="code-box">options.first：</span>碰到第一个失败了的校验规则后停止校验</p>
  <p>2.<span class="code-box">options.force：</span>对校验过的组件，强制再次校验</p>
  <div class="tips">注意：<span class="code-box">validateFieldsAndScroll</span>与<span class="code-box">validateFields</span>用法相似，区别在于校验不通过的菜单域如果不在可见范围内，则自动滚动进可见范围</div>
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
        form: null,
        formItemLayout,
        buttonItemLayout,
      }
    },
    methods: {
      handleSubmit  (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          console.log('validateFields的值：', values);
          console.log('validateFields的Error：', err);
          console.log('-------------------------------------------')
        })
      },
      fnValidateFieldsAndScroll(){
        this.form.validateFieldsAndScroll((err, values) => {
          console.log('validateFields的值：', values);
          console.log('validateFields的Error：', err);
          console.log('-------------------------------------------')
        })
      },
      fnValidateForm5_53(){
        this.form.validateFields(['form5_53'],(err, values) => {
          console.log('validateFields的值：', values);
          console.log('validateFields的Error：', err);
          console.log('-------------------------------------------')
        })
      },
      fnFirst(){
        this.form.validateFields({first: true},(err, values) => {
          console.log('validateFields的值：', values);
          console.log('validateFields的Error：', err);
          console.log('-------------------------------------------')
        })
      },
      fnFirstFields(){
        this.form.validateFields( {firstFields: []}, (err, values) => {
          console.log('validateFields的值：', values);
          console.log('validateFields的Error：', err);
          console.log('-------------------------------------------')
        })
      },
      fnForce(){
        this.form.validateFields(['form5_54'],{force:true},(err, values) => {
          console.log('validateFields的值：', values);
          console.log('validateFields的Error：', err);
          console.log('-------------------------------------------')
        })
      }
    },
  }
</script>
