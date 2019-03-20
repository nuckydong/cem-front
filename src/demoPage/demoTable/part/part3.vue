<template>
  <ta-table :rowSelection="rowSelection" bordered
            :columns="columns"
            :dataSource="data"
            :customRow="fnCustomRow"
  >
    <template slot="name" slot-scope="text, record">
      <div v-if="text===`Edward King 2`" style="background: red">{{text}}</div>
      <div v-if="text!==`Edward King 2`">{{text}}</div>
    </template>
  </ta-table>
</template>
<script>
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    customCell: record=>{
      console.log(record)
      return record},
    scopedSlots: {customRender: 'name'}
  }, {
    title: 'Age',
    dataIndex: 'age'
  }, {
    title: 'Address',
    dataIndex: 'address'
  }]

  const data = []
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`
    })
  }

  export default {
    data() {
      return {
        data,
        columns,
        selectedRowKeys: [] // Check here to configure the default column
      }
    },
    computed: {
      rowSelection() {
        const {selectedRowKeys} = this
        return {
          selectedRowKeys,
          onChange: this.onSelectChange,
          hideDefaultSelections: true,
          selections: [{
            key: 'all-data',
            text: 'Select All Data',
            onSelect: () => {
              this.selectedRowKeys = [...Array(46).keys()] // 0...45
            }
          }, {
            key: 'odd',
            text: 'Select Odd Row',
            onSelect: (changableRowKeys) => {
              let newSelectedRowKeys = []
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return false
                }
                return true
              })
              this.selectedRowKeys = newSelectedRowKeys
            }
          }, {
            key: 'even',
            text: 'Select Even Row',
            onSelect: (changableRowKeys) => {
              let newSelectedRowKeys = []
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return true
                }
                return false
              })
              this.selectedRowKeys = newSelectedRowKeys
            }
          }],
          onSelection: this.onSelection
        }
      }
    },
    methods: {
      //on/style/class/attrs/都支持
      fnCustomRow (record, index) {
        console.log(record,index)
        return {
          props: {

          },
          style:{
            color:'red'
          },
          on: { // 事件:支持DOM的标准事件,使用箭头表达式写法
            click: (e) => {
              console.log('触发了表格行的click事件')
              console.log(record)
              this.rowData = 'Name:' + record.name + ';Age:' + record.age + ';Address:' + record.address + ';Index:' + index + ';'
            }
          }
        }
      },
      onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.selectedRowKeys = selectedRowKeys
      }
    }
  }
</script>
