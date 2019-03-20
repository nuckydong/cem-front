<template>
  <div id="online" style="height: 100%">
    <ta-border-layout :layout="{header:'345px'}" :centerCfg="{showBar: false}">
      <div slot="header">
        <ta-row type="flex" justify="start" :gutter="10" style="line-height:46px">
          <ta-col>
            <ta-date-picker
              v-model="onlineDate"
              format="YYYY-MM-DD"
              placeholder="开始日期"
            />
          </ta-col>
          <ta-col>
            <ta-time-picker v-model="onlineStartTime" :open.sync="onlineStartOpen" format="HH:mm" placeholder="开始时间">
              <ta-button slot="addon" size="small" type="primary" @click="handleOnlineClose">确定</ta-button>
            </ta-time-picker>
          </ta-col>
          <ta-col>
            <ta-time-picker v-model="onlineEndTime" :open.sync="onlineEndOpen" format="HH:mm" placeholder="结束时间">
              <ta-button slot="addon" size="small" type="primary" @click="handleOnlineClose">确定</ta-button>
            </ta-time-picker>
          </ta-col>
          <ta-col>
            <ta-button-group>
              <ta-button type='primary' icon="search" @click="getOnlineInfo">查询</ta-button>
              <ta-button icon="reload" @click="onlineReload">重置</ta-button>
            </ta-button-group>
          </ta-col>
        </ta-row>
        <ta-divider style="padding-top: 5px;margin-top: 7px;margin-bottom: 0;background-color: #F5F5F5;"></ta-divider>
        <div style="height: 255px;">
          <IEcharts :option="onlineLine"></IEcharts>
        </div>
      </div>
          <ta-table :columns="onlineColumns" :dataSource="onlineGridData" :pagination=false />
          <ta-pagination
            style="float: right; margin-top: 10px;"
            showSizeChanger
            showQuickJumper
            :dataSource.sync="onlineGridData"
            :defaultPageSize="6"
            :params="onlinePageParams"
            url="logmg/loginLog/loginLogAnalysisRestService/getOnlineInfo"
            ref="onlineGridPager"
          />
    </ta-border-layout>
  </div>
</template>

<script>

  import api from '../api'
  import moment from 'moment';
  import IEcharts from 'vue-echarts-v3/src/lite.js';
  import 'echarts/lib/chart/line';
  import 'echarts/lib/chart/bar';
  import 'echarts/lib/component/legend';
  import 'echarts/lib/component/tooltip';
  import 'echarts/lib/component/toolbox';
  import 'echarts/lib/component/markPoint';
  import 'echarts/lib/component/markLine';


  const onlineColumns = [
    {
      title: '登陆ID',
      dataIndex: 'loginId',
      key: 'loginId',
      width: 244,
      align: 'center',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 244,
    }, {
      title: '登录时间',
      dataIndex: 'loginTime',
      key: 'loginTime',
      scopedSlots: {customRender: 'onlineLoginTime'},
      align: 'center',
      width: 244,
    }, {
      title: '客户端ip',
      dataIndex: 'clientIp',
      key: 'clientIp',
      align: 'center',
      width: 244,
    }, {
      title: '客户端系统',
      dataIndex: 'clientSystem',
      key: 'clientSystem',
      align: 'center',
      width: 244,
    }, {
      title: '客户端浏览器',
      key: 'clientBrowser',
      dataIndex: 'clientBrowser',
      align: 'center',
      width: 244,
    }, {
      title: '客户端分辨率',
      key: 'clientScreenSize',
      dataIndex: 'clientScreenSize',
      align: 'center',
      width: 244,
    }];

  export default {
    name: "online",

    components: {
      IEcharts
    },

    data() {
      return {
        onlineDate: null,
        onlineStartTime: null,
        onlineEndTime: null,
        onlineStartOpen: false,
        onlineEndOpen: false,
        isClickOnlineTab: false,
        onlineChartData: [],
        onlineColumns,
        onlineGridData: [],
        onlineXInterval: 4,
        onlineXdata: [],
        onlineSeriesData: [],
        onlineLine: {},
      }
    },

    mounted: function () {
      this.loadData();
    },

    methods: {

      moment,

      onlinePageParams: function () {
        return {};
      },

      loadData() {
        let timeData = {};
        api.getSysTime(this, timeData, (result) => {
          this.onlineDate = moment(result.data.sysdate, "YYYY-MM-DD");
          this.onlineStartTime = moment(result.data.sysStartTime, "HH:mm");
          this.onlineEndTime = moment(result.data.sysEndTime, "HH:mm");
         /* this.form1.setFieldsValue({
            "onlineDate": moment(result.data.sysdate, "YYYY-MM-DD"),
            "onlineStartTime": moment(result.data.sysStartTime, "HH:mm"),
            "onlineEndTime": moment(result.data.sysEndTime, "HH:mm")
          })*/
          let searchDate, onlineStartTime, onlineEndTime;
          if (this.onlineDate) {
            searchDate = this.onlineDate.format("YYYY-MM-DD");
          } else {
            searchDate = "";
          }
          if (this.onlineStartTime) {
            onlineStartTime = this.onlineStartTime.format("HH:mm");
          } else {
            onlineStartTime = "";
          }
          if (this.onlineEndTime) {
            onlineEndTime = this.onlineEndTime.format("HH:mm");
          } else {
            onlineEndTime = "";
          }
          let data = {
            searchDate: searchDate,
            startTime: onlineStartTime,
            endTime: onlineEndTime,
          };
          api.analysisOnlineStatInfo(this, data, (result) => {
            this.onlineChartData = result.data.onlineChartData;
            this.onlineXdata = api.getStatLogInfoXdata(this, "online");
            this.onlineSeriesData = api.sortStatLogDataByHours(this, "online");
            this.onlineLine = {
              legend: {
                padding: 5,
                itemGap: 10,
                data: ['时点在线人数'],
                x: 'center',
                y: 'top',
              },
              tooltip: {
                trigger: 'axis',
                formatter: '{a}<br/>{b}<br/>{c}人'
              },
              toolbox: {
                show: true,
                feature: {
                  magicType: {show: true, type: ['line', 'bar']},
                  restore: {show: true},
                  saveAsImage: {show: true}
                }
              },
              xAxis: [
                {
                  type: 'category',
                  data: this.onlineXdata,
                  splitLine: {show: false},
                  axisLabel: {
                    interval: this.onlineXInterval
                  },
                  axisLine: {
                    lineStyle: {
                      color: '#0099FF'
                    }
                  }
                }
              ],
              grid: {
                x: 100,
                x2: 70,
                y2: 20,
              },
              yAxis: [
                {
                  splitLine: {show: false},
                  type: 'value',
                  splitNumber: 4,
                  axisLabel: {
                    formatter: '{value} 人'
                  },
                  axisLine: {
                    lineStyle: {
                      color: '#0099FF'
                    }
                  }
                }
              ],
              series: [
                {
                  name: '时点在线人数',
                  type: 'line',
                  smooth: true,
                  showSymbol: false,
                  data: this.onlineSeriesData,
                  markPoint: {
                    itemStyle: {
                      color: '#CC66FF'
                    },
                    data: [
                      {type: 'max', name: '最大值'},
                      {type: 'min', name: '最小值'}
                    ]
                  },
                  markLine: {
                    lineStyle: {
                      color: '#CC66FF'
                    },
                    data: [
                      {type: 'average', name: '平均值'}
                    ]
                  },
                  itemStyle: {
                    normal: {
                      areaStyle: {
                        color: '#1E90FF',
                        type: 'default'
                      },
                      lineStyle: {
                        color: '#CC66FF'
                      }
                    }
                  }
                }
              ]
            }
          });
          this.$refs.onlineGridPager.loadData((result) => {
          });
        });
      },

      getOnlineInfo() {
        if (!this.onlineDate) {
          this.$message.warning('开始日期不能为空');
          return;
        }
        if (!this.onlineStartTime) {
          this.$message.warning('开始时间不能为空');
          return;
        }
        if (!this.onlineEndTime) {
          this.$message.warning('结束时间不能为空');
          return;
        }
        if (new Date(this.onlineDate.format('YYYY-MM-DD') + " " + this.onlineStartTime.format('HH:mm')).getTime() > new Date(this.onlineDate.format('YYYY-MM-DD') + " " + this.onlineEndTime.format('HH:mm')).getTime()) {
          this.$message.warning('开始时间不能大于结束时间');
          return;
        }
        let searchDate = this.onlineDate.format("YYYY-MM-DD");
        let onlineStartTime = this.onlineStartTime.format("HH:mm");
        let onlineEndTime = this.onlineEndTime.format("HH:mm");
        let data = {
          searchDate: searchDate,
          startTime: onlineStartTime,
          endTime: onlineEndTime,
        };
        api.analysisOnlineStatInfo(this, data, (result) => {
          this.onlineChartData = result.data.onlineChartData;
          this.onlineXdata = api.getStatLogInfoXdata(this, "online");
          this.onlineSeriesData = api.sortStatLogDataByHours(this, "online");
          this.onlineLine.xAxis[0].data = this.onlineXdata;
          this.onlineLine.xAxis[0].axisLabel.interval = this.onlineXInterval;
          this.onlineLine.series[0].data = this.onlineSeriesData;
        });
        this.$refs.onlineGridPager.loadData((result) => {
        });
      },

      handleOnlineClose() {
        this.onlineStartOpen = false;
        this.onlineEndOpen = false;
      },

      onlineReload() {
        this.onlineDate = null;
        this.onlineStartTime = null;
        this.onlineEndTime = null;
      },
    }
  }

</script>

<style scoped lang="scss" type="text/scss">

</style>
