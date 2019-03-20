<template>
  <div>
    <div class="tips">使用方法： this.form.XXXX()</div>
    <h3>1.getFieldError/getFieldsError 获取输入控件的 Error</h3>
    <part5_1></part5_1>
    <h3 class="mg-t2">2.getFieldValue（获取单个）/getFieldsValue（获取多个/全部）输入控件的值</h3>
    <part5_2></part5_2>
    <h3 class="mg-t2">3.setFields（设值与 Error）/setFieldsValue（设值）/resetFields（重置）</h3>
    <part5_3></part5_3>
    <h3 class="mg-t2">4.isFieldTouched（单个）/isFieldsTouched（任一）/isFieldValidating是否在校验状态</h3>
    <part5_4></part5_4>
    <h3 class="mg-t2">5.validateFields/validateFieldsAndScroll 校验并获取一组输入域的值与 Error</h3>
    <part5_5></part5_5>
  </div>
</template>

<script>
  import part5_1 from './part5_1.vue';
  import part5_2 from './part5_2.vue';
  import part5_3 from './part5_3.vue';
  import part5_4 from './part5_4.vue';
  import part5_5 from './part5_5.vue';
  export default {
    components:{part5_1,part5_2,part5_3,part5_4,part5_5},
  }
</script>
<style>
  .mg-t2 { margin-top: 20px; }
</style>
