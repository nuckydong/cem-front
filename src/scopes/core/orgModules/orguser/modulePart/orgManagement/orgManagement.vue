<template>
  <div style="height: 100%">
    <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
      <ta-row slot="header" type="flex" justify="center" align="middle">
        <ta-input-search v-model="param" placeholder="根据名称、自定义编码、拼音简写查询" class="search-box" @search="searchQuery"  enterButton="搜索"  />
        <search-info :areaOptions="areaOptions" @search="fnQuery"></search-info>
      </ta-row>
      <div slot="centerExtraContent" style="line-height: 44px;">
        <ta-tag-select title="组织类型" :data="CollectionData('ORGTYPE')" :is-multi="true" v-model="orgTypeParam" @change="searchQuery"></ta-tag-select>
        <div style="float: right;">
          <ta-button key="delete" @click="confirmDeleteResource">删除</ta-button>
          <ta-button-group >
            <ta-button key="disable" @click="disableOrEnable('0')">禁用</ta-button>
            <ta-button key="enable" @click="disableOrEnable('1')">启用</ta-button>
          </ta-button-group>
        </div>
      </div>

      <ta-table :columns="columns"
                style="width:100%;"
                :pagination='false'
                rowKey="orgId"
                :defaultExpandedRowKeys="defaultExpandedRowKeys"
                :expandedRowKeys="defaultExpandedRowKeys"
                :data-source="gridData"
                @expand="loadChild"
                :rowSelection="{selectedRowKeys: selectedRowKeys, onSelect: fnOnSelect, onSelectAll : fnOnSelectAll, getCheckboxProps:(record)=>({ props: { disabled: record.isAuthority == '0' } })}">
        <a slot="orgName" slot-scope="text,record" class="operate" @click="operateClick(record, '3')" :class="{'disable-color': record.effective == '0' }">{{text}}</a>
        <span slot="orgType" slot-scope="text">{{CollectionLabel('orgType', text)}}</span>
        <span slot="area" slot-scope="text">{{text? getLastName(text): '--'}}</span>
        <span slot="customNo" slot-scope="text,record">{{text ? text : '--'}}</span>
        <span slot="action" slot-scope="text, record">
                   <a @click="operateClick(record, '1')" class="operate" :class="{'disable-color': record.effective == '0' || record.isAuthority == '0'}">添加下级</a>
                   <ta-divider type="vertical"/>
                   <a @click="operateClick(record, '2')" class="operate" :class="{'disable-color': record.isAuthority == '0'}">编辑</a>
                   <ta-divider type="vertical" />
                   <a v-if="record.porgId == '0' || record.isAuthority == '0'" @click="deleteConfirm(record)" class='operate disable-color'>删除</a>
                  <ta-popconfirm v-else title="确定删除该组织机构?" @confirm="deleteConfirm(record)" ok-text="确定" okType="default" cancel-text="取消">
                      <a class='operate'>删除</a>
                  </ta-popconfirm>
              </span>
      </ta-table>
    </ta-border-layout>
    <!--编辑、新增框-->
    <edit-org :visible="editVisible" :editType="editType" :rowData="rowData" :areaOptions="areaOptions" :tags="tags" @close="editVisible = false" @search="fnQuery" @addSuccess="addSuccess"></edit-org>
    <!--显示框-->
    <show-org :visible="showVisible" :rowData="rowData" :tags="tags" @close="showVisible = false"></show-org>
    <!--批量删除框-->
    <delete-input :visible="deleteVisible" :deleteOrgIds="deleteOrgIds" @close="deleteVisible = false" @setDataList="setDataList"></delete-input>
  </div>
</template>

<script>
  import $api from './api/index'

  import searchInfo from './part/searchInfo'
  import editOrg from './part/editOrg'
  import showOrg from './part/showOrg'
  import deleteInput from './part/deleteInput'

  import treeDataUtil from '@common/js/util/treeDataUtil'
  const columns = [
    { title: '组织名称', dataIndex: 'orgName', width: '40%', overflowTooltip:false, scopedSlots: {customRender: 'orgName'}},
    { title: '组织类型', dataIndex: 'orgType', width: '15%', scopedSlots: {customRender: 'orgType'} },
    { title: '所属行政区', dataIndex: 'area', width: '15%', overflowTooltip: 'area', scopedSlots: {customRender: 'area'} },
    { title: '自定义编码', dataIndex: 'customNo', width: '15%', scopedSlots: {customRender: 'customNo'} },
    { title: '操作', align: 'center', width: 240, scopedSlots: {customRender: 'action'} }];
  export default {
    name: "app",
    data() {
      return {
        defaultExpandedRowKeys: ['fd811ab9c30440088df3e29ea784460a'],
        columns: columns,
        gridData: [],
        tags: [],
        areaOptions: [],
        editVisible: false,
        showVisible: false,
        deleteVisible: false,
        editType: '',
        rowData:{},
        dataList: [],
        selectedRowKeys: [],
        deleteOrgIds: "",
        param: '',
        orgTypeParam:[]
      }
    },
    components:{searchInfo,editOrg,showOrg,deleteInput},
    mounted() {
      this.fnQuery();
    },
    methods: {
      /*查询表格数据*/
      fnQuery: function (obj = {}) {
        this.defaultExpandedRowKeys = ['fd811ab9c30440088df3e29ea784460a']
        obj.needSearch = obj.needSearch == '1' ? '1' : '0';
        $api.queryAllOrgByOrgId(this, obj, (data) => {
          this.gridData = data.data.orgData;
          this.areaOptions = data.data.areaResult;
          this.tags = data.data.tags;
        });
      },
      //点击搜索
      searchQuery(){
        let data = {}
        data.needSearch = (this.param.length || this.orgTypeParam.length ) ? '1' : '0';
        if(this.orgTypeParam.length){
          data.orgTypeParam = this.orgTypeParam.join(',')
        }
        if(this.param.length){
          data.param = this.param
        }
        this.fnQuery(data)
      },
      operateClick: function (obj, type) {
        if(type == '3'){
          this.rowData = obj
          this.showVisible = true
          return;
        }

        if(obj.isAuthority == '0') {
          this.$message.destroy();
          this.$message.warning("你没有当前组织的管理权限");
          return;
        }

        if(type == '1' && obj.effective == '0') {
          this.$message.warning("禁用的组织不允许添加下级");
          return;
        }
        this.editVisible = true
        this.editType = type;
        this.rowData = obj
      },
      fnOnSelect: function (record, selected) {
        const {selectedRowKeys, dataList} = this
        if(selected){
          selectedRowKeys.push(record.orgId);
          dataList.push(record);
        } else {
          this.selectedRowKeys = selectedRowKeys.filter(orgId => orgId != record.orgId)
          this.dataList = dataList.filter(item => item.orgId != record.orgId)
        }
      },
      fnOnSelectAll: function (selected, selectedRows) {
        this.dataList = [], this.selectedRowKeys = []
        if(selected){
          selectedRows.map(item => {
            this.selectedRowKeys.push(item.orgId)
          })
          this.dataList = selectedRows;
        }
      },
      confirmDeleteResource: function () {
        if (this.dataList.length == 0) {
          this.$message.warning('请选择需要删除的组织机构');
        } else {
          let tempOrgIds = [];
          for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i].porgId == '0') {
              this.$message.warning('选中的组织包含顶级组织,请重新选择');
              return;
            }
            tempOrgIds.push(this.dataList[i].orgId)
          }
          if(tempOrgIds.length){
            this.deleteOrgIds = tempOrgIds.join(",")
            this.deleteVisible = true;
          }
        }
      },
      setDataList(){
        treeDataUtil.removeTreeData(this.gridData, this.dataList, 'orgId')
      },
      disableOrEnable(type){
        /*type:'1' 启用 '0'：禁用*/
        if (this.dataList.length < 1) {
          this.$message.warning('请选择需要'+(type == '1'?'启用':'禁用')+'的组织机构');
          return;
        }
        let orgIdList = [], orgIdDataList = [];
        for (let i = 0; i < this.dataList.length; i++) {
          if(this.dataList[i].effective != type){
            orgIdList.push(this.dataList[i].orgId)
            orgIdDataList.push(this.dataList[i])
          }
        }

        if(orgIdList.length == 0){
          this.$message.warning('所选项已是'+(type == '1'?'启用':'禁用')+'状态');
          return false
        }

        $api.disableOrEnableOrgs(this, {'orgIds': orgIdList.join(','), 'type': type}, (data) => {
          this.$message.success((type == '1' ?'启用':'禁用') + '成功');
          treeDataUtil.updateTreeDataDown(this.gridData, orgIdDataList, {effective: type},'orgId')
        });
      },
      //点击行展开时  加载下级组织机构
      loadChild(expanded, record) {
        // 如果为展开,则进行请求
        let orgId = record.orgId
        if (expanded) {
          if(record.children && record.children.length){
            this.defaultExpandedRowKeys.push(orgId);
          } else {
            $api.queryChildOrgByOrgId(this, {orgId: orgId}, (data) => {
              record.children = data.data.childOrg;
              this.defaultExpandedRowKeys.push(orgId);
            });
          }
        } else {
          // 如果为关闭,则进行关闭
          let index = this.defaultExpandedRowKeys.indexOf(orgId);
          this.defaultExpandedRowKeys.splice(index, 1);
        }
      },
      deleteConfirm(record) {
        this.$message.destroy();
        if (record.porgId == '0') {
          this.$message.warning("组织机构顶级节点不允许删除");
          return;
        }
        if (record.isAuthority == '0') {
          this.$message.warning("你没有当前组织的管理权限");
          return;
        }
        $api.deleteOrgByOrgId(this, {orgId: record.orgId}, (data) => {
          treeDataUtil.removeTreeData(this.gridData, [record], 'orgId')
          this.$message.success('删除成功');
        });
      },
      getLastName(name){
        return name.indexOf("/") != -1 ? name.slice(name.lastIndexOf("/")+1): name
      },
      addSuccess(pRecords,newData){
        if(newData.editType == '1'){
          treeDataUtil.addTreeData(this.gridData, {...pRecords}, 'orgId', {...newData}, this)
        } else {
          this.changeRowData(this.gridData, 'orgId', newData)
        }
      },
      changeRowData(data, key, newData){
        for(let i=0; i<data.length; i++){
          if(data[i][key] == newData[key]){
            data[i] = Object.assign({},data[i],newData)
            break;
          }
          if(data[i].children){
            this.changeRowData(data[i].children, 'orgId', newData)
          }
        }
      }
    },
  }
</script>
<style lang="scss" scoped type="text/scss">
  .search-box {width: 340px; margin-right: 10px; line-height: 46px; }
  .disable-color { color: $text-l3-color; &:hover { color: $text-l3-color } }
</style>
