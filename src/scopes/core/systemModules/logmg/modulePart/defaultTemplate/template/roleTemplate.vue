<template>
  <div id="roleTemplate"  class="fit">
    <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: false}">
      <ta-row slot="header" type="flex" justify="center" align="middle">
        <ta-input-search placeholder="请输入角色名称" @search="onSearchUser1" v-model="searchInfo1"
                         class="search-box">
          <ta-button slot="enterButton" type="primary">搜索</ta-button>
        </ta-input-search>
      </ta-row>
      <div class="fit">
        <ta-table
          :columns="roleColumns"
          :dataSource="roleData"
          size="small"
          :pagination='false'
        >
          <template slot="eff" slot-scope="text, record">
            <a @click="factotum(record)">修改默认模板</a>
          </template>
        </ta-table>
        <ta-pagination
          style="float: right;margin-top: 10px"
          showSizeChanger
          showQuickJumper
          :dataSource.sync="roleData"
          :defaultPageSize="8"
          :params="pageParams"
          url="org/sysmg/WorkbenchManageRestService/queryRole"
          ref="gridPager"
        />
      </div>
    </ta-border-layout>
  </div>
</template>

<script>
  const roleColumns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      width: '22%',
      overflowTooltip: true,
      scopedSlots: {customRender: 'rolename'},
    }, {
      title: '组织名称',
      dataIndex: 'namePath',
      width: '22%',
      overflowTooltip: 'namePath',
      customRender: (text) => {
        return text.slice(text.lastIndexOf("/") + 1);
      }
    },
    {
      title: '角色描述',
      dataIndex: 'roleDesc',
      customRender: function (text) {
        return text ? text : "--";
      },
      width: '27%',
      overflowTooltip: true
    },
    {
      title: '操作',
      dataIndex: 'eff',
      width: '28%',
      scopedSlots: {customRender: 'eff'},
    }];

  export default {
    name: "roleTemplate",
    data() {
      return {
        roleColumns,
        roleData: [], // 表格数据
        searchInfo1: '',
      }
    },
    mounted() {
      // this.showDrawer();
      this.$refs.gridPager.loadData();
    },

    methods: {
      pageParams(){
        let param = {};
        param.searchInfo1= this.searchInfo1;
        return param;
      },
      onSearchUser1() {
        this.$refs.gridPager.loadData();
      },
      factotum(record) {
        window.location.href = 'worktable.html?roleid=' + record.roleId;
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  .ant-tabs-tabpane-active{
    padding-top: 10px;
  }
  .search-box { width: 340px; line-height:46px; margin-right: 10px; }
  .no-cursor {cursor: default;}
  .filter-name { margin-left: 20px }
  .filter-box { display: inline-block }
</style>
