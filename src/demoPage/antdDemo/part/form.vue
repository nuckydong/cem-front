<template>
  <div class="form">
  <ta-form @submit="fnSubmit" :autoFormCreate="(form)=>{this.form = form}">
    <h3 style="text-align: center">1.简单验证</h3>
    <ta-form-item label='枚举类型'
                 :labelCol="formItemLayout.labelCol"
                 :wrapperCol="formItemLayout.wrapperCol"
                 fieldDecoratorId="enum"
                 :fieldDecoratorOptions="{rules: [{type: 'enum', enum: ['admin', 'user', 'guest'], message: '必输验证' }]}"
    ><ta-input placeholder="只能输入'admin', 'user', 'guest'"/>
    </ta-form-item>
    <ta-form-item label='字段长度'
                 :labelCol="formItemLayout.labelCol"
                 :wrapperCol="formItemLayout.wrapperCol"
                 fieldDecoratorId="len"
                 :fieldDecoratorOptions="{rules: [{ len: 5, message: '长度为5' }]}"
    ><ta-input  placeholder="长度只能为5"/>
    </ta-form-item>
    <ta-form-item label='长度区间'
                 :labelCol="formItemLayout.labelCol"
                 :wrapperCol="formItemLayout.wrapperCol"
                 fieldDecoratorId="MinMaxLen"
                 :fieldDecoratorOptions="{rules: [{ min: 2,  max: 5, message: '长度只能在2到5之间' }]}"
    ><ta-input  placeholder="长度只能在2到5之间"/>
    </ta-form-item>
    <ta-form-item label='正则表达式校验'
                 :labelCol="formItemLayout.labelCol"
                 :wrapperCol="formItemLayout.wrapperCol"
                 fieldDecoratorId="pattern"
                 :fieldDecoratorOptions="{rules: [{ pattern: /[\u4e00-\u9fa5]/, message: '只能输入中文' }]}"
    ><ta-input placeholder="只能输入中文"/>
    </ta-form-item>
    <ta-form-item label='必输验证'
                 :labelCol="formItemLayout.labelCol"
                 :wrapperCol="formItemLayout.wrapperCol"
                 fieldDecoratorId="required"
                 :fieldDecoratorOptions="{rules: [{ required: true, message: '必输验证' }]}"
    ><ta-input placeholder="必输时可以只输入空格"/>
    </ta-form-item>
    <ta-form-item label='必输时只输入空格'
                 :labelCol="formItemLayout.labelCol"
                 :wrapperCol="formItemLayout.wrapperCol"
                 fieldDecoratorId="whitespace"
                 :fieldDecoratorOptions="{rules: [{ required: true, whitespace: true, message: '必输时不能只输入空格' }]}"
    ><ta-input placeholder="必输时不能只输入空格" />
    </ta-form-item>
    <ta-form-item label='email'
                 :labelCol="formItemLayout.labelCol"
                 :wrapperCol="formItemLayout.wrapperCol"
                 fieldDecoratorId="email"
                 :fieldDecoratorOptions="{rules: [{ type: 'email', message: '请输入正确的email' }]}"
    ><ta-input />
    </ta-form-item>
    <ta-form-item label='url'
                 :labelCol="formItemLayout.labelCol"
                 :wrapperCol="formItemLayout.wrapperCol"
                 fieldDecoratorId="url"
                 :fieldDecoratorOptions="{rules: [{ type: 'url', message: '请输入正确的url' }]}"
    ><ta-input />
    </ta-form-item>
    <h3 style="text-align: center">2.自定义验证</h3>
    <ta-form-item label='自定义验证'
                 :labelCol="formItemLayout.labelCol"
                 :wrapperCol="formItemLayout.wrapperCol"
                 fieldDecoratorId="self"
                 :fieldDecoratorOptions="selfRules"
    ><ta-input placeholder='输入值在 50~100之间 且不等于80'/>
    </ta-form-item>
    <ta-form-item :wrapperCol="{ span: 12, offset: 5 }">
      <ta-button type='primary' @click="fnQuery">查询</ta-button>
      <ta-button type='primary' htmlType='submit'>提交</ta-button>
    </ta-form-item>
  </ta-form>
  <ta-modal title="提交信息" :visible="visible" @ok="visible = false" @cancel="visible = false">{{submitInfo}}</ta-modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formItemLayout : {
          labelCol: { span: 5 },
          wrapperCol: { span: 12 },
        },
        visible:false,
        /*自定义验证规则*/
        selfRules:{
          rules: [{
            required: true, message: '请输入信息'
          },{
            pattern: /^[0-9]+$/, message: '请输入数字'
          }, {
            validator: this.validateSelf,
          }]
        },
        submitInfo: {}
      }
  },
  methods: {
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
    fnSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.visible = true;
          this.submitInfo = values;
        }
      })
    },
    fnQuery(){
      let result = {
        len:3,
        enum:'user',
        other:'value'
      }
      this.form.resetFields();
      let updateFormItemValue = this.Tool.objectAssign(this.form.getFieldsValue(),result)
      this.form.setFieldsValue(updateFormItemValue)
    }
  }
  }
</script>

<style scoped lang="scss"  type="text/scss">
  #app { padding: 20px }
</style>
