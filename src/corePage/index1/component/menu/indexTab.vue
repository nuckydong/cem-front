<template>
  <div class="index-tabs" ref="index-tabs">
    <div class="worktable-tab" id="worktable" @click="setTabsted({id:'worktable'})"
         :class="{active:activeTab=='worktable'}" :style="{width:worktableWidth}">工作台
    </div>
    <div class="tab-item"
         ref="tab-item"
         v-for="menu in list1"
         @click="setTabsted(menu)"
         :class="{active:activeTab==menu.id}"
         :key="menu.id"
         :id="menu.id+'-tab'">
      {{menu.name}}
      <span>
        <ta-icon :type="activeTab==menu.id?'close-circle':'close'" @click.self.stop="closeTabFn(menu)"/>
      </span>
    </div>
    <div class="tab-more " :class="{active:ifShowMore}" ref="tab-more" flag="tab-more">
      <span @click.stop="ifShowMore=ifShowMore?false:true" flag="tab-more">
        <ta-icon :type="ifShowMore==true?'down-square-o':'up-square-o'"/>
      </span>
      <div v-if="ifShowMore" class="tab-more-list" flag="tab-more">
        <div @click.stop="setTabsted({id:'worktable'})" class="more-worktable" flag="tab-more">
          工作台
        </div>
        <div class="tab-item"
             v-for="menu in list2"
             :id="menu.id+'-tab'"
             :key="menu.id"
             @click.stop="setTabsted(menu)"
             flag="tab-more">
          {{menu.name}}
          <span flag="tab-more">
            <ta-icon v-if="activeTab===menu.id" type="activeTab==menu.id?'close-circle':close" @click.self.stop="closeTabFn(menu)"/>
          </span>
        </div>
        <div class="close-all" flag="tab-more" @click="closeAllTab()">关闭所有</div>
      </div>
    </div>

  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'index-tab',
  props: {
    worktableWidth: {
      type: String,
      default: '120px'
    }
  },
  data () {
    return {
      list1: [],
      list2: [],
      ifShowMore: false
    }
  },
  computed: {
    ...mapGetters({
      tabList: 'getTabMenuList',
      activeTab: 'getActiveTabMenu'
    })
  },
  mounted: function () {
    window.addEventListener('resize', () => {
      this.setTab()
    }, false)
  },
  methods: {
    // 设置tab长度
    setTab () {
      this.list1 = this.tabList
      this.list2 = []
      var conL = this.Tool.getWidth(this.$refs['index-tabs'])// 容器宽度
      var tabsL = parseInt(this.worktableWidth) + 80// 工作台+更多空白
      var items = this.tabList
      var L1 = []
      var L2 = []
      this.$nextTick(function () {
        if (this.activeTab !== 'worktable') {
          tabsL = tabsL + this.Tool.getWidth(document.getElementById(this.activeTab + '-tab'))
        }
        for (let i = 0; i < items.length; i++) {
          // 激活菜单直接加入
          if (items[i].id === this.activeTab) {
            L1.push(items[i])
            continue
          }
          tabsL += this.Tool.getWidth(document.getElementById(items[i].id + '-tab'))
          if (conL > tabsL) {
            L1.push(items[i])
          } else {
            L2.push(items[i])
          }
        }
        this.list1 = L1.concat([])
        this.list2 = L2.concat([])
      })
    },
    // 设置选中的事件
    setTabsted (menu) {
      // 更新 activeTab
      this.$store.dispatch('setActiveTabMenu', {value: menu.id})
      this.ifShowMore = false
    },
    // 设置关闭事件
    closeTabFn (menu) {
      // 找到index
      // 判断是否是activeTab;
      if (menu.id === this.activeTab) {
        const nowIndex = this.list1.findIndex(item => item.id == menu.id)
        let actTb = 'worktable'
        if (this.list1[nowIndex + 1]) {
          actTb = this.list1[nowIndex + 1].id
        }
        if (this.list1[nowIndex - 1]) {
          actTb = this.list1[nowIndex - 1].id
        }
        if (this.list2.length > 0) {
          actTb = this.list2[0].id
        }
        this.$store.dispatch('setActiveTabMenu', {value: actTb})
      }
      // 删除 对应的index
      this.$store.dispatch('deleteTabMenuList', {value: menu.id})
      this.ifShowMore = false
    },
    // 关闭所有Tab
    closeAllTab () {
      this.$store.dispatch('setActiveTabMenu', {value: 'worktable'})
      this.$store.dispatch('deleteTabMenuListAll')
      this.ifShowMore = false
    }
  },
  watch: {
    tabList (now, old) {
      this.setTab()
    },
    activeTab (now, old) {
      // 如果激活的有改变那么重绘
      this.setTab()
    }

  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .index-tabs {
    width: 100%;
    height: 100%;
    position: relative;
    min-width: 300px;
    background-color: #f8f8f8;
    @include noSelect();

    > .worktable-tab, > .tab-item {
      display: inline-block;
      box-sizing: border-box;
      padding: 0px 10px;
      height: $index-tabs-height;
      line-height: $index-tabs-height;
      background-color: #f8f8f8;
      font-size: 14px;
      border-right: solid 0.5px $border-color;
      border-bottom: solid 1px $border-color;
      text-align: center;
      float: left;
      max-width: 200px;
      @include text-overflow();

      > span {
        margin-left: 10px;
        font-size: 12px;
        color: $text-l3-color;
      }

      &.active {
        background: #fff;
        color: $main-color;

        > span {
          color: $color-error;
        }

        border-bottom: solid 1px #fff;
      }

      &:hover {
        cursor: pointer;

        > span {
          color: $color-error;
        }
      }

    }

  }

  .worktable-tab {

  }

  .tab-more {
    height: 100%;
    width: 20px;
    text-align: center;
    float: left;
    position: relative;

    > span {
      color: $text-l3-color;
      position: absolute;
      bottom: 0px;
      width: 15px;
      height: 19px;
      left: 0px;
      cursor: pointer;
    }

    &.active {
      > span {
        color: $main-color;
      }

    }

    .tab-more-list {
      position: absolute;
      width: 200px;
      z-index: 999;
      @include beautifyScrollbar();
      overflow: auto;
      padding: 5px 5px 10px 5px;
      max-height: 500px;
      overflow-y: auto;
      background-color: #fff;
      border: solid 0.5px $border-color;
      text-align: left;
      font-size: 14px;
      right: -100px;
      top: $index-tabs-height + 5px;
      @include box-shadow();

      > div {
        height: 32px;
        line-height: 32px;
        color: $text-l1-color;
        margin: 0 10px;
        padding: 0 10px;
        border-bottom: dashed 0.5px $border-color;
        cursor: pointer;
        @include text-overflow();
        text-align: left;

        > span {
          float: right;
          display: inline-block;
          height: 32px;
          line-height: 32px;
          padding: 0px 10px;
          color: $text-l3-color;
          font-size: 10px;
        }

        &:hover {
          background: #ffead3;

          > span > i {
            &:before {
              color: $color-error;
              content: "\E633";
            }
          }
        }

        &.more-worktable {
          height: 40px;
          color: $main-color;
          line-height: 40px;
          border-bottom: solid 0.5px $border-color;

          &:hover {
            background: #fff;
          }
        }

        &.close-all {
          text-align: center;
          color: #fff;
          background: $main-color;
          border-bottom: none;

          &:hover {
            background: $main-color;
          }

        }
      }
    }

  }

  .tab-item {

  }

</style>
