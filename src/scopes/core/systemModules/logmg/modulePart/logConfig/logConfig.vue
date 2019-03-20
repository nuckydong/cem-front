<template>
  <div id="app" style="height: 100%">
    <ta-border-layout :centerCfg="{showBar: true}">
      <div slot="centerExtraContent">
        <!--<span>日志级别：</span>-->
        <ta-tag-select title="日志级别" :data="CollectionData('LOGLEVEL')" :is-multi="true" @change="filterClick" v-model="logLevels"></ta-tag-select>
        <div style="float: right">
          <ta-button type="primary" @click="fnAddLogConfig">新增</ta-button>
          <ta-button @click="showFileConfigModal">配置文件路径</ta-button>
        </div>
      </div>
      <div>
        <ta-table :columns="columns" :dataSource="logGridData" :pagination=false>
          <template v-for="col in ['level', 'appenderType']" :slot="col" slot-scope="text, record">
            <ta-select
              v-if="record.editable && col=='level'"
              style="margin: -5px 0;width: 130px;"
              :value="text"
              @change="value => handleLevelChange(value, record.id, 'level')"
            >
              <ta-select-option value="OFF">OFF</ta-select-option>
              <ta-select-option value="ERROR">ERROR</ta-select-option>
              <ta-select-option value="WARN">WARN</ta-select-option>
              <ta-select-option value="INFO">INFO</ta-select-option>
              <ta-select-option value="DEBUG">DEBUG</ta-select-option>
              <ta-select-option value="TRACE">TRACE</ta-select-option>
              <ta-select-option value="ALL">ALL</ta-select-option>
            </ta-select>
            <ta-select v-else-if="record.editable && col=='appenderType'"
                       style="margin: -5px 0;width: 240px;"
                       mode="multiple"
                       :value="text"
                       :tokenSeparators="[',']"
                       @change="value => handleTypeChange(value, record.id, 'appenderType')"
                       placeholder="请选择输出类型（可多选）">
              <ta-select-option v-if="isConsole" key="console">console</ta-select-option>
              <ta-select-option v-else key="console" disabled>console</ta-select-option>
              <ta-select-option v-if="isFile" key="file">file</ta-select-option>
              <ta-select-option v-else key="file" disabled>file</ta-select-option>
              <ta-select-option v-if="isKafka" key="isKafka">kafka</ta-select-option>
              <ta-select-option v-else key="isKafka" disabled>kafka</ta-select-option>
            </ta-select>
            <template v-else>{{text}}</template>
          </template>
          <template slot="action" slot-scope="text, record">
            <div class='editable-row-operations'>
                  <span v-if="record.editable">
                    <a @click="() => save(record.id)">保存</a>
                    <ta-divider type="vertical"/>
                    <a @click="cancel(record.id)">取消</a>
                  </span>
              <span v-else>
                    <a href="javascript:;" @click="editLog(record.id)">编辑</a>
                    <ta-divider type="vertical"/>
                    <ta-popconfirm v-if="logGridData.length" title="确定要删除吗?" @confirm="() => onDelete(record)"
                                   okText="确定" cancelText="取消">
                      <a href="javascript:;">删除</a>
                    </ta-popconfirm>
                  </span>
            </div>
          </template>
        </ta-table>
      </div>
    </ta-border-layout>

    <ta-drawer :destroyOnClose="true"
               title="新增日志配置"
               width="500px"
               placement="right"
               :closable="true"
               @close="fnCloseLogDrawer(false)" :visible="drawVisible"
               style="height: calc(100% - 55px);overflow: auto;paddingBottom: 53px"
    >
      <add-log-config :bindData="bindData" @closeLogDrawer="fnCloseLogDrawer" ref="addLogConfigDrawer"></add-log-config>
      <div slot="footer">
        <ta-button-group>
          <ta-button @click="handleReset">重置</ta-button>
          <ta-button type="primary" @click="saveLogConfig">保存</ta-button>
        </ta-button-group>
      </div>
    </ta-drawer>
    <ta-modal title="配置文件路径"
              v-model="fileVisible"
              :maskClosable="false"
              width="480px"
              @ok="handleFileConfig"
              :destroyOnClose=true>
      <template slot="footer">
        <ta-button key="back" @click="fileConfigCancel">取消</ta-button>
        <ta-button key="submit" type="primary" @click="handleFileConfig">
          保存
        </ta-button>
      </template>
      <ta-form>
        <ta-form-item label="文件路径">
          <ta-input v-model="fileNamePattern"></ta-input>
        </ta-form-item>
      </ta-form>
    </ta-modal>
  </div>
</template>
<script>

  import api from "./api"
  import addLogConfig from "./part/addLogConfig.vue";

  const columns = [{
    title: '包名称',
    dataIndex: 'packageName',
    width: '35%',
    overflowTooltip: true
  }, {
    title: '日志级别',
    dataIndex: 'level',
    scopedSlots: {customRender: 'level'},
    width: '15%'
  }, {
    title: '输出类型',
    dataIndex: 'appenderType',
    scopedSlots: {customRender: 'appenderType'},
    width: '15%'
  }, {
    title: '文件路径',
    dataIndex: 'fileNamePattern',
    width: '25%',
    overflowTooltip: true
  }, {
    title: '操作选项',
    dataIndex: 'action',
    scopedSlots: {customRender: 'action'},
    align: 'center',
    width: '10%'
  }];

  const logGridData = [];

  export default {
    name: "app",
    components: {addLogConfig},
    data() {
      return {
        editable: false,
        total: 12,
        fileVisible: false,
        isConsole: false,
        isFile: false,
        isKafka: false,
        fileNamePattern: '',
        level: '',
        appenderType: [],
        columns,
        logGridData,
        logCacheGridData: [],
        selectedRowKeys: [],
        drawVisible: false,
        bindData: {},
        selectFilter: [],
        logLevels: []
      }
    },

    mounted: function () {
      this.loadData();
    },

    methods: {
      loadData(levels) {
        let data = {};
        if (levels) {
          data = {levels: levels.join(',')};
        }
        api.getLogConfig(this, data, (result) => {
          this.isConsole = result.data.isConsole;
          this.isFile = result.data.isFile;
          this.isKafka = result.data.isKafka;
          this.fileNamePattern = result.data.fileNamePattern;
          this.logGridData = result.data.logGridData;
          this.logCacheGridData = result.data.logCacheGridData;
        });
      },

      editLog(id) {
        let newData = [...this.logGridData];
        let target = newData.filter(item => id === item.id)[0];

        if (target) {
          target.editable = true;
          if (target.appenderType) {
            target.appenderType = target.appenderType.split(",");
          } else {
            target.appenderType = [];
          }
          this.logGridData = newData;
        }
      },

      save(id) {
        let newData = [...this.logGridData];
        let target = newData.filter(item => id === item.id)[0];
        let appenderType = null;
        if (target.appenderType) {
          appenderType = target.appenderType.join(',');
        }
        let data = {
          packageName: target.packageName,
          level: target.level,
          appenderType: appenderType
        };
        api.configLevelAndAppenderType(this, data, (result) => {
          this.loadData();
          this.$message.success("配置成功", 2)
        });
      },

      cancel(id) {
        let newData = [...this.logGridData];
        let target = newData.filter(item => id === item.id)[0];
        if (target) {
          delete target.editable;
          this.deepClone(newData, this.logCacheGridData);
          this.logGridData = newData;
        }
      },

      handleLevelChange(value, id, column) {
        let newData = [...this.logGridData];
        let target = newData.filter(item => id === item.id)[0];
        if (target) {
          target[column] = value;
          this.logGridData = newData;
        }
      },

      handleTypeChange(value, id, column) {
        let newData = [...this.logGridData];
        let target = newData.filter(item => id === item.id)[0];
        if (target) {
          target[column] = value;
          this.logGridData = newData;
        }
      },

      deepClone(origin, target) {
        var target = target || {};
        for (var prop in target) {
          if (target.hasOwnProperty(prop)) {
            if (target[prop] !== null && typeof target[prop] === 'object') {
              origin[prop] = Object.prototype.toString.call(target[prop]) === '[object Array]' ? [] : {};
              this.deepClone(origin[prop], target[prop]);
            } else {
              origin[prop] = target[prop]
            }
          }
        }
      },

      showFileConfigModal() {
        if (!this.fileNamePattern) {
          this.$message.warn("未配置'file'输出类型", 2);
          return;
        }
        this.fileVisible = true;
      },

      handleFileConfig(e) {
        let data = {
          fileNamePattern: this.fileNamePattern,
        };
        api.configFileNamePattern(this, data, (result) => {
          this.loadData();
          this.fileVisible = false;
          this.$message.success("配置成功", 2);
        });
      },

      fileConfigCancel(e) {
        this.fileVisible = false;
      },

      fnAddLogConfig() {
        let self = this;
        self.bindData = {
          isConsole: self.isConsole,
          isFile: self.isFile,
          isKafka: self.isKafka
        }
        self.drawVisible = true;
      },

      fnCloseLogDrawer(load) {
        this.drawVisible = false;
        if (load) {
          this.loadData();
        }
      },

      onDelete: function (record) {
        let data = {
          packageName: record.packageName,
          appenderType: record.appenderType
        }
        api.deleteLogConfigByName(this, data, (result) => {
          this.$message.success("删除成功");
          this.loadData();
        });
      },

      handleReset() {
        this.$refs.addLogConfigDrawer.handleReset();
      },

      saveLogConfig() {
        this.$refs.addLogConfigDrawer.saveLogConfig();
      },

      filterClick() {
        let logLevelStrList = this.logLevels.map( item => {
          if (item === '0') {
            return 'OFF'
          } else if (item === '1') {
            return 'ERROR'
          } else if (item === '2') {
            return 'WARN'
          } else if (item === '3') {
            return 'INFO'
          } else if (item === '4') {
            return 'DEBUG'
          } else if (item === '5') {
            return 'TRACE'
          } else if (item === '6') {
            return 'ALL'
          }
        })
        this.loadData(logLevelStrList);
      },
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
</style>
