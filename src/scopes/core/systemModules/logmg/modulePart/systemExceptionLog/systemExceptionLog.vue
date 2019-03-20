<template>
  <div id="app" style="height: 100%">
    <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
      <ta-row slot="header" type="flex" justify="center" align="middle">
        <ta-input-search placeholder="请输入服务器IP地址、访问端口" class="search-box" v-model="serverAddress"
                         @search="loadData" enterButton="搜索"></ta-input-search>
      </ta-row>
      <div slot="centerExtraContent">
        <ta-range-picker
                v-model="createTime"
                :placeholder="['开始时间', '结束时间']"
                @change="onChange"
        />
        <div style="float: right">
        <ta-button :disabled="btnDisable" @click="batchDeleteExceptionLog">批量删除</ta-button>
        </div>
      </div>
      <ta-table :columns="columns" :dataSource="gridData" rowKey="logId" :rowSelection="{selectedRowKeys: selectedRowKeys, onSelect: fnOnSelect, onSelectAll : fnOnSelectAll}" :pagination=false>
              <span slot="action" slot-scope="text, record">
                <ta-popconfirm v-if="gridData.length" title="确定要删除吗?" @confirm="() => onDelete(record.logId)"
                               okText="确定" cancelText="取消">
                  <a href="javascript:;">删除</a>
                </ta-popconfirm>
                <ta-divider type="vertical"/>
                <a href="javascript:;" @click="showModal(record)">详细异常信息</a>
              </span>
      </ta-table>
      <ta-pagination
        style="float: right; margin-top: 10px;"
        showSizeChanger
        showQuickJumper
        :dataSource.sync="gridData"
        :defaultPageSize="10"
        :params="pageParams"
        url="logmg/exceptionlog/serverExceptionLogRestService/getServerExceptionLog"
        ref="gridPager"
      >
      </ta-pagination>
    </ta-border-layout>
    <ta-modal v-model="visible"
              centered
              :footer="null"
              width="1000px"
              :destroyOnClose="true">
      <ta-form>
        <ta-form-item label="服务地址"
                      :labelCol="formItemLayout.labelCol"
                      :wrapperCol="formItemLayout.wrapperCol"
                      style="margin-bottom: 0px">
          <span>{{detailExceptionInfo.server}}</span>
        </ta-form-item>
        <ta-form-item label="异常类型"
                      :labelCol="formItemLayout.labelCol"
                      :wrapperCol="formItemLayout.wrapperCol"
                      style="margin-bottom: 20px">
          <span>{{detailExceptionInfo.exceptionName}}</span>
        </ta-form-item>
        <ta-form-item label="异常信息"
                      :labelCol="formItemLayout.labelCol"
                      :wrapperCol="formItemLayout.wrapperCol"
                      style="margin-bottom: 0px">
          <ta-textarea :autosize="{ minRows: 20, maxRows: 20 }" v-model="detailExceptionInfo.contentStr"
                       readonly="readonly"></ta-textarea>
        </ta-form-item>
      </ta-form>
    </ta-modal>
  </div>
</template>
<script>

  import api from "./api"

  const columns = [{
    title: '异常类型',
    dataIndex: 'exceptionName',
    width: '25%',
    overflowTooltip: true
  }, {
    title: '访问URL',
    dataIndex: 'url',
    width: '25%',
    overflowTooltip: true
  }, {
    title: '服务器ip地址',
    dataIndex: 'ipAddress',
    width: '10%',
    overflowTooltip: false
  }, {
    title: '访问端口',
    dataIndex: 'port',
    width: '6%',
  }, {
    title: '客户端ip地址',
    dataIndex: 'clientIp',
    width: '10%',
    overflowTooltip: false
  }, {
    title: '报错时间',
    dataIndex: 'createTime',
    width: '11%',
    overflowTooltip: true
  }, {
    title: '操作选项',
    dataIndex: 'action',
    width: '13%',
    scopedSlots: {customRender: 'action'},
    align: 'center',
    overflowTooltip: false
  }];

  export default {
    name: "app",
    data() {
      return {
        formItemLayout: {
          labelCol: {span: 2},
          wrapperCol: {span: 22},
        },
        serverAddress: '',
        createTime: [],
        startDate: '',
        endDate: '',
        visible: false,
        selectedRowKeys: [],
        selectedRows: [],
        detailExceptionInfo: {
          server: "",
          exceptionName: "",
          contentStr: ""
        },
        columns,
        gridData: [],
      };
    },

    mounted: function () {
      this.loadData();
    },

    computed: {
      btnDisable(){ return this.selectedRowKeys.length ? false:true }
    },

    methods: {
      loadData: function () {
        this.$refs.gridPager.loadData((data) => {
          this.selectedRowKeys = [];
          this.selectedRows = [];
        });

      },

      pageParams: function () {
        if (this.startDate !== "" && this.endDate !== "") {
          if (new Date(this.startDate).getTime() > new Date(this.endDate).getTime()) {
            this.$message.error('开始日期不能大于结束日期');
            return;
          }
        }
        return {
          startDate: this.startDate,
          endDate: this.endDate,
          serverAddress: this.serverAddress
        }
      },

      onChange(value, dateString) {
        this.startDate = dateString[0];
        this.endDate = dateString[1];
        this.loadData();
      },

      onDelete: function (logId) {
        let data = {
          logId: logId,
        }
        api.deleteExceptionLogByLogId(this, data, (result) => {
          this.$message.success('删除成功');
          this.loadData();
        });
      },

      showModal: function (record) {
        this.visible = true;
        let data = {
          logId: record.logId
        }
        api.getDetalExceptionLog(this, data, (result) => {
          this.detailExceptionInfo.server = result.data.detailExceptionInfo.ipAddress + ':' + result.data.detailExceptionInfo.port;
          this.detailExceptionInfo.exceptionName = result.data.detailExceptionInfo.exceptionName;
          this.detailExceptionInfo.contentStr = result.data.detailExceptionInfo.contentStr;
        });
      },

      batchDeleteExceptionLog() {
        if (this.selectedRows.length === 0) {
          this.$message.warning("请先选择数据");
          return;
        }
        let self = this;
        self.$confirm({
          title: '批量删除异常日志',
          content: '确认删除这些日志吗?',
          cancelText: '取消',
          okText: '确认',
          onOk() {
            let logIds = self.selectedRows.map(function (record) {
              return record.logId;
            });
            logIds = logIds.join(",");
            let data = {
              logIds: logIds
            }
            api.batchDeleteExceptionLog(self, data, (result) => {
              self.$message.success("批量删除成功");
              self.loadData();
              self.selectedRows = [];
            });
          },
        });
      },

      fnOnSelect: function (record, selected) {
        const {selectedRowKeys, selectedRows} = this
        if(selected){
          selectedRowKeys.push(record.logId);
          selectedRows.push(record);
        } else {
          this.selectedRowKeys = selectedRowKeys.filter(logId => logId != record.logId)
          this.selectedRows = selectedRows.filter(item => item.logId != record.logId)
        }
      },

      fnOnSelectAll: function (selected, selectedRows) {
        this.selectedRows = [], this.selectedRowKeys = []
        if(selected){
          selectedRows.map(item => {
            this.selectedRowKeys.push(item.logId)
          })
          this.selectedRows = selectedRows;
        }
      }
    }
  }
</script>

<style type="text/scss" scoped lang="scss">
  .search-box {
    width: 340px;
    line-height: 46px;
    margin-right: 10px;
  }
</style>
