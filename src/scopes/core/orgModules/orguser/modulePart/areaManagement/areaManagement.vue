<template>
  <div id="app" style="height: 100%">
    <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
      <!--begin 行政搜索-->
      <ta-row slot="header" type="flex" justify="center" align="middle">
        <ta-input-search v-model="searchStr" placeholder="请输入区划名称\代码" class="search-box" @search="queryAreaByCondition"
                         enterButton="搜索"/>
      </ta-row>
      <!--end 行政搜索-->

      <div slot="centerExtraContent">
        <ta-cascader
          url="org/orguser/areaManagementRestService/queryAreaByAsync"
          treeId="areaList"
          :options.sync="areaOptions"
          expandTrigger="hover"
          changeOnSelect
          :fieldNames="{ label: 'areaName',value: 'areaId',children: 'children'}"
          @change="onChange"
          placeholder="请选择行政区域"
          style="width:250px; margin-right: 10px;"/>

        <ta-tag-select title="有效性" :data="[{value: '1', label: '有效'},{value: '0', label: '无效'}]" v-model="selectFilter"
                       @change="filterClick" class="filter-name"></ta-tag-select>
        <div style="float: right">
          <ta-button type="primary" @click="showAddDrawer('0')">新增顶级行政区划</ta-button>
          <!--begin 批量操作按钮-->
          <ta-dropdown>
            <ta-menu slot="overlay">
              <ta-menu-item @click="fnBatchPickArea">
                <ta-icon type="user-add"></ta-icon>
                <span class="mg-l12">启用</span>
              </ta-menu-item>
              <ta-menu-item @click="fnBatchBanArea">
                <ta-icon type="user-delete"/>
                <span class="mg-l12">禁用</span>
              </ta-menu-item>
              <ta-menu-item @click="fnBatchDeleteArea">
                <ta-icon type="delete"/>
                删除
              </ta-menu-item>
            </ta-menu>
            <ta-button>批量操作
              <ta-icon type="down"/>
            </ta-button>
          </ta-dropdown>
        </div>
      </div>

      <div>
        <ta-table :columns="columns" :dataSource="areaList"  :pagination="false"
                  :rowSelection="{selectedRowKeys: selectedRowKeys, onSelect: fnOnSelect, onSelectAll : fnOnSelectAll, getCheckboxProps:(record)=>({ props: { disabled: record.isAuthority == '0' } })}"
                  :rowKey="record => record.areaId"
                  :expandedRowKeys="currentExpand"
                  @expand="loadChild"
                  :locale="{filterConfirm: '确定',filterReset: '重置',emptyText: '暂无数据'}">

          <!--begin 对行政区划名称进行处理-->

          <template slot="areaName" slot-scope="text,record">
            <a class="operate" :class="{'disable-color': record.effective == '0' }" @click="showDrawer(record,true); ">{{text}}</a>
          </template>
          <!--end 对行政区划名称进行处理-->

          <!--begin 对有效性进行处理-->
          <template slot="effective" slot-scope="text,record">
                <span v-if="record.effective === '1'" style="color: green">
                  <ta-tag color="green">有效</ta-tag>
                </span>
            <span v-else class="invalidStyle">
                  <ta-tag color="red">无效</ta-tag>
                </span>
          </template>
          <!--end 对有效性进行处理-->

          <!--begin 对行政级别进行处理-->
          <template slot="areaLevel" slot-scope="text,record">
            <span v-for="item in CollectionData('AREALEVEL')" :key="item.value" v-if="item.value == record.areaLevel">{{item.label}}</span>
          </template>
          <!--end 对行政级别进行处理-->

          <!--begin 用户操作项处理-->
          <template slot="operation" slot-scope="text,record" class="table-operation">
            <ta-divider type="vertical"/>
            <a @click="showAddDrawer(record)" :class="{'disable-color': record.effective == 0 }">新增下级</a>
            <ta-divider type="vertical"/>
            <a @click="showDrawer(record,false)">编辑</a>
          </template>
          <!--end 用户操作项处理-->

        </ta-table>
      </div>
    </ta-border-layout>
    <ta-drawer :destroyOnClose="true" :title="editOrShowTitle" placement="right"
               :closable="true" @close="showVisible = false" :visible="showVisible" width="500" footerHeight>
      <showArea :showArea="editAreaParam" ref="showArea"></showArea>
    </ta-drawer>
    <ta-drawer :destroyOnClose="true" :title="editOrShowTitle" placement="right"
               :closable="true" @close="onClose" :visible="editVisible" width="500" footerHeight>
      <div slot="footer" :style="{
                              position: 'absolute',
                              bottom: 0,
                              width: '100%',
                              borderTop: '1px solid #e8e8e8',
                              padding: '10px 16px',
                              textAlign: 'right',
                              left: 0,
                              background: '#fff',
                              borderRadius: '0 0 4px 4px',
                            }">
        <ta-button-group>
          <ta-button @click="onResetForm">重置</ta-button>
          <ta-button type="primary" @click="onSubmitForm">保存</ta-button>
        </ta-button-group>
      </div>
      <edit-area-info :area="editAreaParam" :flag="flag" @editSuccess="editSuccess"
                      ref="editAreaDrawer"></edit-area-info>
    </ta-drawer>

    <ta-drawer :destroyOnClose="true" :title="addOrChildTitle" placement="right"
               :closable="true" @close="onClose" :visible="addVisible" width="500">
      <div slot="footer" :style="{
                              position: 'absolute',
                              bottom: 0,
                              width: '100%',
                              padding: '10px 16px',
                              textAlign: 'right',
                              left: 0,
                              background: '#fff',
                              borderRadius: '0 0 4px 4px',
                            }">
        <ta-button-group>
          <ta-button @click="onAddAreaResetForm">重置</ta-button>
          <ta-button type="primary" @click="addAreaSubmit">保存</ta-button>
        </ta-button-group>
      </div>

      <addArea :area="areaItem" @addSuccess="addSuccess" ref="addAreaDrawer"></addArea>
    </ta-drawer>

  </div>
</template>

<script>

  import $api from './api/index'
  // 新增组件
  import editAreaInfo from './part/editArea.vue'
  import addArea from './part/addArea.vue'
  import showArea from './part/showArea'

  import treeDataUtil from '@common/js/util/treeDataUtil'

  const columns = [
    {title: '区划名称', key: 'areaName', dataIndex: 'areaName', scopedSlots: {customRender: 'areaName'}},
    {title: '区划代码', key: 'areaCode', dataIndex: 'areaCode'},
    {
      title: '区划层级',
      key: 'areaLevel',
      dataIndex: 'areaLevel',
      scopedSlots: {customRender: 'areaLevel'}
    },
    {title: '状态', key: 'effective', dataIndex: 'effective', scopedSlots: {customRender: 'effective'}},
    {title: '最后修改时间', key: 'modifyTime', dataIndex: 'modifyTime'},
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      width: 240,
      scopedSlots: {customRender: 'operation'}
    }
  ]
  const filterList = [
    {key: 0, type: 'effective', value: '1', label: '有效'},
    {key: 1, type: 'effective', value: '0', label: '无效'},
  ]
  export default {
    name: 'app',
    data() {
      return {
        defaultExpandedRowKeys: ['fd811ab9c30440088df3e29ea784460a'],
        currentExpand: [],
        searchStr: '',
        effective: '',
        columns: columns,
        areaList: [],
        // 抽屉
        editVisible: false,//编辑
        showVisible: false,//展示
        addVisible: false,//增加
        editAreaParam: {},
        flag: true, //抽屉是否可编辑标志
        areaItem: '0',
        parentId: [], // 级联的选择
        areaFieldNames: {
          label: 'areaName',
          value: 'areaId',
          children: 'children'
        },
        areaOptions: [], // 下拉选择数据
        selectedRows: [], // 选择的记录
        selectedRowKeys: [],
        editOrShowTitle: '编辑行政区划',
        addOrChildTitle: '新增下级行政区划',
        filterList,//过滤时用
        selectFilter: [],//过滤

      }
    },
    mounted() {
      this.fnLoadAllArea()
    },
    activated() {
    },
    computed: {},
    components: {editAreaInfo, addArea, showArea},
    methods: {
      onResetForm() {
        this.$refs.editAreaDrawer.onResetForm()
      },
      onSubmitForm() {
        this.$refs.editAreaDrawer.onSubmitForm()
      },
      onAddAreaResetForm() {
        this.$refs.addAreaDrawer.onResetForm()
      },
      addAreaSubmit() {

        this.$refs.addAreaDrawer.handleSubmit()
      },
      addSuccess(pRecords, newData) {
        //新增顶级行政区划
        if (pRecords === '0') {
          this.areaList.push(newData)
        } else {
          treeDataUtil.addTreeData(this.areaList, {...pRecords}, 'areaId', {...newData}, this)
        }
        this.onClose();
      },
      editSuccess(newData) {
        this.changeRowData(this.areaList, 'areaId', newData)
        this.onClose()
      },
      changeRowData(data, key, newData) {
        for (let i = 0; i < data.length; i++) {
          if (data[i][key] == newData[key]) {
            data[i] = Object.assign({}, data[i], newData)
            break;
          }
          if (data[i].children) {
            this.changeRowData(data[i].children, 'areaId', newData)
          }
        }
      },
      filterClick(data) {
        this.effective = data[0]
        this.queryAreaByCondition();
      },
      // 点击行展开时  加载下级功能菜单
      loadChild(expanded, record) {
        if (expanded == false) {
          let index = this.currentExpand.indexOf(record.areaId)
          this.currentExpand.splice(index, 1)
          return
        }

        let submitParameter = {
          url: 'org/orguser/areaManagementRestService/queryAllArea',
          data: {areaId: record.areaId, effective: this.effective}
        }
        let self = this
        let callBack = {
          successCallback: (data) => {
            if (!data.data.areaList[0].children) {
              self.$message.warning('当前行政区划不存在下级!', 2)
              return
            }
            record.children = data.data.areaList[0].children
            self.currentExpand.push(record.areaId)
          }
        }
        self.Base.submit(null, submitParameter, callBack)

      },
      // 加载所有的行政区划
      fnLoadAllArea() {
        let self = this
        $api.queryAllArea(self, null, (data) => {
          self.areaList = data.data.areaList
        })
      },
      onChange(value) {
        if (!value) {
          return
        }
        this.parentId = value
        this.queryAreaByCondition();
      },
      queryAreaByCondition() {
        let self = this
        // 判断搜索字符串
        let selectStr = self.searchStr
        // 级联选择的数据
        let areaId = self.parentId[self.parentId.length - 1]

        let data = {
          nameOrCode: selectStr,
          areaId: areaId,
          effective: this.effective
        }
        $api.queryAreaByCondition(self, data, (data) => {
          self.currentExpand = []
          self.areaList = data.data.areaList
        })
      },
      fnOnSelect: function (record, selected) {
        const {selectedRowKeys, selectedRows} = this
        if (selected) {
          selectedRowKeys.push(record.areaId);
          selectedRows.push(record);
        } else {
          this.selectedRowKeys = selectedRowKeys.filter(areaId => areaId != record.areaId)
          this.selectedRows = selectedRows.filter(item => item.areaId != record.areaId)
        }
      },
      fnOnSelectAll: function (selected, selectedRows) {
        this.selectedRows = [], this.selectedRowKeys = []
        if (selected) {
          selectedRows.map(item => {
            this.selectedRowKeys.push(item.areaId)
          })
          this.selectedRows = selectedRows;
        }
      },
      // 批量删除行政区划
      fnBatchDeleteArea() {
        // 判断是否选择
        let self = this
        if (self.selectedRows.length === 0) {
          self.$message.warning('请先选择数据')
          return
        }
        self.$confirm({
          title: '删除标签',
          content: '确认删除所选行政区划及子区划吗?',
          cancelText: '取消',
          okText: '确认',
          onOk() {
            let idPaths = self.selectedRows.map((v) => {
              return v.idPath
            })

            let data = {
              idPaths: idPaths.join(',')
            }

            $api.deleteBatchAreaByAreaIds(self, data, (data) => {
              self.$message.success('删除数据成功')
              treeDataUtil.removeTreeData(self.areaList, self.selectedRows, 'areaId')
              // 重新加载级联下拉选项
              $api.queryAllArea(self, null, (data) => {
                // self.areaOptions = data.data.areaList
              })
            })
          }
        })
      },
      // 批量禁用行政区划
      fnBatchBanArea() {
        let self = this
        if (self.selectedRows.length === 0) {
          self.$message.warning('请先选择数据')
          return
        }
        self.$confirm({
          title: '禁用组织',
          content: '确认禁用所选行政区划及子区划吗?',
          cancelText: '取消',
          okText: '确认',
          onOk() {
            let areaIdPaths = [];
            for (let i = 0; i < self.selectedRows.length; i++) {
              if (self.selectedRows[i].effective === '1') {
                areaIdPaths.push((self.selectedRows[i].idPath))
              }
            }

            if (areaIdPaths.length == 0) {
              self.$message.warning('所选项已是无效状态');
              return false;
            }
            let data = {
              areaIdPaths: areaIdPaths.join(','),
              effective: '0'
            }
            $api.updateBatchAreaStatus(self, data, (data) => {
              treeDataUtil.updateTreeDataDown(self.areaList, self.selectedRows, {effective: 0}, 'areaId')
              self.selectedRowKeys = []
              self.selectedRows = []
              self.$message.success('更新数据成功')
            })
          }
        })
      },
      // 批量启用行政区划
      fnBatchPickArea() {
        let self = this
        if (self.selectedRows.length === 0) {
          self.$message.warning('请先选择数据')
          return
        }
        let areaIdPaths = [];
        for (let i = 0; i < self.selectedRows.length; i++) {
          if (self.selectedRows[i].effective == 0) {
            areaIdPaths.push((self.selectedRows[i].idPath))
          }
        }

        if (areaIdPaths.length == 0) {
          self.$message.warning('所选项已是有效状态');
          return false;
        }
        let data = {
          areaIdPaths: areaIdPaths.join(','),
          effective: '1'
        }
        $api.updateBatchAreaStatus(self, data, (data) => {
          treeDataUtil.updateTreeDataDown(self.areaList, self.selectedRows, {effective: '1'}, 'areaId')
          self.selectedRowKeys = []
          this.selectedRows = []
          self.$message.success('更新数据成功')
        })
      },

      showDrawer(record, flag) {
        let self = this
        self.flag = flag
        self.editAreaParam = record
        if (flag) {
          self.editOrShowTitle = '查看行政区划'
          self.showVisible = true
        } else {
          self.editOrShowTitle = '修改行政区划'
          self.editVisible = true
        }
      },
      showAddDrawer(area) {
        let self = this
        if (area === '0') {
          self.addOrChildTitle = '新增行政区划'
        } else {
          if (area.effective == '0') {
            self.$message.warning("禁用的行政区划不允许添加下级");
            return;
          }
        }
        self.areaItem = area
        self.addVisible = true
      },
      onClose() {
        this.editVisible = false
        this.addVisible = false
        // 刷新列表
      },
      // 重置查询参数
      queryParamReset() {
        this.searchStr = ''
        this.parentId = []
      }
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .invalidStyle {
    color: #ccc;
  }

  .filter-box {
    display: inline-block
  }

  .filter-name {
    margin-left: 20px
  }

  .disable-color {
    color: $text-l3-color;
    &:hover {
      color: $text-l3-color
    }
  }

  .search-box {
    width: 340px;
    line-height: 46px;
    margin-right: 10px;
  }


</style>
