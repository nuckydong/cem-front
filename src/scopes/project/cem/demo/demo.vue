<template>
  <div id="app" style="height: 100%">
    <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
      <ta-row slot="header" type="flex" justify="center" align="middle">
        <ta-input-search placeholder="请输入人员姓名" class="search-box" @search="onSearchUser" v-model="searchInfo" enterButton="搜索"></ta-input-search>
      </ta-row>
      <div slot="centerExtraContent">

        <div style="float: right">
          <ta-button type="primary" @click="editVisible = true; editType = '1'; rowData = {}">新增</ta-button>
          <ta-dropdown :trigger="['click']">
            <ta-menu slot="overlay">
              <ta-menu-item :disabled="btnDisable" @click="fnDeleteUser">
                <ta-icon type="delete"/>
                删除
              </ta-menu-item>
            </ta-menu>
            <ta-button>
              批量操作
              <ta-icon type="down"/>
            </ta-button>
          </ta-dropdown>
        </div>
      </div>
      <div>
        <ta-table rowKey="id" :columns="columns" :dataSource="userList" :pagination=false :locale="{filterConfirm: '确定',filterReset: '重置',emptyText: '暂无数据'}" :rowSelection="{selectedRowKeys: selectedRowKeys, onSelect: fnOnSelect, onSelectAll : fnOnSelectAll}">
          <a slot="name" slot-scope="text,record" class="operate" @click="showVisible = true; rowData = record" :class="{'disable-color': record.effective == '0' }">{{text}}</a>
          <template slot="operation" slot-scope="text, record, index">
            <a @click="editVisible = true; editType = '2'; rowData = record; editIndex = index" class="operate">编辑</a>
            <ta-divider type="vertical"/>
            <ta-popconfirm v-if="userList.length" title="确认删除该用户?" cancelText="取消" okText="确认" okType="default" @confirm="onDeleteUser(record.id)">
              <ta-icon slot="icon" type="question-circle-o" style="color: red"/>
              <a class="operate" style="color: red">删除</a>
            </ta-popconfirm>
          </template>

        </ta-table>
        <ta-pagination style="float: right; margin-top: 10px;" showSizeChanger showQuickJumper :dataSource.sync="userList" :defaultPageSize="10" :params="userPageParams" :url="userSearchUrl" ref="gridPager" />
      </div>
    </ta-border-layout>
    <!--编辑、新增框-->
    <editUser :visible="editVisible" @close="editVisible = false" :editType="editType" :rowData="rowData" @editSuccess="editSuccess" @queryTable="onSearchUser"></editUser>
    <!--人员信息展示-->
    <showUser :visible="showVisible" @close="showVisible = false" :rowData="rowData"></showUser>
    <!--批量删除-->
    <delete-input :visible="deleteVisible" :deleteUserIds="deleteUserIds" @close="deleteVisible = false" @queryTable="onSearchUser" ></delete-input>

  </div>
</template>

<script>
  import showUser from './part/showUser.vue'
  import editUser from './part/editUser.vue'
  import deleteInput from './part/deleteInput.vue'
 
  import $api from './api/index'
  const columns = [
    { title: '姓名', dataIndex: 'name', width: '15%', overflowTooltip:false, scopedSlots: {customRender: 'name'}},
    { title: '性别', dataIndex: 'gender', width: 80, scopedSlots: { customRender: 'gender' }},
    { title: '操作', dataIndex: 'operation', align: 'center', width: 240, scopedSlots: {customRender: 'operation'} }
  ]

  export default {
    name: 'app',
    data() {
      return {
        columns,
        userList:[],
        editType: '',
        editVisible: false,
        showVisible: false,
        resetVisible: false,
        deleteVisible: false,
        changeVisible: false,
        deleteUserIds:'',
        rowData:{},
        editIndex: '',
        selectedRowKeys: [],
        selectedRows: [],
        ableVisible: false,
        oneAbleVisible: false,
        disableVisible: false,
        oneDisableVisible: false,
        searchInfo: "",
        orgIds: [],
        checkedOrgChild: true,
        searchFlag:"normal",
        searchPanelResult:{},
        userSearchUrl:"demo/getPage",
        options:[],
        islockList: [],
        userEffectiveList: [],
      }
    },
    components: { editUser, showUser,deleteInput},
    computed:{
      btnDisable(){ return this.selectedRowKeys.length ? false:true }
    },
    mounted() {
      this.getUsers();
    },
    methods: {
      //分页提交参数
      userPageParams(){
        if(this.searchFlag=="normal"){
          let param = {};
        
          if ("" != this.searchInfo) {
            param.name = this.searchInfo;
          }

          param.searchType="normal";
          return param;
        }else{
          return this.searchPanelResult;
        }
      },
      //查询用户
      onSearchUser() {
        this.searchFlag="normal";
        this.getUsers();
      },
      //查询
      getUsers() {
        this.$nextTick(() => {
          this.$refs.gridPager.loadData(() => {
            // this.selectedRowKeys = [];
            // this.selectedRows = [];
          });
        });
      },
    
      fnOnSelect: function (record, selected) {
        const {selectedRowKeys, selectedRows} = this
        if(selected){
          selectedRowKeys.push(record.id);
          selectedRows.push(record);
        } else {
          this.selectedRowKeys = selectedRowKeys.filter(id => id != record.id)
          this.selectedRows = selectedRows.filter(item => item.id != record.id)
        }
      },
      fnOnSelectAll: function (selected, selectedRows) {
        this.selectedRows = [], this.selectedRowKeys = []
        if(selected){
          selectedRows.map(item => {
            this.selectedRowKeys.push(item.id)
          })
          this.selectedRows = selectedRows;
        }
      },
      //编辑
      editSuccess(record){
        this.userList[this.editIndex] = Object.assign({},this.rowData,record)
      },
      //批量删除
      fnDeleteUser(val) {
        this.deleteUserIds = this.selectedRowKeys.join(",")
        this.deleteVisible = true;
      },
      //删除操作
      onDeleteUser(id) {
        /*const dataSource = [...this.userList];
        this.userList = dataSource.filter((item) => item.userId != userId)*/
        $api.deleteBatchUserByUserIds(this, {"userIds": id}, (data) => {
          this.$message.success('删除操作成功');
          this.onSearchUser();
        });
      },
      getLastName(name){
        return name.indexOf("/") != -1 ? name.slice(name.lastIndexOf("/")+1): name
      }
    },
  };
</script>
<style type="text/scss" scoped lang="scss">
  .disable-color { color: $text-l3-color !important; }
  .color-name { color: #1890ff; cursor: pointer }
  .no-cursor {cursor: default;}
  .filter-box { display: inline-block }
  .filter-name { margin-left: 20px }
  .mg-l8 { margin-left: 8px; }
  .mg-l12 { margin-left: 12px; }
  .search-box { width: 340px; line-height:46px; margin-right: 10px; }
</style>
