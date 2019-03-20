<template>
  <div id="dictMg" style="height: 100%">
    <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
      <ta-row slot="header" type="flex" justify="center" align="middle">
        <ta-input-search class="search-box" v-model="typeInfo" @search="queryDictType" placeholder="根据字典名称、字典类型、权限标识查询"
                         enter-button="搜索"/>
      </ta-row>
      <div slot="centerExtraContent">
        <div style="float: right">
          <ta-button type="primary" @click="fnToAddDictType">新增类型</ta-button>
          <ta-dropdown>
            <ta-menu slot="overlay">
              <ta-menu-item :disabled="btnDisable" @click="fnDeleteDictByTypes">
                <ta-icon type="delete"/>
                删除
              </ta-menu-item>
              <ta-menu-item :disabled="btnDisable" @click="fnStartDictByTypes">
                <ta-icon type="unlock"></ta-icon>
                启用
              </ta-menu-item>
              <ta-menu-item :disabled="btnDisable" @click="fnStopDictByTypes">
                <ta-icon type="lock"/>
                禁用
              </ta-menu-item>
            </ta-menu>
            <ta-button>
              批量操作
              <ta-icon type="down"/>
            </ta-button>
          </ta-dropdown>
          <ta-button @click="fnRefreshCaches">刷新缓存</ta-button>
        </div>
      </div>
      <div>
        <ta-table :columns="dictTypeColumns"
                  :dataSource="typeGridData"
                  ref="typeGrid"
                  rowKey="name"
                  :rowSelection="{selectedRowKeys: selectedRowKeys, onSelect: fnOnSelect, onSelectAll : fnOnSelectAll}"
                  :pagination=false
        >
          <span slot="system" slot-scope="text">{{CollectionLabel('YESORNO',text)}}</span>

          <template slot="action" slot-scope="text, record">
            <a :disabled="record.system== '0'" @click="fnToAddDictByType(record)">新增字典</a>

            <ta-divider type="vertical"/>
            <a @click="fnRouteToDictTypeMg(record)">查看</a>
            <ta-divider type="vertical"/>
            <ta-popconfirm title="确定删除该字典类型?" okText="确定" cancelText="取消"
                           @confirm="() => fnDeleteDictByType(record)">
              <a href="javascript:;" :disabled="record.system== '0'">删除</a>
            </ta-popconfirm>
          </template>
        </ta-table>
        <ta-pagination
          style="float: right; margin-top: 10px;"
          showSizeChanger
          showQuickJumper
          :dataSource.sync="typeGridData"
          :defaultPageSize="10"
          :params="pageParams"
          url="dictmg/dictMgRestService/queryType"
          ref="gridPager"
        />
      </div>
    </ta-border-layout>
    <ta-modal v-model="dictContentModal"
              destroyOnClose
              :centered="true"
              :bodyStyle="{'height': '450px', 'overflow-y':'auto'}"
              width="800px"
              :footer="null"
              :closable="true"
              @close="fnDictModalCloseEvent">
            <span slot="title">
              <ta-col style="text-align: center">字典管理</ta-col>
            </span>
      <dict-type-mg :dict="dict"/>
    </ta-modal>

    <ta-drawer :destroyOnClose="true" title="新增字典类型" width="500" placement="right" closable
               @close="fnTypeDrawCloseEvent" :visible="typeDrawerVisible">
      <template>
        <div>
          <ta-form id="typeForm">
            <ta-form-item id="type" label='字典类型'
                          :labelCol="formItemLayout.labelCol"
                          :wrapperCol="formItemLayout.wrapperCol"
                          :fieldDecoratorOptions="{rules: [{ required: true }]}">
              <ta-input v-model="typeFormData.type"/>
            </ta-form-item>
            <ta-form-item id="name" label='字典名称'
                          :labelCol="formItemLayout.labelCol"
                          :wrapperCol="formItemLayout.wrapperCol"
                          :fieldDecoratorOptions="{rules: [{ required: true }]}">
              <ta-input v-model="typeFormData.name"/>
            </ta-form-item>
            <ta-form-item id="name" label='权限标识'
                          :labelCol="formItemLayout.labelCol"
                          :wrapperCol="formItemLayout.wrapperCol"
                          :fieldDecoratorOptions="{rules: [{ required: true }]}">
              <ta-input v-model="typeFormData.authority"/>
            </ta-form-item>
          </ta-form>

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
              <ta-button @click="typeFormReset">重置</ta-button>
              <ta-button type="primary" @click="saveType">保存</ta-button>
            </ta-button-group>
          </div>

        </div>
      </template>
    </ta-drawer>

    <ta-drawer destroyOnClose title="新增字典" width="500" placement="right" closable
               footerHeight @close="fnDictAddOrEditDrawerClose" :visible="dictAddOrEditVisible">
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
      <system-dict-mg :dict="dict" ref="sysDictMgChild"
                      @closeSystemDictMgDrawer="fnDictAddOrEditDrawerClose"></system-dict-mg>
    </ta-drawer>
  </div>
</template>
<script>

  import systemDictMg from "./systemDictMg";
  import dictTypeMg from "./dictTypeMg";

  import $api from '../api/index'

  const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
  };

  const dictTypeColumns = [
    {
      title: '字典名称',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      overflowTooltip: false
    }, {
      title: '字典类型',
      dataIndex: 'type',
      key: 'type',
      width: '30%',
      overflowTooltip: false
    }, {
      title: '权限标识',
      dataIndex: 'authority',
      width: '10%',
      customRender: function (text) {
        return text == 0 ? '默认' : '其他';
      }
    }, {
      title: '系统字典',
      dataIndex: 'system',
      scopedSlots: {customRender: 'system'},
      width: '10%'
    }, {
      title: '操作',
      dataIndex: 'typeAction',
      align: 'center',
      scopedSlots: {customRender: 'action'},
      width: '20%'
    }];

  export default {
    name: "dictMg",
    components: {systemDictMg},
    data() {
      return {
        dictTypeColumns,//缓存字典列名
        typeGridData: [],//缓存字典数据
        dict: {},//传入下级表单的数据
        dictAddOrEditVisible: false,//是否显示新增字典抽屉
        formItemLayout,//布局
        //query
        typeInfo: '',//搜索查询字段
        dictQueryParam: {},
        typeDrawerVisible: false,
        dictStatus: true,
        dictNameDisable: false,
        parentValueSelect: true,
        dictContentModal: false,
        //page Data transfer
        selectedType: {},
        selectedRows: [],
        selectedRowKeys: [],
        //'1' means to add , '2' means to edit
        operateType: '',
        keyJoin: '.',
        keySeparater: ',',
        typeFormData: {},
        dictContentGridData: [],
        parentValueList: [],

      }
    },

    mounted() {
      this.queryDictType();
    },

    computed: {
      btnDisable() {
        return this.selectedRowKeys.length ? false : true
      }
    },

    methods: {

      pageParams: function () {
        let data = {
          typeInfo: this.typeInfo
        };
        return data;
      },

      //查询字典类型
      queryDictType() {
        this.$refs.gridPager.loadData((data) => {
          this.selectedRowKeys = [];
          this.selectedRows = [];
        });
      },

      fnOnSelect: function (record, selected) {
        const {selectedRowKeys, selectedRows} = this
        if (selected) {
          selectedRowKeys.push(record.name);
          selectedRows.push(record);
        } else {
          this.selectedRowKeys = selectedRowKeys.filter(name => name != record.name)
          this.selectedRows = selectedRows.filter(item => item.name != record.name)
        }
      },

      fnOnSelectAll: function (selected, selectedRows) {
        this.selectedRows = [], this.selectedRowKeys = []
        if (selected) {
          selectedRows.map(item => {
            this.selectedRowKeys.push(item.name)
          })
          this.selectedRows = selectedRows;
        }
      },

      //新增字典
      fnToAddDictByType(record) {
        this.dict = record;
        this.dict.drawerType = 'add';
        this.dictAddOrEditVisible = true;
      },

      //查看字典
      queryDictByType(record) {
        this.dict = record;
        this.dictContentModal = true;
      },

      //删除字典
      fnDeleteDictByType(record) {
        let key = record.type + this.keyJoin + record.authority;
        let data = {
          keys: key
        };
        $api.deleteDictByType(this, data, (data) => {
          this.$message.success('删除成功！');
          this.queryDictType();
        });
      },

      //重置字典表单
      resetForm: function () {
        this.$refs.sysDictMgChild.resetForm();
      },

      //保存字典表单
      saveDict() {
        this.$refs.sysDictMgChild.saveDict();
      },

      fnToAddDictType() {
        this.typeFormData.authority = '0';
        this.typeDrawerVisible = true;
      },

      saveType() {
        let data = this.typeFormData;
        $api.saveType(this, data, (data) => {
          this.typeFormData = {};
          this.typeDrawerVisible = false;
          this.$message.success('新增类型成功！');
          this.queryDictType();
        });
      },

      //refresh cache
      fnRefreshCaches() {
        if (this.selectedRows.length == 0) {
          this.$message.warning('请选择需要同步缓存的字典类型！');
          return;
        }
        let dictKeys = this.selectedRows.map(v => {
          return v.type + '.' + v.authority;
        });
        let data = {
          keys: dictKeys.join(',')
        };
        $api.refreshDictCacheByType(this, data, (data) => {
          this.$message.success('同步成功！');
          this.queryDictType();
        });
      },

      //delete By Types
      fnDeleteDictByTypes() {
        if (this.selectedRows.length == 0) {
          this.$message.warning('请选择需要删除的字典类型！');
          return;
        }
        for (let i = 0; i < this.selectedRows.length; i++) {
          if (this.selectedRows[i].system == '0') {
            this.$message.warning('存在非系统字典，不能进行批量删除操作！');
            return;
          }
        }
        let self = this;
        self.$confirm({
          title: '删除字典',
          content: '确认删除这些字典吗(当前字典及其下级所有字典都会被删除)?',
          cancelText: '取消',
          okText: '确认',
          onOk() {
            let dictKeys = self.selectedRows.map(v => {
              return v.type + '.' + v.authority;
            });
            let data = {
              keys: dictKeys.join(',')
            };
            $api.deleteDictByType(self, data, (data) => {
              self.$message.success('删除数据成功');
              self.selectedRows = [];
              self.queryDictType();
            });
          }
        });
      },

      //stop dict By types
      fnStartDictByTypes() {
        if (this.selectedRows.length == 0) {
          this.$message.warning('请选择需要启用的字典类型！');
          return;
        }
        for (let i = 0; i < this.selectedRows.length; i++) {
          if (this.selectedRows[i].system == '0') {
            this.$message.warning('存在非系统字典，不能进行批量启用操作！');
            return;
          }
        }
        let dictKeys = this.selectedRows.map(v => {
          return v.type + '.' + v.authority;
        });
        let data = {
          keys: dictKeys.join(',')
        };
        $api.startDictByType(this, data, (data) => {
          this.$message.success('启用数据成功');
          this.selectedRows = [];
          this.queryDictType();
        });
      },

      //stop dict By types
      fnStopDictByTypes() {
        if (this.selectedRows.length == 0) {
          this.$message.warning('请选择需要禁用的字典类型！');
          return;
        }
        for (let i = 0; i < this.selectedRows.length; i++) {
          if (this.selectedRows[i].system == '0') {
            this.$message.warning('存在非系统字典，不能进行批量禁用操作！');
            return;
          }
        }
        let self = this;
        self.$confirm({
          title: '禁用字典',
          content: '确认禁用这些字典吗(当前字典及其下级所有字典都会被禁用)?',
          cancelText: '取消',
          okText: '确认',
          onOk() {
            let dictKeys = self.selectedRows.map(v => {
              return v.type + '.' + v.authority;
            });
            let data = {
              keys: dictKeys.join(',')
            };
            $api.stopDictByType(self, data, (data) => {
              self.$message.success('禁用数据成功');
              self.selectedRows = [];
              self.queryDictType();
            });
          }
        });

      },

      //UI Control method
      fnDictAddOrEditDrawerClose() {
        this.operateType = '';
        this.dictNameDisable = false;
        this.dictFormData = {};
        this.dictAddOrEditVisible = false;
      },

      fnDictModalCloseEvent() {
        this.dictContentModal = false;
        this.selectedType = {};
      },

      fnTypeDrawCloseEvent: function (event) {
        this.typeFormData = {};
        this.typeDrawerVisible = false;
      },

      // add form reset
      typeFormReset() {
        this.typeFormData = {};
      },

      fnRouteToDictTypeMg(record) {
        this.$router.push(
          {
            name: 'dictTypeMg',
            params: {
              dict: record,
            }
          }
        );
      }
    },
  }

</script>

<style type="text/scss" lang="scss">
  .search-box {
    width: 340px;
    line-height: 46px;
    margin-right: 10px;
  }
</style>
