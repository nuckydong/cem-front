<template>
  <div class="indexLayout">
    <div v-if="indexState.leftState" class="left" :style="[leftStyle]"></div>
    <div class="header"></div>
    <div class="center">
      <ta-button @click="test">点我</ta-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'index-layout',
    data() {
      return {}
    },
    computed: {
      ...mapGetters({
        indexState: 'indexState',
      }),
      leftStyle() {
        let width = this.indexState.leftState == `expand` ? this.indexState.leftWidth :
          this.indexState.leftState == `collapsed` ? this.indexState.leftCloseWidth : `0px`;
        return {
          left: `0px`,
          bottom: `0px`,
          width: width,
          top: this.indexState.layout == `left` ? `0px` : this.indexState.headerHeight
        }
      },
      headerStyle(){

      }
    },
    methods:{
      test(){

      }
    }


  }
</script>

<style scoped type="text/scss" lang="scss">
  .indexLayout {
    height: 100%;
    position: relative;

    > div {
      position: absolute;
      box-sizing: border-box;
      border: 1px solid red;
    }
  }
  .left {

  }


</style>
