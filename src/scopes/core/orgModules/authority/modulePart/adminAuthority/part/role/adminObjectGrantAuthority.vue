<template>
  <div class="fit">
    <ta-border-layout :layout="{header:'55px'}" :centerCfg="{showBar: true}">
      <template slot="header">
        <ta-breadcrumb separator=">" style="line-height: 30px">
          <ta-breadcrumb-item><a @click="fnBackToHome">角色维度</a></ta-breadcrumb-item>
          <ta-breadcrumb-item>自定义授权权限</ta-breadcrumb-item>
        </ta-breadcrumb>
      </template>
      <div slot="centerExtraContent">
        <ta-alert :message="'当前角色为：'+this.$route.query.roleName" type="info" showIcon/>
      </div>

      <ta-tabs class="fit">
        <ta-tab-pane tab="自定义授权权限&&自定义再授权权限">
          <ta-row class="fit">
            <ta-col :span="4" class="fit" style="border-right: 1px solid #eee;height: 100%">
              <admin-left-menu title="自定义授权一级菜单"
                               :data="menuData"
                               :selectedKeys="menuSelectedKeys"
                               @click="onSelectMenu">
              </admin-left-menu>
            </ta-col>
            <ta-col :span="20" class="fit" style="padding: 5px;border-left: 1px solid #eee">
              <ta-row class="fit" :gutter="10">
                <ta-col :span="11">
                  <span style="font-weight: bold">对象授权权限:</span>
                  <div style="padding: 10px 0">
                    <ta-input
                      placeholder="输入关键字进行过滤"
                      v-model="leftFilterText"
                      style="width: 250px;">
                    </ta-input>
                  </div>
                  <ta-e-tree :data="adminObjectGrantTree"
                             show-checkbox
                             node-key="resourceId"
                             ref="tree"
                             highlight-current
                             :props="defaultProps"
                             @check="fnCheckLeftTree"
                             :filter-node-method="filterNode"
                             :default-checked-keys="leftDefaultKeys"
                             default-expand-all>
                  </ta-e-tree>
                </ta-col>

                <ta-col :span="11">
                  <span style="font-weight: bold">对象再授权权限:</span>
                  <div style="padding: 10px 0">
                    <ta-input
                      placeholder="输入关键字进行过滤"
                      v-model="rightFilterText"
                      style="width: 250px;">
                    </ta-input>
                  </div>
                  <ta-e-tree :data="adminReObjectGrantTree"
                             show-checkbox
                             node-key="resourceId"
                             ref="rtree"
                             highlight-current
                             :props="defaultProps"
                             :filter-node-method="filterNode"
                             @check-change="fnCheckRightTree"
                             :default-checked-keys="rightDefaultKeys"
                             default-expand-all>
                  </ta-e-tree>
                </ta-col>

              </ta-row>

            </ta-col>
          </ta-row>
        </ta-tab-pane>
        <template slot="tabBarExtraContent">
          <ta-button @click="fnBackToHome">返回管理员角色列表</ta-button>
          <ta-button type="primary" @click="fnSaveAdminObjectUsePermission('refresh')">保存</ta-button>
        </template>
      </ta-tabs>
    </ta-border-layout>
  </div>
</template>
<script>
import $api from '../../api/index'
import AdminLeftMenu from './adminLeftMenu'

export default {
  name: 'adminGrantAuthority',
  components: {AdminLeftMenu},
  data () {
    return {
      clickIndex: 0, // 点击的下标
      menuData: [], // 左侧菜单栏列表
      adminObjectGrantTree: [], // 管理员授权权限树
      leftDefaultKeys: [], // 左侧默认选中元素
      leftFilterText: '', // 左侧过滤框
      menuSelectedKeys: [], // 选中的菜单
      adminReObjectGrantTree: [], // 管理员再授权权限树
      rightDefaultKeys: [], // 右侧默认选中的数据
      rightFilterText: '', // 右侧过滤框
      defaultProps: {// 默认树属性
        children: 'children',
        label: 'name',
        id: 'resourceId'
      },
      resourceItem: '', // 资源item
      row: {
        col: {
          span: 12
        }
      },
      item: {}, // 组织人员信息
      roleId: '' // 角色id
    }
  },
  activated() {
    this.item = this.$route.query
    if (!this.item.roleId) {
      this.fnBackToHome()
      return
    }
    this.roleId = this.item.roleId
    this.menuData = []
    this.adminObjectGrantTree = []
    this.leftDefaultKeys = []
    this.adminReObjectGrantTree = []
    this.rightDefaultKeys = []
    this.fnLoadDefault()
  },
  watch: {
    leftFilterText (val) {
      this.$refs.tree.filter(val)
    },
    rightFilterText (val) {
      this.$refs.rtree.filter(val)
    }
  },
  methods: {
    // 筛选
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 选中某一个的事件
    onSelectMenu ({item, key, keyPath}) {
      if (this.resourceItem.resouceId === key) {
        return
      }
      let selectArry = []
      let treeObj = this.$refs.tree
      selectArry = [...selectArry, ...treeObj.getCheckedKeys(true)]
      const newData = [...this.menuData]
      const menuItem = newData.filter(item => key === item.resourceId)[0]
      // 只需要判断左侧的数据是否有改动即可,因为右侧选中,左侧也会选中
      let rSelectArry = this.$refs.rtree.getCheckedKeys(true)
      if (!(this.leftDefaultKeys.sort().toString() === selectArry.sort().toString()) ||
          !(this.rightDefaultKeys.sort().toString() === rSelectArry.sort().toString())
      ) {
        this.$confirm({
          title: '提示',
          content: '当前对象授权权限修改未保存，是否保存?',
          cancelText: '取消',
          okText: '确认',
          onOk: () => {
            this.fnSaveAdminObjectUsePermission()
            this.menuSelectedKeys = keyPath
            this.$nextTick(() => {
              this.fnQueryObjectGrantPermissionByResourceId(menuItem)
            })
          },
          onCancel: () => {
            this.menuSelectedKeys = keyPath
            this.fnQueryObjectGrantPermissionByResourceId(menuItem)
          }
        })
      } else {
        this.menuSelectedKeys = keyPath
        this.fnQueryObjectGrantPermissionByResourceId(menuItem)
      }
    },
    // 点击左边树进行处理
    fnCheckLeftTree (checkedKey, node) {
      // 如果左边没有选中,才进行选中
      if (!(this.$refs.tree.getNode(checkedKey.resourceId).checked)) {
        this.$refs.rtree.setChecked(checkedKey.resourceId, false, true)
      }
    },
    // 点击右边树进行触发事件
    fnCheckRightTree (checkedKey, checked) {
      // 如果右边节点选中,才对左边进行选中
      if (!checked) {
        return
      }
      // 如果左边没有选中,才进行选中
      if (!(this.$refs.tree.getNode(checkedKey.resourceId)).checked) {
        let rCheckedKeys = this.$refs.tree.getCheckedKeys()
        rCheckedKeys.push(checkedKey.resourceId)
        this.$refs.tree.setCheckedKeys(rCheckedKeys)
      }
    },
    // 保存管理员对象使用权限树
    fnSaveAdminObjectUsePermission (type) {
      let leftResourceIds = this.$refs.tree.getCheckedNodes(false, true).map((node) => {
        return node.resourceId
      })

      let rightResourceIds = this.$refs.rtree.getCheckedNodes(false, true).map((node) => {
        return node.resourceId
      })
      let data = {
        roleId: this.roleId,
        rePermissionIds: leftResourceIds.join(','),
        reAuthorityIds: rightResourceIds.join(','),
        parentResourceId: this.resourceItem.resourceId
      }
      $api.saveAdminObjectGrantPermission(this, data, dd => {
        this.$message.success('更新数据成功')
        if (type == 'refresh') {
          this.fnQueryObjectGrantPermissionByResourceId(this.resourceItem)
        }
      })
    },
    fnLoadDefault () {
      let data = {
        roleId: this.roleId
      }
      $api.queryObjectGrantSysPermission(this, data, dd => {
        this.menuData = dd.data.customResourceList
        this.$nextTick(() => {
          if (this.menuData) {
            // 默认加载数组第一条数据
            this.menuSelectedKeys = [this.menuData[0].resourceId]
            this.fnQueryObjectGrantPermissionByResourceId(this.menuData[0])
          }
        })
      })
    },
    // 点击左侧列表,加载右侧授权权限树
    fnQueryObjectGrantPermissionByResourceId (item) {
      this.resourceItem = item
      let data = {
        roleId: this.roleId,
        resourceId: item.resourceId
      }
      // 清空数据
      this.leftDefaultKeys = []
      this.rightDefaultKeys = []
      $api.queryObjectGrantPermissionByResourceId(this, data, dd => {
        this.adminObjectGrantTree = dd.data.customResourceTree
        this.adminReObjectGrantTree = dd.data.customResourceTree
        let selectedKeys = dd.data.rePermissionList.map(v => {
          return v.resourceId
        })
        // 设置左侧选中元素
        this.$nextTick(() => {
          selectedKeys.forEach(nodeKey => {
            var node = this.$refs.tree.getNode(nodeKey)
            if (node && node.isLeaf) {
              this.leftDefaultKeys.push(node.data.resourceId)
            }
          })
          this.$refs.tree.setCheckedKeys(this.leftDefaultKeys)
        })

        // 右侧默认选中的数据
        // let rDefaultKeys = dd.data.reAuthorityList;
        let rDefaultKeys = dd.data.reAuthorityList.map(v => {
          return v.resourceId
        })
        // 循环选中右边的数据
        this.$nextTick(() => {
          rDefaultKeys.forEach(nodeKey => {
            var node = this.$refs.rtree.getNode(nodeKey)
            if (node && node.isLeaf) {
              this.rightDefaultKeys.push(node.data.resourceId)
            }
          })
          this.$refs.rtree.setCheckedKeys(this.rightDefaultKeys)
        })
      })
    },
    // 返回
    fnBackToHome () {
      this.$router.push({name: 'adminRoleManagement'})
    }
  }
}
</script>
