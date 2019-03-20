<template>
  <div>
    <ta-button type="primary" @click="visible = true">打开模态框</ta-button>
    <ta-modal title="标题" v-model="visible" :centered="true" :bodyStyle="{'height': '300px', 'overflow-y':'auto'}" @ok="visible = false">
      <p>模态框居中，且中间有滚动条</p>
      <p>模态框居中，且中间有滚动条</p>
      <p>模态框居中，且中间有滚动条</p>
      <p>模态框居中，且中间有滚动条</p>
      <p>模态框居中，且中间有滚动条</p>
      <p>模态框居中，且中间有滚动条</p>
      <p>模态框居中，且中间有滚动条</p>
      <p>模态框居中，且中间有滚动条</p>
      <p>模态框居中，且中间有滚动条</p>
      <p>模态框居中，且中间有滚动条</p>
      <p>模态框居中，且中间有滚动条</p>
      <p>模态框居中，且中间有滚动条</p>
      <p>模态框居中，且中间有滚动条</p>
      <p>模态框居中，且中间有滚动条</p>
      <p>模态框居中，且中间有滚动条</p>
      <p>模态框居中，且中间有滚动条</p>
    </ta-modal>
  </div>
</template>
<script>
  export default {
    name:"modalExample",
    data(){
      return {
        visible:false
      }
    }
  }
</script>

