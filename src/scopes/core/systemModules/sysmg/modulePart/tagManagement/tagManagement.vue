<template>
  <div id="app" style="height: 100%">
    <ta-border-layout :centerCfg="{showBar: true}">
      <div slot="centerExtraContent">
        <ta-tag-select title="标签组" :data="tagGroupList" :props="tagProps" required v-model="tagFilter" @change="filterClick"></ta-tag-select>
        <ta-tag-select title="有效标识" :data="CollectionData('EFFECTIVE')" v-model="effectiveFilter" @change="filterClick" class="filter-name"></ta-tag-select>
        <div style="float: right">
          <ta-dropdown :trigger="['click']">
            <ta-menu slot="overlay">
              <ta-menu-item @click="changeTagStatus('1')">启用</ta-menu-item>
              <ta-menu-item @click="changeTagStatus('0')">禁用</ta-menu-item>
              <ta-menu-item @click="tagBatchDelete">删除</ta-menu-item>
            </ta-menu>
            <ta-button>批量操作<ta-icon type="down"/></ta-button>
          </ta-dropdown>
          <ta-button type="primary" @click="fnEditTag()">新增标签</ta-button>
        </div>
      </div>
      <ta-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" rowKey="tagId" :columns="tagColumns" :dataSource="tagData" :pagination="false">
        <template slot="createTime" slot-scope="text,record">{{moment(record.createTime).format('YYYY-MM-DD')}}</template>
        <!--判断标签名称-->
        <template slot="tagName" slot-scope="text,record">
          <span :class="{invalidStyle: record.effective === '0'}">{{text}}</span>
        </template>
        <!--判断有效性-->
        <template slot="effective" slot-scope="text,record">
          <ta-tag v-if="record.effective === '1'" color="green" class="no-cursor">有效</ta-tag>
          <ta-tag v-else color="red" class="no-cursor">无效</ta-tag>
        </template>
        <template slot="action" slot-scope="text, record">
          <a @click="fnEditTag(record)">编辑</a>
          <ta-divider type="vertical"/>
          <!--如果当前标识状态为0,则代表无效,点击进行启用-->
          <a v-if="record.effective === '0'" @click="changeTagStatus('1',record)">启用</a>
          <a v-else @click="changeTagStatus('0',record)">禁用</a>
          <ta-divider type="vertical"/>
          <ta-popconfirm
            v-if="tagData.length"
            title="确认删除该条数据?"
            okText="确认"
            cancelText="取消"
            @confirm="fnTagRecordDelete(record)">
            <a href="javascript:;">删除</a>
          </ta-popconfirm>
        </template>
      </ta-table>
    </ta-border-layout>
    <!--新增编辑-->
    <edit-tag :tag="tagRowData" :tagGroupList="tagGroupList" :visible="visible" @close="visible = false" @search="filterClick"></edit-tag>
  </div>
</template>
<script>
  import $api from './api/index'
  import EditTag from "./part/editTag";
  const tagColumns = [
    { title: '标签名称', width: "20%", dataIndex: 'tagName', key: 'tagName', scopedSlots: {customRender: 'tagName'} },
    { title: '标签组', width: "20%", dataIndex: 'tagGroupName', key: 'tagGroupName'},
    { title: '创建时间', width: "20%", dataIndex: 'createTime', key: 'createTime', scopedSlots: {customRender: 'createTime'} },
    { title: '有效标识', width: "10%", dataIndex: 'effective', key: 'effective', scopedSlots: {customRender: 'effective'} },
    { title: '操作', key: 'operation', width: 200, align: 'center', scopedSlots: {customRender: 'action'} }
  ];


  const DEFAULT_TAGGROUPID = '002';
  import moment from 'moment';
  export default {
    name: 'tagManagement',
    components: {EditTag},
    data() {
      return {
        tagGroupList: [],
        tagColumns,
        tagData:[],
        tagRowData: {},
        visible: false,
        selectedRowKeys: [],//表格选择的数据
        selectedRows: [],//表格选择的数据
        tagFilter: [],
        effectiveFilter: [],
        tagProps:{
          value: "tagGroupId",
          label: "tagGroupName"
        }
      };
    },
    mounted() {
      this.fnQueryAllTagGroup()
    },
    methods: {
      moment,
      // 查询所有的标签组
      fnQueryAllTagGroup() {
        $api.queryAllTagGroup(this, null, {
          successCallback: (data)=> {
            this.tagGroupList = data.data.tagGroupList;
            this.tagFilter = [DEFAULT_TAGGROUPID]
            this.filterClick()
          }
        })
      },
      filterClick(){
        $api.queryTagByCondition(this, {"effective": this.effectiveFilter.join(","), "tagGroupId": this.tagFilter[0]}, (data) => {
          this.tagData = data.data.tagList;
        });
      },
      onSelectChange(selectedRowKeys, selectedRows){
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectedRows;
      },
      changeTagStatus(effective,record){
        let param = {}
        if(record){
          param = {
            tagIds: record.tagId,
            effective: effective
          };
        } else {
          if (this.selectedRowKeys.length === 0) {
            this.$message.warning("请先选择数据");
            return false
          }
          let selectedIds = []
          this.selectedRows.map((item) => {
            if(item.effective != effective){
              selectedIds.push(item.tagId)
            }
          })
          if(selectedIds.length){
            param = {
              tagIds: selectedIds.join(","),
              effective: effective
            };
          }else {
            this.$message.warning("所选项已是"+(effective == '1'?'启用':'禁用')+"状态");
            return false
          }
        }
        $api.updateBatchTagStatus(this, param, (data) => {
            if(record){
              this.$message.success(effective == '1' ? "启用成功" : '禁用成功');
              record.effective = effective;
            }else {
              this.$message.success(effective == '1' ? "批量启用成功" : '批量禁用成功');
              this.selectedRows.map((item) => {
                item.effective = effective
              })
            }
          }
        );
      },
      fnTagRecordDelete(record) {
        $api.deleteBatchTag(this, { tagIds: record.tagId }, (data) => {
          this.$message.success("删除成功");
          this.tagData = this.tagData.filter((tag) => {
            return tag.tagId !== record.tagId;
          });
          this.selectedRows = [];
          this.selectedRowKeys = [];
        });
      },
      // 批量删除
      tagBatchDelete() {
        if (this.selectedRowKeys.length === 0) {
          this.$message.warning("请先选择数据");
          return;
        }
        this.$confirm({
          title: '删除标签',
          content: '确认删除这些标签吗?',
          cancelText: '取消',
          okText: '确认',
          onOk: ()=> {
            $api.deleteBatchTag(this, {tagIds: this.selectedRowKeys.join(",")}, (data) => {
              this.$message.success("批量删除成功");
              for (let i = 0; i < this.selectedRows.length; i++) {
                this.tagData = this.tagData.filter((tag) => {
                  return tag.tagId !== this.selectedRows[i].tagId;
                });
              }
              this.selectedRowKeys = [];
              this.selectedRows = [];
            });
          },
        });
      },
      fnEditTag(record){
        if(record){
          this.tagRowData = record;
        } else {
          this.tagRowData = {};
          this.tagRowData.tagGroupId = this.tagFilter[0];
        }
        this.visible = true;
      }
    }
  };
</script>
<style scoped type="text/scss">
  .invalidStyle { color: #ccc; cursor: not-allowed; }
  .no-cursor { cursor: default; }
  .filter-name { margin-left: 20px }
</style>
