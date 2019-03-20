<template>
  <div id="loginHistory" style="height: 100%">
    <ta-border-layout :layout="{header:'345px'}" :centerCfg="{showBar: false}">
      <div slot="header">
        <ta-row type="flex" justify="start" :gutter="10" style="line-height:46px">
          <ta-col>
            <ta-date-picker
              v-model="loginDate"
              format="YYYY-MM-DD"
              placeholder="开始日期"
            />
          </ta-col>
          <ta-col>
            <ta-time-picker v-model="loginStartTime" :open.sync="loginStartOpen" format="HH:mm" placeholder="开始时间">
              <ta-button slot="addon" size="small" type="primary" @click="handleLoginClose">确定</ta-button>
            </ta-time-picker>
          </ta-col>
          <ta-col>
            <ta-time-picker v-model="loginEndTime" :open.sync="loginEndOpen" format="HH:mm" placeholder="结束时间">
              <ta-button slot="addon" size="small" type="primary" @click="handleLoginClose">确定</ta-button>
            </ta-time-picker>
          </ta-col>
          <ta-col>
            <ta-button-group>
              <ta-button type='primary' icon="search" @click="getLoginInfo">查询</ta-button>
              <ta-button icon="reload" @click="loginReload">重置</ta-button>
            </ta-button-group>
          </ta-col>
        </ta-row>
        <ta-divider style="padding-top: 5px;margin-top: 7px;margin-bottom: 0;background-color: #F5F5F5;"></ta-divider>
        <div style="height: 255px;">
          <IEcharts :option="loginLine"></IEcharts>
        </div>
      </div>
      <ta-table :columns="loginColumns"
                :dataSource="loginGridData"
                :pagination=false>
      </ta-table>
      <ta-pagination
        style="float: right; margin-top: 10px;"
        showSizeChanger
        showQuickJumper
        :dataSource.sync="loginGridData"
        :defaultPageSize="6"
        :params="loginPageParams"
        url="logmg/loginLog/loginLogAnalysisRestService/getLoginInfo"
        ref="loginGridPager"
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

  const loginColumns = [
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
      scopedSlots: {customRender: 'loginTime'},
      align: 'center',
      width: 244,
    }, {
      title: '注销时间',
      dataIndex: 'logoutTime',
      key: 'logoutTime',
      scopedSlots: {customRender: 'logoutTime'},
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
    name: "loginHistory",

    components: {
      IEcharts
    },

    data() {
      return {
        loginDate: null,
        loginStartTime: null,
        loginEndTime: null,
        loginStartOpen: false,
        loginEndOpen: false,
        isClickLoginTab: false,
        loginChartData: [],
        loginColumns,
        loginGridData: [],
        loginXInterval: 4,
        loginXdata: [],
        loginSeriesData: [],
        loginLine: {},
      }
    },

    mounted: function () {
      this.loadData();
    },

    methods: {

      moment,

      loginPageParams: function () {
        return {};
      },

      loadData() {
        let timeData = {};
        api.getSysTime(this, timeData, (result) => {
          this.loginDate = moment(result.data.sysdate, "YYYY-MM-DD");
          this.loginStartTime = moment(result.data.sysStartTime, "HH:mm");
          this.loginEndTime = moment(result.data.sysEndTime, "HH:mm");
          let searchDate, loginStartTime, loginEndTime;
          if (this.loginDate) {
            searchDate = this.loginDate.format("YYYY-MM-DD");
          } else {
            searchDate = "";
          }
          if (this.loginStartTime) {
            loginStartTime = this.loginStartTime.format("HH:mm");
          } else {
            loginStartTime = "";
          }
          if (this.loginEndTime) {
            loginEndTime = this.loginEndTime.format("HH:mm");
          } else {
            loginEndTime = "";
          }
          let data = {
            searchDate: searchDate,
            startTime: loginStartTime,
            endTime: loginEndTime,
          };
          api.analysisLoginStatInfo(this, data, (result) => {
            this.loginChartData = result.data.loginChartData;
            this.loginXdata = api.getStatLogInfoXdata(this, "login");
            this.loginSeriesData = api.sortStatLogDataByHours(this, "login");
            this.loginLine = {
              legend: {
                padding: 5,
                itemGap: 10,
                data: ['时点登陆人数'],
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
                  data: this.loginXdata,
                  splitLine: {show: false},
                  axisLabel: {
                    interval: this.loginXInterval
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
                  name: '时点登陆人数',
                  type: 'line',
                  smooth: true,
                  showSymbol: false,
                  data: this.loginSeriesData,
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
          this.$refs.loginGridPager.loadData((result) => {
          });
        });
      },

      getLoginInfo() {
        if (!this.loginDate) {
          this.$message.warning('开始日期不能为空');
          return;
        }
        if (!this.loginStartTime) {
          this.$message.warning('开始时间不能为空');
          return;
        }
        if (!this.loginEndTime) {
          this.$message.warning('结束时间不能为空');
          return;
        }
        if (new Date(this.loginDate.format('YYYY-MM-DD') + " " + this.loginStartTime.format('HH:mm')).getTime() > new Date(this.loginDate.format('YYYY-MM-DD') + " " + this.loginEndTime.format('HH:mm')).getTime()) {
          this.$message.warning('开始时间不能大于结束时间');
          return;
        }
        let searchDate = this.loginDate.format("YYYY-MM-DD");
        let loginStartTime = this.loginStartTime.format("HH:mm");
        let loginEndTime = this.loginEndTime.format("HH:mm");
        let data = {
          searchDate: searchDate,
          startTime: loginStartTime,
          endTime: loginEndTime,
        };
        api.analysisLoginStatInfo(this, data, (result) => {
          this.loginChartData = result.data.loginChartData;
          this.loginXdata = api.getStatLogInfoXdata(this, "login");
          this.loginSeriesData = api.sortStatLogDataByHours(this, "login");
          this.loginLine.xAxis[0].data = this.loginXdata;
          this.loginLine.xAxis[0].axisLabel.interval = this.loginXInterval;
          this.loginLine.series[0].data = this.loginSeriesData;
        });
        this.$refs.loginGridPager.loadData((result) => {
        });
      },

      handleLoginClose() {
        this.loginStartOpen = false;
        this.loginEndOpen = false;
      },

      loginReload() {
        this.loginDate = null;
        this.loginStartTime = null;
        this.loginEndTime = null;
      },
    }
  }

</script>

<style scoped lang="scss" type="text/scss">

</style>
