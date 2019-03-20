<template>
  <div id="publicRoleManager" class="fit">
    <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
      <ta-row slot="header" type="flex" justify="center" align="middle">
        <ta-input-search placeholder="请输入角色名称" v-model="searchInfo" @search="onSearchUser" class="search-box">
          <ta-button slot="enterButton" type="primary">搜索</ta-button>
        </ta-input-search>
      </ta-row>
      <div slot="centerExtraContent" style="height: 50px;line-height: 48px;">
        <ta-cascader :value="casValue"
                     :options.sync="orgOptions"
                     :showSearch="{filter}"
                     @change="onChange"
                     changeOnSelect
                     placeholder="请选择组织机构"
                     expandTrigger="hover"
                     class="vertical-space cascader-box"
                     :fieldNames="{label:'orgName',value:'orgId',children:'children'}"
                     url="org/authority/roleAuthorityManagementRestService/queryCurrentAdminRoleWrapeOrgTree"
                     treeId="orgVos"
                     :loadedDataCallBack="fnLoadedOrgCallBack"
                     style="width:250px; margin-right: 10px;"
        />
        <ta-checkbox :checked="isSub" @change="onChangeIsSub">包含子组织</ta-checkbox>
        <ta-tag-select title="状态" :data="[{value:'1',label:'启用'},{value:'0',label:'禁用'}]" v-model="effective" @change="filterClick"></ta-tag-select>
        <ta-tag-select title="可分配该角色到子组织人员" :data="[{value:'1',label:'是'},{value:'0',label:'否'}]" v-model="subordinate" @change="filterClick"></ta-tag-select>
        <div style="float: right">
          <ta-button type="primary" @click="fnNewPublicRole">新增角色</ta-button>
          <ta-dropdown :trigger="['click']">
            <ta-menu slot="overlay">
              <ta-menu-item>
                <ta-popconfirm title="确实删除选择的角色？" @confirm="deletePublicRole" okText="确定" cancelText="取消">
                  <div>删除</div>
                </ta-popconfirm>
              </ta-menu-item>
              <ta-menu-divider/>
              <ta-menu-item @click="handleMenuClick(1)">启用</ta-menu-item>
              <ta-menu-item @click="handleMenuClick(0)">禁用</ta-menu-item>
              <ta-menu-divider/>
              <ta-menu-item key="1" @click="fnBatchRoles(1)">批量授予</ta-menu-item>
              <ta-menu-item key="2" @click="fnBatchRoles(2)">批量收回</ta-menu-item>
            </ta-menu>
            <ta-button>
              批量操作
              <ta-icon type="down"/>
            </ta-button>
          </ta-dropdown>
        </div>
      </div>
      <ta-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                :columns="roleColumns"
                :dataSource="roleData"
                :pagination=false
                :customRow="onRowClick"
                :rowClassName="changeRowStyle"
      >
        <template slot="effective" slot-scope="text, record">
          <ta-tag v-if="text==0" color="red" class="no-cursor">禁用</ta-tag>
          <ta-tag v-else color="green" class="no-cursor">启用</ta-tag>
        </template>
        <span slot="roleSign" slot-scope="text">{{CollectionLabel('ROLESIGN',text)||'--'}}</span>
        <template slot="roleOperation" slot-scope="text,record">
          <a @click="updatePublicRole(record)">编辑</a>
          <ta-divider type="vertical"/>
          <ta-dropdown :trigger="['click']">
            <a class="ant-dropdown-link">
              <ta-icon type="down-circle-o"/>
            </a>
            <ta-menu slot="overlay">
              <ta-menu-item>
                <a @click="fnRoleCopy(record)">角色复制</a>
              </ta-menu-item>
              <ta-menu-item>
                <a @click="fnAuthorityCopy(record)">权限复制</a>
              </ta-menu-item>
            </ta-menu>
          </ta-dropdown>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a @click="fnRouteToRoleUser(record)">人员管理</a>
          <ta-divider type="vertical"/>
          <ta-dropdown :trigger="['click']" v-if="record.roleMark=='1'">
            <a class="ant-dropdown-link">
              权限管理
              <ta-icon type="down"/>
            </a>
            <ta-menu slot="overlay">
              <ta-menu-item key="1" @click="fnRouteToRoleAuthority(record)">功能菜单权限管理</ta-menu-item>
              <ta-menu-item key="2" @click="fnRouteToRoleCustomAuthorituy(record)">自定义对象权限管理</ta-menu-item>
            </ta-menu>
          </ta-dropdown>
          <span v-else class="ant-dropdown-link" style="cursor: not-allowed">
              权限管理 <ta-icon type="down"/>
            </span>
        </template>
      </ta-table>
      <ta-pagination
        style="float: right; margin-top: 10px;"
        showSizeChanger
        showQuickJumper
        :dataSource.sync="roleData"
        :defaultPageSize="10"
        :params="rolePageParams"
        url="org/authority/roleAuthorityManagementRestService/queryRolesByOrgId"
        ref="roleGridPager"
      />
    </ta-border-layout>
    <ta-modal
      title="角色复制"
      centered
      v-model="roleCopyVisible"
      width="1000px"
      :bodyStyle="{height:'500px',padding:'0'}"
      :destroyOnClose=true
      :maskClosable=false
    >
      <template slot="footer">
        <ta-button @click="roleCopyVisible=false">
          取消
        </ta-button>
        <ta-button key="submit" type="primary" @click="fnRoleCopySave">
          保存
        </ta-button>
      </template>

      <roleCopy ref="roleCopyChild" v-bind:roleObj="currentSelectedPublicRole" v-bind:orgTreeData="orgOptions"
                @fnQueryRolesByOrgId="fnQueryRolesByOrgId"></roleCopy>
    </ta-modal>
    <ta-modal
      title="权限复制"
      centered
      v-model="authorityCopyVisible"
      width="1000px"
      :bodyStyle="{height:'500px',padding:'0'}"
      :destroyOnClose=true
      :maskClosable=false
    >
      <template slot="footer">
        <ta-button @click="authorityCopyVisible=false">
          取消
        </ta-button>
        <ta-button key="submit" type="primary" @click="fnAuthorityCopySave">
          保存
        </ta-button>
      </template>

      <authorityCopy ref="authorityCopyChild" v-bind:roleObj="currentSelectedPublicRole"></authorityCopy>
    </ta-modal>
    <ta-drawer
      :title="newRoleTitle"
      placement="right"
      @close="onNewRoleClose"
      :visible="newRoleVisible"
      :destroyOnClose=true
      width="500"
    >
      <newRole v-bind:updateObj="updateObj" @onNewRoleClose="onNewRoleClose"
               @fnQueryRolesByOrgId="fnQueryRolesByOrgId" ref="newRole"></newRole>
      <div slot="footer">
        <ta-button-group>
          <ta-button @click="$refs.newRole.fnResetForm()">重置</ta-button>
          <ta-button @click="$refs.newRole.fnAddOrUpdateRole()" type="primary">保存</ta-button>
        </ta-button-group>
      </div>
    </ta-drawer>

  </div>
</template>
<script>

  import roleCopy from "./roleCopy"
  import authorityCopy from "../common/authorityCopy"
  import newRole from './newRole'

  const roleColumns = [{
    title: '角色名称',
    dataIndex: 'roleName',
    width: '10%',
    overflowTooltip: true
  }, {
    title: '组织路径',
    dataIndex: 'namePath',
    width: '10%',
    overflowTooltip: 'namePath',
    customRender: (text) => {
      return text.slice(text.lastIndexOf("/") + 1);
    }
  }, {
    title: '有效期',
    dataIndex: 'effectiveTime',
    width: '10%',
    customRender: (text) => {
      return text ? text.split(' ')[0] : '永久'
    }
  }, {
    title: '角色标识',
    dataIndex: 'roleSign',
    width: '10%',
    scopedSlots: {customRender: 'roleSign'}
  }, {
    title: '可分配该角色到子组织人员',
    dataIndex: 'subordinate',
    width: '15%',
    customRender: function (text) {
      return text == "1" ? "是" : "否"
    },
    align: 'center'
  }, {
    title: '角色描述',
    dataIndex: 'roleDesc',
    customRender: function (text) {
      return text ? text : "--";
    },
    width: '10%',
    overflowTooltip: true
  }, {
    title: '状态',
    dataIndex: 'effective',
    width: '5%',
    scopedSlots: {customRender: 'effective'},
  }, {
    title: '角色操作',
    dataIndex: 'roleOperation',
    scopedSlots: {customRender: 'roleOperation'},
    width: '10%',
    align: 'center'
  }, {
    title: '管理',
    dataIndex: 'operation',
    scopedSlots: {customRender: 'operation'},
    width: '20%',
    align: 'center'
  }];


  export default {
    name: "publicRoleManager",
    components: {roleCopy, authorityCopy, newRole},
    data() {
      return {
        searchInfo: '',
        orgOptions: [],
        isSub: true,
        casValue: [],
        roleColumns,
        roleData: [],
        selectedRowKeys: [],
        selectedPublicRole: [],
        currentSelectedPublicRole: {},
        roleCopyVisible: false,
        authorityCopyVisible: false,
        updateObj: {},
        newRoleVisible: false,
        newRoleTitle: "新增角色",
        batchRoles: {},
        effective:[],
        subordinate:[],

      }
    },
    methods: {
      //搜索
      onSearchUser(){
        this.fnQueryRolesByOrgId();
      },
      //条件查询变更
      filterClick(){
        this.fnQueryRolesByOrgId();
      },
      //分页参数
      rolePageParams() {
        return {
          orgId: this.casValue.length > 0 ? this.casValue[this.casValue.length - 1] : this.orgOptions[0].orgId,//'fd811ab9c30440088df3e29ea784460a',
          isSub: this.isSub,
          roleType: "01",
          roleName:this.searchInfo,
          effective: this.effective.length>0?this.effective[0]:null,
          subordinate:this.subordinate.length>0?this.subordinate[0]:null,
        }
      },
      //路由到角色下人员界面
      fnRouteToRoleUser(record) {
        this.$router.push(
          {
            name: 'publicRoleUser',
            params: {
              role: record,
            }
          }
        );
      },
      //路由到权限菜单界面
      fnRouteToRoleAuthority(record) {
        this.$router.push(
          {
            name: 'publicRoleAuthority',
            params: {
              role: record,
            }
          }
        );
      },
      fnRouteToRoleCustomAuthorituy(record) {
        this.$router.push(
          {
            name: 'publicRoleCustomAuthority',
            params: {
              role: record,
            }
          }
        );
      },

      fnBatchRoles(type) {
        if (this.selectedPublicRole.length < 1) {
          this.$message.warn('请先选择角色');
          return;
        }
        this.$router.push({
          name: 'batchAuthority',
          params: {
            roles: this.selectedPublicRole,
            batchType: type == 1 ? "add" : "delete"
          }
        });
      },


      fnAuthorityMgSave() {
        this.$refs.authorityMgChild.fnSave();
      },
      onNewRoleClose() {
        this.newRoleVisible = false
      },
      handleMenuClick(e) {
        var roleIdArry = [];
        this.selectedPublicRole.forEach(function (value, index) {
          roleIdArry.push(value.roleId);
        });
        if (roleIdArry.length < 1) {
          this.$message.warn("请先勾选要操作的角色");
          return;
        }
        var submitParam = {
          url: "org/authority/roleAuthorityManagementRestService/updateRoleEffectiveByRoleId",
          data: {
            roleIds: roleIdArry.join(","),
            effective: e == "1" ? "1" : "0"
          }
        };
        var callBack = {
          successCallback: (data) => {
            this.fnQueryRolesByOrgId();
          }
        };
        this.Base.submit(null, submitParam, callBack);
      },
      deletePublicRole() {
        let roleIdArry = [];
        this.selectedPublicRole.forEach(function (value, index) {
          roleIdArry.push(value.roleId);
        });
        if (roleIdArry.length < 1) {
          this.$message.warn("请勾选要删除的角色");
          return;
        }
        let submitParam = {
          url: "org/authority/roleAuthorityManagementRestService/deleteBatchRole",
          data: {
            roleIds: roleIdArry.join(",")
          }
        };
        let callBack = {
          successCallback: (data) => {
            if (data.errors) {
              this.$message.error('删除角色失败');
            } else {
              this.$message.success('删除角色成功')
              this.fnQueryRolesByOrgId();
            }
          }
        };
        this.Base.submit(null, submitParam, callBack);
      },
      fnLoadedOrgCallBack(data) {
        this.fnQueryRolesByOrgId();
      },
      onChange(value, selectedOptions) {
        this.casValue = value;
        this.fnQueryRolesByOrgId();
      },
      onChangeIsSub(e) {
        this.isSub = e.target.checked;
        this.fnQueryRolesByOrgId();
      },
      filter(inputValue, path) {
        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
      },
      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectedPublicRole = selectedRows;
      },
      onRowClick(record, index) {
        return {
          on: {
            click: () => {
              this.currentSelectedPublicRole = record;
              this.rowFlag = index;
            }
          }
        }
      },
      changeRowStyle(record, index) {
        if (this.rowFlag == index) {
          return "row-active-bg";
        }
      },
      fnRoleCopy(record) {
        this.roleCopyVisible = true;
        this.currentSelectedPublicRole = record;
      },
      fnRoleCopySave() {
        this.$refs.roleCopyChild.fnSave();
      },
      fnAuthorityCopy(record) {
        this.authorityCopyVisible = true;
        this.currentSelectedPublicRole = record;
      },
      fnAuthorityCopySave() {
        this.$refs.authorityCopyChild.fnSave();
      },
      fnNewPublicRole() {
        this.newRoleTitle = "新增角色"
        this.newRoleVisible = true;
        this.updateObj = {
          isUpdate: false,
        }
      },
      updatePublicRole(record) {
        this.newRoleTitle = "修改角色"
        this.newRoleVisible = true;
        this.updateObj = {
          isUpdate: true,
          roleObj: record
        }
      },
      fnQueryRolesByOrgId() {
        this.$refs.roleGridPager.loadData();
      },
    },
    mounted() {

    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

  .row-active-bg {
    background: #E6F7FF;
  }

  .cascader-box {
    width: 50%;
  }

  .ant-divider-vertical {
    margin: 0 3px;
  }

  .ant-modal-header {
    text-align: center;
  }

  .ant-modal-footer {
    text-align: center;
  }

  .ant-tabs-tabpane-active {
    padding-top: 10px;
  }

  .vertical-space {
    margin-bottom: 10px;
    &.btn-group-position {
      float: left;
    }
  }

  .ant-calendar-picker-container {
    z-index: 2012;
  }

  .no-cursor {
    cursor: default;
  }

  .search-box {
    width: 340px;
    line-height: 46px;
    margin-right: 10px;
  }

  .filter-name {
    margin-left: 20px
  }

  .filter-box {
    display: inline-block
  }

</style>
