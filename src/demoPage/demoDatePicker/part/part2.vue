<template>
  <div>
    <ta-date-picker :disabled="datePickerControl" />
    <ta-month-picker  :disabled="datePickerControl" />

    <ta-range-picker  :disabled="datePickerControl"/>

    <ta-week-picker   :disabled="datePickerControl"/>
    <ta-button type="primary" @click="controlDatePicker">控制日期框是否可用</ta-button>






    <div class="title">注意事项</div>
    <p>1.<span class="code-box">disabled ：</span>可控制选择框的不可用状态</p>

  </div>
</template>
<script>
  export default {
    data () {
      return {

        datePickerControl:false,

      }
    },
    computed:{

    },
    methods: {

      controlDatePicker(){

        if(this.datePickerControl){
          this.datePickerControl=false;
        }else{
          this.datePickerControl=true;
        }
        console.log(this.datePickerControl)
      },


    }
  }
</script>
