<template>
  <div class="user-menu">
    <div class="user-info">
      <div class="person-head">
        <img :src="imgSrc" :alt="userInfo.userName">
      </div>

      <div>
        <div class="user-name">{{userInfo.userName}}</div>
        <div class="user-position">{{userInfo.mainRoleName}}</div>
      </div>
    </div>
    <div class="tool-list">
      <div class="user-msg-ctr" :class="{active:activeTool=='msg'}" @click="getMsg()">
        <span>通知</span>
      </div>
      <div class="user-sign-ctr" :class="{active:activeTool=='sign'}"
           @click="activeTool=='sign'? activeTool=false:activeTool='sign'">
        <span>签到</span>
      </div>
      <div class="user-pwd-ctr" :class="{active:activeTool=='pwd'}"
           @click="activeTool=='pwd'?activeTool=false:activeTool='pwd'">
        <span>修改密码</span>
      </div>
    </div>

    <div class="user-panel" v-if="activeTool!=false">
      <div v-if="activeTool=='pwd'">
        <img src="../../img/user-pw-bg.png" style="width: 100%"/>
        <modify-password  @modifyPaneStatus="modifyPaneStatus"></modify-password>
      </div>
    </div>
    <div class="user-logout-ctr" @click="logout()">
      退出
    </div>
  </div>
</template>

<script>
  import modifyPassword from './modifyPassword'
  import {mapGetters} from 'vuex'

  export default {
    name: 'user-menu',
    components: {modifyPassword},
    data() {
      return {
        confirmDirty: false,
        activeTool: false
      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo'
      }),
      imgSrc() {
        return require('../../img/' + this.userInfo.userImg)
      }
    },

    methods: {
      // 修改弹出框的显示状态
      modifyPaneStatus(data) {
        // false为隐藏sign签到pwd密码修改msg通知
        this.activeTool = data
      },
      // 获取用户信息
      getMsg() {
        if (this.activeTool === 'msg') {
          this.activeTool = ''
          return
        } else {
          this.activeTool = 'msg'
        }
        this.Base.submit(null, {
          url: 'message/messageController!messageList.do'
        }, {
          successCallback: (data) => {
            console.log(data)
          }
        })
      },
      // 退出登录
      logout() {
        this.Base.submit(null, {
          url: '/logout.do'
        }, {
          successCallback: function (data) {
            if (data.serviceSuccess) {
              window.location.href = 'login.html'
            }
          }
        })
      }
    }

  }
</script>

<style scoped type="text/scss" lang="scss">
  .user-menu {
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    width: $user-width;
    @include box-shadow();
    z-index: 9999;
    background: #fff;
    /*overflow-y: auto;*/
    @include beautifyScrollbar();
  }

  .user-info {
    padding: 20px 0px 30px 20px;
    height: auto;

    &:after {
      content: "";
      display: block;
      clear: both;
    }

    > div {
      float: left;

      &:first-child {
        width: 60px;
        height: 60px;

        > img {
          width: 100%;
          height: 100%;
        }
      }

      &:last-child {
        > div {
          &:first-child {
            font-size: 18px;
            color: $main-ftcolor;
            padding-top: 10px;
            margin-left: 10px;
          }

          &:last-child {
            color: $color-success;
            margin: 5px 0px 0px 10px;
          }
        }
      }

    }

  }

  .tool-list {
    > div {
      height: 40px;
      line-height: 40px;
      color: $main-ftcolor;
      cursor: pointer;

      > span {
        display: block;
        margin: 0px 22px;
        border-bottom: 0.5px dotted $border-color;
      }

      &:hover {
        background: #eaf4fe;
      }

      &.active {
        background: #eaf4fe;
        border-right: 4px solid $main-color;
      }
    }
  }

  .user-logout-ctr {
    width: 180px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-left: 22px;
    margin-top: 28px;
    font-size: 14px;
    color: $color-warning;
    border: 1px #f59f3d solid;
    border-radius: 4px;

    &:hover {
      cursor: pointer;
      background-color: $color-warning;
      color: #ffffff;
    }
  }

  .user-panel {
    position: absolute;
    width: 300px;
    height: 100%;
    right: $user-width;
    top: 0px;
    overflow: auto;
    z-index: 9999;
    background: #fff;
    @include box-shadow();
    @include beautifyScrollbar();

  }

</style>
