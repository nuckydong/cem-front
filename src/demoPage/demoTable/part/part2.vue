<template>
  <div>
    <div class="box">
      <p class="title">受控过滤</p>
      <div class="table-operations">
        <ta-button @click="setAgeSort">对age列进行排序</ta-button>
        <ta-button @click="clearFilters">清除过滤条件</ta-button>
        <ta-button @click="clearAll">清除过滤条件及排序</ta-button>
      </div>
      <ta-table :columns="columns1" :dataSource="data" bordered @change="handleChange"/>
    </div>

    <div class="box">
      <p class="title">自定义筛选</p>
      <ta-table :dataSource="data2" :columns="columns2" bordered>
        <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
          <ta-input
            ref="searchInput"
            placeholder='Search name'
            :value="selectedKeys[0]"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(selectedKeys, confirm)"
          />
          <ta-button type='primary' @click="() => handleSearch(selectedKeys, confirm)">Search</ta-button>
          <ta-button @click="() => handleReset(clearFilters)">Reset</ta-button>
        </div>
        <ta-icon slot="filterIcon" slot-scope="filtered" type='smile-o' :style="{ color: filtered ? '#108ee9' : '#aaa' }" />
        <template slot="customRender" slot-scope="text">
      <span v-if="searchText">
        <template v-for="(fragment, i) in text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
          <span v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{fragment}}</span>
          <template v-else>{{fragment}}</template>
        </template>
      </span>
          <template v-else>{{text}}</template>
        </template>
      </ta-table>
    </div>
  </div>
</template>
<script>
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  filters: [{
    text: 'Joe',
    value: 'Joe'
  }, {
    text: 'Jim',
    value: 'Jim'
  }, {
    text: 'Submenu',
    value: 'Submenu',
    children: [{
      text: 'Green',
      value: 'Green'
    }, {
      text: 'Black',
      value: 'Black'
    }]
  }],
  // 指定过滤结果的条件
  // 这里是过滤以`value`开始的结果
  onFilter: (value, record) => record.name.indexOf(value) === 0,
  sorter: (a, b) => a.name.length - b.name.length
}, {
  title: 'Age',
  dataIndex: 'age',
  sorter: (a, b) => a.age - b.age
}, {
  title: 'Address',
  dataIndex: 'address',
  filters: [{
    text: 'London',
    value: 'London'
  }, {
    text: 'New York',
    value: 'New York'
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.address.indexOf(value) === 0,
  sorter: (a, b) => a.address.length - b.address.length
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
const data2 = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park'
}, {
  key: '2',
  name: 'Joe Black',
  age: 42,
  address: 'London No. 1 Lake Park'
}, {
  key: '3',
  name: 'Jim Green',
  age: 32,
  address: 'Sidney No. 1 Lake Park'
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park'
}]
function onChange (pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter)
}

export default {
  data () {
    return {
      data,
      data2,
      columns,
      filteredInfo: null,
      sortedInfo: null,
      searchText: '',
      columns2: [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender'
        },
        onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.$refs.searchInput.focus()
            })
          }
        }
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        filters: [{
          text: 'London',
          value: 'London'
        }, {
          text: 'New York',
          value: 'New York'
        }],
        onFilter: (value, record) => record.address.indexOf(value) === 0
      }]
    }
  },
  computed: {
    columns1 () {
      let { sortedInfo, filteredInfo } = this
      sortedInfo = sortedInfo || {}
      filteredInfo = filteredInfo || {}
      const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filters: [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' }
        ],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        filters: [
          { text: 'London', value: 'London' },
          { text: 'New York', value: 'New York' }
        ],
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order
      }]
      return columns
    }
  },
  methods: {
    onChange,
    handleChange (pagination, filters, sorter) {
      console.log('Various parameters', pagination, filters, sorter)
      this.filteredInfo = filters
      this.sortedInfo = sorter
    },
    clearFilters () {
      this.filteredInfo = null
    },
    clearAll () {
      this.filteredInfo = null
      this.sortedInfo = null
    },
    setAgeSort () {
      this.sortedInfo = {
        order: 'descend',
        columnKey: 'age'
      }
    },
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    }
  }
}
</script>
<style scoped>
  .table-operations {
    margin-bottom: 16px;
  }

  .table-operations > button {
    margin-right: 8px;
  }
  .custom-filter-dropdown {
    padding: 8px;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
  }

  .custom-filter-dropdown input {
    width: 130px;
    margin-right: 8px;
  }

  .custom-filter-dropdown button {
    margin-right: 8px;
  }

  .highlight {
    color: #f50;
  }
</style>
