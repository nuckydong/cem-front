<template>
  <div class="indexLayout">
    <header :style="{height:headerHeight}">
      <div class="logo" :style="[logoStyle,{lineHeight:headerHeight}]">
        <slot name="logo"></slot>
      </div>
      <div class="leftBarP" :style="{lineHeight:headerHeight}">
         <span class="leftBar" @click="leftMenuWidthHandle">
             <ta-icon :type="parseInt(leftWidth)>80?'menu-fold':'menu-unfold'"></ta-icon>
          </span>
      </div>
      <div class="horizonPane">
        <slot name="horizonMenu"></slot>
      </div>
      <div class="toolBar">
        <span class="pageSizeBar"
              :style="{height:headerHeight,lineHeight:headerHeight}"
              @click="fullScreen"
        >{{pageSizeCtr?'退出全屏':'全屏显示'}}
        </span>
        <span class="userPaneBar"
              :class="{active:ifUserPane?true:false}"
              :style="{height:headerHeight,lineHeight:headerHeight}"
              @click="ifUserPane=ifUserPane?false:true"
        ><ta-icon type="user"></ta-icon>{{$store.state.indexStore.userInfo.userName}}</span>
      </div>
    </header>

    <div v-if='ifUserPane' class="userPane" :style="{top:headerHeight,width:userPaneWidth}">
      <slot name="userInfo"></slot>
    </div>

    <div class="content" :style="{top:headerHeight,paddingLeft:leftWidth}">
      <div class="leftCon" :style="{width:leftWidth,paddingTop:tabHeight}">
        <div class="leftConHeader" :style="{height:tabHeight,lineHeight:tabHeight}">

          <span class="searchPaneBar"
                :class="{active:ifSearchPane}"
          >
            <input placeholder="搜索..." type="text" v-model="seValue"
                   v-if="parseInt(leftWidth)>80"
                   @keyup.enter="searchMenuListHandle($event)">
          </span>
          <ta-icon v-if="parseInt(leftWidth)>80" :type="ifSearchPane?`close`:`search`"
                   @click="searchPaneBarHandle"></ta-icon>
        </div>
        <div class="leftConContent">
          <slot name="leftMenu"></slot>
          <slot name="searchPane" v-if="ifSearchPane"></slot>
          <slot name="dropdownMenu" v-if='menuOneStyle=="dropdown" && ifDropdownMenu'></slot>
        </div>
      </div>

      <div class="dragBar" :style="{left:leftWidth+'px'}"></div>
      <div class="centerCon"
           :style="{paddingTop:tabHeight}"
      >
        <div class="tabsCon"
             :style="{height:tabHeight}"
        >
          <slot name="tabs"></slot>
        </div>
        <div class="iframesCon">

          <slot name="iframes"></slot>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'index-layout',
    data() {
      return {
        ifUserPane: false,
        pageSizeCtr: false,
        seValue: '',

      }
    },
    computed: {
      ...mapGetters({
        leftWidth: 'getLeftMenuWidth',
        headerHeight: 'getHeaderHeight',
        logoWidth: 'getLogoWidth',
        userPaneWidth: 'getUserPaneWidth',
        tabHeight: 'getTabHeight',
        activeMenuOne: 'getActiveMenuOneName',
        menuOneStyle: 'getMenuOneStyle',
        ifSearchPane: 'getIfSearchPane',
        ifDropdownMenu: 'getIfDropdownMenu',
        searchValue: 'getSearchValue'
      }),
      logoStyle() {
        let width = parseInt(this.leftWidth) > 80 ? this.logoWidth : `80px`
        return {
          width: width,
          minWidth: width
        }

      }
    },
    methods: {
      dropdownMenuBarHandle() {
        this.$store.dispatch('setIfDropdownMenu', {value: !this.ifDropdownMenu})
      },
      searchMenuListHandle(e) {
        let value = e.target.value.trim()
        if (this.searchValue !== value) {
          this.$store.dispatch('setSearchValue', {value: value})
        }
        this.$store.dispatch('setIfSearchPane', {value: true})
      },
      searchPaneBarHandle() {
        this.$store.dispatch('setIfSearchPane', {value: !this.ifSearchPane})
        this.$store.dispatch('setIfDropdownMenu', {value: false})
      },
      leftMenuWidthHandle() {
        let value = faceConfig.indexPageConfig.leftWidth || '180px';
        (parseInt(this.leftWidth) >= 180) && (value = '80px')
        this.$store.dispatch('setLeftMenuWidth', {value: value});
        if (value = '80px') {
          this.$store.dispatch('setIfSearchPane', {value: false})
        }
      },
      // 全屏显示控制
      fullScreen() {
        if (this.pageSizeCtr === true) {
          this.pageSizeCtr = false
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else {
            if (document.msExitFullscreen) {
              document.msExitFullscreen()
            } else {
              if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
              } else {
                if (document.webkitCancelFullScreen) {
                  document.webkitCancelFullScreen()
                }
              }
            }
          }
        } else {
          this.pageSizeCtr = true
          let d = document.documentElement
          if (d.requestFullscreen) {
            d.requestFullscreen()
          } else {
            if (d.msRequestFullscreen) {
              d.msRequestFullscreen()
            } else {
              if (d.mozRequestFullScreen) {
                d.mozRequestFullScreen()
              } else {
                if (d.webkitRequestFullScreen) {
                  d.webkitRequestFullScreen()
                }
              }
            }
          }
        }
      }
    }

  }
</script>

<style scoped type="text/scss" lang="scss">
  .indexLayout {
    height: 100%;
    position: relative;
  }

  header {
    width: 100%;
    background-color: #fff;
    white-space: nowrap;
    display: table;
    box-sizing: border-box;
    padding: 0px 20px 0px 0px;
    min-width: 600px;
    @include noSelect();

    > div {
      display: table-cell;
      vertical-align: top;

      &.leftBarP {
        width: 60px;
        height: 100%;
        text-align: center;
        cursor: pointer;

        &:hover {
          color: $main-color;
        }
      }
    }

  }

  .logo {
    text-align: center;
    background-color: $main-color;
    color: #fff;
    vertical-align: top;
    border-right: 1px solid #ccc;
  }

  .toolBar {
    width: 200px;

    > span {
      height: 100%;
      padding: 0px 20px;
      display: inline-block;
      font-size: 12px;
      cursor: pointer;
      @include text-overflow();
      @include noSelect();

      &.userPaneBar {
        > i {
          margin-right: 8px;
          font-size: 14px;
        }

        &.active {
          color: $main-color;
          background: rgba(24, 144, 255, 0.1);
        }
      }
    }

  }

  .userPane {
    position: absolute;
    right: 0px;
    bottom: 0px;
    z-index: 999;
    background-color: #fff;
    // @include box-shadow();
  }

  .dragBar {
    height: 100%;
    width: 8px;
    cursor: w-resize;
    position: absolute;
    @include opacity(0);
  }

  .content {
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 0px;
    right: 0px;
    padding: 0px;
    box-sizing: border-box;
    margin: 0px;
    overflow: auto;

    .leftCon {
      position: absolute;
      top: 0px;
      left: 0px;
      bottom: 0px;
      box-sizing: border-box;
      z-index: 1;
      border-right: 1px solid #e8e8e8;
      background-color: #001529;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: bottom left;
      //@include transition();
      @include noSelect();

      .leftConHeader {
        position: absolute;
        top: 0px;
        width: 100%;
        background-color: #001529;
        color: #fff;
        border-bottom: 1px solid #001529;
        overflow: hidden;

        > span {
          display: inline-block;
          height: 100%;
          line-height: inherit;
          cursor: pointer;
          width: calc(100% - 45px);

          &.searchPaneBar {
            overflow: hidden;

            > input {
              margin: 0px 10px 0px 15px;
              height: 26px;
              padding: 0px 10px;
              box-sizing: border-box;
              background-color: rgba(255, 255, 255, 0.13);
              border-radius: 2px;
              border: none;
              outline: none;
              color: rgba(255, 255, 255, 0.5);

              &::-webkit-input-placeholder {
                color: rgba(255, 255, 255, 0.29);
                font-size: 14px;
              }

              /*&:focus {*/
              /*background-color: #bbe1ff;*/
              /*border: solid 1px #0879d9;*/
              /*}*/
            }

            //@include transition();
          }
        }

        > i {
          position: absolute;
          right: 13px;
          opacity: 0.6;
          font-size: 18px;
          top: 10px;
          cursor: pointer;
        }

      }

      .leftConContent {
        width: 100%;
        height: 100%;
        position: relative;
      }
    }

    .centerCon {
      width: 100%;
      position: relative;
      height: 100%;
      box-sizing: border-box;

      > div {
        width: 100%;
      }

      .tabsCon {
        top: 0px;
        position: absolute;
      }

      .iframesCon {
        height: 100%;
        position: relative;
      }

    }

  }

</style>
