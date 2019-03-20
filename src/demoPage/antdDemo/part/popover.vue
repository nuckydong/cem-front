<template>
  <div>
    <ta-popover
      placement="top-start"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <ta-button slot="reference">hover 激活</ta-button>
    </ta-popover>

    <ta-popover
      placement="bottom"
      title="标题"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <ta-button slot="reference">click 激活</ta-button>
    </ta-popover>

    <ta-popover
      ref="popover"
      placement="right"
      title="标题"
      width="200"
      trigger="focus"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    </ta-popover>
    <ta-button v-popover:popover>focus 激活</ta-button>


    <ta-popover
      placement="right"
      width="400"
      trigger="click">
      <ta-table :columns="columns" :dataSource="data" bordered>
        <template slot="name" slot-scope="text">
          <a href="javascript:;">{{text}}</a>
        </template>
        <template slot="title" slot-scope="currentPageData">
          Header
        </template>
        <template slot="footer" slot-scope="currentPageData">
          Footer
        </template>
      </ta-table>
      <ta-button slot="reference">click 激活 弹出其他嵌套信息</ta-button>
    </ta-popover>
  </div>
</template>

<script>
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    scopedSlots: {customRender: 'name'},
  }, {
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money',
  }, {
    title: 'Address',
    dataIndex: 'address',
  }];

  const data = [{
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  }];

  export default {
    name: "popoverExample",
    data() {
      return {
        data,
        columns,
      }
    }
  }
</script>

<style scoped>

</style>
