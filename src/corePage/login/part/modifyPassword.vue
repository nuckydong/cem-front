<template>
    <ta-form :autoFormCreate="(form)=>{this.form = form}">
      <ta-form-item
        fieldDecoratorId="loginId"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名!' }]}"
      >
        <ta-input placeholder="用户名">
          <ta-icon slot="prefix" type="user"/>
        </ta-input>
      </ta-form-item>
      <ta-form-item
        fieldDecoratorId="oldPassword"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入原始密码!' }]}"
      >
        <ta-input placeholder="密码" type="password">
          <ta-icon slot="prefix" type="lock"/>
        </ta-input>

      </ta-form-item>
      <ta-form-item
        fieldDecoratorId="newPassword"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入新密码!' },{validator:checkPasswordNext}]}"
      >
        <ta-input placeholder="新密码" type="password" @blur="handleConfirmBlur">
          <ta-icon slot="prefix" type="lock"/>
        </ta-input>

      </ta-form-item>


      <ta-form-item
        fieldDecoratorId="newPasswordConfirm"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '再次输入新密码!' },{validator:checkPasswordPre}]}"
      >
        <ta-input placeholder="再次输入新密码" type="password">
          <ta-icon slot="prefix" type="lock"/>
        </ta-input>

      </ta-form-item>


      <ta-form-item
        v-if="showSimpleCheckCode"
        fieldDecoratorId="checkCodePass"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入验证码!' }]}"
      >

        <ta-input style="width: 60%" placeholder="验证码">
          <ta-icon slot="prefix" type="appstore"/>
        </ta-input>
        <img style="width: 40%" @click="refreshCode();" :src="imgSrc" title="点击获取验证码"/>
      </ta-form-item>
      <ta-form-item>
        <span style="float: right">
        <ta-button @click="cancelModify" >取消</ta-button>
        <ta-button style="margin-left: 10px" type="primary" @click="handleSubmit">确定</ta-button>
        </span>
      </ta-form-item>

    </ta-form>
</template>

<script>
  import dealData from '../js/dealData'
  import {mapGetters} from 'vuex'

  export default {
    name: "modify-password",
    props:{
      show:{
        type:Boolean
      },
      //是不是登陆页
      passState:{
        type:String
      }
    },
    data() {
      return {
        confirmDirty: false,
        imgSrc: dealData.refreshCodeSrc(),
        dealData
      }
    },
    computed: {
      ...mapGetters({
        showSimpleCheckCode: 'showSimpleCheckCode',
        passwordRSAState: 'passwordRSAState'
      }),
    },
    methods: {
      //提交数据
      handleSubmit() {
        let formData = this.form.getFieldsValue();
        if (this.passwordRSAState) {
          formData.oldPassword = this.dealData.encryptPwd(formData.oldPassword);
          formData.newPassword = this.dealData.encryptPwd(formData.newPassword);
        }
        // 是否为登录页修改密码
        formData.indexChangePass =this.passState;
        this.Base.submit(this.form, {
          url: "loginRestService/changePassword",
          data: formData,
          autoValid: true,
          withCredentials: false
        }, {
          successCallback: (data) => {
            this.$message.success("密码修改成功!");
            this.cancelModify()
          },
          failCallback: (data) => {
            this.refreshCode();
          }
        })
      },
      cancelModify() {
        this.form.resetFields();
        this.$emit('update:show',false)
      },
      handleConfirmBlur(e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      },
      checkPasswordNext(rule, value, callback) {
        const form = this.form;
        if (value && this.confirmDirty) {
          form.validateFields(['newPasswordConfirm'], {force: true})
        }
        callback()
      },
      checkPasswordPre(rule, value, callback) {
        let pwd = this.form.getFieldValue("newPassword")
        if (value && value != pwd) {
          callback("两次密码不同!")
        } else {
          callback();
        }
      },
      refreshCode() {
        this.imgSrc = this.dealData.refreshCodeSrc();
      }
    },
    watch: {
      show(newValue, oldValue) {
        if (newValue == true) {
          this.form.resetFields();
          this.refreshCode();
        }
      }
    },

  }
</script>

<style scoped>

</style>
