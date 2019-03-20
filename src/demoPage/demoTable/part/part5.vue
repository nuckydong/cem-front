<template>
  <div>
    <ta-table :columns="columns" :dataSource="data"
              bordered
              defaultExpandAllRows
              :customRow="fnCustomRow"
              :customHeaderRow="fnCustomHeaderRow"
    />
    <p>当前选中行的数据为:{{rowData}}</p>
    <ta-alert message="customRow和customHeaderRow两个属性均需要绑定一个函数，且这个函数需要返回一个json对象，在其中的on事件触发属性上实现对应的事件回调（如click、mouseover等DOM事件）。写法如示例1。" type="success" />
    <p class="title">示例1</p>
    <div class="code-box">
      fnCustomHeaderRow (record, index) {
      &nbsp;&nbsp;return {
      &nbsp;&nbsp;&nbsp;&nbsp;on: {
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;click: (e) => {
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log('触发了表格头的click事件')
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(record, index)
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
      &nbsp;&nbsp;&nbsp;&nbsp;}
      &nbsp;&nbsp;}
      }
    </div>
  </div>
</template>
<script>
const columns = [{
  title: 'Name',
  dataIndex: 'name'
}, {
  title: 'Age',
  dataIndex: 'age'
}, {
  title: 'Address',
  dataIndex: 'address'
}]

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park'
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park'
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park'
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park'
}]

export default {
  data () {
    return {
      data,
      columns,
      rowData: ''
    }
  },
  computed: {
  },
  methods: {
    fnCustomRow (record, index) {
      return {
        props: {},
        on: { // 事件:支持DOM的标准事件,使用箭头表达式写法
          click: (e) => {
            console.log('触发了表格行的click事件')
            console.log(record)
            this.rowData = 'Name:' + record.name + ';Age:' + record.age + ';Address:' + record.address + ';Index:' + index + ';'
          }
        }
      }
    },
    fnCustomHeaderRow (record, index) {
      return {
        props: {},
        on: { // 事件:支持DOM的标准事件,使用箭头表达式写法
          click: (e) => {
            console.log('触发了表格头的click事件')
            console.log(record, index)
          }
        }
      }
    }
  }
}
</script>
<style scoped>
</style>
