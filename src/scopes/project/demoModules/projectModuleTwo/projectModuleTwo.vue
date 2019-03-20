<template>
  <div>
    <h1>
      projectModuleTwo模块
    </h1>


    <ta-button @click="test">接口测试</ta-button>
  </div>
</template>

<script>
  export default {
    name: "projectModuleTwo",
    methods:{
      test(){
        this.Base.submit(null, {
          url: 'test.do', // url
          data: {
            value: "test"
          }
        }, {
          // 成功回调
          successCallback: (data) => {
            console.log(`成功`,data)
          },
          // 失败回调
          failCallback: (data) => {
            console.log(data)
          }

        })
      }
    }
  }
</script>

<style scoped type="text/scss">

</style>
