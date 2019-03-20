<template>
  <div id="app">
    <ta-collapse :bordered="true">
      <ta-collapse-panel header="简单示例：异步数据、components属性">
        <ta-button @click="fnAsyncTableData">异步数据</ta-button>
        <ta-table :columns="columns" :dataSource="data"
                  :footer="fnFooter" :rowClassName="fnRowClassName"
                  :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                  bordered
                  defaultExpandAllRows
                  :title="fnCustomTitle"
                  :components="customComponents"
        >
          <template slot="title" slot-scope="currentPageData">
            表格头部
          </template>
          <template slot="footer" slot-scope="currentPageData">
            表格尾部
          </template>
        </ta-table>
        <part1></part1>
      </ta-collapse-panel>
      <ta-collapse-panel header="筛选和排序">
        <part2></part2>
      </ta-collapse-panel>
      <ta-collapse-panel header="自定义选择器">
        <part3></part3>
      </ta-collapse-panel>
      <ta-collapse-panel header="表头分组">
        <part4></part4>
      </ta-collapse-panel>
      <ta-collapse-panel header="通过customRow、customHeaderRow属性实现table的行点击等事件">
        <part5></part5>
      </ta-collapse-panel>
      <ta-collapse-panel header="通过customRow实现table的行拖拽功能">
        <part7></part7>
      </ta-collapse-panel>
    </ta-collapse>
  </div>
</template>
<script>
import Part1 from '../demoTable/part/part1'
import Part2 from '../demoTable/part/part2'
import Part3 from '../demoTable/part/part3'
import Part4 from '../demoTable/part/part4'
import Part5 from '../demoTable/part/part5'
import Part7 from '../demoTable/part/part7'

const columns1 = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name'
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
  width: '12%'
}, {
  title: 'Address',
  dataIndex: 'address',
  width: '30%',
  key: 'address'
}]

const data1 = [{
  key: 1,
  name: 'John Brown sr.',
  age: 60,
  address: 'New York No. 1 Lake Park',
  children: [{
    key: 11,
    name: 'John Brown',
    age: 42,
    address: 'New York No. 2 Lake Park'
  }, {
    key: 12,
    name: 'John Brown jr.',
    age: 30,
    address: 'New York No. 3 Lake Park',
    children: [{
      key: 121,
      name: 'Jimmy Brown',
      age: 16,
      address: 'New York No. 3 Lake Park'
    }]
  }, {
    key: 13,
    name: 'Jim Green sr.',
    age: 72,
    address: 'London No. 1 Lake Park',
    children: [{
      key: 131,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park',
      children: [{
        key: 1311,
        name: 'Jim Green jr.',
        age: 25,
        address: 'London No. 3 Lake Park'
      }, {
        key: 1312,
        name: 'Jimmy Green sr.',
        age: 18,
        address: 'London No. 4 Lake Park'
      }]
    }]
  }]
}, {
  key: 2,
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park'
}]

export default {
  name: 'app',
  data () {
    return {
      columns: columns1,
      data: [],
      selectedRowKeys: [],
      inputData: '',
      customComponents: {
        header: {
          cell: 'th'
        }
      }
    }
  },
  components: { Part1, Part2, Part3, Part4, Part5, Part7 },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    fnAsyncTableData () {
      this.data = data1
    },
    fnFooter () {
      return '通过回调添加的表格尾部'
    },
    fnRowClassName (record, index) {
      return 'table-row-class-' + index
    },
    fnCustomTitle (currentPageData) {
      console.log(currentPageData)
      return '通过回调添加的表格头部'
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  #app {
    padding: 20px
  }

</style>
