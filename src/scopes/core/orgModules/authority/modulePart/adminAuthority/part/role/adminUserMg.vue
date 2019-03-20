<template>
  <div class="fit">
    <ta-border-layout :layout="{header:'55px'}" :center-cfg="{showBar:true}">
      <template slot="header">
        <ta-breadcrumb separator=">" style="line-height: 30px">
          <ta-breadcrumb-item><a @click="fnBackToHome">角色维度</a></ta-breadcrumb-item>
          <ta-breadcrumb-item>人员管理</ta-breadcrumb-item>
        </ta-breadcrumb>
      </template>

      <div slot="centerExtraContent">
        <ta-alert :message="'当前角色为：'+this.$route.query.roleName" type="info" showIcon/>
      </div>
      <ta-tabs class="fit">
        <div slot="tabBarExtraContent">
          <ta-button @click="fnBackToHome">返回管理员角色列表</ta-button>
          <ta-button-group>
            <ta-button @click="fnBatchDeleteUser">批量移除</ta-button>
            <ta-button type="primary" @click="fnShowUserModal">分配人员</ta-button>
          </ta-button-group>
        </div>

        <ta-tab-pane :tab="tabTitle">
          <ta-row style="width: 100%; padding-top: 10px">
            <ta-col :span="24">
              <ta-table :columns="userColumns"
                        :dataSource="userData"
                        :pagination="false"
                        rowKey="orgId"
                        :rowSelection="{selectedRowKeys: selectedRowKeys,onChange:fnOnChange}"
                        ref="userRef">
                <template slot="sex" slot-scope="text">{{CollectionLabel('SEX',text)}}</template>
                <span slot="namePath" slot-scope="text">{{getLastName(text)}}</span>
                <template slot="action" slot-scope="text,record">
                  <ta-popconfirm title="确定要移除该人员吗?" okText="确认" cancelText="取消"
                                 @confirm="() => fnAdminUserDelete(record)">
                    <a href="javascript:;">移除</a>
                  </ta-popconfirm>
                </template>
              </ta-table>
              <ta-pagination
                style="float: right; margin-top: 10px;"
                showSizeChanger
                showQuickJumper
                :dataSource.sync="userData"
                :defaultPageSize="10"
                :params="adminUserParams"
                :url="userPageUrl"
                ref="adminUserPager"/>
            </ta-col>
          </ta-row>
        </ta-tab-pane>
      </ta-tabs>

      <ta-user-select title="新增管理员角色"
                      :props="defaultProps"
                      width="800px"
                      :is-show="isShow"
                      :user-tree-data="orgTreeData"
                      id="adminMg"
                      :load="loadOrgTreeNode"
                      :user-list-data="userListData"
                      :default-user-list="result"
                      @close="isShow = false"
                      :pagination="true"
                      @queryUserList="fnQueryUserList"
                      @getUserListResult="fnGetUserListResult">
      </ta-user-select>
    </ta-border-layout>
  </div>
</template>

<script>
import $api from '../../api/index'

const userColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: '15%'
  },
  {
    title: '登录号',
    dataIndex: 'loginId',
    width: '15%'
  },
  {
    title: '所属组织',
    dataIndex: 'namePath',
    scopedSlots: {customRender: 'namePath'},
    width: '20%'
  },
  {
    title: '证件号',
    dataIndex: 'idCardNo',
    width: '20%',
    customRender: function (text) {
      return text || '--'
    }
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '10%',
    scopedSlots: {customRender: 'sex'}
  },
  {
    title: '操作',
    align: 'center',
    width: '20%',
    dataIndex: 'action',
    scopedSlots: {customRender: 'action'}
  }
]
export default {
  name: 'adminUserMg',
  data () {
    return {
      item: {}, // 路由数据
      tabTitle: '管理员角色人员管理列表', //
      userData: [], // 用户数据
      userColumns, // 用户列名称
      userPageUrl: 'org/authority/adminAuthorityManagementRestService/queryUsersByRoleId', // 用户分页请求url
      isShow: false, // 是否打开人员选择框
      orgTreeData: [], // 人员选择的左侧组织树
      userListData: [], // 相应组织人员信息
      result: [], // 选择的人员信息
      defaultProps: {
        treeNodeKey: 'value', // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
        treeLabel: 'label', // 树节点的属性名称
        treeChildren: 'children', // 树子节点对象的属性名称
        listKey: 'userId', // 每条用户信息的唯一标识（默认：roleId）
        listTitle: 'name', // 用户信息第一行显示内容
        listSubTitle: 'mobile', // 用户信息第二行显示内容
        listDescription: 'namePath' // 用户信息鼠标移上去显示描述信息
      },
      roleId: '', // 角色id
      selectedRows: [], // 选中的人员列表
      selectedRowKeys: []// 选中的keys
    }
  },
  activated() {
    this.item = this.$route.query
    if (!this.item.roleId) {
      this.fnBackToHome()
      return
    }
    this.roleId = this.item.roleId
    this.fnLoadUserData()
    this.initTableColumn(this.$refs.userRef, ['sex', 'action'])
  },
  computed: {
    rowSelection () {
      let self = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          self.selectedRows = selectedRows
        }
      }
    }
  },
  methods: {
    fnOnChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 获取路径的最后一个
    getLastName (name) {
      return name.indexOf('/') != -1 ? name.slice(name.lastIndexOf('/') + 1) : name
    },
    // 删除人员
    fnAdminUserDelete (record) {
      let data = {
        roleId: this.roleId,
        userId: record.userId
      }
      $api.deleteRoleUserByKey(this, data, data => {
        this.$message.success('移除人员成功')
        this.fnLoadUserData()
        // const userData = this.userData.filter(item => item.userId !== record.userId);
        // this.userData = userData;
      })
    },
    // table引用,排除的元素,传入数组eg:this.initTableColumn(this.$refs.adminRef,['operation'])
    initTableColumn (ref, excludeArray) {
      const columns = [...ref.columns]
      const column = columns.map(v => {
        if (excludeArray && excludeArray.length > 0) {
          for (let key in excludeArray) {
            if (v.dataIndex === excludeArray[key] || v.key === excludeArray[key]) {
              return v
            }
          }
        }
        v.overflowTooltip = true
        return v
      })
      Object.assign(column, ref.columns)
    },
    adminUserParams () {
      return {
        roleId: this.item.roleId
      }
    },
    // 加载默认数据
    fnLoadUserData () {
      this.$refs.adminUserPager.loadData()
    },
    // 返回
    fnBackToHome () {
      this.$router.push({name: 'adminRoleManagement'})
    },
    // 查询人员信息
    fnQueryUserList (orgId, includeChildren, pageNum, searchType, searchParam) {
      // 查询用户信息
      let data = {
        roleId: this.roleId,
        orgId: orgId,
        pageNumber: pageNum,
        pageSize: 10,
        includeChild: includeChildren ? '1' : '0'
      }
      if (searchType) {
        data[searchType] = searchParam
      }
      $api.queryBatchUserByOrgId(this, data, (data) => {
        this.userListData = data.data.pageBean.list
      })
    },
    // 提交选择的人员信息
    fnGetUserListResult (data) {
      let self = this
      self.result = data
      if (self.result.length === 0) {
        self.$message.warning('请选择管理人员')
        return
      }
      let userIds = self.result.map((user) => {
        return user.userId
      })
      let dd = {
        roleId: self.roleId,
        userIds: userIds.join(',')
      }
      $api.addBatchAdminUser(self, dd, (data) => {
        self.$message.success('新增人员成功')
        // 清空选择的管理人员信息
        self.result = []
        self.fnLoadUserData()
      })
      this.isShow = false
    },
    // 批量删除人员信息
    fnBatchDeleteUser () {
      let self = this
      if (self.selectedRows.length === 0) {
        self.$message.warning('请选择需要移除的人员')
        return
      }
      self.$confirm({
        title: '移除人员',
        content: '确认移除这些人员吗?',
        cancelText: '取消',
        okText: '确认',
        onOk () {
          let userIds = self.selectedRows.map(v => {
            return v.userId
          })
          let data = {
            userIds: userIds.join(','),
            roleId: self.roleId
          }
          $api.deleteBatchRoleUsers(self, data, dd => {
            self.$message.success('移除成功')
            self.fnLoadUserData()
          })
        }
      })
    },
    // 展示人员模态框
    fnShowUserModal () {
      let self = this
      self.isShow = true
    },
    // 加载左侧组织树
    loadOrgTreeNode (node, resolve) {
      if (node.level === 0) {
        $api.queryAllTaOrg(this, null, data => {
          // 数据成功后默认返回的数据
          let orgVos = data.data.orgVos
          if (orgVos[0].children) {
            let dd = orgVos[0].children.map(v => {
              let obj = v
              if (v.childNum > 0) {
                obj.children = []
              }
            })
            orgVos[0].children = dd
          }
          return resolve(orgVos)
        })
      }
      if (node.level >= 1) {
        let orgId = node.data.orgId
        let isLeaf = node.data.isLeaf
        let data = {
          orgId: orgId
        }
        $api.queryAllTaOrg(this, data, data => {
          // 数据成功后默认返回的数据
          let dd = data.data.orgVos
          if (isLeaf) {
            dd = dd.map(v => {
              let obj = v
              obj.children = []
            })
          }
          return resolve(dd)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
