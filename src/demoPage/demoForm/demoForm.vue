<template>
  <div id="app">
    <h1>form</h1>
    <h2>1.表单Form属性详解</h2>
    <div class="box">
      <part1></part1>
    </div>
    <h2>2.表单Form-item属性详解</h2>
    <div class="box">
      <part2></part2>
    </div>
    <h2>3.getFieldDecorator(id, options) 详解</h2>
    <div class="box">
      <part3></part3>
    </div>
    <h2>4.options.rules 校验规则详解</h2>
    <div class="box">
      <part4></part4>
    </div>
    <h2>5.this.form 提供的 API</h2>
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
