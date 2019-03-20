<template>
  <div>
    <ta-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}" :layout="formLayout" :hideRequiredMark="hideMark">
      <ta-form-item
        label='标题1'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form1_1"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入信息!' }]}"
      >
        <ta-input />
      </ta-form-item>
      <ta-form-item
        label='标题2'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form1_2"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入信息!' }]}"
      >
        <ta-input />
      </ta-form-item>
      <ta-form-item :labelCol="buttonItemLayout.labelCol" :wrapperCol="buttonItemLayout.wrapperCol">
        <ta-button type='primary' htmlType='submit'>提交</ta-button>
        <ta-button style="margin-left: 10px;" @click="formLayout = 'horizontal'">布局：horizontal(默认)</ta-button>
        <ta-button style="margin-left: 10px;" @click="formLayout = 'vertical'">布局：vertical</ta-button>
        <ta-button style="margin-left: 10px;" @click="formLayout = 'inline'">布局：inline</ta-button>
        <ta-button style="margin-left: 10px;" @click="hideMark = !hideMark">{{ hideMark ? '显示':'隐藏'}}表单必选标记</ta-button>
      </ta-form-item>
    </ta-form>
    <div class="title">注意事项</div>
    <p>1.<span class="code-box">autoFormCreate：</span>建议在template组件下使用，自动执行Form.create，并且不可以和Form.create()方法同时使用</p>
    <p>2.<span class="code-box">form：</span>经 Form.create() 包装过的组件会自带 this.form 属性，直接传给 Form 即可。无需手动设置</p>
    <p>3.<span class="code-box">submit：</span>数据验证成功后回调事件</p>
    <p>4.<span class="code-box">layout：</span>表单布局，<span class="code-box">'horizontal'、'vertical'、'inline'</span></p>
    <p>5.<span class="code-box">hideRequiredMark：</span>隐藏所有表单项的必选标记</p>
    <div class="tips">注意，在ta404-ui框架下建议使用autoFormCreate开启自动校验和数据收集功能</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formLayout: 'horizontal',
        hideMark: false,
      }
    },
    computed:{
      formItemLayout () {
        const { formLayout } = this
        return formLayout === 'horizontal' ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 8 },
        } : {}
      },
      buttonItemLayout () {
        const { formLayout } = this
        return formLayout === 'horizontal' ? {
          wrapperCol: { span: 20, offset: 4 },
        } : {}
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
