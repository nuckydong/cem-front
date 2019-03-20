<template>
  <div>
    <ta-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
      <ta-form-item label='枚举类型'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="form4_1"
                    :fieldDecoratorOptions="{rules: [{type: 'enum', enum: ['admin', 'user', 'guest'], message: '只能输入admin、 user、 guest' }]}"
      >
        <ta-input placeholder="只能输入'admin', 'user', 'guest'"/>
      </ta-form-item>
      <ta-form-item label='字段长度'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="form4_2"
                    :fieldDecoratorOptions="{rules: [{ len: 5, message: '长度为5' }]}"
      >
        <ta-input  placeholder="长度只能为5"/>
      </ta-form-item>
      <ta-form-item label='长度区间'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="form4_3"
                    :fieldDecoratorOptions="{rules: [{ min: 2,  max: 5, message: '长度只能在2到5之间' }]}"
      >
        <ta-input  placeholder="长度只能在2到5之间"/>
      </ta-form-item>
      <ta-form-item label='正则表达式校验'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="form4_4"
                    :fieldDecoratorOptions="{rules: [{ pattern: /[\u4e00-\u9fa5]/, message: '只能输入中文' }]}"
      >
        <ta-input placeholder="只能输入中文"/>
      </ta-form-item>
      <ta-form-item label='必输验证'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="form4_5"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: '必输验证' }]}"
      >
        <ta-input placeholder="必输时可以只输入空格"/>
      </ta-form-item>
      <ta-form-item label='必输时只输入空格'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="form4_6"
                    :fieldDecoratorOptions="{rules: [{ required: true, whitespace: true, message: '必输时不能只输入空格' }]}"
      >
        <ta-input placeholder="必输时不能只输入空格" />
      </ta-form-item>
      <ta-form-item label='校验前转换字段值'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="form4_7"
                    :fieldDecoratorOptions="{rules: [{transform: this.fnTransform},{validator: this.validateTransform}]  }"
      >
        <ta-input />
      </ta-form-item>
      <ta-form-item label='type.email'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="form4_8"
                    :fieldDecoratorOptions="{rules: [{ type: 'email', message: '请输入正确的email' }]}"
      >
        <ta-input />
      </ta-form-item>
      <ta-form-item label='type.url'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="form4_9"
                    :fieldDecoratorOptions="{rules: [{ type: 'url', message: '请输入正确的url' }]}"
      >
        <ta-input />
      </ta-form-item>
      <ta-form-item label='多个校验'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="form4_10"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: '必输验证' }, { min: 2,  max: 5, message: '长度只能在2到5之间' }]}"
      >
        <ta-input />
      </ta-form-item>
      <ta-form-item label='自定义校验'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="form4_11"
                    :fieldDecoratorOptions="selfValidator"
      >
        <ta-input />
      </ta-form-item>
      <ta-form-item :labelCol="buttonItemLayout.labelCol" :wrapperCol="buttonItemLayout.wrapperCol">
        <ta-button type='primary' htmlType='submit'>提交</ta-button>
      </ta-form-item>
    </ta-form>
    <div class="title">注意事项</div>
    <p>1.<span class="code-box">rules.transform：</span>校验前转换字段值，如本例中校验前给字段加了<span class="code-box">transform_</span>前缀，可在控制台查看转换后的字段</p>
    <p>2.<span class="code-box">rules.type：</span>内建校验类型，具体更多查看<a href="https://github.com/yiminghe/async-validator#type">文档</a></p>
    <p>3.<span class="code-box">rules.validator：</span>自定义校验<span class="code-box">（注意，callback 必须被调用）</span></p>
    <div class="tips">注意，本例中包含了rules的大部分规则，若有项目需求的复杂验证，建议使用<span class="code-box">rules.validator</span></div>
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
        selfValidator:{
          rules: [{
            required: true, message: '请输入信息'
          },{
            pattern: /^[0-9]+$/, message: '请输入数字'
          }, {
            validator: this.validateSelf,
          }],
        }
      }
    },
    methods: {
      fnTransform(value){
        return  'transform_' + value
      },
      validateTransform  (rule, value, callback) {
        console.log(value)
      },
      /*自定义验证方法*/
      validateSelf  (rule, value, callback) {
        if (value > 100) {
          callback('输入值必须小于100')
        }else if (value < 50) {
          callback('输入值必须大于50')
        }else if (value == 80) {
          callback('输入值不能等于80')
        }else {
          callback()
        }
      },
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
