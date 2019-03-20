<template>
  <div id="app" style="height: 100%">
    <ta-border-layout :centerCfg="{showBar: true,toolBarStyle:{height:'50px'},layoutConStyle:{padding:0,border: 0}}">
      <div slot="centerExtraContent" style="height: 45px">
        <ta-tabs @tabClick="onRadioClick" :activeKey="tabsKey"  >
          <ta-tab-pane tab="工作台模块设置" key="1"></ta-tab-pane>
          <ta-tab-pane tab="角色工作台模板设置" key="2"></ta-tab-pane>
        </ta-tabs>
      </div>
        <router-view></router-view>
    </ta-border-layout>
  </div>
</template>
<script>

  export default {
    name: 'app',
    data() {
      return {
        tabsKey: '1',//当前选中标签
      }
    },
    mounted() {
      this.$router.push({name: 'resourceTemplate'});
    },
    methods: {
      onRadioClick(key) {
        this.tabsKey = key;
        if (key == 1) {
          this.$router.push({name: 'resourceTemplate'})
        } else if (key == 2) {
          this.$router.push({name: 'roleTemplate'})
        }
      },
    },
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .ant-tabs-tabpane-active{
    padding-top: 10px;
  }
  .search-box { width: 340px; line-height:46px; margin-right: 10px; }
  .no-cursor {cursor: default;}
  .filter-name { margin-left: 20px }
  .filter-box { display: inline-block }
</style>
