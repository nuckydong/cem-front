<template>
  <div class="menu-vertical">
    <ta-menu
      mode="inline"
      :inlineCollapsed="vMenuType"
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
    data(){
      return{

      }
    },
    computed: {
      ...mapGetters({
        menuList: 'getMenuListTwo',
        activeMenu: 'getActiveMenuTwo',
        leftWidth: 'getLeftMenuWidth',
      }),
      vMenuType() {
        let type=parseInt(this.leftWidth) <= 80 ? true : false;
        return type
      }
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
   $bgcolor:#001529;
  .menu-vertical {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    @include beautifyScrollbar(lighten($bgcolor,10%),#001529,lighten($bgcolor,40%));
  }


</style>
