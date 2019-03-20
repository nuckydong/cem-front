<template id="app">
  <div style="height: 100%" class="fit">
    <ta-border-layout :layout="{left:'300px'}" :center-cfg="{layoutConStyle:{padding:0,border: 0}}">
      <!--begin 加载左侧选择栏-->
      <div slot="left">
        <ta-card :bordered="false"
                 style="width: 100%"
                 :bodyStyle="{'padding':0}">
          <div slot="title">
            自定义组织列表
            <div style="float: right">
              <ta-button @click="customOrgTypeNameVisible = true"
                         size="small"
                         icon="edit"
                         style="font-size: 12px">
                组织类别管理
                <custom-org-type-name-modal :isShow="customOrgTypeNameVisible"
                                            @closeCustomOrgTypeNameModal="fnCloseCustomOrgTypeNameModal">
                </custom-org-type-name-modal>
              </ta-button>
            </div>
          </div>
          <a v-for="(item, index) in orgTypeNameList"
             :key="item.customOrgTypeNameId"
             :value="item.customOrgTypeNameId"
             @click="fnHandleOrgTypeNameChange(item.customOrgTypeNameId,index)">
            <div style="width: 100%;height: 50px;line-height: 50px;padding-left: 24px;"
                 :class="{'activeClass':index == clickIndex}">
              {{item.customOrgTypeName}}
            </div>
          </a>
        </ta-card>
      </div>
      <ta-border-layout :layout="{header:'70px'}"
                        :center-cfg="{showBar:true}"
                        class="fit">
        <div slot="header" type="flex" justify="center" align="middle">
          <ta-input-search placeholder="请输入组织名称,自定义编码查询"
                           @search="fnQueryOrg"
                           class="search-box"
                           v-model="validId">
            <ta-button slot="enterButton" type="primary">搜索</ta-button>
          </ta-input-search>
        </div>
        <!--begin 加载左侧选择栏-->
        <div slot="centerExtraContent" style="height: 50px;line-height: 48px;">
          <ta-tag-select title="有效性"
                         :data="CollectionData('EFFECTIVE')"
                         v-model="selectFilter"
                         @change="filterClick">
          </ta-tag-select>
          <div style="float: right">
            <!--begin 加载按钮组-->
            <ta-button @click="fnBatchDeleteOrg">删除</ta-button>
            <ta-button-group>
              <!--批量操作-->
              <ta-button @click="fnBatchBanOrg">禁用</ta-button>
              <ta-button @click="fnBatchPickOrg" type="primary">启用</ta-button>
              <!--<ta-button @click="fnExpandAll">全部展开</ta-button>-->
              <!--<ta-button @click="fnCollapseAll" type="primary">全部收起</ta-button>-->
              <!--<ta-button @click="fnShowRelationUserModal">人员关联</ta-button>-->
              <!--<ta-button >导入</ta-button>-->
              <!--<ta-button @click="fnExportOpenNotification">导出</ta-button>-->
              <span v-if="showAddTop">
                  <ta-button @click="fnAddTopOrg">新增组织</ta-button>
                </span>
            </ta-button-group>
            <!--end 加载按钮组-->
          </div>
        </div>
        <router-view></router-view>
        <!--begin 加载组织人员数据-->
        <ta-table :columns="orgColumns"
                  :dataSource="orgData"
                  :rowSelection="{selectedRowKeys: selectedRowKeys,onChange:fnOnChange}"
                  rowKey="customOrgId"
                  :pagination="false"
                  @expand="fnLoadSubTreeData"
                  :defaultExpandedRowKeys="currentExpand"
                  :expandedRowKeys="currentExpand"
                  ref="customOrgTableRef">
          <!--处理组织名称显示-->
          <template slot="customOrgName" slot-scope="text,record">
            <span :class="{'invalidStyle': record.effective == '0' }">{{text}}</span>
          </template>
          <!--处理时间格式-->
          <template slot="updateTime" slot-scope="text,record">
            <span>{{moment(record.updateTime).format('YYYY-MM-DD')}}</span>
          </template>
          <!--处理有效标识-->
          <template slot="effective" slot-scope="text,record">
              <span v-if="record.effective === '1'">
                <ta-tag color="green">有效</ta-tag>
              </span>
            <span v-else>
                <ta-tag color="red">无效</ta-tag>
              </span>
          </template>
          <!--处理操作-->
          <template slot="action" slot-scope="text, record">
            <router-link
              :to="{ path: 'customOrgUser' , query: {customOrgId:record.customOrgId,customOrgPath:record.customOrgPath}}"
              :disabled="record.effective==='0'"
              :class="{'invalidStyle': record.effective == '0' }">
              人员管理
            </router-link>
            <ta-divider type="vertical"/>
            <a @click="() => fnShowEditOrgModal(record)">编辑</a>
            <ta-divider type="vertical"/>
            <a @click="() => fnShowCustomOrgDrawer(record)"
               :disabled="record.effective==='0'"
               :class="{'invalidStyle': record.effective == '0' }">新增下级</a>
          </template>
        </ta-table>
        <!--end 加载组织人员数据-->

      </ta-border-layout>
      <!--</ta-col>-->
      <!--end 加载右侧输入栏-->
      <!--</ta-row>-->
    </ta-border-layout>

    <ta-drawer destroyOnClose
               :title="customOrg.orgTitle"
               width="500"
               placement="right"
               :visible="customOrg.visible"
               @close="customOrg.visible = false"
               footerHeight>
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
          <ta-button @click="fnResetForm">重置</ta-button>
          <ta-button type="primary" @click="fnUpdateOrSaveOrg" :loading="btnLoading">保存</ta-button>
        </ta-button-group>
      </div>
      <add-custom-org :org="org" @closeCustomOrgDrawer="drawerClose" ref="customOrgChild"></add-custom-org>
    </ta-drawer>

  </div>
</template>

<script>
import treeDataUtil from '@common/js/util/treeDataUtil'
import $api from './api/index'
import moment from 'moment'

import addCustomOrg from './part/addCustomOrg'
import CustomOrgTypeNameModal from './part/customOrgTypeNameModal'
// 定义列名
const orgColumns = [
  {
    title: '组织名称',
    width: '20%',
    dataIndex: 'customOrgName',
    overflowTooltip: true,
    scopedSlots: {customRender: 'customOrgName'}
  },
  {
    title: '自定义编码',
    width: '10%',
    dataIndex: 'customCode',
    customRender: (text) => {
      return text || '--'
    }
  },
  {
    title: '有效标识',
    width: '10%',
    dataIndex: 'effective',
    scopedSlots: {customRender: 'effective'}
  },
  {
    title: '最后修改时间',
    width: '15%',
    dataIndex: 'updateTime',
    scopedSlots: {customRender: 'updateTime'}
  },
  {
    title: '操作',
    dataIndex: 'operation',
    // fixed: 'right',
    width: '30%',
    align: 'center',
    scopedSlots: {customRender: 'action'}
  }
]

export default {
  name: 'customOrgManagement',
  components: {CustomOrgTypeNameModal, addCustomOrg},
  data () {
    return {
      selectFilter: [], // 需要过滤的数据
      clickIndex: 0, // 默认选中的下标
      tabTitle: '自定义组织列表', // tab标题
      btnLoading: false, // 保存按钮显示加载中
      currentExpand: [], // 扩展的数据
      orgTypeNameList: [], // 自定义组织类型数组
      orgTypeNameSelVal: 'baa315851d3c4a90a47889672404505d', // 自定义组织默认值id
      effectiveSelVal: null, // 默认有效性
      validId: '',
      orgColumns,
      orgData: [],
      filteredInfo: null,
      sortedInfo: null,
      pagination: {
        pageSize: 10,
        showQuickJumper: true, // 显示跳转页面输入框
        showSizeChanger: true, // 显示页面记录条数改变
        pageSizeOptions: ['10', '20', '50', '80', '100']
      },
      customOrg: {
        orgTitle: '新增组织机构',
        orgId: '',
        orgName: '',
        visible: false
      },
      org: {},
      selectedRowKeys: [], // 选中的keys
      selectedRows: [], // 选择的记录
      customOrgTypeNameVisible: false, // 自定义组织类别信息
      defaultExpandAll: true, // 是否展开所有行
      arrayData: {}, // 行数据
      isDetailShow: false, // 是否展示详细信息
      showAddTop: false// 是否显示新增顶级组织
    }
  },
  mounted: function () {
    this.currentExpand = []
    this.fnLoadDefaultCustomOrg()
  },
  methods: {
    fnOnChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 时间处理函数
    moment,
    filterClick () {
      this.effectiveSelVal = this.selectFilter.join(',')
      this.fnInitDefaultOrg(this.orgTypeNameSelVal, null)
    },
    // 加载默认自定义组织
    fnLoadDefaultCustomOrg () {
      this.fnQueryAllCustomOrgTypeName()
    },
    // 点击当前行,加载子行
    fnLoadSubTreeData (expanded, record) {
      // 如果为展开,则进行请求
      let customOrgId = record.customOrgId
      if (expanded) {
        // 如果children元素不为空,则不进行加载,如果为空,则进行加载
        if (record.children && record.children.length > 0) {
          this.currentExpand.push(customOrgId)
        } else {
          let data = {
            customOrgTypeNameId: this.orgTypeNameSelVal,
            parentId: customOrgId
          }
          $api.queryCustomOrgByParentId(this, data, (data) => {
            record.children = data.data.customOrgList
            // 设置默认展开的层级,默认展开第一层,显示两级
            this.currentExpand.push(customOrgId)
          })
        }
      } else {
        // 如果为关闭,则进行关闭
        let index = this.currentExpand.indexOf(customOrgId)
        this.currentExpand.splice(index, 1)
      }
    },
    // 初始化组织列表信息
    fnInitDefaultOrg (val, pid) {
      let effective = this.effectiveSelVal
      let ef = null
      if (effective && effective.length > 0) { // 如果选择，则进行判断是否有逗号，没有则只选择了一个，否则为null
        let index = effective.indexOf(',')
        if (index == -1) {
          ef = effective
        }
      }
      let data = {
        customOrgTypeNameId: val,
        parentId: pid,
        effective: ef
      }
      $api.queryCustomOrgByParentId(this, data, (data) => {
        this.currentExpand.length = 0
        this.orgData = data.data.customOrgList
        this.$nextTick(() => {
          let hasData = this.orgData && this.orgData.length > 0
          if (hasData) {
            this.currentExpand.push(this.orgData[0].customOrgId)
          }
          if (!ef) {
            if (hasData) {
              this.showAddTop = false
            } else {
              this.showAddTop = true
            }
          }
        })
      })
    },
    fnResetForm () {
      this.$refs.customOrgChild.fnResetForm()
    },
    fnUpdateOrSaveOrg () {
      this.btnLoading = true
      this.$refs.customOrgChild.fnUpdateOrSaveOrg()
      this.btnLoading = false
    },
    fnShowCustomOrgTypeNameModal () {
      this.customOrgTypeNameVisible = true
    },
    // 查询所有自定义组织名称
    fnQueryAllCustomOrgTypeName () {
      $api.queryCustomOrgTypeName(this, null, (data) => {
        this.orgTypeNameList = data.data.customOrgTypeNameList
        // 判断组织是否禁用,则默认加载
        let res = this.orgTypeNameList.filter((v, index) => {
          if (v.customOrgTypeNameId === this.orgTypeNameSelVal) {
            this.clickIndex = index
            return v
          }
          return null
        })
        // 如果结果为空,则进行加载数组第一个
        if (!res || res.length === 0) {
          // 如果前面选择的已经被禁用或者删除,则重新加载
          this.orgTypeNameSelVal = this.orgTypeNameList[0].customOrgTypeNameId
        }
        this.fnInitDefaultOrg(this.orgTypeNameSelVal, null)
      }
      )
    },
    // 处理选择组织名称
    fnHandleOrgTypeNameChange (value, index) {
      // 如果等于当前就不进行加载
      if (this.clickIndex == index) {
        return
      }
      this.orgTypeNameSelVal = value
      this.clickIndex = index
      // 先进行扩展清空
      this.currentExpand = []
      // 清空过滤项
      this.selectFilter = []
      this.showAddTop = false
      this.effectiveSelVal = null
      this.fnInitDefaultOrg(value, null)
    },
    // 查询组织
    fnQueryOrg () {
      let self = this
      // 如果没选择组织的话
      if (!self.orgTypeNameSelVal) {
        self.$message.warning('请选择组织类别')
        return
      }

      let validId = self.validId
      let effective = self.effectiveSelVal
      effective = (!effective || effective === 'all') ? null : effective

      let data = {
        validId: validId,
        customOrgTypeNameId: self.orgTypeNameSelVal,
        effective: effective
      }
      $api.queryCustomOrgByValidId(self, data, (data) => {
        self.orgData = data.data.customOrgList
      })
    },
    // 批量删除自定义组织
    fnBatchDeleteOrg () {
      let self = this
      if (self.selectedRows.length === 0) {
        self.$message.warning('请先选择数据')
        return
      }
      self.$confirm({
        title: '删除组织',
        content: '确认删除这些组织(提示:当前组织及其下级所有组织都会被删除)吗?',
        cancelText: '取消',
        okText: '确认',
        onOk () {
          let customOrgPathIds = self.selectedRows.map((org) => {
            return org.customOrgPathId
          })
          let data = {
            customOrgPathIds: customOrgPathIds.join(',')
          }
          $api.deleteBatchCustomOrg(self, data, (data) => {
            self.$message.success('更新数据成功')
            treeDataUtil.removeTreeData(self.orgData, self.selectedRows, 'customOrgId')
            // 如果移除完后发现数据的长度已经为空,那么则显示新增
            if (self.orgData.length == 0) {
              self.showAddTop = true
            }
          })
        }
      })
    },
    // 批量禁用组织
    fnBatchBanOrg () {
      let self = this
      if (self.selectedRows.length === 0) {
        self.$message.warning('请先选择数据')
        return
      }
      self.$confirm({
        title: '禁用组织',
        content: '确认禁用这些组织(提示:当前组织及其下级所有组织都会被禁用)吗?',
        cancelText: '取消',
        okText: '确认',
        onOk () {
          let customOrgPathIds = self.selectedRows.map((org) => {
            return org.customOrgPathId
          })
          let data = {
            customOrgPathIds: customOrgPathIds.join(','),
            effective: '0'
          }
          $api.updateBatchCustomOrgStatus(self, data, (data) => {
            self.$message.success('更新数据成功')
            treeDataUtil.updateTreeDataDown(self.orgData, self.selectedRows, {effective: '0'}, 'customOrgId')
          })
        }
      })
    },
    // 批量启用组织
    fnBatchPickOrg () {
      let self = this
      if (self.selectedRows.length === 0) {
        self.$message.warning('请先选择数据')
        return
      }
      let customOrgPathIds = self.selectedRows.map((org) => {
        return org.customOrgPathId
      })
      let data = {
        customOrgPathIds: customOrgPathIds.join(','),
        effective: '1'
      }
      $api.updateBatchCustomOrgStatus(self, data, (data) => {
        self.$message.success('更新数据成功')
        treeDataUtil.updateTreeDataDown(self.orgData, self.selectedRows, {effective: '1'}, 'customOrgId')
      })
    },
    // 展开所有组织
    // fnExpandAll() {
    //   this.defaultExpandAll = true;
    //
    // },
    // //收起所有组织
    // fnCollapseAll() {
    //   this.defaultExpandAll = false;
    // },
    // 点击打开模态框
    fnShowRelationUserModal (record) {
      let self = this
      self.isShow = true
      $api.queryAllTaOrg(self, null, (data) => {
        self.orgTreeData = data.data.orgTreeData
        // 如果当前的数组为0,则进行查询

        // 加载已经选择的人员信息
        let reqData = {
          customOrgId: self.org.customOrgId,
          includeChildren: '0',
          pageNumber: 0,
          pageSize: 10
        }
        $api.queryBatchUserByCustomOrgId(self, reqData, (da) => {
          self.result = da.data.customOrgUserList.list
        })
      })
      this.org = record
    },
    // 导出提示
    fnExportOpenNotification () {
      this.$notification.open({
        message: '导出文件提醒',
        description: '导出文件默认为xlsx文件格式,下载完成后,请使用office等工具进行打开,如果没有,请进行安装'
      })
    },
    // 打开新增组织信息
    fnShowCustomOrgDrawer (record) {
      this.customOrg.visible = true
      this.org = {}
      this.org = record
      this.org.type = 'add'
      this.customOrg.orgTitle = '新增下级组织机构'
    },
    drawerClose (newData) {
      this.customOrg.visible = false
      // 新增顶级组织
      if (newData && newData.addTop) {
        // 如果是添加顶级组织,则直接进行加载数据
        this.fnInitDefaultOrg(this.orgTypeNameSelVal, null)
        return
      }
      let type = this.org.type
      if (type == 'edit') { // 如果是编辑,则加载当前节点的父节点
        // 由于不能马上进行删除并进行刷新,则进行关闭上一级的处理
        this.changeRowData(this.orgData, 'customOrgId', newData)
      } else if (type == 'add') { // 如果是新增,则加载当前节点的数据
        treeDataUtil.addTreeData(this.orgData, {...this.org}, 'customOrgId', {...newData}, this)
      }
    },
    // 加载左侧列表选中信息
    fnLoadLeftTab () {
      // 判断组织是否禁用,则默认加载
      let res = this.orgTypeNameList.filter((v, index) => {
        if (v.customOrgTypeNameId === this.orgTypeNameSelVal) {
          this.clickIndex = index
          return v
        }
        return null
      })
      // 如果结果为空,则进行加载数组第一个
      if (!res || res.length === 0) {
        // 如果前面选择的已经被禁用或者删除,则重新加载
        this.orgTypeNameSelVal = this.orgTypeNameList[0].customOrgTypeNameId
      }
      this.fnInitDefaultOrg(this.orgTypeNameSelVal, null)
    },
    changeRowData (data, key, newData) {
      for (let i = 0; i < data.length; i++) {
        if (data[i][key] == newData[key]) {
          data[i] = Object.assign({}, data[i], newData)
          break
        }
        if (data[i].children) {
          this.changeRowData(data[i].children, 'customOrgId', newData)
        }
      }
    },
    // 修改组织信息
    fnShowEditOrgModal (record) {
      this.customOrg.visible = true
      this.org = record
      this.org.type = 'edit'
      this.customOrg.orgTitle = '修改组织结构'
    },
    fnAddTopOrg () {
      this.customOrg.visible = true
      this.customOrg.orgTitle = '新增组织结构'
      this.org = {}
      this.org.type = 'addTop'
      this.org.customOrgName = ''
      this.org.customCode = ''
      this.org.customOrgTypeNameId = this.orgTypeNameSelVal
    },
    // 关闭自定义组织类别模态框
    fnCloseCustomOrgTypeNameModal () {
      this.customOrgTypeNameVisible = false
      this.fnQueryAllCustomOrgTypeName()
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .invalidStyle {
    color: $text-l3-color;
    &:hover {
      color: $text-l3-color
    }
    cursor: not-allowed;
  }

  html a.disabled {
    color: $text-l3-color;
    &:hover {
      color: $text-l3-color
    }
    cursor: not-allowed;
  }

  .activeClass {
    background-color: rgb(230, 246, 254);
    color: dodgerblue !important;
    border-right: 6px solid rgb(54, 134, 246);
  }

  .search-box {
    width: 340px;
    line-height: 46px;
    margin-right: 10px;
  }
</style>
