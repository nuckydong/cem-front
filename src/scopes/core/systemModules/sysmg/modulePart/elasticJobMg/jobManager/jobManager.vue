<template>
  <div id="jobManager" style="height: 100%">
      <router-view></router-view>
  </div>
</template>

<script>

  export default{
    name:"jobManager",
    data(){
      return {}
    },
    created(){
      if(this.$route.name != 'zookeeperRegistryCenterConfig'){
        this.$router.push({name:'zookeeperRegistryCenterConfig'})
      }
    }
  }
</script>
