<template>
  <div>
    <ta-table
      :columns="columns"
      :dataSource="data"
      bordered
      size="middle"
    />
    <p>通过提供column定义的JSON给某列增加一个children来实现表头的分组</p>
    <div class="code-box">
      {
      title: 'Other',
      children: [{
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 200,
      }]
      }
    </div>
  </div>
</template>
<script>
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 100,
  fixed: 'left',
}, {
  title: 'Other',
  children: [{
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 200,
  }, {
    title: 'Address',
    children: [{
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
      width: 200
    }, {
      title: 'Block',
      children: [{
        title: 'Building',
        dataIndex: 'building',
        key: 'building',
        width: 100
      }, {
        title: 'Door No.',
        dataIndex: 'number',
        key: 'number',
        width: 100
      }]
    }]
  }]
}, {
  title: 'Company',
  children: [{
    title: 'Company Address',
    dataIndex: 'companyAddress',
    key: 'companyAddress'
  }, {
    title: 'Company Name',
    dataIndex: 'companyName',
    key: 'companyName'
  }]
}, {
  title: 'Gender',
  dataIndex: 'gender',
  key: 'gender',
  width: 80,
  fixed: 'right'
}]

const data = []

export default {
  data () {
    return {
      data,
      columns
    }
  }
}
</script>
