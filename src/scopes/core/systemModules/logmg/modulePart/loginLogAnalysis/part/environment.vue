<template>
  <div id="environment" style="height: 100%">
    <ta-border-layout :layout="{header:'450px'}" :centerCfg="{showBar: false}">
      <div slot="header">
        <ta-row type="flex" justify="start" :gutter="10" style="line-height:46px">
          <ta-col>
            <ta-date-picker
              v-model="startDate"
              format="YYYY-MM-DD"
              placeholder="开始日期"
            />
          </ta-col>
          <ta-col>
            <ta-date-picker
              v-model="endDate"
              format="YYYY-MM-DD"
              placeholder="结束日期"/>
          </ta-col>
          <ta-col>
            <ta-button-group>
              <ta-button type='primary' icon="search" @click="getEnvironmentInfo">查询</ta-button>
              <ta-button icon="reload" @click="environmentReload">重置</ta-button>
            </ta-button-group>
          </ta-col>
        </ta-row>
        <ta-divider style="padding-top: 5px;margin-top: 7px;margin-bottom: 0;background-color: #F5F5F5;"></ta-divider>
        <div>
          <div style="position:absolute;left:330px;height: 80px;z-index:99;">
            <ta-radio-group v-model="radioValue" @change="radioChange">
              <ta-radio :style="radioStyle" :value="1">客户端系统版本分析</ta-radio>
              <ta-radio :style="radioStyle" :value="2">客户端分辨率分析</ta-radio>
              <ta-radio :style="radioStyle" :value="3">客户端浏览器版本分析</ta-radio>
            </ta-radio-group>
          </div>
          <div id="environmentArea" style="height: 330px;">
            <IEcharts :option="pie" @click="clickPieChart"></IEcharts>
          </div>
        </div>
      </div>
      <ta-table :columns="environmentColumns"
                :dataSource="environmentGridData"
                :pagination=false>
        <a slot="numday" slot-scope="text, record" href="javascript:;"
           @click="clickNumber('day',record)">{{text}}</a>
        <a slot="numweek" slot-scope="text, record" href="javascript:;"
           @click="clickNumber('week',record)">{{text}}</a>
        <a slot="nummonth" slot-scope="text, record" href="javascript:;"
           @click="clickNumber('month',record)">{{text}}</a>
        <a slot="numyear" slot-scope="text, record" href="javascript:;"
           @click="clickNumber('year',record)">{{text}}</a>
        <a slot="numall" slot-scope="text, record" href="javascript:;"
           @click="clickNumber('all',record)">{{text}}</a>
      </ta-table>
    </ta-border-layout>
    <ta-modal :title="pieModelTitle"
              :visible="pieModelVisible"
              :destroyOnClose=true
              :centered="true"
              width="1200px"
              :bodyStyle="{'height': '520px', 'padding':'0px 0px 0px 0px', 'overflow-y':'auto'}"
              :footer="null"
              @cancel="fnCloseModel">
      <environment-detail :bindData="bindData" ref="environmentDetail"></environment-detail>
    </ta-modal>
  </div>
</template>

<script>

  import api from '../api';
  import IEcharts from 'vue-echarts-v3/src/lite.js';
  import 'echarts/lib/chart/pie';
  import 'echarts/lib/chart/funnel';
  import 'echarts/lib/component/title';
  import 'echarts/lib/component/legend';
  import 'echarts/lib/component/tooltip';
  import 'echarts/lib/component/toolbox';
  import environmentDetail from "../part/environmentDetail.vue";

  const environmentColumns = [
    {
      title: '客户端系统版本',
      dataIndex: 'typecs',
      key: 'typecs',
      align: 'center',
      width: 280,
    }, {
      title: '24小时内',
      dataIndex: 'numday',
      key: 'numday',
      align: 'center',
      scopedSlots: {customRender: 'numday'},
      width: 280,
    }, {
      title: '1周内',
      dataIndex: 'numweek',
      key: 'numweek',
      align: 'center',
      scopedSlots: {customRender: 'numweek'},
      width: 280,
    }, {
      title: '1月内',
      dataIndex: 'nummonth',
      key: 'nummonth',
      align: 'center',
      scopedSlots: {customRender: 'nummonth'},
      width: 280,
    }, {
      title: '1年内',
      dataIndex: 'numyear',
      key: 'numyear',
      align: 'center',
      scopedSlots: {customRender: 'numyear'},
      width: 280,
    }, {
      title: '总计',
      key: 'numall',
      dataIndex: 'numall',
      align: 'center',
      scopedSlots: {customRender: 'numall'},
      width: 280,
    }];

  export default {
    name: "environment",
    components: {
      IEcharts, environmentDetail
    },
    data() {
      return {
        startDate: null,
        endDate: null,
        isClickEnvironmentTab: false,
        radioValue: 1,
        dataType: [],
        environmentSeriesData: [],
        radioStyle: {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
        },
        environmentColumns,
        environmentGridData: [],
        pie: {},

        bindData: {},
        pieModelVisible: false,
        pieModelTitle: "",
      }
    },

    mounted: function () {
      this.getClientSystemInfo();
    },

    methods: {
      getClientSystemInfo() {
        let data = {
          startDate: this.startDate ? this.startDate.format("YYYY-MM-DD") : "",
          endDate: this.endDate ? this.endDate.format("YYYY-MM-DD") : ""
        };
        api.analysisClientSystemInfo(this, data, (result) => {
          this.dataType = this.taGetDataType(result.data.csSeriesData);
          this.environmentSeriesData = this.taGetSeriesData(result.data.csSeriesData);
          this.pie = {
            title: {
              text: '客户端系统版本统计',
              x: 'center',
              y: 'top'
            },
            legend: {                                   // 图例配置
              orient: 'vertical',
              x: '330',
              y: '210',
              data: this.dataType
            },
            tooltip: {                                  // 气泡提示配置
              trigger: 'item',                        // 触发类型，默认数据触发，可选为：'axis'
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            toolbox: {
              x: '1200',
              y: 'bottom',
              show: true,
              feature: {
                magicType: {
                  show: true,
                  type: ['pie', 'funnel'],
                  option: {
                    funnel: {
                      x: '25%',
                      width: '50%'
                    }
                  }
                },
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            series: [{
              name: '客户端系统版本统计',
              type: 'pie',
              radius: '70%',
              center: ['50%', '60%'],
              data: this.environmentSeriesData
            }]
          };
          this.environmentGridData = result.data.csEnvironmentGridData;
        });
      },

      getEnvironmentInfo() {
        let startDate;
        let endDate;
        if (this.startDate) {
          startDate = this.startDate.format('YYYY-MM-DD');
        } else {
          startDate = "";
        }
        if (this.endDate) {
          endDate = this.endDate.format('YYYY-MM-DD');
        } else {
          endDate = "";
        }
        if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
          this.$message.error('开始日期不能大于结束日期');
          return;
        }
        if (this.radioValue === 1) {
          let data = {
            startDate: this.startDate ? this.startDate.format("YYYY-MM-DD") : "",
            endDate: this.endDate ? this.endDate.format("YYYY-MM-DD") : ""
          };
          api.analysisClientSystemInfo(this, data, (result) => {
            this.pie.title.text = '客户端系统版本统计';
            this.pie.legend.data = this.taGetDataType(result.data.csSeriesData);
            let base = Math.ceil(this.pie.legend.data.length / 5);
            if (base > 2 && base <= 5) {
              this.pie.legend.x = (330 - (base - 2) * 105).toString();
            } else if (base > 5) {
              this.pie.legend.x = (330 - 3 * 105).toString();
            } else {
              this.pie.legend.x = '330';
            }
            this.pie.series[0].name = '客户端系统版本统计';
            this.pie.series[0].data = this.taGetSeriesData(result.data.csSeriesData);
            this.environmentColumns.shift();
            this.environmentColumns.unshift({
              title: '客户端系统版本',
              dataIndex: 'typecs',
              key: 'typecs',
              width: 280,
              align: 'center',
            });
            this.environmentGridData = result.data.csEnvironmentGridData;
            if (result.data.csSeriesData.length === 0) {
              this.$message.error('未获取到图表数据');
            }
          });
        } else if (this.radioValue === 2) {
          let data = {
            startDate: this.startDate ? this.startDate.format("YYYY-MM-DD") : "",
            endDate: this.endDate ? this.endDate.format("YYYY-MM-DD") : ""
          };
          api.analysisClientScreenInfo(this, data, (result) => {
            this.pie.title.text = '客户端分辨率统计';
            this.pie.legend.data = this.taGetDataType(result.data.cssSeriesData);
            let base = Math.ceil(this.pie.legend.data.length / 5);
            if (base > 2 && base <= 5) {
              this.pie.legend.x = (330 - (base - 2) * 105).toString();
            } else if (base > 5) {
              this.pie.legend.x = (330 - 3 * 105).toString();
            } else {
              this.pie.legend.x = '330';
            }
            this.pie.series[0].name = '客户端分辨率统计';
            this.pie.series[0].data = this.taGetSeriesData(result.data.cssSeriesData);
            this.environmentColumns.shift();
            this.environmentColumns.unshift({
              title: '客户端分辨率',
              dataIndex: 'typecss',
              key: 'typecss',
              width: 280,
              align: 'center',
            });
            this.environmentGridData = result.data.cssEnvironmentGridData;
            if (result.data.cssSeriesData.length === 0) {
              self.$message.error('未获取到图表数据');
            }
          });
        } else if (this.radioValue === 3) {
          let data = {
            startDate: this.startDate ? this.startDate.format("YYYY-MM-DD") : "",
            endDate: this.endDate ? this.endDate.format("YYYY-MM-DD") : ""
          };
          api.analysisClientBrowserInfo(this, data, (result) => {
            this.pie.title.text = '客户端浏览器版本统计';
            this.pie.legend.data = this.taGetDataType(result.data.cbSeriesData);
            let base = Math.ceil(this.pie.legend.data.length / 5);
            if (base > 2 && base <= 5) {
              this.pie.legend.x = (330 - (base - 2) * 105).toString();
            } else if (base > 5) {
              this.pie.legend.x = (330 - 3 * 105).toString();
            } else {
              this.pie.legend.x = '330';
            }
            this.pie.series[0].name = '客户端浏览器版本统计';
            this.pie.series[0].data = this.taGetSeriesData(result.data.cbSeriesData);
            this.environmentColumns.shift();
            this.environmentColumns.unshift({
              title: '客户端浏览器版本',
              dataIndex: 'typecb',
              key: 'typecb',
              width: 280,
              align: 'center',
            });
            this.environmentGridData = result.data.cbEnvironmentGridData;
            if (result.data.cbSeriesData.length === 0) {
              this.$message.error('未获取到图表数据');
            }
          });
        }
      },

      radioChange(e) {
        this.getEnvironmentInfo();
      },

      clickPieChart(data) {
        this.getEnvironmentDetailInfo(data.name);
      },

      getEnvironmentDetailInfo(name) {
        let startDate;
        let endDate;
        if (this.startDate) {
          startDate = this.startDate.format('YYYY-MM-DD');
        } else {
          startDate = "";
        }
        if (this.endDate) {
          endDate = this.endDate.format('YYYY-MM-DD');
        } else {
          endDate = "";
        }
        if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
          this.$message.error('开始日期不能大于结束日期');
          return;
        }
        this.bindData.startDate = startDate;
        this.bindData.endDate = endDate;
        this.pieModelTitle = name + "--" + "用户登录环境查询";
        if (this.radioValue === 1) {
          this.bindData.isTypecs = true;
          this.bindData.typecs = name;
        } else if (this.radioValue === 2) {
          this.bindData.isTypecss = true;
          this.bindData.typecss = name;
        } else if (this.radioValue === 3) {
          this.bindData.isTypecb = true;
          this.bindData.typecb = name;
        }
        this.pieModelVisible = true;
      },

      clickNumber(timeType, record) {
        this.bindData.gridColumnType = timeType;
        let name;
        if (this.radioValue === 1) {
          name = record.typecs
        } else if (this.radioValue === 2) {
          name = record.typecss
        } else if (this.radioValue === 3) {
          name = record.typecb
        }
        this.getEnvironmentDetailInfo(name);
      },

      environmentReload() {
        this.startDate = null;
        this.endDate = null;
      },

      taGetDataType(data) {
        let rdata = [];
        for (let i in data) {
          rdata.push(data[i].type);
        }
        return rdata;
      },

      taGetSeriesData(data) {
        let rdata = [];
        for (let i in data) {
          rdata.push({'name': data[i].type, 'value': data[i].count});
        }
        return rdata;
      },

      fnCloseModel() {
        this.pieModelVisible = false;
        this.bindData = {};
      }
    }
  }
</script>

<style scoped>

</style>
