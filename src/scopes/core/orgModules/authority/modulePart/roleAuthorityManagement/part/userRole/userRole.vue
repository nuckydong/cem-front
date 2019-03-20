<template>
  <div id="userRole" class="fit">
    <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
    <ta-row slot="header" type="flex" justify="center" align="middle">
      <ta-input-search placeholder="请输入人员姓名、帐号、证件号" @search="onSearchUser" v-model="searchInfo" class="search-box">
        <ta-button slot="enterButton" type="primary">搜索</ta-button>
      </ta-input-search>
    </ta-row>
    <div slot="centerExtraContent" style="height: 50px;line-height: 48px;">
      <ta-cascader :value="casValue"
                   :options.sync="orgOptions"
                   :showSearch="{filter}"
                   @change="onChange"
                   changeOnSelect
                   placeholder="请选择人员所属组织"
                   expandTrigger="hover"
                   :fieldNames="{label:'orgName',value:'orgId',children:'children'}"
                   url="org/authority/roleAuthorityManagementRestService/queryCurrentAdminRoleWrapeOrgTree"
                   treeId="orgVos"
                   style="width:250px; margin-right: 10px;"
                   :loadedDataCallBack="fnLoadedOrgCallBack"
      />
      <ta-checkbox :checked="isSub" @change="onChangeIsSub">包含子组织</ta-checkbox>
      <ta-tag-select title="锁定" :data="[{value: '1', label: '是'},{value: '0', label: '否'}]" v-model="islockList" @change="filterClick" class="filter-name"></ta-tag-select>
    </div>
        <ta-table :columns="userColumns"
                  :dataSource="userList"
                  :pagination=false
        >
          <span slot="sex" slot-scope="text">{{CollectionLabel('SEX',text)||'--'}}</span>
          <span slot="mobile" slot-scope="text">{{text ? text : '--'}}</span>
          <span slot="isLock" slot-scope="text">
                <ta-tag v-if="text == '1'" color="red" class='no-cursor'>是</ta-tag>
                <ta-tag v-else color="green" class='no-cursor'>否</ta-tag>
              </span>
          <span slot="effective" slot-scope="text">
                <ta-tag v-if="text == '1'" color="green" class='no-cursor'>有效</ta-tag>
                <ta-tag v-else color="red" class='no-cursor'>无效</ta-tag>
              </span>
          <template slot="operation" slot-scope="text, record" >
            <span v-if="record.admin=='1'" class="rolemg-not-allow" title="该人员为管理员，不能分配角色">角色管理</span>
            <a v-else @click="fnRouteToRoleMg(record)">角色管理</a>
          </template>
        </ta-table>
        <ta-pagination
          style="float: right;margin-top: 10px"
          showSizeChanger
          showQuickJumper
          :dataSource.sync="userList"
          :defaultPageSize="10"
          :params="userPageParams"
            url="org/authority/roleAuthorityManagementRestService/queryUserByCondition"
          ref="gridPager"
        />
    </ta-border-layout>
  </div>
</template>
<script>

  const userColumns = [
    {title: '姓名', dataIndex: 'name', width: '15%', overflowTooltip: false, scopedSlots: {customRender: 'name'}},
    {title: '帐号', dataIndex: 'loginId', width: '15%', overflowTooltip: true},
    {title: '性别', dataIndex: 'sex', width: 80, scopedSlots: {customRender: 'sex'}},
    {
      title: '所属组织', width: '15%', overflowTooltip: 'namePath', dataIndex: 'namePath', customRender: (text) => {
        return text.slice(text.lastIndexOf("/") + 1);
      }
    },
    {title: '手机号', dataIndex: 'mobile', width: '15%', overflowTooltip: true, scopedSlots: {customRender: 'mobile'}},
    {title: '锁定', dataIndex: 'isLock', width: 80, scopedSlots: {customRender: 'isLock'}},
    {title: '操作', dataIndex: 'operation', align: 'center', width: 240, scopedSlots: {customRender: 'operation'}}
  ];

  export default {
    name:'userRole',
    data(){
      return {
        orgOptions: [],
        casValue: [],
        isSub: true,
        userColumns,
        userList:[],
        searchInfo: "",
        islockList:[],
      }
    },
    methods:{
      fnRouteToRoleMg(record){
        this.$router.push(
          {
            name: 'roleMg',
            params: {
              user: record,
            }
          }
        );
      },
      filter(inputValue, path) {
        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
      },
      onChange(value, selectedOptions) {
        this.casValue = value;
        this.$nextTick(() => {
          this.fnQueryUserByOrgId();
        });
      },
      onChangeIsSub(e) {
        this.isSub = e.target.checked;
        this.$nextTick(() => {
          this.fnQueryUserByOrgId();
        });
      },
      fnLoadedOrgCallBack(data){
        this.fnQueryUserByOrgId();
      },
      fnQueryUserByOrgId(){
        this.$refs.gridPager.loadData();
      },
      onSearchUser(){
        this.fnQueryUserByOrgId();
      },
      userPageParams(){
        let params = {};
        params.orgId = this.casValue.length>0?this.casValue[this.casValue.length - 1]:this.orgOptions[0].orgId;
        params.showChildUser = this.isSub?'1':'0';
        params.searchType = 'normal';
        if ("" !== this.searchInfo) {
          params.name = this.searchInfo;
          params.loginId = this.searchInfo;
          params.idCardNo = this.searchInfo;
        }
        params.islock = this.islockList;
        return params;
      },
      filterClick(){
        this.fnQueryUserByOrgId();
      },
    },
    mounted(){
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

  .rolemg-not-allow{
    cursor: not-allowed;
    color: #ccc;
  }
</style>
