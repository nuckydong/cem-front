<template>

  <div id="app">
    <index-layout ref="indexLayout">
      <div slot="logo">
        <img src="./img/logo1.png" alt="logo">
        <img src="./img/logo2.png" v-if="parseInt($store.state.indexStore.leftWidth)>80" alt="logo">
      </div>
      <!--一级水平菜单-->
      <menu-horizon slot="horizonMenu" v-if="$store.state.indexStore.menuOneStyle=='horizon'"></menu-horizon>

      <menu-dropdown slot="dropdownMenu" v-if="$store.state.indexStore.menuOneStyle=='dropdown'"></menu-dropdown>

      <menu-vertical slot="leftMenu"></menu-vertical>
      <search-pane slot="searchPane"></search-pane>
      <index-tab slot="tabs" ref="indexTab"></index-tab>

      <iframe-list slot="iframes"></iframe-list>

      <user-menu slot="userInfo" ></user-menu>
    </index-layout>
  </div>

</template>

<script>
import indexLayout from './component/indexLayout'
import MenuHorizon from './component/menu/menuHorizon'
import menuDropdown from './component/menu/menuDropdown'
import MenuVertical from './component/menu/menuVertical'
import searchPane from './component/menu/searchPane'
import IndexTab from './component/menu/indexTab'
import IframeList from './component/menu/iframeList'
import UserMenu from './component/user/userMenu'
import indexTool from './js/indexTools'
export default {
  name: 'index',
  components: {
    UserMenu,
    IframeList,
    IndexTab,
    MenuVertical,
    MenuHorizon,
    indexLayout,
    menuDropdown,
    searchPane
  },
  created () {
    //获取用户信息
    this.$store.dispatch('setUserInfo');
    //获取menu
    this.Base.submit(null, {
      url: 'menu/menuAction/queryRootChildrenMenus'
    }, {
      successCallback: (data) => {
        let menuList = []
        try {
          menuList = data.data.menus.children
        } catch (error) {

        }
        this.$store.dispatch('loadMenuList', {menuList: menuList})
      }
    })
  },
  mounted () {
    // ie9 不存在history.pushState
    // TODO:引入html5.js保证一致体验
    if (history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
      })
    }
    window.indexTool=indexTool(this);
  }

}
</script>

<style scoped type="text/scss" lang="scss">
  #app {
    height: 100%
  }

</style>
