<template>
  <div style="height: 100%">
    <ta-border-layout :layout="{header:'70px', overflow:'hidden'}">
      <div slot="header">
        <ta-tabs @change="loadTableData" v-model="tabsKey" style="height: 45px">
          <ta-tab-pane tab="用户个人字段配置" key="1"></ta-tab-pane>
          <ta-tab-pane tab="组织机构字段配置" key="2"></ta-tab-pane>
          <ta-tab-pane tab="功能资源字段配置" key="3"></ta-tab-pane>
          <ta-button-group slot="tabBarExtraContent">
            <ta-button @click="loadDefaultSetting">加载默认配置</ta-button>
            <ta-button @click="tabsKey = '1'; loadTableData()">刷新</ta-button>
            <ta-button type="primary" @click="saveSubmitAll">保存</ta-button>
          </ta-button-group>
        </ta-tabs>
      </div>
      <div class="fit">
        <ta-table :columns="columns" :loading="loading" :dataSource="tableData" :pagination="false">
          <span solt="type" slot-scope="text, record">{{text}}</span>
          <span slot="effectiveCheck" slot-scope="text, record"><ta-checkbox @change="getRecord(record)" v-model="record.effectiveCheck">有效</ta-checkbox></span>
          <span slot="hideCheck" slot-scope="text, record"><ta-checkbox @change="getRecord(record)" v-model="record.hideCheck">隐藏</ta-checkbox></span>
          <span slot="requiredCheck" slot-scope="text, record"><ta-checkbox @change="getRecord(record)" v-model="record.requiredCheck">必填</ta-checkbox></span>
          <span slot="unchangeableCheck" slot-scope="text, record"><ta-checkbox @change="getRecord(record)" v-model="record.unchangeableCheck">不可编辑</ta-checkbox></span>
          <span slot="protectPrivacyCheck" slot-scope="text, record"><ta-checkbox @change="getRecord(record)" v-model="record.protectPrivacyCheck">隐私保护</ta-checkbox></span>
          <span slot="moreCheck" slot-scope="text, record"><ta-checkbox @change="getRecord(record)" v-model="record.moreCheck">是</ta-checkbox></span>
          <span slot="orderNo" slot-scope="text, record"><ta-input @change="getRecord(record)" v-model="record.orderNo"></ta-input></span>
          <span slot="action" slot-scope="text, record"><a @click="fnEdit(record)">编辑</a></span>
        </ta-table>
      </div>
    </ta-border-layout>
    <ta-drawer :destroyOnClose="true" :title="defaultTitle" width="500" placement="right" :closable="true" @close="drawerVisible=false" :visible="drawerVisible">
      <ta-form :autoFormCreate="(form)=>{this.form = form}"  :loading="loading">
        <ta-form-item
          label='类型'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="type"
        >
          <ta-input disabled />
        </ta-form-item>
        <ta-form-item
          label='字段名称'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="fieldId"
        >
          <ta-input disabled />
        </ta-form-item>
        <ta-form-item
          label='字段名称'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="formId"
        >
          <ta-input disabled />
        </ta-form-item>
        <ta-form-item
          label='标题文字'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="displayText"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入标题文字' }]}"
        >
          <ta-input placeholder="请输入标题文字"/>
        </ta-form-item>
        <ta-form-item
          label='是否有效'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="effective"
        >
          <ta-radio-group>
            <ta-radio value="1">是</ta-radio>
            <ta-radio value="0">否</ta-radio>
          </ta-radio-group>
        </ta-form-item>
        <ta-form-item
          label='是否隐藏'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="hide"
        >
          <ta-radio-group>
            <ta-radio value="1">是</ta-radio>
            <ta-radio value="0">否</ta-radio>
          </ta-radio-group>
        </ta-form-item>
        <ta-form-item
          label='是否必填'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="required"
        >
          <ta-radio-group>
            <ta-radio value="1">是</ta-radio>
            <ta-radio value="0">否</ta-radio>
          </ta-radio-group>
        </ta-form-item>
        <ta-form-item
          label='不可编辑'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="unchangeable"
        >
          <ta-radio-group>
            <ta-radio value="1">是</ta-radio>
            <ta-radio value="0">否</ta-radio>
          </ta-radio-group>
        </ta-form-item>

        <ta-form-item
          label='隐私保护'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="protectPrivacy"
        >
          <ta-radio-group>
            <ta-radio value="1">是</ta-radio>
            <ta-radio value="0">否</ta-radio>
          </ta-radio-group>
        </ta-form-item>
        <ta-form-item
          label='属于更多内容'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="more"
        >
          <ta-radio-group>
            <ta-radio value="1">是</ta-radio>
            <ta-radio value="0">否</ta-radio>
          </ta-radio-group>
        </ta-form-item>
        <ta-form-item
          label='显示顺序'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="orderNo"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入显示顺序' }]}"
        >
          <ta-input-number :min="1" :step="1" style="width: 100%"  placeholder="请输入显示顺序"></ta-input-number>
        </ta-form-item>
        <ta-form-item
          label='内容长度'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="contentSize"
        >
          <ta-input-number :step="1" style="width: 100%"  placeholder="请输入内容长度"></ta-input-number>
        </ta-form-item>
        <ta-form-item
          label='表单元素类型'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="formType"
        >
          <ta-select style="width: 100%" placeholder="请选择表单元素类型">
            <ta-select-option value='0'>数字</ta-select-option>
            <ta-select-option value='1'>文本</ta-select-option>
            <ta-select-option value='2'>行政区划</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label='关联码表'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="connectAA10"
        >
          <ta-input/>
        </ta-form-item>
        <ta-form-item
          label='信息提示文字'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="tiText"
        >
          <ta-textarea style="width: 100%" placeholder="请输入信息提示文字" :rows="4"/>
        </ta-form-item>
        <ta-form-item
          label='验证表达式'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="validReg"
        >
          <ta-textarea style="width: 100%" placeholder="请输入验证表达式" :rows="4"/>
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button-group>
          <ta-button @click="setValue(currentData)">重置</ta-button>
          <ta-button type="primary" @click="saveSubmit">保存</ta-button>
        </ta-button-group>
      </div>
    </ta-drawer>
  </div>
</template>
<script>

  import api from './api'
  import extendResourceSetting from '@common/extendConfig/extendResourceSetting'
  import extendOrgSetting from '@common/extendConfig/extendOrgSetting'
  import extendUserSetting from '@common/extendConfig/extendUserSetting'

  const columns = [
    {
      title: '字段名称',
      align:'left',
      dataIndex: 'displayText',
      scopedSlots: {customRender: 'displayText'},
    },
    // {
    //   title: '类型',
    //   align:'left',
    //   dataIndex: 'type',
    //   scopedSlots: {customRender: 'type'},
    // },
    {
      title: '是否有效',
      align:'left',
      dataIndex: 'effectiveCheck',
      scopedSlots: {customRender: 'effectiveCheck'},
    }, {
      title: '是否隐藏',
      align:'left',
      dataIndex: 'hideCheck',
      scopedSlots: {customRender: 'hideCheck'},
    }, {
      title: '是否必填',
      align:'left',
      dataIndex: 'requiredCheck',
      scopedSlots: {customRender: 'requiredCheck'},
    },
    {
      title: '不可编辑',
      align:'left',
      dataIndex: 'unchangeableCheck',
      scopedSlots: {customRender: 'unchangeableCheck'},
    },
    {
      title: '是否隐私保护',
      align:'left',
      dataIndex: 'protectPrivacyCheck',
      scopedSlots: {customRender: 'protectPrivacyCheck'},
    },{
      title: '是否更多菜单',
      align:'left',
      dataIndex: 'moreCheck',
      scopedSlots: {customRender: 'moreCheck'},
    },
    {
      title: '显示顺序',
      align:'left',
      dataIndex: 'orderNo',
      scopedSlots: {customRender: 'orderNo'},
    }, {
      title: '操作',
      align:'center',
      dataIndex: 'action',
      scopedSlots: {customRender: 'action'},
    }
  ];

  export default {
    name: 'UserInfoManagement',
    data() {
      return {
        tabsKey: '1',
        columns,
        tableData: [],
        loading: false,
        formItemLayout: {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        },
        currentData: {},
        changeList: [],
        drawerVisible: false,
        defaultTitle: '',
      }
    },
    mounted() {
      this.loadTableData();
    },
    methods: {
      loadDefaultSetting(){
        let confirmMsg = '该操作会直接重载默认配置，请确认！'
        if(this.tabsKey == '1'){
          confirmMsg = '该操作会直接重载【用户】默认配置，请确认！';
        }else if(this.tabsKey == '2'){
          confirmMsg = '该操作会直接重载【组织】默认配置，请确认！';
        }else{
          confirmMsg = '该操作会直接重载【功能】默认配置，请确认！';
        }
        this.$confirm({
          title: '重载配置确认',
          content: confirmMsg,
          onOk:() => {
            this.loading = true;
            let settings = []
            if(this.tabsKey == '1'){
              settings = extendUserSetting
            }
            if(this.tabsKey == '2'){
              settings = extendOrgSetting
            }
            if(this.tabsKey == '3'){
              settings = extendResourceSetting
            }
            this.tableData = settings.map(item => {
              let setting = Object.assign(item)
              setting.effectiveCheck = setting.effective === '1'
              setting.hideCheck = setting.hide === '1'
              setting.requiredCheck = setting.required === '1'
              setting.unchangeableCheck = setting.unchangeable === '1'
              setting.protectPrivacyCheck = setting.protectPrivacy === '1'
              setting.moreCheck = setting.more === '1'
              return setting
            })
            api.saveDefaultSetting(this,{
              type: this.tabsKey,
              settingList:this.tableData
            },(data)=>{
              this.loading = false;
              this.changeList = [];
            })
          },
          onCancel() {
          },
        });

      },
      //查询表格以及模态框的数值
      loadTableData() {
        this.loading = true;
        api.querySettingTable(this,{ type: this.tabsKey },(data)=>{
          this.tableData = data.resultData
        },()=>{
          this.loading = false;
        })
        this.changeList = [];
      },
      fnEdit(record) {
        //type 类型：组织、个人等等,可直接用表名 FORMTYPE 表单元素类型  DISPLAYTEXT 显示名称
        if(this.tabsKey == '1'){
          this.defaultTitle = '编辑用户详细信息';
        }else if(this.tabsKey == '2'){
          this.defaultTitle = '编辑组织详细信息';
        }else{
          this.defaultTitle = '编辑功能详细信息';
        }
        this.currentData = {...record};
        this.drawerVisible=true;
        this.$nextTick(()=>{
          this.setValue(record);
        })
      },
      setValue(record){
        this.form.resetFields();
        let updateFormItemValue = this.Tool.objectAssign(this.form.getFieldsValue(),record)
        this.form.setFieldsValue(updateFormItemValue)
      },
      saveSubmit() {
        this.loading = true;
        this.form.validateFields((err, values) => {
          if (!err) {
            values.type = this.tabsKey;

            api.saveSettingTable(this,values,(data)=>{
              this.drawerVisible = false;
              this.loadTableData();
            },()=>{
              this.loading = false;
            })
          }
        })
      },
      getRecord(record) {
        this.changeList = this.changeList.filter(a => a.fieldId != record.fieldId)
        this.changeList.push(record);
      },
      saveSubmitAll(){
        this.loading = true;
        api.saveAllSettingTable(this,{
          tabsKey:this.tabsKey,
          changeList:this.changeList
        },(data)=>{
          this.loadTableData();
        },()=>{
          this.loading = false;
        })
      }
    }
  }
</script>
<style lang="scss" >
.userinfo-fixed-top{
  overflow: hidden;
}
</style>
