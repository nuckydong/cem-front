<template>
  <ta-border-layout
    :layout="{header:`70px`}"
  >
    <ta-row slot="header" type="flex" justify="center" align="middle">
      <ta-input-search v-model="param" placeholder="搜搜" class="search-box" enterButton="搜索"/>
    </ta-row>

  <!--通过customRow属性实现行点击事件-->
  <ta-table :columns="columns"
            :dataSource="data"
            :pagination="false"
            :customRow="fnCustomRow"
            :customHeaderRow="fnCustomHeaderRow"/>
  </ta-border-layout>
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
    name: 'modulePart2',
    data() {
      return {
        options: [],
        param: ``,
        data,
        columns,
        rowData: ``
      }

    },
    methods: {
      fnCustomRow(record, index) {
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
      fnCustomHeaderRow(record, index) {
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

<style scoped type="text/scss">
  .search-box {
    width: 340px;
    line-height: 46px;
    margin-right: 10px;
  }
</style>
