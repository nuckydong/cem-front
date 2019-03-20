<template>
  <div id="app" style="height: 100%">
    <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
      <ta-row slot="header" type="flex" justify="center" align="middle">
        <search-head ref="searchHeader" :search="handleSearchResource" :advancedSearch="handleAdvancedSearchResource"></search-head>
      </ta-row>
      <div slot="centerExtraContent">
        <ta-tag-select title="菜单类型" :data="CollectionData('RESOURCETYPE')" :is-multi="true" v-model="filterQuery.resourceType"  @change="handleSearchFilter"></ta-tag-select>
        <ta-tag-select title="安全策略" :data="CollectionData('SECURITYPOLICY')" :is-multi="true" v-model="filterQuery.securityPolicy" @change="handleSearchFilter"></ta-tag-select>
        <ta-tag-select title="有效性" :data="CollectionData('EFFECTIVE')" :is-multi="true" v-model="filterQuery.effective" @change="handleSearchFilter"></ta-tag-select>
        <div style="float: right">
          <ta-dropdown :trigger="['click']">
            <ta-menu slot="overlay">
              <ta-menu-item @click="handleConfirmDeleteResourceBatch">删除</ta-menu-item>
              <ta-menu-divider/>
              <ta-menu-item @click="handleEnableResourceBatch">启用</ta-menu-item>
              <ta-menu-item @click="handleDisableResourceBatch">禁用</ta-menu-item>
            </ta-menu>
            <ta-button>
              批量操作
              <ta-icon type="down"/>
            </ta-button>
          </ta-dropdown>
        </div>
      </div>
      <div>
        <ta-table :columns="columns"
                  :pagination="false"
                  rowKey="resourceId"
                  :defaultExpandAllRows="defaultExpandAllRows"
                  @expand="handleLoadChild"
                  :dataSource="gridData"
                  :rowSelection="{onSelect: handleResourceSelected}">
          <span slot="resourceType" slot-scope="text">{{CollectionLabel('RESOURCETYPE',text)}}</span>
          <span slot="effective" slot-scope="text">{{CollectionLabel('EFFECTIVE',text)}}</span>
          <span slot="securityLevel" slot-scope="text">{{CollectionLabel('SECURIYTLEVEL',text)}}</span>
          <span slot="securityPolicy" slot-scope="text">{{CollectionLabel('SECURITYPOLICY',text)}}</span>

          <template slot="name" slot-scope="text,record">
            <a @click="handleViewDetail(record)" >
              <span :class="{greySpan: record.effective !='1'}">{{text}}</span>
            </a>
          </template>
          <span slot="url" slot-scope="text,record">{{toString(text) == '' ?'--': text}}</span>
          <div slot="restUrl" slot-scope="text,record">
            <span v-if="text.length">
              <ta-tooltip placement="topLeft" v-for="item in JSON.parse(text)" :key="item.urlId">
                <template slot="title">
                  <p>服务路径：{{item.restUrl}}</p>
                  <p>独立授权：{{CollectionLabel('YESORNO',item.authorityPolicy)}}</p>
                </template>
                <ta-tag>{{item.urlName}}</ta-tag>
              </ta-tooltip>
            </span>
            <span v-else>--</span>
          </div>
          <span slot="action" slot-scope="text, record">
              <a href="javascript:;" @click="handleShowResourceDrawer(record , '1')">
                <span :class="{greySpan: record.effective !='1'}">添加下级</span>
              </a>
              <ta-divider type="vertical"/>
              <a href="javascript:;" @click="handleShowResourceDrawer(record , '2')">编辑</a>
              <ta-divider type="vertical"/>
              <span>
                   <ta-dropdown :trigger="['click']">
                       <a class="ant-dropdown-link" href="#">更多<ta-icon type="down"/></a>
                       <ta-menu slot="overlay">
                           <ta-menu-item>
                             <a href="#">
                               <template v-if="record.pResourceId == '0'">
                                 <div class=greySpan>删除</div>
                               </template>
                               <template v-else>
                                 <ta-popconfirm title="确定删除该功能资源?" okText="删除" okType="danger" @confirm="handleConfirmDeleteResource(record)">
                                   <div>删除</div>
                                 </ta-popconfirm>
                               </template>
                             </a>
                           </ta-menu-item>
                           <ta-menu-item>
                             <a href="javascript:;" @click="handleShowResourceUi(record)">
                               <template v-if="record.uiAuthorityPolicy != '1'">
                                 <div class=greySpan>界面元素</div>
                               </template>
                               <template v-else>
                                 <div class=blueSpan>界面元素</div>
                               </template>
                             </a>
                           </ta-menu-item>
                       </ta-menu>
                  </ta-dropdown>
              </span>
            </span>
        </ta-table>
      </div>
    </ta-border-layout>
    <ta-drawer title="功能资源管理"
               width="520"
               @close="handleCloseResourceDrawer"
               :visible="resourceDrawerVisible">
      <resource-data ref="resourceSave" :initData="resourceData" :operationType="operationType" @close="handleHideResourceDrawer"></resource-data>
      <template slot="footer">
        <ta-button-group>
          <ta-button @click="handleResetForm()">重置</ta-button>
          <ta-button type="primary" @click="handleSaveResource()">保存</ta-button>
        </ta-button-group>
      </template>
    </ta-drawer>
    <ta-drawer title="功能资源管理-查看"
               width="520"
               @close="handleCloseResourceShowDrawer"
               :visible="resourceShowDrawerVisible">
      <resource-data-show ref="resourceSaveShow" :initData="resourceData"></resource-data-show>
    </ta-drawer>
    <ta-modal title="界面元素信息"
              v-model="uiModelVisible"
              :centered="true"
              width="1000px"
              :footer="null">
      <resourceUi :initData="uiInitData" @close="handleHideResourceUi"></resourceUi>
    </ta-modal>
  </div>

</template>
<script>

  import api from "./api"
  import isString from 'lodash/isString'
  import isPlainObject from 'lodash/isPlainObject'
  import toString from 'lodash/toString'
  import isEmpty from 'lodash/isEmpty'
  import isArray from 'lodash/isArray'
  import searchHead from './part/searchHead'
  import resourceUi from './part/resourceUi'
  import resourceData from './part/resourceData'
  import resourceDataShow from './part/resourceDataShow'
  import treeDataUtil from '@common/js/util/treeDataUtil'

  //资源表格列定义
  const columns = [
    { title: '功能名称', dataIndex: 'name', width: '20%', overflowTooltip: false, scopedSlots: {customRender: 'name'} },
    { title: '功能路径', dataIndex: 'url', width: '14%', overflowTooltip:true, scopedSlots: {customRender: 'url'} },
    { title: '服务路径', dataIndex: 'restUrl', width: '24%', overflowTooltip: false, scopedSlots: {customRender: 'restUrl'} },
    { title: '菜单类型', dataIndex: 'resourceType', width: 100, scopedSlots: {customRender: 'resourceType'} },
    { title: '安全策略', dataIndex: 'securityPolicy', width:140, scopedSlots: {customRender: 'securityPolicy'} },
    { title: '操作', key: 'action', width: 220, align: 'center', scopedSlots: {customRender: 'action'} }
  ]

  export default {
    name: "resourceManagement",
    components:{searchHead,resourceUi,resourceData,resourceDataShow},
    data() {
      return {
        gridData: [],
        columns: columns,
        resourceSelectList: [],    //表格选中的数据
        defaultExpandAllRows:true,//控制表格是否展开全部

        isAsync: true,   //是否异步加载 (资源列表查询模式)
        //功能资源 新增/更新
        resourceDrawerVisible: false,   //编辑区域显示标志
        operationType: '1',   //判断新增还是编辑 1新增  2编辑
        resourceData:{},
        //功能资源 展示
        resourceShowDrawerVisible: false,
        //界面元素管理
        uiModelVisible: false, //界面元素显示标志
        uiInitData:{},

        //过滤条件
        filterQuery:{
          name:'',
          code:'',
          resourceType:[],
          securityPolicy:[],
          effective:[]
        }
      }
    },
    mounted() {
      //进入页面, 默认加载资源列表
      this.fnToHandleQueryResource();
    },
    methods: {
      toString,
      getSearchParam(){
        let param = {}
        let searchStr = ''
        if(this.$refs.searchHeader) searchStr = this.$refs.searchHeader.getSearchParam()
        Object.assign(this.filterQuery,{
          name: searchStr,
          code: searchStr
        })
        Object.keys(this.filterQuery).forEach(key => {
          let keyVal = this.filterQuery[key];
          if(isString(keyVal) && keyVal.trim() !== ''){
            param[key] = keyVal;
          }
          if(isArray(keyVal) && keyVal.length > 0){
            param[key] = keyVal.join(',');
          }
        })

        return param;
      },
      //条件过滤
      handleSearchFilter(){
        this.handleSearch()
      },
      handleSearchResource(){
        this.handleSearch();
      },
      //查询事件
      handleSearch(){
        let searchParam = this.getSearchParam();
        //查询结构模块全部展开
        this.defaultExpandAllRows = true;
        //功能表格数据加载模式: 有参数时全部加载,无参数时异步加载
        if(isPlainObject(searchParam) && !isEmpty(searchParam)){
          this.isAsync = false;
          api.queryResourceList(this,searchParam,(data)=>{
            this.gridData = data.resourceList;
          })
        }else{
          this.isAsync = true;
          api.queryResourceListNoParam(this,(data)=>{
            this.gridData = data.resourceList;
          })
        }
      },
      //高级查询事件
      handleAdvancedSearchResource(searchParamObject){
        this.handleSearchResource(searchParamObject);
      },
      //点击行展开时  加载下级功能菜单
      handleLoadChild(expanded, record) {
        //如果不是展开,不做任何操作
        if (expanded == false) return;
        //只有异步加载模式才会 加载子节点, 有条件查询时 ,不需要该操作
        if (this.isAsync) {
          //已加载节点不重复请求
          if(record.children && record.children.length > 0) return;
          api.loadChildResource(this,record,(data) => {
            //异步加载禁用全部展开
            this.defaultExpandAllRows = false;
            record.children = data.resourceList[0].children;
          })
        }
      },
      //功能资源列表 选择事件
      handleResourceSelected(record, selected, selectedRows) {
        this.resourceSelectList = selectedRows;
      },
      //批量禁用资源
      handleDisableResourceBatch: function () {
        let {resourceIds,resources} = this.fnGetBatchResourceIds("禁用");
        if(resourceIds === false) return;
        api.disableResourceBatch(this,resourceIds,(data) => {
          treeDataUtil.updateTreeDataDown(this.gridData,resources,{effective: '0'},'resourceId')
        });
      },
      //批量启用资源
      handleEnableResourceBatch: function () {
        let {resourceIds,resources} = this.fnGetBatchResourceIds("启用", false);
        if(resourceIds === false) return;
        api.enableResourceBatch(this,resourceIds,(data)=>{
          treeDataUtil.updateTreeDataDown(this.gridData,resources,{effective: '1'},'resourceId')
        })
      },
      //批量删除确认
      handleConfirmDeleteResourceBatch() {
        let {resourceIds,resources} = this.fnGetBatchResourceIds("删除");
        if(resourceIds === false) return;
        this.$confirm({
          title: '是否删除已选中的功能资源?',
          okText: '删除',
          okType: 'danger',
          onOk:() => {
            api.deleteResourceBatch(this,resourceIds,(data) => {
              this.resourceSelectList = [];
              treeDataUtil.removeTreeData(this.gridData,resources,'resourceId')

              // let pResourceIds = resources.map(item => {
              //   return item.pResourceId;
              // })
              // self.defaultExpandedRowKeys = Array.from(new Set(pResourceIds))
            })
          }
        });
      },
      //行删除确认
      handleConfirmDeleteResource(record) {
        console.log("=====================delete")
        api.deleteResource(this,record,() => {
          console.log(this.resourceSelectList)
          treeDataUtil.removeTreeData(this.gridData,[record],'resourceId')
        });
      },
      //展示界面元素管理面板
      handleShowResourceUi(record) {
        if (record.pResourceId == '0') {
          this.$message.warning('顶级菜单无法添加表单元素', 2);
          return;
        }
        if (record.uiAuthorityPolicy == '1') {
          this.uiInitData = record;
          this.uiModelVisible = true;
        } else {
          this.$message.warning('该菜单表单元素授权方式为继承当前菜单权限', 2);
        }
      },
      //隐藏界面元素管理面板
      handleHideResourceUi(){
        this.uiModelVisible = false;
      },
      //展示功能资源变更 新增/编辑
      handleShowResourceDrawer(record, type){
        if (type == '1') {
          if (record != '' && record.effective != '1') {
            this.$message.warn('禁用的功能资源节点不允许添加下级', 2);
            return;
          }
        }
        this.operationType = type;

        this.resourceData = record;
        this.resourceDrawerVisible = true;
      },
      //关闭功能资源变更 新增/编辑
      handleCloseResourceDrawer() {
        this.handleHideResourceDrawer(false)
      },
      handleHideResourceDrawer(isReLoad){
        if(isReLoad) this.fnToHandleQueryResource()
        this.resourceDrawerVisible = false
      },
      //展示 功能资源-查看 窗口
      handleViewDetail(record){
        this.resourceData = record;
        this.resourceShowDrawerVisible = true;
      },
      //关闭功能资源-查看 窗口
      handleCloseResourceShowDrawer(){
        this.resourceShowDrawerVisible = false
      },
      //功能资源变更 重置
      handleResetForm() {
        this.$refs.resourceSave.fnResetForm();
      },
      //功能资源变更 保存
      handleSaveResource() {
        this.$refs.resourceSave.fnSaveResource();
      },
      //触发searchHeader 查询
      fnToHandleQueryResource(){
        this.$refs.searchHeader.handleSearch();
      },
      //批量操作 公共行为提取 获取当前选中的功能资源ID
      fnGetBatchResourceIds(controlDesc, isCheckRoot){
        if(isCheckRoot !== false) isCheckRoot = true;
        if(!controlDesc) controlDesc = "处理";

        if (this.resourceSelectList.length < 1) {
          this.$message.warning('请选择需要'+controlDesc+'的功能资源', 2);
          return false;
        }
        //检查根节点 判断
        if(isCheckRoot){
          let index = this.resourceSelectList.findIndex(node => {
            return node.pResourceId == '0'
          })
          if (index > -1) {
            this.$message.warning('当前选中的功能资源包含根节点，请重新选择', 2);
            return false;
          }
        }

        let resourceIds = this.resourceSelectList.map(node => {
          return node.resourceId
        })
        return {
          resourceIds,
          resources: this.resourceSelectList
        };
      }
    }
  }

</script>
<style lang="scss" type="text/scss" scoped>
  .redSpan {
    color: red;
    text-decoration: line-through;
  }
  .greySpan {
    color: #CCCCCC;
  }
  .blueSpan {
    color: #1890ff;
  }
</style>
