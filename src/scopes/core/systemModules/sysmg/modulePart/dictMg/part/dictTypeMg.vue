<template>
  <div id="dictTypeMg" style="height: 100%">
    <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
      <ta-row slot="header" type="flex" justify="center" align="middle">
        <ta-input-search class="search-box" v-model="dictQueryParam.dictInfo" @search="queryDictByTypeWithParam"
                         placeholder="根据字典标签、键值查询"
                         enter-button="搜索"/>
      </ta-row>
      <div slot="centerExtraContent">
        <ta-tag-select title="字典状态" :data="CollectionData('EFFECTIVE')" v-model="isEffectiveList"
                       @change="filterClick"></ta-tag-select>
        <ta-tag-select title="缓存状态" :data="CollectionData('DICTDATATYPE')" v-model="cacheStatusList"
                       @change="filterClick" class="filter-name"></ta-tag-select>
        <div style="float: right">
          <ta-button @click="fnBackToHome">返回</ta-button>
          <ta-button type="primary" @click="fnToAddDict">新增字典</ta-button>
          <ta-dropdown>
            <ta-menu slot="overlay">
              <ta-menu-item :disabled="btnDisable" @click="fnDeleteDicts">
                <ta-icon type="delete"/>
                删除
              </ta-menu-item>
              <ta-menu-item :disabled="btnDisable" @click="fnStartDicts">
                <ta-icon type="unlock"></ta-icon>
                启用
              </ta-menu-item>
              <ta-menu-item :disabled="btnDisable" @click="fnStopDicts">
                <ta-icon type="lock"/>
                禁用
              </ta-menu-item>
            </ta-menu>
            <ta-button>
              批量操作
              <ta-icon type="down"/>
            </ta-button>
          </ta-dropdown>
          <ta-button @click="fnRefreshCache">刷新缓存</ta-button>
        </div>
      </div>
      <div>
        <ta-table :columns="dictContentColumns"
                  :pagination=false
                  ref="dictContentGrid"
                  :dataSource="dictContentGridData"
                  rowKey="value"
                  :rowSelection="{selectedRowKeys: selectedRowKeys, onSelect: fnOnSelect, onSelectAll : fnOnSelectAll}"
                  :defaultExpandAllRows="defaultExpandAllRows">
          <!--字典状态-->
          <span slot="status" slot-scope="text">
            <ta-tag v-if="text == '1'" color="green" class='no-cursor'>有效</ta-tag>
            <ta-tag v-else color="red" class='no-cursor'>无效</ta-tag>
          </span>
          <!--系统字典-->
          <span slot="system" slot-scope="text">
              {{CollectionLabel('YESORNO',text)}}
          </span>
          <!--缓存状态-->
          <span slot="cacheStatus" slot-scope="text">
            <ta-tag v-if="text == '2'" color="green" class='no-cursor'>已同步</ta-tag>
            <ta-tag v-else-if="text == '0'" color="red" class='no-cursor'>未同步</ta-tag>
            <ta-tag v-else color="red" class='no-cursor'>脏数据</ta-tag>
          </span>
          <template slot="action" slot-scope="text, record">
            <a href="javascript:;"
               :disabled="record.cacheStatus == '1' || record.system== '0' || record.status == '0'"
               @click="fnToAddNextLevelDict(record)">添加下级</a>
            <ta-divider type="vertical"/>
            <span v-if="record.cacheStatus == '1' || record.system== '0'">
                <a href="#" disabled>编辑</a>
              </span>
            <span v-else>
                <a @click="fnToEditDict(record)">编辑</a>
              </span>
            <ta-divider type="vertical"/>
            <span v-if="record.cacheStatus == '1' || record.system== '0'">
                <a disabled>删除</a>
              </span>
            <span v-else>
                <ta-popconfirm okText="确定" cancelText="取消" @confirm="() => fnDeleteDict(record)">
                  <span v-if="record.cacheStatus == '2'" slot="title">
                    确定删除该字典数据并更新该字典类型下的缓存？
                  </span>
                  <span v-else-if="record.cacheStatus == '0'" slot="title">
                    确定从数据库删除该字典数据并更新该字典类型下的缓存？
                  </span>
                  <span>
                    <a href="javascript:;">删除</a>
                  </span>
                </ta-popconfirm></span>
          </template>
        </ta-table>
      </div>
    </ta-border-layout>
    <!--字典管理抽屉-->
    <ta-drawer destroyOnClose title="系统字典管理" width="500" placement="right" closable
               footerHeight @close="fnDictAddOrEditDrawerClose(false)" :visible="dictAddOrEditVisible">
      <div slot="footer" :style="{
                              position: 'absolute',
                              bottom: 0,
                              width: '100%',
                              borderTop: '1px solid #e8e8e8',
                              padding: '10px 16px',
                              textAlign: 'right',
                              left: 0,
                              background: '#fff',
                              borderRadius: '0 0 4px 4px',
                            }">
        <ta-button-group>
          <ta-button @click="resetForm">重置</ta-button>
          <ta-button type="primary" @click="saveDict">保存</ta-button>
        </ta-button-group>
      </div>
      <system-dict-mg :dict="bindDict" ref="sysDictChild" @closeSystemDictMgDrawer="fnDictAddOrEditDrawerClose(true)"/>
    </ta-drawer>
  </div>

</template>

<script>
  import SystemDictMg from "./systemDictMg";
  import $api from '../api/index'

  const dictContentColumns = [
    {
      title: '字典标签',
      dataIndex: 'label',
      width: '20%'
    },
    {
      title: '字典键值',
      dataIndex: 'value',
      sorter: (a, b) => a.value - b.value,
      width: '10%'
    },
    {
      title: '字典状态',
      dataIndex: 'status',
      scopedSlots: {customRender: 'status'},
      width: '10%'
    },
    {
      title: '系统字典',
      dataIndex: 'system',
      scopedSlots: {customRender: 'system'},
      width: '10%'
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      width: '20%'
    },
    {
      title: '缓存状态',
      dataIndex: 'cacheStatus',
      scopedSlots: {customRender: 'cacheStatus'},
      width: '10%'
    },
    {
      title: '操作',
      dataIndex: 'dictAction',
      align: 'center',
      scopedSlots: {customRender: 'action'},
      width: '20%'
    }];

  export default {
    name: "dictTypeMg",
    components: {SystemDictMg},
    data() {
      return {
        defaultExpandAllRows: true,
        dict: {},//路由传入的数据
        bindDict: {},
        dictContentColumns,//列名
        dictContentGridData: [],//展示数据
        selectedRowKeys: [],
        selectedRows: [],//选中的数据
        dictQueryParam: {},//字典查询
        dictAddOrEditVisible: false,//是否打开抽屉
        isEffectiveList: [],
        cacheStatusList: [],
      }
    },

    computed: {
      btnDisable() {
        return this.selectedRowKeys.length ? false : true
      }
    },

    mounted: function () {
      this.dict = this.$route.params.dict;
      this.fnLoadDeFaultDict();
    },

    filters: {
      statusFilter: function (val) {
        console.log('val', val)
        let status = '';
        switch (val) {
          case '1':
            status = '有效';
            break;
          case '0':
            status = '无效';
            break;
          default:
            status = '--';
        }
        return status;
      }
    },

    methods: {
      //返回到前一页
      fnBackToHome() {
        this.$router.push({name: 'dictMg'});
      },

      //重置字典表单
      resetForm: function () {
        this.$refs.sysDictChild.resetForm();
      },

      fnOnSelect: function (record, selected) {
        const {selectedRowKeys, selectedRows} = this
        if (selected) {
          selectedRowKeys.push(record.value);
          selectedRows.push(record);
        } else {
          this.selectedRowKeys = selectedRowKeys.filter(value => value != record.value)
          this.selectedRows = selectedRows.filter(item => item.value != record.value)
        }
      },

      fnOnSelectAll: function (selected, selectedRows) {
        this.selectedRows = [], this.selectedRowKeys = []
        if (selected) {
          selectedRows.map(item => {
            this.selectedRowKeys.push(item.value)
          })
          this.selectedRows = selectedRows;
        }
      },

      //保存字典表单
      saveDict() {
        this.$refs.sysDictChild.saveDict();
      },

      fnDictAddOrEditDrawerClose(isRefresh) {
        this.dictAddOrEditVisible = false;
        this.bindDict = {};
        let a = this.dict;
        if (isRefresh) {
          this.queryDictByTypeWithParam();
        }
      },

      //to add dict
      fnToAddDict() {
        //TODO
        if (this.dict.system == '0') {
          this.$message.warning('非系统字典不能进行新增字典操作！');
          return;
        }
        this.bindDict = this.dict;
        this.bindDict.drawerType = 'add';
        this.bindDict.parentLabel = '';
        this.bindDict.parentValue = '';
        this.dictAddOrEditVisible = true;
      },
      fnToEditDict(record) {
        this.bindDict = record;
        this.bindDict.parentLabel = '';
        this.bindDict.parentValue = '';
        this.bindDict.drawerType = 'edit';
        this.dictAddOrEditVisible = true;
      },

      //添加下级字典
      fnToAddNextLevelDict(record) {
        this.bindDict.drawerType = 'add';
        this.bindDict.parentLabel = record.label;
        this.bindDict.parentValue = record.value;
        this.bindDict.type = record.type;
        this.bindDict.name = record.name;
        this.bindDict.authority = record.authority;
        this.dictAddOrEditVisible = true;
      },

      fnRefreshCache() {
        let key = this.dict.type + '.' + this.dict.authority;
        let data = {
          keys: key
        };
        $api.refreshDictByType(this, data, (data) => {
          this.$message.success('同步成功！');
          this.queryDictByTypeWithParam();
        });
      },

      fnStartDicts() {
        if (this.selectedRows.length == 0) {
          this.$message.warning('请选择需要启用的字典数据！');
          return;
        }
        if (this.dict.system == '0') {
          this.$message.warning('非系统字典不能进行批量启用操作！');
          return;
        }
        let values = this.selectedRows.map(function (v) {
          return v.value;
        });
        let data = {
          type: this.dict.type,
          authority: this.dict.authority,
          values: values.join(',')
        };
        $api.startBatchDict(this, data, (data) => {
          this.$message.success('启用成功！');
          this.selectedRows = [];
          this.queryDictByTypeWithParam();
        });
      },

      //删除字典
      fnDeleteDict(record) {
        let data = {
          type: this.dict.type,
          authority: this.dict.authority,
          values: record.value
        };
        $api.deleteBatchDict(this, data, (data) => {
          this.$message.success('删除成功！');
          this.selectedRows = [];
          this.queryDictByTypeWithParam();
        });
      },

      fnStopDicts() {
        if (this.selectedRows.length == 0) {
          this.$message.warning('请选择需要禁用的字典数据！');
          return;
        }
        if (this.dict.system == '0') {
          this.$message.warning('非系统字典不能进行批量禁用操作！');
          return;
        }
        let self = this;
        self.$confirm({
          title: '禁用字典',
          content: '确认禁用这些字典吗(当前字典及其下级所有字典都会被禁用)?',
          cancelText: '取消',
          okText: '确认',
          onOk() {
            let values = self.selectedRows.map(function (v) {
              return v.value;
            });
            let data = {
              type: self.dict.type,
              authority: self.dict.authority,
              values: values.join(',')
            };
            $api.stopBatchDict(self, data, function (data) {
              self.$message.success('禁用成功！');
              self.selectedRows = [];
              self.queryDictByTypeWithParam();
            });
          }
        });
      },

      //删除字典数据
      fnDeleteDicts() {
        if (this.selectedRows.length == 0) {
          this.$message.warning('请选择需要删除的字典数据！');
          return;
        }
        if (this.dict.system == '0') {
          this.$message.warning('非系统字典不能进行批量删除操作！');
          return;
        }
        let self = this;
        self.$confirm({
          title: '删除字典',
          content: '确认删除这些字典吗(当前字典及其下级所有字典都会被删除)?',
          cancelText: '取消',
          okText: '确认',
          onOk() {
            let values = self.selectedRows.map(function (v) {
              return v.value;
            });
            let data = {
              type: self.dict.type,
              authority: self.dict.authority,
              values: values.join(',')
            };
            $api.deleteBatchDict(self, data, function (data) {
              self.$message.success('删除成功！');
              self.selectedRows = [];
              self.queryDictByTypeWithParam();
            });
          }
        });
      },

      //查看字典
      fnLoadDeFaultDict() {
        let data = {
          type: this.dict.type,
          authority: this.dict.authority,
        };
        $api.queryDictByType(this, data, (data) => {
          this.dictContentGridData = data.data.dictContentGridData;
        });
      },

      //点击查询
      queryDictByTypeWithParam() {
        let data = {
          type: this.dict.type,
          authority: this.dict.authority,
          status: this.dictQueryParam.status,
          dictInfo: this.dictQueryParam.dictInfo,
          cacheStatus: this.dictQueryParam.cacheStatus
        };
        $api.queryDictByType(this, data, (data) => {
          this.dictContentGridData = data.data.dictContentGridData;
          this.selectedRowKeys = [];
          this.selectedRows = [];
        });
      },

      filterClick() {
        this.dictQueryParam.status = this.isEffectiveList[0];
        this.dictQueryParam.cacheStatus = this.cacheStatusList[0];
        this.queryDictByTypeWithParam();
      }

    }
  }
</script>

<style type="text/scss" lang="scss">
  .search-box {
    width: 340px;
    line-height: 46px;
    margin-right: 10px;
  }

  .filter-name {
    margin-left: 20px
  }

  .no-cursor {
    cursor: default;
  }
</style>
