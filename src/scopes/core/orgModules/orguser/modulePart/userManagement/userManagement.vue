<template>
  <div id="app" style="height: 100%">
    <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
      <ta-row slot="header" type="flex" justify="center" align="middle">
        <ta-input-search placeholder="请输入人员姓名、帐号" class="search-box" @search="onSearchUser" v-model="searchInfo" enterButton="搜索"></ta-input-search>
        <userSearchPanel @dealSearchPanelResult="dealSearchPanelResult"></userSearchPanel>
      </ta-row>
      <div slot="centerExtraContent">
        <ta-cascader
          url="org/orguser/orgManagementRestService/getOrgByAsync"
          treeId="orgTreeData"
          :options.sync="options"
          expandTrigger="hover"
          changeOnSelect
          :fieldNames="{ label: 'orgName', value: 'orgId', children: 'children' }"
          @change="changeOrg"
          style="width:250px; margin-right: 10px;"
          placeholder="请选择人员的所属组织"/>
        <ta-checkbox @change="onChangeChildOrg" :checked="checkedOrgChild">包含子组织</ta-checkbox>
        <ta-tag-select title="锁定" :data="CollectionData('YESORNO')" v-model="islockList" @change="onSearchUser" class="filter-name"></ta-tag-select>
        <ta-tag-select title="有效性" :data="CollectionData('EFFECTIVE')" v-model="userEffectiveList" @change="onSearchUser" class="filter-name"></ta-tag-select>
        <div style="float: right">
          <ta-button type="primary" @click="editVisible = true; editType = '1'; rowData = {}">新增</ta-button>
          <ta-dropdown :trigger="['click']">
            <ta-menu slot="overlay">
              <ta-menu-item :disabled="btnDisable" @click="fnDeleteUser">
                <ta-icon type="delete"/>
                删除
              </ta-menu-item>
              <ta-menu-item :disabled="btnDisable" @click="ableVisible = true">
                <ta-popconfirm title="确认启用所选账户?" cancelText="取消" okText="确认" :visible="ableVisible" @cancel="ableVisible = false" @confirm="changeEffectiveUnlock(1)">
                  <ta-icon type="user-add"></ta-icon>
                  <span class="mg-l12">启用</span>
                </ta-popconfirm>
              </ta-menu-item>
              <ta-menu-item :disabled="btnDisable" @click="disableVisible = true">
                <ta-popconfirm title="确认禁用所选账户?" cancelText="取消" okText="确认" :visible="disableVisible" @cancel="disableVisible = false" @confirm="changeEffectiveUnlock(2)">
                  <ta-icon type="user-delete"/>
                  <span class="mg-l12">禁用</span>
                </ta-popconfirm>
              </ta-menu-item>
              <ta-menu-item :disabled="btnDisable" @click="changeEffectiveUnlock(3)">
                <ta-icon type="unlock"/>
                解锁
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
        <ta-table rowKey="userId" :columns="columns" :dataSource="userList" :pagination=false :locale="{filterConfirm: '确定',filterReset: '重置',emptyText: '暂无数据'}" :rowSelection="{selectedRowKeys: selectedRowKeys, onSelect: fnOnSelect, onSelectAll : fnOnSelectAll}">
          <a slot="name" slot-scope="text,record" class="operate" @click="showVisible = true; rowData = record" :class="{'disable-color': record.effective == '0' }">{{text}}</a>
          <span slot="sex" slot-scope="text">{{CollectionLabel('SEX', text)}}</span>
          <span slot="taOrgVo.namePath" slot-scope="text">{{getLastName(text)}}</span>
          <span slot="mobile" slot-scope="text">{{text ? text : '--'}}</span>
          <span slot="isLock" slot-scope="text">
                <ta-tag v-if="text == '1'" color="red" class='no-cursor'>是</ta-tag>
                <ta-tag v-else color="green" class='no-cursor'>否</ta-tag>
              </span>
          <span slot="effective" slot-scope="text">
                <ta-tag v-if="text == '1'" color="green" class='no-cursor'>有效</ta-tag>
                <ta-tag v-else color="red" class='no-cursor'>无效</ta-tag>
              </span>
          <template slot="operation" slot-scope="text, record, index">
            <a @click="editVisible = true; editType = '2'; rowData = record; editIndex = index" class="operate">编辑</a>
            <ta-divider type="vertical"/>
            <ta-popconfirm v-if="userList.length" title="确认删除该用户?" cancelText="取消" okText="确认" okType="default" @confirm="onDeleteUser(record.userId)">
              <ta-icon slot="icon" type="question-circle-o" style="color: red"/>
              <a class="operate">删除</a>
            </ta-popconfirm>
            <ta-divider type="vertical"/>
            <ta-dropdown :trigger="['click']">
              <a class="operate">更多<ta-icon type="down"/></a>
              <ta-menu slot="overlay">
                <ta-menu-item key="2" @click="oneAbleVisible = true">
                  <ta-popconfirm title="确认启用该账户?" cancelText="取消" okText="确认" :visible="oneAbleVisible" @cancel="oneAbleVisible = false" @confirm="changeEffectiveUnlock(1,record)">
                    <span class="mg-l8">启用</span>
                  </ta-popconfirm>
                </ta-menu-item>
                <ta-menu-item key="3" @click="oneDisableVisible = true">
                  <ta-popconfirm title="确认禁用该账户?" cancelText="取消" okText="确认" :visible="oneDisableVisible" @cancel="oneDisableVisible = false" @confirm="changeEffectiveUnlock(2,record)">
                    <span class="mg-l8">禁用</span>
                  </ta-popconfirm>
                </ta-menu-item>
                <ta-menu-item key="4"><a @click="changeEffectiveUnlock(3,record)"><span class="mg-l8">解锁</span></a></ta-menu-item>
                <ta-menu-item><a @click="changeVisible = true; rowData = record"><span class="mg-l8">更改组织</span></a></ta-menu-item>
                <ta-menu-item><a @click="resetVisible = true; rowData = record"><span class="mg-l8">重置密码</span></a></ta-menu-item>
              </ta-menu>
            </ta-dropdown>
          </template>
        </ta-table>
        <ta-pagination style="float: right; margin-top: 10px;" showSizeChanger showQuickJumper :dataSource.sync="userList" :defaultPageSize="10" :params="userPageParams" :url="userSearchUrl" ref="gridPager" />
      </div>
    </ta-border-layout>
    <!--编辑、新增框-->
    <edit-user :visible="editVisible" @close="editVisible = false" :editType="editType" :rowData="rowData" @editSuccess="editSuccess" @queryTable="onSearchUser"></edit-user>
    <!--人员信息展示-->
    <showUser :visible="showVisible" @close="showVisible = false" :rowData="rowData"></showUser>
    <!--重置密码-->
    <reset-pwd :visible="resetVisible" @close="resetVisible = false" :userId="rowData.userId" @queryTable="onSearchUser"></reset-pwd>
    <!--批量删除-->
    <delete-input :visible="deleteVisible" :deleteUserIds="deleteUserIds" @close="deleteVisible = false" @queryTable="onSearchUser" ></delete-input>
    <!--更改组织-->
    <change-org :visible="changeVisible" :rowData="rowData" @close="changeVisible = false" @queryTable="onSearchUser" ></change-org>
  </div>
</template>

<script>
  import showUser from './part/showUser.vue'
  import editUser from './part/editUser.vue'
  import userSearchPanel from './part/searchPanel.vue'
  import resetPwd from './part/resetPwd.vue'
  import deleteInput from './part/deleteInput.vue'
  import changeOrg from './part/changeOrg.vue'
  import $api from './api/index'
  const columns = [
    { title: '姓名', dataIndex: 'name', width: '15%', overflowTooltip:false, scopedSlots: {customRender: 'name'}},
    { title: '帐号', dataIndex: 'loginId', width: '15%', overflowTooltip:true},
    { title: '性别', dataIndex: 'sex', width: 80, scopedSlots: { customRender: 'sex' }},
    { title: '所属组织', width: '15%', overflowTooltip: 'taOrgVo.namePath', dataIndex: 'taOrgVo.namePath', scopedSlots: {customRender: 'taOrgVo.namePath'}},
    { title: '手机号', dataIndex: 'mobile', width: '15%', overflowTooltip:true, scopedSlots: {customRender: 'mobile'} },
    { title: '锁定', dataIndex: 'isLock', width: 80, scopedSlots: {customRender: 'isLock'} },
    { title: '有效性', dataIndex: 'effective', width: 80, scopedSlots: {customRender: 'effective'} },
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
        userSearchUrl:"org/orguser/userManagementRestService/queryUserByConditon",
        options:[],
        islockList: [],
        userEffectiveList: [],
      }
    },
    components: { editUser, showUser,userSearchPanel,resetPwd,deleteInput,changeOrg},
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
          //所属组织框
          let orgIds = this.orgIds.orgIds;
          if (orgIds != undefined && orgIds != "") {
            let orgId = orgIds[orgIds.length - 1];
            param.orgId = orgId;
          }
          //子组织按钮
          let showChildUser = this.checkedOrgChild ? "true" : "false";
          if ("" != this.searchInfo) {
            param.name = this.searchInfo;
            param.loginId = this.searchInfo;
            param.idCardNo = this.searchInfo;
          }
          param.showChildUser = showChildUser;
          param.islock = this.islockList
          param.userEffective = this.userEffectiveList
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
      // 处理高级查询的返回值
      dealSearchPanelResult(data){
        this.searchFlag="advance";
        if (data != null) {
          this.searchPanelResult = data;
        }
        this.searchPanelResult.searchType="advance";
        this.getUsers();
      },
      fnOnSelect: function (record, selected) {
        const {selectedRowKeys, selectedRows} = this
        if(selected){
          selectedRowKeys.push(record.userId);
          selectedRows.push(record);
        } else {
          this.selectedRowKeys = selectedRowKeys.filter(userId => userId != record.userId)
          this.selectedRows = selectedRows.filter(item => item.userId != record.userId)
        }
      },
      fnOnSelectAll: function (selected, selectedRows) {
        this.selectedRows = [], this.selectedRowKeys = []
        if(selected){
          selectedRows.map(item => {
            this.selectedRowKeys.push(item.userId)
          })
          this.selectedRows = selectedRows;
        }
      },
      //选择所属组织完成查询
      changeOrg(data){
        this.orgIds = {'orgIds': data}
        this.onSearchUser();
      },
      //包含子组织
      onChangeChildOrg(e) {
        this.checkedOrgChild = e.target.checked
        this.onSearchUser();
      },
      //编辑
      editSuccess(record){
        this.userList[this.editIndex] = Object.assign({},this.rowData,record)
      },
      // 启用1 禁用2 解锁3
      changeEffectiveUnlock(type,record){
        let userIds = [];
        const dataSource = [...this.userList];
        if(record){
          if(type == 1){
            if(record.effective == '0'){
              userIds.push(record.userId);
            }
          } else if(type == 2){
            if(record.effective == '1'){
              userIds.push(record.userId);
            }
          } else {
            if(record.isLock == '1'){
              userIds.push(record.userId);
            }
          }
        }else{
          const {selectedRows} = this
          for (let i = 0; i < selectedRows.length; i++) {
            if(type == 1){
              if(selectedRows[i].effective == '0'){
                userIds.push(selectedRows[i].userId);
              }
            } else if(type == 2){
              if(selectedRows[i].effective == '1'){
                userIds.push(selectedRows[i].userId);
              }
            } else {
              if(selectedRows[i].isLock == '1'){
                userIds.push(selectedRows[i].userId);
              }
            }
          }
        }
        if(userIds.length == 0){
          this.$message.warning('所选项已是'+(type == 1?'启用': (type == 2? '禁用':'正常'))+'状态');
          this.disableVisible = false;
          this.oneDisableVisible = false;
          this.ableVisible = false;
          this.oneAbleVisible = false;
          return false
        }

        $api.changeEffectiveUnlock(this, {"userIds": userIds.join(","), "type": type}, (data) => {
          this.userList = dataSource.filter((item) => {
            if (userIds.indexOf(item.userId) > -1) {
              if(type == 3){
                item.isLock = '0'
              } else {
                item.effective = type == 1 ? '1':'0'
              }
            }
            return item;
          });
          this.selectedRowKeys = []
          this.selectedRows = []
          if(type == 3){
            this.$message.success('解锁成功');
          } else {
            this.$message.success((type == 1 ? '启用':'禁用')+'成功');
            this.disableVisible = false;
            this.oneDisableVisible = false;
            this.ableVisible = false;
            this.oneAbleVisible = false;
          }
        });
      },
      //批量删除
      fnDeleteUser(val) {
        this.deleteUserIds = this.selectedRowKeys.join(",")
        this.deleteVisible = true;
      },
      //删除操作
      onDeleteUser(userId) {
        /*const dataSource = [...this.userList];
        this.userList = dataSource.filter((item) => item.userId != userId)*/
        $api.deleteBatchUserByUserIds(this, {"userIds": userId}, (data) => {
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
