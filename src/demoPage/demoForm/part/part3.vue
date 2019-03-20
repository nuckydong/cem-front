<template>
  <div>
    <ta-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
      <ta-form-item
        label='getValueFromEvent'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form3_1"
        :fieldDecoratorOptions="{ getValueFromEvent: fnGetValueFromEvent }"
        extra="返回信息查看控制台（通过表单事件，返回控件相关的值）"
      >
        <ta-input/>
      </ta-form-item>
      <ta-form-item
        label='initialValue'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form3_2"
        :fieldDecoratorOptions="{ initialValue: '我是初始值' }"
      >
        <ta-input/>
      </ta-form-item>
      <ta-form-item
        label='normalize'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form3_3"
        :fieldDecoratorOptions="{ 'normalize': normalizeAll }"
      >
        <ta-checkbox-group :options="options" />
      </ta-form-item>
      <ta-form-item
        label='rules'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form3_4"
        :fieldDecoratorOptions="{ rules: [{ type: 'email', message: '请输入正确的email' }, {pattern: /^[0-9]+$/, message: '请输入数字'}], initialValue: 'test'}"
      >
        <ta-input />
      </ta-form-item>
      <ta-form-item
        label='validateFirst'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form3_5"
        :fieldDecoratorOptions="{ rules: [{ type: 'email', message: '请输入正确的email' }, {pattern: /^[0-9]+$/, message: '请输入数字'}], initialValue: 'test', validateFirst: true}"
      >
        <ta-input />
      </ta-form-item>
      <ta-form-item
        label='validateTrigger'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form3_6"
        :fieldDecoratorOptions="{ rules: [{ type: 'email', message: '请输入正确的email' }], validateTrigger: 'blur'}"
        extra="校验子节点值的时机设置为blur"
      >
        <ta-input />
      </ta-form-item>
      <ta-form-item
        label='valuePropName'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        fieldDecoratorId="form3_7"
        :fieldDecoratorOptions="{ valuePropName: 'checked' }"
      >
        <ta-switch />
      </ta-form-item>
      <ta-form-item :labelCol="buttonItemLayout.labelCol" :wrapperCol="buttonItemLayout.wrapperCol">
        <ta-button type='primary' htmlType='submit'>提交</ta-button>
      </ta-form-item>
    </ta-form>
    <div class="title">注意事项</div>
    <p>1.<span class="code-box">options.initialValue：</span>子节点的初始值</p>
    <div class="tips">注意：经过<span class="code-box">getFieldDecorator</span>包装过的控件，不能使用控件本身的<span class="code-box"> value 、 defaultValue</span> 等属性来设置表单域的初始值</div>
    <p>2.<span class="code-box">options.rules：</span>校验规则，详情参考下方示例 options.rules 校验规则详解</p>
    <p>3.<span class="code-box">options.validateFirst：</span>当某一规则校验不通过时，停止剩下的规则的校验</p>
    <p>4.<span class="code-box">options.validateTrigger：</span>校验子节点值的时机，默认为<span class="code-box">change</span></p>
    <p>5.<span class="code-box">options.valuePropName：</span>子节点的值的属性，如 Switch 的是 'checked'，即每个组件中有<span class="code-box">(v-model)</span>标识的属性，大部分为<span class="code-box">value</span></p>
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
        options: [
          { label: "All", value: "All" },
          { label: "Apple", value: "Apple" },
          { label: "Pear", value: "Pear" },
          { label: "Orange", value: "Orange" }
        ],
      }
    },
    methods: {
      fnGetValueFromEvent(args){
        console.log(args);
      },
      normalizeAll(value, prevValue = []) {
        if (value && value.indexOf("All") >= 0 && prevValue.indexOf("All") < 0) {
          return ["All", "Apple", "Pear", "Orange"];
        }
        if (value && value.indexOf("All") < 0 && prevValue.indexOf("All") >= 0) {
          return [];
        }
        return value;
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
