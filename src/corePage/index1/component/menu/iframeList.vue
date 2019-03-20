<template>
  <div class="iframeList">
    <iframe :style="{display:activeTab.module=='worktable'?'block':'none'}"
            src="worktable.html"
            frameborder="none"
            scrolling="auto">
    </iframe>
    <iframe :style="{display:activeTab.module==menu.module?'block':'none'}"
    :key="menu.id"
    v-for="menu in iframeList"
    :src="srcGetters(menu)"
    frameborder="none"
    scrolling="auto">
    </iframe>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'iframe-list',
  data () {
    return {
      src: ''

    }
  },
  computed: {
    ...mapGetters({
      tabList: 'getTabMenuList',
      iframeList: 'getIframeList',
      activeTab: 'getActiveIframe'
    }),
    srcGetters(menu){
      return (menu)=>{
        let src=''
        if( menu.module==this.activeTab.module){
          src= menu.module+('#/')+this.activeTab.part
        }else {
          src=menu.module+('#/'+menu.part)
        }
        return src
      }
    }
  }

}
</script>

<style scoped type="text/scss" lang="scss">
  .iframeList {
    width: 100%;
    height: 100%;

    iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>
