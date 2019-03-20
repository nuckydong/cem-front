<!--横向菜单,根据宽度多出来的菜单选项放入到更多之中-->
<template>
  <div class="menuHorizon" ref="menuHorizon"
       :style="{height:headerHeight,lineHeight:headerHeight}">
    <div
      v-for="menu in list1"
      :index="menu.id"
      class="menu-item"
      ref="menuItem"
      :key="menu.id"
      @click="selectItemFn(menu)"
      :class="{active:activeMenu==menu.id}"
    >
      <ta-icon :type="(menu.icon || 'setting')" flag="more"></ta-icon>
      {{menu.name}}
    </div>
    <div v-if="showMore"
         class="menu-more"
         ref="menuMore"
         :style="{width:menuMoreWidth}"
         @click.self="showMoreList=true"
         flag="more"
    >
      <ta-icon type="appstore"/>
      更多
      <div v-if="showMoreList" class="menu-more-list" flag="more">
        <div flag="more">
          <div class="menu-item more"
               v-for="menu in list2"
               :index="menu.id"
               :key="menu.id"
               :class="{active:activeMenu==menu.id}"
               @click.stop="selectItemFn(menu)" flag="more">
            <ta-icon :type="(menu.icon || 'setting')" flag="more"></ta-icon>
            {{menu.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {mapGetters} from 'vuex'

export default {

  name: 'menuHorizon',
  props: {
    menuMoreWidth: {
      type: String,
      default: '100px'
    }
  },
  data () {
    return {
      showMore: true,
      showMoreList: false,
      list1: [],
      list2: []
    }
  },
  computed: {
    ...mapGetters({
      menuList: 'getMenuListOne',
      activeMenu: 'getActiveMenuOne',
      headerHeight:'getHeaderHeight'
    })
  },
  mounted: function () {
    window.addEventListener('resize', () => {
      this.setList()
    }, false)
    document.body.addEventListener('mousedown', (e) => {
      var event = e || window.event
      var target = event.target || event.srcElement
      if (target.getAttribute('flag') !== 'more') {
        this.showMoreList = false
      }
    })
  },
  methods: {
    setList () {
      this.list1 = this.menuList.concat([])
      this.$nextTick(function () {
        var itemsL = parseInt(this.menuMoreWidth)
        var conL = this.Tool.getWidth(this.$refs.menuHorizon)
        var itemLen = this.$refs.menuItem.length
        var spIndex = itemLen
        for (let i = 0; i < this.$refs.menuItem.length; i++) {
          itemsL += this.Tool.getWidth(this.$refs.menuItem[i])
          if (conL <= itemsL) {
            spIndex = i
            break
          }
        }
        if (spIndex == itemLen) {
          this.showMore = false
          this.list1 = this.menuList.slice(0)
          this.list2 = []
        } else {
          this.showMore = true
          this.list1 = this.menuList.slice(0, spIndex)
          this.list2 = this.menuList.slice(spIndex)
        }
      })
    },
    selectItemFn (item) {
      this.$store.dispatch('addTabMenuList', {value: item})
      this.$store.dispatch('setActiveMenu', {level: 'one', value: item.id})
      this.showMoreList = false
    }
  },
  watch: {
    menuList (old, now) {
      this.setList()
    }
  }

}
</script>
<style lang="scss" scoped type="text/scss">
  .menuHorizon {
    white-space: nowrap;
    & > div {
      float: left;
      height: 100%;
      display: inline-block;
      box-sizing: border-box;
      padding: 0px 12px;
      text-align: center;
      cursor: pointer;
      color: #fff;
    }
    > .menu-item {
      @include noSelect();
      &:hover {
        @include gradient-vertical($sub-color, $main-color)
      }
      &.active {
        background: $sub-color;
      }
    }
  }

  .menu-more {
    position: relative;
    &:hover {
      @include gradient-vertical($sub-color, $main-color)
    }
    .menu-item {
      @include noSelect();
      color: $main-ftcolor;
      line-height: 40px;
      text-align: left;
      border-bottom: 1px solid #eff0f1;
      border-left: 2px solid transparent;
      box-sizing: border-box;
      padding-left: 15px;
      &:hover, &.active {
        border-left: 2px solid #419ff4;
        background-color: #eaf4fe;
      }

    }

  }

  .menu-more-list {
    position: absolute;
    width: 200px;
    box-sizing: border-box;
    padding: 5px 0px 5px 0px;
    @include box-shadow();
    background: #fff;
    z-index: 999;
    right: -1px;
    margin-top: 1px;
    overflow: auto;
    height: auto;
    > div {
      overflow: auto;
      height: 100%;
      max-height: 300px;
      @include beautifyScrollbar()
    }

  }

</style>
