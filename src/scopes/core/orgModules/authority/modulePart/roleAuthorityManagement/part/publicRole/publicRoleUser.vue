<template>
  <div id="publicRoleUser" class="fit">
    <ta-border-layout :layout="{header:'55px'}">
      <template slot="header">
        <ta-breadcrumb separator=">" style="line-height: 30px">
          <ta-breadcrumb-item><a @click="fnBack">角色维度</a></ta-breadcrumb-item>
          <ta-breadcrumb-item>人员管理</ta-breadcrumb-item>
        </ta-breadcrumb>
      </template>
      <ta-alert :message="'当前角色为：'+role.roleName" type="info" showIcon class="notice-box"/>
        <ta-tabs class="fit content-box">
        <ta-tab-pane tab="角色下已分配的人员">
          <ta-table :columns="roleUserColumns"
                    :dataSource="roleUserData"
                    :pagination=false
          >
            <span slot="sex" slot-scope="text">{{CollectionLabel('SEX',text)}}</span>
            <template slot="operation" slot-scope="text, record">
              <a href="#" @click="fnRemoveRoleUser(record)">移除</a>
            </template>
          </ta-table>
          <ta-pagination
            style="float: right;margin-top: 10px"
            showSizeChanger
            showQuickJumper
            :dataSource.sync="roleUserData"
            :defaultPageSize="10"
            :params="roleUserPageParams"
            url="org/authority/roleAuthorityManagementRestService/queryUsersByRoleId"
            ref="roleUserPager"
          />
        </ta-tab-pane>
        <template slot="tabBarExtraContent">
          <!--<span style="margin-right: 20px;">当前角色为:{{this.$route.params.role.roleName}}</span>-->

          <ta-button @click="fnBack">返回角色列表</ta-button>
          <ta-button @click="fnOpenAssociate" type="primary">可分配人员</ta-button>

        </template>
      </ta-tabs>
    </ta-border-layout>

    <ta-user-select title="人员选择" width="800px" :is-show="isUserShow"
                    @close="isUserShow = false"
                    :user-tree-data="orgOptions"
                    :user-list-data="userListData"
                    :default-user-list="defaultUserList"
                    @queryUserList="fnQueryUserList"
                    @getUserListResult="fnGetUserListResult"
                    :props="selectUserProps"
                    id="roleUserSelect"
                    :load="loadNode"
                    :user-select-data="userSelectData"
                    @search="fnSearchUser"
                    :pagination="true"
    >
    </ta-user-select>
  </div>
</template>
<script>

  const roleUserColumns = [{
    title: '姓名',
    dataIndex: 'name'
  }, {
    title: '登录号',
    dataIndex: 'loginId'
  }, {
    title: '所属组织',
    dataIndex: 'namePath',
    width: '15%',
    overflowTooltip: 'namePath',
    customRender: (text) => {
      return text.slice(text.lastIndexOf("/") + 1);
    }
  }, {
    title: '证件号',
    dataIndex: 'idCardNo',
    customRender: function (text) {
      return text ? text : "--";
    }
  }, {
    title: '性别',
    dataIndex: 'sex',
    scopedSlots: {customRender: 'sex'},
  }, {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: {customRender: 'operation'},
    align: 'center'
  }];

  export default {
    name: 'publicRoleUser',
    data() {
      return {
        role: {},
        roleUserColumns,
        roleUserData: [],
        collectionList: ["SEX"],
        isUserShow: false,
        orgOptions: [],
        userListData: [],
        defaultUserList: [],
        userSelectData: [],
        selectUserProps: {
          treeNodeKey: 'value', // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
          treeLabel: 'label', // 树节点的属性名称
          treeChildren: 'children', // 树子节点对象的属性名称
          listKey: 'userId', // 每条用户信息的唯一标识（默认：userId）
          listTitle: 'name', // 用户信息第一行显示内容
          listSubTitle: 'mobile', // 用户信息第二行显示内容
          listDescription: "namePath", // 用户信息鼠标移上去显示描述信息
        },
      }
    },
    methods: {
      fnRemoveRoleUser(record) {
        let submitParam = {
          url: "org/authority/roleAuthorityManagementRestService/deleteRoleUserByKey",
          data: {
            roleId: record.roleId,
            userId: record.userId
          }
        };
        let callBack = {
          successCallback: (data) => {
            if (data.errors) {
              this.$message.error('移除失败');
            } else {
              this.$message.success('移除成功');
              this.fnQueryUsersByRoleId();
            }
          }
        };
        this.Base.submit(null, submitParam, callBack);
      },
      fnOpenAssociate() {
        this.isUserShow = true;
        this.userListData = [];
        let submitParam = {
          url: "org/authority/roleAuthorityManagementRestService/queryUsersByRoleId",
          data: {
            roleId: this.role.roleId
          }
        };
        let callBack = {
          successCallback: (data) => {
            this.defaultUserList = data.data.pageBean.list;
          }
        };
        this.Base.submit(null, submitParam, callBack);
      },
      fnBack() {
        this.$router.push(
          {
            name: 'publicRoleManager'
          }
        );
      },
      loadNode(node, resolve) {
        let submitParam = {
          url: "org/authority/roleAuthorityManagementRestService/queryCurrentAdminRoleWrapeOrgTree",
          data: {
            orgId: node.data ? node.data.value : null
          }
        };
        let callBack = {
          successCallback: (data) => {
            resolve(data.data.orgVos)
          }
        };
        this.Base.submit(null, submitParam, callBack);
      },
      fnSearchUser(value) {
        let submitParam = {
          url: "org/authority/roleAuthorityManagementRestService/queryUsersNoWraperByRoleId",
          data: {
            roleId: this.role.roleId,
            orgId: 'fd811ab9c30440088df3e29ea784460a',
            includeChild: 1,
            userName: value
          }
        };
        let callBack = {
          successCallback: (data) => {
            this.userSelectData = data.data.userVos.list;
          }
        };
        if (value) {
          this.Base.submit(null, submitParam, callBack);
        }
      },
      fnQueryUserList(id, includeChild, pageNum, searchType, searchParam) {
        let param = {
          roleId: this.role.roleId,
          orgId: id,
          pageNumber: pageNum,
          pageSize: 10,
          includeChild: includeChild ? 1 : 0
        }
        if(searchType){
          param[searchType] = searchParam
        }
        let submitParam = {
          url: "org/authority/roleAuthorityManagementRestService/queryUsersNoWraperByRoleId",
          data: param
        };
        let callBack = {
          successCallback: (data) => {
            this.userListData = data.data.userVos.list;
          }
        };
        this.Base.submit(null, submitParam, callBack);
      },
      fnGetUserListResult(data) {
        let delUsers = this.defaultUserList.filter(el => {
          let userIds = [];
          data.forEach(function (value) {
            userIds.push(value.userId);
          });
          return !userIds.includes(el.userId);
        });
        let addData = data.filter(el => {
          let userIds = [];
          this.defaultUserList.forEach(function (value) {
            userIds.push(value.userId);
          });
          return !userIds.includes(el.userId);
        });
        //保存数组中有的人员
        if (addData.length > 0) {
          let userIdArry = [];
          addData.forEach(function (value, index) {
            userIdArry.push(value.userId);
          });
          let submitParam = {
            url: "org/authority/roleAuthorityManagementRestService/addBatchRoleUsers",
            data: {
              roleId: this.role.roleId,
              userIds: userIdArry.join(",")
            }
          };
          let callBack = {
            successCallback: (data) => {
              if (data.errors) {
                this.$message.error("关联人员失败");
              } else {
                this.$message.success("关联人员成功");
                this.isUserShow = false;
                this.fnQueryUsersByRoleId();
              }
            }
          };
          this.Base.submit(null, submitParam, callBack);
        }
        //删除数组中剔除的人
        if (delUsers.length > 0) {
          let delUserIdArry = [];
          delUsers.forEach(function (value, index) {
            delUserIdArry.push(value.userId);
          });
          let submitParam = {
            url: "org/authority/roleAuthorityManagementRestService/deleteBatchRoleUser",
            data: {
              roleId: this.role.roleId,
              userIds: delUserIdArry.join(",")
            }
          };
          let callBack = {
            successCallback: (data) => {
              if (data.errors) {
                this.$message.error("移除人员失败");
              } else {
                this.$message.success("移除人员成功");
                this.isUserShow = false;
                this.fnQueryUsersByRoleId();
              }
            }
          };
          this.Base.submit(null, submitParam, callBack);
        }
      },
      //分页参数
      roleUserPageParams() {
        return {
          roleId: this.role.roleId
        }
      },
      fnQueryUsersByRoleId() {
        this.$refs.roleUserPager.loadData();
      },
    },
    activated() {
      if (this.$route.params.role instanceof Object) {
        this.role = this.$route.params.role || {};
        this.fnQueryUsersByRoleId();
      } else {
        this.$router.push({name: 'publicRoleManager'})
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  .ant-tabs-tabpane-active {
    padding-top: 10px;
  }

  .notice-box {
    float: right;
    width: 100%;
  }

  .content-box {
    padding-top: 40px;
    overflow: visible;
  }
</style>
