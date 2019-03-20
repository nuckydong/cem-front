<template>
  <div class="menu-vertical">
    <ta-menu
      :mode="menuType"
      :style="{width:'100%'}"
      theme="dark"
      :inlineIndent="10"
      :selectedKeys="[activeMenu]"
      @click="selectedItem"
    >
      <template v-for="item in menuList">
        <ta-menu-item v-if="!item.children" :key="item.id" :data-item="item">
          <ta-icon :type="item.icon || 'setting'"/>
          <span>{{item.name}}</span>
        </ta-menu-item>
        <sub-menu v-else :menuInfo="item" :key="item.id" @selectedItem="selectedItem"/>
      </template>

    </ta-menu>
  </div>
</template>
<script type="text/jsx">
  import SubMenu from './SubMenu'
  import {mapGetters} from 'vuex'

  export default {
    components: {SubMenu},
    name: 'menu-vertical',
    data() {
      let type = this.$store.state.indexStore.menuTwoStyle == 'sliding' ? 'vertical' : 'inline'
      return {menuType: type}
    },
    computed: {
      ...mapGetters({
        menuList: 'getMenuListTwo',
        activeMenu: 'getActiveMenuTwo'
      })
    },

    methods: {
      selectedItem(e) {
        let item = e.item.$attrs['data-item']
        this.$store.dispatch('addTabMenuList', {value: item})
        this.$store.dispatch('setActiveMenu', {level: 'two', value: e.key})
      }
    }

  }

</script>
<style type="text/scss" lang="scss">

  .menu-vertical {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    @include beautifyScrollbar();

  }

  .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {
    border-right: none;
  }

  .menu-vertical {

    .ant-menu-submenu-arrow {
      &:hover {
        color: #fff;
      }

      &:before, &:after {
        &:hover {
          background: #fff;
        }
      }
    }

    .ant-menu-dark {
      background: transparent;
      color:#fff;
      .ant-menu-sub {

        background: transparent;
      }

      .menu-submenu-open {
        background-color: #0076e2;
      }

      .ant-menu-submenu-open {
        background-color: #0076e2;
      }

      .ant-menu-submenu-selected {
        background-color: #0076e2;
      }

      .ant-menu-item.ant-menu-item-active {
        background-color: #258EED;
      }

      .ant-menu-item.ant-menu-item-selected {
        background-color: #258EED;
      }

      .ant-menu-submenu-title {
        &:hover {
          background-color: #258EED;

          .ant-menu-submenu-arrow:before {
            background: #fff !important;
          }

          .ant-menu-submenu-arrow:after {
            background: #fff !important;
          }

        }
      }
    }

    .ant-menu-inline .ant-menu-item, .ant-menu-inline .ant-menu-submenu-title, .ant-menu-vertical-left .ant-menu-item, .ant-menu-vertical-left .ant-menu-submenu-title, .ant-menu-vertical-right .ant-menu-item, .ant-menu-vertical-right .ant-menu-submenu-title, .ant-menu-vertical .ant-menu-item, .ant-menu-vertical .ant-menu-submenu-title {
      margin-top: 0px;
      margin-bottom: 0px;
    }

  }

  .ant-menu-dark.ant-menu-submenu-popup ul{
    background-color: #fff;
    color: $main-ftcolor;
    li{
      color: $main-ftcolor;
      &:hover{
        color: $main-color;
      }
      &.ant-menu-item-selected{
        color:#fff;
       background-color: $main-color;
        &:hover{
          color:#fff;
          opacity: .9;
        }
      }
    }
  }


</style>
