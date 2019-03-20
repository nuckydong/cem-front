<template>
  <div id="app">
    <h2 style="margin-top: 30px;">1.表格</h2>
    <tableExample></tableExample>
    <h2 style="margin-top: 30px;">2.码值</h2>
    <collectionExample></collectionExample>
    <h2 style="margin-top: 30px;">3.模态框（modal）</h2>
    <modalExample></modalExample>
    <h2 style="margin-top: 30px;">4.表单</h2>
    <formExample></formExample>
    <h2 style="margin-top: 30px;">5.树</h2>
    <treeExample></treeExample>
    <h2 style="margin-top: 30px;">6.弹出框框</h2>
    <!--<popoverExample></popoverExample>-->
    <h2 style="margin-top: 30px;">7.用户选择弹出框框</h2>
    <userSelectExample></userSelectExample>
    <h2 style="margin-top: 30px;">8.高级搜索</h2>
    <searchPanelExample></searchPanelExample>
  </div>
</template>
<script>
  import tableExample from './part/table.vue';
  import selectExample from './part/select.vue';
  import modalExample from './part/modal.vue';
  import formExample from './part/form.vue';
  import treeExample from './part/tree.vue';
  import popoverExample from './part/popover.vue'
  import userSelectExample from './part/userSelect.vue'
  import collectionExample from './part/collection.vue'
  import searchPanelExample from './part/searchPanel.vue'
  export default {
    name:"app",
    data(){
      return {

      }
    },
    components:{tableExample,selectExample,modalExample,formExample,treeExample,popoverExample,userSelectExample,collectionExample,searchPanelExample},
  }
</script>

<style scoped lang="scss"  type="text/scss">
  #app { padding: 20px }
</style>
