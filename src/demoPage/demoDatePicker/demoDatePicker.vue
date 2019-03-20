<template>
  <div id="app">
    <h1>日期选择框</h1>
    <h2>1.基本日期选择框</h2>
    <div class="box">
      <part4></part4>
    </div>
    <h2>2.日期选择框格式与自定义样式详解</h2>
    <div class="box">
      <part1></part1>
    </div>
    <h2>3.日期框状态控制</h2>
    <div class="box">
      <part2></part2>
    </div>
    <h2>4.日期框事件详解</h2>
    <div class="box">
      <part3></part3>
    </div>
    <h2>5.日期框方法详解</h2>
    <div class="box">
      <part5></part5>
    </div>
  </div>
</template>
<script>
  import part1 from './part/part1.vue';
  import part2 from './part/part2.vue';
  import part3 from './part/part3.vue';
  import part4 from './part/part4.vue';
  import part5 from './part/part5.vue';

  export default {
    name:"app",
    data(){
      return {

      }
    },
    components:{part1,part2,part3,part4,part5},
  }
</script>
