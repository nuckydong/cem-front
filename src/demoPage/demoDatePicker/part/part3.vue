<template>
  <div>
    <span><1>openChange事件</span>
    <br/>
    <br/>
    <ta-date-picker
      :mode="mode1"
      showTime
      @openChange="handleOpenChange1"

    />
    <br/>
    <br/>
    <span><2>Change事件</span>
    <br/>
    <br/>
    <ta-date-picker @change="onChange">

    </ta-date-picker>

    <ta-month-picker @change="onChange"  />

    <ta-range-picker  @change="onChange"/>

    <ta-week-picker  @change="onChange"/>
    <br/>
    <br/>
    <span>当前选择的时间为：</span>
    <ta-input style="width:200px;" v-model="date"></ta-input>
    <br/>
    <br/>
    <span><3>OK事件</span>
    <br/>
    <br/>
    <ta-date-picker
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      placeholder="Select Time"
      @ok="onOk"
    />
    <br/>
    <br/>
    <span><4>calendarChange事件</span>
    <br/>
    <br/>
    <ta-range-picker @calendarChange="onCalendarChange" />
    <br/>
    <br/>



    <div class="title">注意事项</div>
    <p>1.<span class="code-box">openChange：</span>弹出日历和关闭日历的回调，四种时间框均有此事件</p>
    <p>2.<span class="code-box">change：</span>时间发生变化的回调</p>
    <p>3.<span class="code-box">ok：</span>点击确定按钮的回调，仅DatePicker与RangePicker有此事件</p>
    <p>4.<span class="code-box">calendarChange：</span>待选日期发生变化的回调，仅RangePicker有此事件</p>



    <div class="tips">注意，ta-range-picker的Change事件返回的dateString为Array类型；placeholder也为数组类型</div>
    <div class="tips">注意，ta-range-picker的calendarChange事件返回的dateStrings直接输出将为未定义类型</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        date:'',
        mode1: 'time',
        value: [],
      }
    },
    computed:{

    },
    methods: {
      onChange(date, dateString) {
        this.date=dateString.toString();
      },
      handleOpenChange1(open) {
        if (open) {
          this.mode1 = 'time'
        }
      },
      onOk(value) {
        console.log('onOk: ', value);
      },
      onCalendarChange(dates, dateStrings){
        console.log(dates);
        console.log(dateStrings);
      }


    }
  }
</script>
