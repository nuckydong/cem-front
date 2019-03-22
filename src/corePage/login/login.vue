<template>
  <div class="body">
    <header>
      <div class="logo">
        <img v-if="true" src="./img/logo.png" alt="log">
      </div>
    </header>

    <img v-if="true" src="./img/taimg.png" style="height:60%;margin-left: 10%"/>
    <article>
      <div class="login-con">
        <div class="header">
          用户登录
          <span>USER LOGINING</span>
        </div>
        <login-form @modifyPasswordPaneCtr="modifyPasswordPaneCtr"></login-form>
      </div>


      <ta-modal
        title="修改密码"
        :visible="showModifyPasswordPane"
        :footer="null"
        @cancel="modifyPasswordPaneCtr"
        width="390px"
        :bodyStyle="{paddingBottom:'10px'}"
      >
        <modify-password :show.sync="showModifyPasswordPane" passState="1"></modify-password>
      </ta-modal>

    </article>
    <footer>
      <span>Copyright © www.yinhai.com, All Rights Reserved.</span>
      
      <span>版权所有：四川久远银海软件股份有限公司</span>
    </footer>
  </div>
</template>

<script>

import loginForm from './part/loginForm'
import modifyPassword from './part/modifyPassword'

export default {
  name: 'login',
  components: {modifyPassword,loginForm},
  data () {
    return {
      showModifyPasswordPane: false
    }
  },
  created () {
    this.$store.dispatch("getSysCfg")
  },
  methods:{
    modifyPasswordPaneCtr(){
      this.showModifyPasswordPane=! this.showModifyPasswordPane;
    }

  }




}
</script>

<style scoped type="text/scss" lang="scss">

  .body {
    background: #1151CC;
    height: 100%;

  }

  header {
    padding: 50px 50px;
  }

  footer {
    width: 100%;
    position: fixed;
    bottom: 0px;
    text-align: center;

    span {
      width: 576px;
      height: 13px;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 90px;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }

  .login-con {
    background: #fff;
    border-radius: 2px;
    padding: 50px;
    width: 400px;
    box-sizing: border-box;
    position: absolute;
    right: 15%;
    top: 25%;

    .header {
      height: 60px;
      font-size: 24px;
      color: $main-ftcolor;

      > span {
        margin-left: 10px;
        font-size: 16px;
        color: $text-l2-color
      }

    }

  }

</style>
