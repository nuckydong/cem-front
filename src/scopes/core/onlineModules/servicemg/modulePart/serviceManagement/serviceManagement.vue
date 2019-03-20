<template>
  <div style="height: 100%">
    <ta-border-layout :layout="{left:'300px'}">
      <div slot="left" class="left-card">
        <ta-card :bordered="false" style="width: 100%" title="服务项" :bodyStyle="{'padding':0}">
          <ta-e-tree :load="loadNode" lazy :props="defaultProps" node-key="serviceNameId" :expand-on-click-node="false" ref="tree" :highlight-current="true">
            <span slot-scope="{ node, data }">
              <span @click="showTable(data.serviceNameId)">{{ data.serviceName }}</span>
              <span class="tree-operate">
                <a class="anticon anticon-plus-circle-o" @click="addTreeVisible = true; currIdPath = data.idPath; currData = data; addType = '0'"></a>
                <a class="anticon anticon-edit" @click="addTreeVisible = true; currIdPath = data.idPath; currData = data; addType = '1'"></a>
                <a class="anticon anticon-delete" @click="deleteVisible = true; deleteId = data.serviceNameId"></a>
              </span>
            </span>
          </ta-e-tree>
        </ta-card>
      </div>
      <div>
        <div class="search-box">
          <div>
            <ta-input-search v-model="param" placeholder="请输入名称/标识符查询" @search="searchType = 'search'; queryTable()" enterButton="搜索" style="width: 340px;"/>
          </div>
          <div style="text-align: left">
            <ta-tag-select title="可用标识" :data="[{'value':'1','label':'可用'},{'value':'0','label':'不可用'}]" @change="tagSearch" class="filter-name"></ta-tag-select>
            <ta-button @click="addVisible = true; editType = '1'" type="primary" class="add-btn">新增服务</ta-button>
          </div>
        </div>
        <ta-table :columns="columns" :pagination='false' rowKey="serviceId" :dataSource="dataSource">
          <template slot="effective" slot-scope="text">
            <ta-tag v-if="text == '0'" color="red" class="no-cursor">不可用</ta-tag>
            <ta-tag v-else color="green" class="no-cursor">可用</ta-tag>
          </template>
          <template slot="actions" slot-scope="text, record, index">
            <a @click="editForm(record)">编辑</a>
            <ta-divider type="vertical"/>
            <ta-popconfirm title='是否删除该服务?' @confirm="deleteForm(record.serviceId)" okText="是" cancelText="否">
              <a>删除</a>
            </ta-popconfirm>
          </template>
        </ta-table>
        <ta-pagination style="float: right; margin-top: 10px;" showSizeChanger showQuickJumper :dataSource.sync="dataSource" :defaultPageSize="10" :params="pageParams" :url="searchUrl" ref="gridPager" />
      </div>
    </ta-border-layout>
    <add-service :row-data="rowData" :serviceNameId="searchId" :visible="addVisible" :editType="editType" @close="addVisible = false;" @success="queryTable"></add-service>
    <add-tree :visible="addTreeVisible" :idPath="currIdPath" :row="currData" @close="addSuccess" :addType="addType"></add-tree>

    <delete-input :visible="deleteVisible" :deleteId="deleteId" @close="deleteTree"></delete-input>
  </div>
</template>
<script>
import $api from './api/index'
import addService from './part/addService'
import addTree from './part/addTree'
import deleteInput from './part/deleteInput'
const columns = [
  { title: '服务名称', dataIndex: 'serviceName', width: '20%', overflowTooltip: true },
  { title: '服务标识符', dataIndex: 'serviceType', width: '20%', overflowTooltip: true },
  { title: '服务地址', dataIndex: 'serviceUrl', width: '35%', overflowTooltip: true},
  { title: '可用标识', dataIndex: 'effective', width: 100, scopedSlots: {customRender: 'effective'} },
  { title: '操作', key: 'actions', align: 'center', width: 200, scopedSlots: {customRender: 'actions'} }
]
export default {
  name: 'app',
  data () {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'serviceName',
        isLeaf: 'isLeaf'
      },
      currNode: '5e3a06ed889b4b40ba88c5ee2ba192f3',
      dataSource: [],
      columns,
      param: '',
      searchId: '',
      addVisible: false,
      addTreeVisible: false,
      deleteVisible: false,
      deleteId: '',
      currIdPath: '',
      addType: '',
      currData: '',
      searchUrl: 'onlinedev/onlineServiceManagementRestService/queryOnlineServiceByCondition',
      editType: '',
      rowData: '',
      searchType: '',
      effective: ''
    }
  },
  components: { addService, addTree, deleteInput },
  mounted () {
    this.searchId = this.currNode
    this.queryTable()
  },
  methods: {
    addSuccess (type, newData) {
      this.addTreeVisible = false
      if (type == 'add') {
        this.$refs.tree.append(newData, this.currData)
      } else if (type == 'edit') {
        this.$set(this.currData, 'serviceName', newData.serviceName)
      }
    },
    loadNode (node, resolve) {
      if (node.level === 0) {
        $api.queryOnlineServiceName(this, {}, (data) => {
          return resolve(data.data.serviceNameList)
        })
      }
      if (node.level >= 1) {
        let parentId = node.data.serviceNameId
        $api.queryOnlineServiceName(this, {parentId: parentId}, data => {
          let result = data.data.serviceNameList
          if (result.length) {
            return resolve(result)
          } else {
            resolve([])
          }
        })
      }
    },
    /* 表格 */
    showTable (serviceNameId) {
      this.searchType = 'tree'
      this.searchId = serviceNameId
      this.queryTable()
    },
    tagSearch (data) {
      this.searchType = 'search'
      this.effective = data[0]
      this.queryTable()
    },
    pageParams () {
      let param = {}
      if (this.searchType == 'search') {
        param.serviceName = this.param
        param.serviceType = this.param
        param.effective = this.effective
      }
      param.serviceNameId = this.searchId
      return param
    },
    // 查询表格数据
    queryTable () {
      this.$refs.gridPager.loadData()
    },
    editForm (data) {
      this.addVisible = true
      this.editType = '2'
      this.rowData = data
    },
    deleteForm (id) {
      $api.deleteBatchOnlineService(this, {serviceIds: id}, (data) => {
        if (data.data.result == 1) {
          this.$message.success('删除服务成功')
          this.queryTable()
        }
      })
    },
    deleteTree (data) {
      this.deleteVisible = false
      if (data.type == 'delete') {
        this.$refs.tree.remove(data.deleteId)
      }
    }
  }
}
</script>
<style lang="scss" scoped type="text/scss">
  .left-card { border-right: 1px solid rgb(220,224,221); height: 100% }
  .search-box { text-align: center; height: 84px; }
  .filter-name { margin-top: 10px; line-height: 32px; }
  .add-btn { float: right; margin-top: 10px; }
  .tree-operate { margin-left: 20px; a { margin-right: 6px; } }
  .no-cursor { cursor: default; }
</style>
