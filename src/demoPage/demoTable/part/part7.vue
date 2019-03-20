<template>
    <div class="content">
        <ta-table :columns="columns" :dataSource="data"  :customRow="fnCustomRow"/>
    </div>
</template>
<script>
const columns = [{
  dataIndex: 'name',
  key: 'name',
  slots: { title: 'customTitle' },
  scopedSlots: { customRender: 'name' }
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age'
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address'
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' }
}, {
  title: 'Action',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]

const data = [{
  key: 'FA8SD9FU8AS',
  name: 'John Brown',
  age: 8,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer']
}, {
  key: 'ASDUIFJ9A8S',
  name: 'Jim Green',
  age: 7,
  address: 'London No. 1 Lake Park',
  tags: ['loser']
}, {
  key: 'F8FASD8FU8ASDJF5',
  name: 'Joe Black2',
  age: 6,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher']
}, {
  key: 'F8FASD8FU8ASDJF4',
  name: 'Joe Black2',
  age: 5,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher']
}, {
  key: 'F8FASD8FU8ASDJF3',
  name: 'Joe Black2',
  age: 4,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher']
}, {
  key: 'F8FASD8FU8ASDJF2',
  name: 'Joe Black2',
  age: 3,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher']
}, {
  key: 'F8FASD8FU8ASDJF1',
  name: 'Joe Black2',
  age: 2,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher']
}, {
  key: 'FASDF8AJS',
  name: 'Joe Black1',
  age: 1,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher']
}]

export default {
  data () {
    return {
      data,
      columns
    }
  },
  methods: {
    fnCustomRow () {
      return {
        props: {
          draggable: true
        },
        on: { // 事件:支持DOM的标准事件,使用箭头表达式写法
          click: (e) => {
            console.log('触发了表格行的click事件')
            console.log(record)
            this.rowData = 'Name:' + record.name + ';Age:' + record.age + ';Address:' + record.address + ';Index:' + index + ';'
          }
        }
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
    .content{
        height:400px;
    }
</style>
