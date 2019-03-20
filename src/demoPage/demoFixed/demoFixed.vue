<template>
  <div id="app">
    <h1>tabs添加fit功能</h1>
     <div style="height: 400px">
       <ta-tabs class="fit" >
         <ta-tab-pane tab="Tab 1" key="1"  >
           <ta-table size="small"  :columns="columns" :dataSource="data" >
           </ta-table>
         </ta-tab-pane>
         <ta-tab-pane tab="Tab 2" key="2" >Content of tab 2</ta-tab-pane>
         <ta-tab-pane tab="Tab 3" key="3" >Content of tab 3</ta-tab-pane>
         <ta-button slot="tabBarExtraContent">Extra Action</ta-button>
       </ta-tabs>
     </div>
  </div>
</template>
<script>
const columns = [{
  title: '姓名',
  dataIndex: 'name',
}, {
  title: '账号',
  dataIndex: 'account',
}, {
  title: '性别',
  dataIndex: 'sex',
},{
  title: '证件类型',
  dataIndex: 'IDType',
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `大帅比 ${i}`,
    account:123,
    sex:'男',
    IDType:'身份证',

  });
}
  export default {
    name: 'app',
     data () {
        return {
         data,
      columns,
      selectedRowKeys: [],
      loading: false,
    }
    },
    computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },

    mounted(){

    },
    methods: {
      start () {

    },
    onSelectChange (selectedRowKeys) {

    }
    }
  }
</script>

<style  scoped type="text/scss" lang="scss">

</style>
