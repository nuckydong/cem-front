<template>
  <ta-form :autoFormCreate="(form)=>{this.form = form}">
    <ta-form-item
      fieldDecoratorId="username"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名!' }]}"
    >
      <ta-input placeholder="用户名" @blur="checkUser">
        <ta-icon slot="prefix" type="user"/>
      </ta-input>
    </ta-form-item>
    <ta-form-item
      fieldDecoratorId="password"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码!' }]}"
    >
      <ta-input  placeholder="密码" type="password" style="width: 70%">
        <ta-icon slot="prefix" type="lock"/>
      </ta-input>
      <ta-button @click="showModifyPasswordPane"
                 style="width: 30%;font-size: 12px;border:none;">密码修改
      </ta-button>

    </ta-form-item>
    <ta-form-item
      v-if="simpleCheckCodeState"
      fieldDecoratorId="checkCode"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入验证码!' }]}"
    >
      <ta-input style="width: 60%" placeholder="验证码" ref="checkCode">
        <ta-icon slot="prefix" type="appstore"/>
      </ta-input>
      <img style="width: 40%" @click="refreshCode();" :src="imgSrc" title="点击获取验证码"/>
    </ta-form-item>
    <ta-form-item>
      <ta-button type="primary" block @click="handleSubmit">立即登录</ta-button>
    </ta-form-item>
  </ta-form>
</template>

<script>
  import dealData from '../js/dealData'
  import {mapGetters} from 'vuex'
  export default {
    name: "loginForm",
    data() {
      return {
        imgSrc: dealData.refreshCodeSrc(),
        dealData
      }
    },
    computed: {
      ...mapGetters({
        simpleCheckCodeState: 'simpleCheckCodeState',
        passwordRSAState: 'passwordRSAState'
      })
    },
    mounted(){

    },
    methods: {
      //checkUser
      checkUser(e) {
        let value=e.target.value;
        if (value) {
          const p = new Promise((resolve, reject) => {
            this.Base.submit(null, {
              url: 'loginRestService/checkUser',
              showPageLoading:false,
              withCredentials: false,
              data: {
                username: value
              }
            }, {
              successCallback: (data) => {
                resolve(data);
              },
              failCallback: (data) => {
                reject(data);
              },
              serviceCallback: (type, data) => {

              }
            })
          });
          p.then((data) => {
              //校验成功处理次数
              this.$store.commit('setSysCfg', {
                sessionPasswordErrorNumber: data.data.sessionPasswordErrorNumber
              });
            }, (data) => {
              //校验失败报错
              message.error(data.errors[0].msg)
            }
          )
        } else {

        }
      },
      refreshCode() {
        this.imgSrc = this.dealData.refreshCodeSrc()
      },
      handleSubmit() {
        let formData = this.form.getFieldsValue()
        //系统信息
        formData=Object.assign(formData,this.dealData.systemInfo);
        //加密
        this.passwordRSAState && (formData.password = this.dealData.encryptPwd(formData.password))

        this.Base.submit(
          null, {
          url: '/login',
          data: formData,
        }, {
          successCallback: (data) => {
            window.location.href = 'index.html'
          },
          failCallback: (data) => {
            //修改次数
             data.data.passwordDefaultNum !== null &&
             this.$store.commit('setSysCfg', {
               sessionPasswordErrorNumber: data.data.passwordDefaultNum
             });
            this.refreshCode();
          }
        })
      },
      showModifyPasswordPane() {
        this.$emit("modifyPasswordPaneCtr")
      }
    },
    watch:{
      simpleCheckCodeState(now,old){
        this.refreshCode();
      }
    }
  }
</script>

<style scoped>

</style>
