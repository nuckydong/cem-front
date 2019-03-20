<template>
  <div>
    <span><1>blur()</span>
    <br/>
    <br/>
    <span>示例：DatePicker</span>
    <br/>
    <br/>
    <ta-date-picker @blur="blurThis"/>
    <br/>
    <br/>
    <span><2>focus()</span>
    <br/>
    <br/>
    <span>示例：DatePicker</span>
    <br/>
    <br/>
    <ta-date-picker  @focus="focusThis" />










    <div class="title">注意事项</div>
    <p>1.<span class="code-box">blur()、focus() ：</span>四种日期选择框均有这两种事件</p>
    <p>2.<span class="code-box">blur() ：</span>移除焦点</p>
    <p>3.<span class="code-box">focus() ：</span>获取焦点</p>


  </div>
</template>
<script>
  export default {
    data () {
      return {



      }
    },
    computed:{

    },
    mounted() {

    },
    methods: {

      focusThis(){
        this.$message.success("获取焦点")
      },
      blurThis(){
        this.$message.success("移除焦点")
      }


    }
  }
</script>
