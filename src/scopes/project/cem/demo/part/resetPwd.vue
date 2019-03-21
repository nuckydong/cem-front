<template>
  <!--5. 重置密码模态框-->
  <ta-modal title="重置密码" :visible="visible" okText="确认" cancelText="关闭" @ok="resetPwd" width="400px" @cancel="closeModal" :bodyStyle="{'height': '160px'}" size="small" destroyOnClose>
    <ta-form id="pwdForm" :autoFormCreate="(form)=>{this.formPass = form}">
      <ta-form-item
        label='登录口令'
        :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 17 }"
        fieldDecoratorId="password"
        :fieldDecoratorOptions="pwdRules"
      >
        <ta-input type='password' @blur="blurPwd"/>
      </ta-form-item>
      <ta-form-item
        label='确认口令'
        :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 17 }"
        fieldDecoratorId="password_2"
        :fieldDecoratorOptions="{rules: [{ validator: this.compareToFirstPwd},{ required: true, message: '请再次输入登录口令!' }]}"
      >
        <ta-input type='password'/>
      </ta-form-item>
    </ta-form>
  </ta-modal>
</template>
<script>
  import $api from '../api/index'

  import $ from 'jquery'
  import '../api/Barrett'
  import {setMaxDigits} from '../api/BigInt'
  import '../api/jQuery.md5'
  import {RSAKeyPair, encryptedString} from '../api/RSA'

  export default {
    name: 'resetPwd',
    props:['visible','userId'],
    data() {
      return {
        formPass: null,
        pwdRules: {
          rules: [{
            required: true, message: '请输入登录口令!'
          }, {
            min: 6, message: '登录口令不能少于6位字符!'
          }, {
            validator: this.validatePwd
          }]
        },
        rsaKey: {}
      }
    },
    mounted(){
      this.bodyRSA()
    },
    methods: {
      blurPwd(e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      },
      compareToFirstPwd(rule, value, callback) {
        const form = this.formPass;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次口令输入不一致!')
        } else {
          callback()
        }
      },
      validatePwd(rule, value, callback) {
        const form = this.formPass
        if (value && this.confirmDirty) {
          form.validateFields(['password_2'], {force: true})
        }
        callback()
      },
      bodyRSA () {
        setMaxDigits(130)
        this.rsaKey = new RSAKeyPair('10001', '', '906C793510FB049452764740B21B97A51DAEA794AB6E43836269D5E6317D49226C12362BA22DAB5EC3BC79553A8A098B01F3C4D81A87B3EE5BD2F4F1431CC495EE2FE54688B212145BB32D56EEEEE1430CE26234331B291CFC53C9B84FAFFDF0B44371A032880C3D567F588D2CD5FCE28D9CDD2923CB547DAD219A6A1B8B5D3D')
      },
      encryptPwd(pwd) {
        return encryptedString(this.rsaKey, encodeURI(pwd));
      },
      resetPwd() {
        this.formPass.validateFields((err,values)=>{
          if(!err){
            $api.updateUserPwdByUserId(this, {"password": this.encryptPwd(values.password), "userId": this.userId}, (data) => {
              this.$emit('queryTable')
              this.closeModal();
              this.$message.success('重置密码成功');
            });
          }
        });
      },
      closeModal(){
        this.formPass.resetFields()
        this.$emit('close')
      },
    }
  }
</script>
