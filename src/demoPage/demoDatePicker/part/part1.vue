<template>
  <div>
    <span><1>自定义日期显示格式</span>
    <br/>
    <br/>
    <span>①.DatePicker</span>
    <br/>
    <br/>

    <ta-date-picker :size="size" :defaultValue="moment('2015/01/01', dateFormat)" :format="dateFormat" />
    <br/>
    <br/>
    <span>②.MonthPicker</span>
    <br/>
    <br/>
    <ta-month-picker :size="size" :defaultValue="moment('2015/01', monthFormat)" :format="monthFormat" />
    <br/>
    <br/>
    <span>③.RangePicker</span>
    <br/>
    <br/>
    <ta-range-picker
      :size="size"
      :defaultValue="[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]"
      :format="dateFormat"
    />
    <br/>
    <br/>
    <span><2>禁止选择部分日期与时间</span>
    <br/>
    <br/>
    <span>①.DatePicker</span>
    <br/>
    <br/>
    <ta-date-picker :size="size"
                    format="YYYY-MM-DD HH:mm:ss"
                    :disabledDate="disabledDate"
                    :disabledTime="disabledDateTime"
                    :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }">

    </ta-date-picker>
    <br/>
    <br/>
    <span>②.MonthPicker</span>
    <br/>
    <br/>
    <ta-month-picker :disabledDate="disabledDate" :size="size" placeholder="Select month" />
    <br/>
    <br/>
    <span>③.RangePicker</span>
    <br/>
    <br/>
    <ta-range-picker :size="size"
                     :disabledDate="disabledDate"
                     :disabledTime="disabledRangeTime"
                     :showTime="{hideDisabledOptions: true,defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]}"
                     format="YYYY-MM-DD HH:mm:ss"/>
    <br/>
    <br/>
    <span>④.WeekPicker</span>
    <br/>
    <br/>
    <ta-week-picker :size="size" placeholder="Select week" />


    <br/>
    <br/>
    <span><3>额外页脚</span>
    <br/>
    <br/>
    <span>①.DatePicker</span>
    <br/>
    <br/>
    <ta-date-picker :size="size"  placeholder="有额外页脚的日期框">
      <template slot="renderExtraFooter">
        extra footer
      </template>
    </ta-date-picker>
    <br/>
    <br/>
    <span><4>自定义控制展示面板</span>
    <br/>
    <br/>
    <span>①.DatePicker</span>
    <br/>
    <br/>
    <ta-date-picker
      :size="size"
      :mode="mode1"
      showTime
      @openChange="handleOpenChange1"
      @panelChange="handlePanelChange1"
      placeholder="自定义控制展示面板"
    />
    <br/>
    <br/>
    <span>②.RangePicker</span>
    <ta-range-picker
      :size="size"
      :placeholder="['自定义控制展示面板', '自定义控制展示面板']"
      format="YYYY-MM"
      :value="value"
      :mode="mode2"
      @panelChange="handlePanelChange2"

    />

    <br/>
    <br/>
    <span><5>预设范围</span>
    <br/>
    <br/>
    <span>①.RangePicker</span>
    <ta-range-picker
      :size="size"
      :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
      :placeholder="['预设范围', '预设范围']"

    />

    <ta-range-picker
      :size="size"
      :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
      showTime
      format="YYYY/MM/DD HH:mm:ss"
      :placeholder="['预设范围2', '预设范围2']"

    />
    <br/>
    <br/>
    <span><6>自定义日期单元格的内容和样式</span>
    <br/>
    <br/>
    <span>①.DatePicker</span>
    <br/>
    <br/>
    <ta-date-picker>
      <template slot="dateRender" slot-scope="current, today">
        <div class="ant-calendar-date" :style="getCurrentStyle(current, today)">
          {{current.date()}}
        </div>
      </template>
    </ta-date-picker>
    <br/>
    <br/>
    <span>②.RangePicker</span>
    <br/>
    <br/>
    <ta-range-picker>
      <template slot="dateRender" slot-scope="current">
        <div class="ant-calendar-date" :style="getCurrentStyle(current)">
          {{current.date()}}
        </div>
      </template>
    </ta-range-picker>
    <br/>
    <br/>
    <span>③.WeekPicker</span>
    <br/>
    <br/>
    <ta-week-picker>
      <template slot="dateRender" slot-scope="current">
        <div class="ant-calendar-date" :style="getCurrentStyle(current)">
          {{current.date()}}
        </div>
      </template>
    </ta-week-picker>
    <br/>
    <br/>
    <span>控制日期框尺寸：</span>
    <ta-radio-group v-model="size">
      <ta-radio-button value="large">Large</ta-radio-button>
      <ta-radio-button value="default">Default</ta-radio-button>
      <ta-radio-button value="small">Small</ta-radio-button>
    </ta-radio-group>
    <br/>
    <br/>

    <div class="title">注意事项</div>
    <p>1.<span class="code-box">format：</span>可自定义日期显示格式</p>
    <p>2.<span class="code-box">disabledDate、disabledTime：</span> 可用 disabledDate 和 disabledTime 分别禁止选择部分日期和时间，其中 disabledTime 需要和 showTime 一起使用。</p>
    <p>3.<span class="code-box">dateRender：</span>可以自定义日期单元格的内容和样式，例如将每个月1号画蓝圈</p>
    <p>4.<span class="code-box"> mode、onPanelChange：</span>通过组合 mode 与 onPanelChange 控制要展示的面板。</p>


  </div>
</template>
<script>
  import moment from 'moment';
  export default {
    data () {
      return {
        dateFormat: 'YYYY/MM/DD',
        monthFormat: 'YYYY/MM',
        size: 'default',
        mode1: 'time',
        mode2: ['month', 'month'],
        value: [],
      }
    },
    computed:{

    },
    methods: {

      getCurrentStyle (current, today) {
        const style = {}
        if (current.date() === 1) {
          style.border = '1px solid #1890ff'
          style.borderRadius = '50%'
        }
        return style
      },

      moment,
      range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      },

      disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
      },

      disabledDateTime() {
        return {
          disabledHours: () => this.range(0, 24).splice(4, 20),
          disabledMinutes: () => this.range(30, 60),
          disabledSeconds: () => [55, 56],
        };
      },

      disabledRangeTime(_, type) {
        if (type === 'start') {
          return {
            disabledHours: () => this.range(0, 60).splice(4, 20),
            disabledMinutes: () => this.range(30, 60),
            disabledSeconds: () => [55, 56],
          };
        }
        return {
          disabledHours: () => this.range(0, 60).splice(20, 4),
          disabledMinutes: () => this.range(0, 31),
          disabledSeconds: () => [55, 56],
        };
      },
      handleOpenChange1(open) {
        if (open) {
          this.mode1 = 'time'
        }
      },

      handlePanelChange1(value, mode) {
        this.mode1 = mode
      },
      handlePanelChange2 (value, mode) {
        this.value = value
        this.mode2 = [
          mode[0] === 'date' ? 'month' : mode[0],
          mode[1] === 'date' ? 'month' : mode[1],
        ]
      },
    }
  }
</script>
