<template>
  <div id="roleManagement" class="fit">
    <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
      <div slot="header" type="flex" justify="center" align="middle">
        <ta-input-search placeholder="请输入角色名称"
                         @search="onSearchRole"
                         class="search-box"
                         v-model="searchInfo">
          <ta-button slot="enterButton" type="primary">搜索</ta-button>
        </ta-input-search>
      </div>

      <div slot="centerExtraContent" style="height: 50px;line-height: 48px;">
        <ta-cascader style="width: 250px;margin-right: 10px;"
                     :url='casCaderOrgUrl'
                     treeId="orgVos"
                     expandTrigger="hover"
                     :options.sync="options"
                     :changeOnSelect="true"
                     @change="fnQueryAdmin"
                     :fieldNames="{ label: 'orgName', value: 'orgId', children: 'children' }"
                     placeholder="请选择组织机构"
                     v-model="orgId"
                     :loadedDataCallBack="fnLoadedOrgCallBack"/>
        <ta-checkbox :checked="includeSub" @change="onChangeIsSub">包含子组织</ta-checkbox>

        <ta-tag-select title="状态"
                       :data="CollectionData('STATE')"
                       v-model="selectFilter"
                       @change="filterClick">
        </ta-tag-select>

        <div style="float: right">
          <ta-button @click="fnAddAdmin" type="primary">新增角色</ta-button>
          <!--begin 批量操作按钮-->
          <ta-dropdown :trigger="clickTrigger">
            <ta-menu slot="overlay">
              <ta-menu-item @click="fnBatchPickAdmin">启用</ta-menu-item>
              <ta-menu-item @click="fnBatchBanAdmin">禁用</ta-menu-item>
              <ta-menu-item @click="fnDeleteBatchAdmin">删除</ta-menu-item>
              <!--<ta-menu-item @click="fnGrantAuthority">授予使用权限</ta-menu-item>-->
              <!--<ta-menu-item @click="fnRevokeAuthority">回收使用权限</ta-menu-item>-->
            </ta-menu>
            <ta-button>批量操作
              <ta-icon type="down"/>
            </ta-button>
          </ta-dropdown>

          <!--end 批量操作按钮-->
        </div>
      </div>
      <!--begin 加载组织人员数据-->
      <ta-table :columns="adminColumns"
                :dataSource="adminData"
                :rowSelection="{selectedRowKeys: selectedRowKeys,onChange:fnOnChange}"
                autoExpandParent
                :pagination="false"
                ref="adminRef">
        <template slot="customOrgName" slot-scope="text,record">
          <span :class="{'invalidStyle': record.effective == '0' }">{{text}}</span>
          <!--</a>-->
        </template>

        <span slot="namePath" slot-scope="text">{{getLastName(text)}}</span>

        <template slot="effecttime" slot-scope="text,record">
          {{record.effectiveTime == null?'永久':moment(record.effectiveTime).format('YYYY-MM-DD')}}
        </template>
        <!--处理有效标识-->
        <template slot="effective" slot-scope="text,record">
          <ta-tag :color="record.effective == '1'?'green':'red'">{{CollectionLabel('STATE',record.effective)}}
          </ta-tag>
        </template>
        <template slot="action" slot-scope="text,record">
          <a @click="fnEditAdmin(record)">编辑</a>
          <ta-divider type="vertical"/>
          <ta-popconfirm title="确认删除该管理员角色吗?"
                         okText="确认"
                         cancelText="取消"
                         @confirm="fnAdminRecordDelete(record)">
            <a href="javascript:;">删除</a>
          </ta-popconfirm>
        </template>
        <template slot="adminMg" slot-scope="text,record">
          <span v-if="record.effective == '1'">
            <router-link :to="{ path: 'adminUserMg' , query: {roleName:record.roleName,roleId:record.roleId}}">
              人员管理
            </router-link>
          </span>
          <span v-else>
            <span class="invalidStyle">人员管理</span>
          </span>
          <!--begin 权限管理界面-->
          <ta-divider type="vertical"/>
          <span v-if="record.effective == '1' ">
            <ta-dropdown :trigger="clickTrigger">
              <a class="ant-dropdown-link">权限管理
                <ta-icon type="down-circle-o"/>
              </a>
              <ta-menu slot="overlay">
                <ta-menu-item>
                  <a @click="fnToPath('adminUseAuthority',record)">功能使用权限</a>
                </ta-menu-item>
                <ta-menu-item>
                  <router-link
                    :to="{ path: 'adminGrantAuthority' , query: {roleName:record.roleName,roleId:record.roleId}}">授权权限</router-link>
                </ta-menu-item>
                <ta-menu-item>
                  <router-link
                    :to="{ path: 'adminOrgAuthority' , query: {roleName:record.roleName,roleId:record.roleId}}">组织范围权限</router-link>
                </ta-menu-item>
              </ta-menu>
            </ta-dropdown>
          </span>
          <span v-else>
            <span class="ant-dropdown-link invalidStyle">权限管理
              <ta-icon type="down-circle-o"/>
            </span>
          </span>
          <!--end 权限管理界面-->
          <ta-divider type="vertical"/>
          <span v-if="record.effective == '1'">
            <ta-dropdown :trigger="clickTrigger">
              <a class="ant-dropdown-link">自定义权限管理
                <ta-icon type="down-circle-o"/>
              </a>
              <ta-menu slot="overlay">
                <ta-menu-item>
                  <a @click="fnToPath('adminObjectUseAuthority',record)">自定义功能使用权限</a>
                </ta-menu-item>
                <ta-menu-item>
                  <router-link
                    :to="{ path: 'adminObjectGrantAuthority' , query: {roleName:record.roleName,roleId:record.roleId}}">自定义授权权限</router-link>
                </ta-menu-item>
              </ta-menu>
            </ta-dropdown>
          </span>
          <span v-else>
            <span class="ant-dropdown-link invalidStyle">自定义权限管理
              <ta-icon type="down-circle-o"/>
            </span>
          </span>
        </template>
      </ta-table>
      <!--end 加载组织人员数据-->
      <!--begin 分页信息-->
      <ta-pagination style="float: right;margin-top: 10px"
                     showSizeChanger
                     showQuickJumper
                     :dataSource.sync="adminData"
                     :defaultPageSize="10"
                     :params="adminPageParams"
                     :url="adminTableUrl"
                     ref="adminPager"/>
      <!--end 分页信息-->
      <!--使用权限模态框加载-->
      <ta-modal :visible="batch.visible" :centered="true" :destroyOnClose="true"
                width="800px" @cancel="batch.visible=false" :bodyStyle="{'height':'400px'}">
        <template slot="title">
          <div style="text-align: center">
            {{batch.title}}
          </div>
        </template>
        <template slot="footer">
          <div style="text-align: center">
            <ta-button @click="batch.visible = false">取消</ta-button>
            <ta-button type="primary" @click="fnSaveModalAuthority">保存</ta-button>
          </div>
        </template>
        <ta-row :gutter="10" style="width: 100%">
          <ta-col :span="row.col.span">
            <span class="title">使用权限</span>
            <div class="filter">
              <ta-input placeholder="请输入资源名称" v-model="adminLeftFilterText"/>
            </div>
            <div class="modalTreeStyle">
              <ta-e-tree :data="leftTreeData"
                         :props="modalDefaultProps"
                         :filter-node-method="filterNode"
                         :default-checked-keys="leftDefaultKeys"
                         show-checkbox
                         highlight-current
                         node-key="resourceId"
                         ref="tree">
              </ta-e-tree>
            </div>
          </ta-col>
          <ta-col :span="row.col.span">
            <span class="title">对象使用权限</span>
            <div class="filter">
              <ta-input placeholder="请输入资源名称" v-model="adminRightFilterText"/>
            </div>
            <div class="modalTreeStyle">
              <ta-e-tree :data="rightTreeData"
                         :props="modalDefaultProps"
                         :filter-node-method="filterNode"
                         :default-checked-keys="rightDefaultKeys"
                         show-checkbox
                         highlight-current
                         node-key="resourceId"
                         ref="rtree">
              </ta-e-tree>
            </div>
          </ta-col>
        </ta-row>
      </ta-modal>
      <!--新增管理员角色-->
      <ta-drawer destroyOnClose
                 width="500"
                 :title="adminDrawerTitle"
                 placement="right"
                 closable
                 @close="fnCloseAdminDrawer"
                 :visible="adminDrawerVisible"
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
            <ta-button type="primary" @click="fnAddAdminInfo">保存</ta-button>
          </ta-button-group>
        </div>
        <add-admin :admin="adminItem" @closeAdminDrawer="fnCloseAdminDrawer" ref="addAdmin"></add-admin>
      </ta-drawer>
    </ta-border-layout>
  </div>
</template>

<script>
import $api from '../../api/index'
import moment from 'moment'
import AddAdmin from './addAdmin'

const adminColumns = [
  {
    title: '角色名称',
    width: '15%',
    dataIndex: 'roleName',
    overflowTooltip: true,
    scopedSlots: {customRender: 'customOrgName'}
  },
  {
    title: '组织路径',
    width: '10%',
    dataIndex: 'namePath',
    overflowTooltip: true,
    scopedSlots: {customRender: 'namePath'}
  },
  {
    title: '有效期',
    width: '10%',
    dataIndex: 'effecttime',
    scopedSlots: {customRender: 'effecttime'}
  },
  {
    title: '角色描述',
    width: '10%',
    dataIndex: 'roleDesc',
    overflowTooltip: true,
    customRender: (text) => {
      return text || '--'
    }
  },
  {
    title: '状态',
    width: '10%',
    dataIndex: 'effective',
    scopedSlots: {customRender: 'effective'}
  },
  {
    title: '角色操作',
    dataIndex: 'operation',
    width: '15%',
    align: 'center',
    scopedSlots: {customRender: 'action'}
  },

  {
    title: '管理',
    dataIndex: 'adminMg',
    width: 360,
    align: 'center',
    scopedSlots: {customRender: 'adminMg'}
  }
]
export default {
  name: 'adminRoleManagement',
  components: {AddAdmin},
  data () {
    return {
      searchInfo: '', // 角色名称搜索
      clickTrigger: ['click'], // 点击触发
      selectFilter: [], // 过滤的元素信息
      casCaderOrgUrl: 'org/authority/adminAuthorityManagementRestService/queryCurrentAdminRoleWrapOrgTree', // 级联组织选择url
      adminTableUrl: 'org/authority/adminAuthorityManagementRestService/queryAdminRoleByOrgId', // 管理员分页url
      options: [],
      orgId: [], // 级联选择框的数组id
      includeSub: true, // 是否包含子组织,默认包含
      adminDrawerTitle: '', // 抽屉标题
      adminLeftFilterText: '', // 模态框左侧搜索栏
      adminRightFilterText: '', // 模态框右侧搜索栏
      leftTreeData: [], // 模态框左侧数据
      rightTreeData: [], // 模态框右侧数据
      leftDefaultKeys: [], // 模态框左侧默认选中数据
      rightDefaultKeys: [], // 模态框右侧默认选中数据
      modalDefaultProps: {
        label: 'name'
      },
      roleName: '', // 查询的管理员角色名称
      adminColumns, // 左侧管理员信息表格列属性
      adminData: [], // 左侧管理员数据
      selectedRows: [], // 左侧的选择数据
      selectedRowKeys: [],
      adminDrawerVisible: false, // 是否展示新增管理员抽屉
      adminItem: {}, // 选中的记录
      batch: {
        title: '', // 批量操作的标题
        visible: false, // 是否打开模态框
        type: 'grant'// 批量操作类型,有grant,授予权限,以及revoke,回收使用权限
      },
      arrayData: {}, // 行数据
      isDetailShow: false, // 是否展示详细信息
      row: { // 对布局进行排列
        col: {
          span: 12
        }
      }
    }
  },
  watch: {
    // 过滤左边树
    adminLeftFilterText (val) {
      this.$refs.tree.filter(val)
    },
    // 过滤右边树
    adminRightFilterText (val) {
      this.$refs.rtree.filter(val)
    }
  },
  methods: {
    fnOnChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    moment, // 处理时间的方法
    onSearchRole (val) {
      this.roleName = val
      this.fnLoadDefaultAdmin()
    },
    // 点击过滤
    filterClick () {
      this.fnLoadDefaultAdmin()
    },
    // 获取路径的最后一个
    getLastName (name) {
      return name.indexOf('/') != -1 ? name.slice(name.lastIndexOf('/') + 1) : name
    },
    // 新增管理员信息
    fnAddAdminInfo () {
      this.$refs.addAdmin.fnAddAdminInfo()
    },
    // 重置表单
    fnResetForm () {
      this.$refs.addAdmin.fnResetForm()
    },
    // 关闭新增管理员抽屉
    fnCloseAdminDrawer () {
      this.adminDrawerVisible = false
      this.fnLoadDefaultAdmin()
    },
    fnToPath (pathName, record) {
      this.$router.push({path: pathName, query: {roleName: record.roleName, roleId: record.roleId}})
    },
    // 保存模态框数据
    fnSaveModalAuthority () {
      let self = this
      let leftCheckNodes
      let rightCheckNodes
      if (self.batch.type == 'grant') {
        // 获取左边选中的数据
        leftCheckNodes = self.$refs.tree.getCheckedNodes(false, true).map((node) => {
          return node.resourceId
        })
        // 右边选中的数据
        rightCheckNodes = self.$refs.rtree.getCheckedNodes(false, true).map((node) => {
          return node.resourceId
        })
      } else {
        leftCheckNodes = self.$refs.tree.getCheckedKeys()
        rightCheckNodes = self.$refs.rtree.getCheckedKeys()
      }
      let data = {
        isAdd: self.batch.type == 'grant' ? '1' : '0',
        roles: JSON.stringify(self.selectedRows),
        resourceIds: JSON.stringify(leftCheckNodes),
        objectResourceIds: JSON.stringify(rightCheckNodes)
      }
      $api.batchChangeAdminPermission(self, data, (data) => {
        self.$message.success('操作成功')
        self.batch.visible = false
      })
    },
    // 过滤树
    filterNode (value, data, node) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    adminPageParams () {
      let orgIds = this.orgId
      let orgId = !orgIds ? this.options[0].orgId : orgIds[orgIds.length - 1]
      let effective = this.selectFilter
      if (effective.length == 1) {
        effective = effective.join(',')
      } else {
        effective = null
      }
      return {
        roleName: this.roleName,
        effective: effective,
        orgId: orgId,
        isSub: this.includeSub
      }
    },
    // 查询管理员名称.如果为空,则查询所有管理员信息
    fnLoadDefaultAdmin () {
      this.$refs.adminPager.loadData()
    },
    onChangeIsSub (e) {
      this.includeSub = e.target.checked
      this.fnLoadDefaultAdmin()
    },
    fnLoadedOrgCallBack (data) {
      this.fnLoadDefaultAdmin()
    },
    // 点击查询管理员名称
    fnQueryAdmin (val) {
      this.orgId = val
      this.fnLoadDefaultAdmin()
    },
    // 加载用户选择模态框默认数据
    fnLoadModalDefault () {
      let self = this
      self.batch.visible = true
      $api.queryBatchPermissionTreeData(self, null, (data) => {
        self.leftTreeData = data.data.batchPermissionTree
        self.rightTreeData = data.data.batchCustomPermissionTree
      })
    },
    // 授予使用权限模态框
    fnGrantAuthority () {
      let self = this
      if (self.selectedRows.length === 0) {
        self.$message.warning('请先选择数据')
        return
      }
      self.batch.title = '授予使用权限'
      self.batch.type = 'grant'
      // 加载数据
      self.fnLoadModalDefault()
    },
    // 回收使用权限模态框
    fnRevokeAuthority () {
      let self = this
      if (self.selectedRows.length === 0) {
        self.$message.warning('请先选择数据')
        return
      }
      self.batch.title = '回收使用权限'
      self.batch.type = 'revoke'
      self.fnLoadModalDefault()
    },
    // 删除管理员记录
    fnAdminRecordDelete (record) {
      let data = {
        roleIds: record.roleId
      }
      let self = this
      $api.deleteBatchAdmin(self, data, (data) => {
        self.$message.success('移除管理员角色成功')
        self.fnLoadDefaultAdmin()
      })
    },
    // 编辑管理员信息
    fnEditAdmin (record) {
      this.adminDrawerTitle = '修改管理员角色'
      this.adminDrawerVisible = true
      this.adminItem = record
      this.adminItem.type = 'edit'
    },
    // 删除管理员信息
    fnDeleteBatchAdmin () {
      let self = this
      if (self.selectedRows.length === 0) {
        self.$message.warning('请先选择数据')
        return
      }
      self.$confirm({
        title: '批量删除管理员角色',
        content: '确认删除这些管理员角色吗?',
        cancelText: '取消',
        okText: '确认',
        onOk () {
          let roleIds = self.selectedRows.map((admin) => {
            return admin.roleId
          })
          let data = {
            roleIds: roleIds.join(',')
          }
          $api.deleteBatchAdmin(self, data, (data) => {
            self.$message.success('移除管理员角色成功')
            self.fnLoadDefaultAdmin()
          })
        }
      })
    },
    // 新增管理员信息
    fnAddAdmin () {
      this.adminDrawerTitle = '新增管理员角色'
      this.adminDrawerVisible = true
      this.adminItem = {}
      this.adminItem.type = 'add'
    },
    // 批量启用管理员状态
    fnBatchPickAdmin () {
      let self = this
      if (self.selectedRows.length === 0) {
        self.$message.warning('请先选择数据')
        return
      }
      let roleIds = self.selectedRows.map((role) => {
        return role.roleId
      })

      let data = {
        roleIds: roleIds.join(','),
        effective: '1'
      }
      $api.updateBatchAdminStatus(self, data, (data) => {
        self.$message.success('更新数据成功')
        self.fnQueryAdmin()
      })
    },
    // 批量禁用管理员状态
    fnBatchBanAdmin () {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请先选择数据')
        return
      }
      let self = this
      self.$confirm({
        title: '禁用管理员',
        content: '确认禁用这些管理员吗?',
        cancelText: '取消',
        okText: '确认',
        onOk () {
          let roleIds = self.selectedRows.map((role) => {
            return role.roleId
          })

          let data = {
            roleIds: roleIds.join(','),
            effective: '0'
          }
          $api.updateBatchAdminStatus(self, data, (data) => {
            self.$message.success('更新数据成功')
            // const tmp = [...self.adminData];
            // const target = tmp.filter(v=>{
            //   return v.
            // })
            self.fnQueryAdmin()
          })
        }
      })
    }
  }
}
</script>

<style scoped type="text/scss" lang="scss">
  .title {
    font-weight: bold;
  }

  .filter {
    display: flex;
    margin-top: 10px;
  }

  .modalTreeStyle {
    height: 290px;
    margin: 10px 0;
    /*overflow: scroll;*/
    overflow-y: scroll;
    border: 1px dashed lightgray;
  }

  .invalidStyle {
    color: $text-l3-color;
    &:hover {
      color: $text-l3-color
    }
    cursor: not-allowed;
  }

  .filter-box {
    display: inline-block
  }

  .filter-name {
    margin-left: 20px
  }

  .search-box {
    width: 340px;
    line-height: 46px;
    margin-right: 10px;
  }
</style>
