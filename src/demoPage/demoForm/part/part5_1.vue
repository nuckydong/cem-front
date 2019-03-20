<template>
  <ta-form layout='inline' @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
    <template v-if="form">
      <ta-form-item
        :validateStatus="userNameError() ? 'error' : ''"
        :help="userNameError() || ''"
        fieldDecoratorId="userName"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名' }]}"
      >
        <ta-input placeholder='Username'>
          <ta-icon slot="prefix" type='user' style="color:rgba(0,0,0,.25)"/>
        </ta-input>
      </ta-form-item>
      <ta-form-item
        :validateStatus="passwordError() ? 'error' : ''"
        :help="passwordError() || ''"
        fieldDecoratorId="password"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码!' }]}"
      >
        <ta-input type='password' placeholder='Password'>
          <ta-icon slot="prefix" type='lock' style="color:rgba(0,0,0,.25)"/>
        </ta-input>
      </ta-form-item>
      <ta-form-item>
        <ta-button
          type='primary'
          htmlType='submit'
          :disabled="hasErrors(form.getFieldsError())"
        >Log in</ta-button>
      </ta-form-item>
      <div>this.form.getFieldsError() 返回值：{{this.form.getFieldsError()}}</div>
    </template>
  </ta-form>
</template>

<script>
  function hasErrors (fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }
  export default {
    data () {
      return {
        hasErrors,
        form: null,
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.form.validateFields()
      })
    },
    methods: {
      userNameError () {
        const { getFieldError, isFieldTouched } = this.form
        return isFieldTouched('userName') && getFieldError('userName')
      },
      passwordError () {
        const { getFieldError, isFieldTouched } = this.form
        return isFieldTouched('password') && getFieldError('password')
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
