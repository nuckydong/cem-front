<template>
  <div id="jobHistory" style="height: 100%">
      <router-view></router-view>
  </div>
</template>

<script>

  export default{
    name:"jobHistory",
    data(){
      return {}
    },
    created(){
      if(this.$route.name != 'jobDatasourceConfig'){
        this.$router.push({name:'jobDatasourceConfig'})
      }
    }
  }
</script>
