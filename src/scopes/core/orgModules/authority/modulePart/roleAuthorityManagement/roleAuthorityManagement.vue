<template>
  <div id="roleAuthorityManagement" style="height: 100%">
    <!--<ta-border-layout :layout="{header:'70px'}">
      <div slot="header" style="line-height:46px;">
        <ta-radio-group @change="onRadioClick" v-model="value">
          <ta-radio-button value="1">角色维度</ta-radio-button>
          <ta-radio-button value="2">人员维度</ta-radio-button>
        </ta-radio-group>
      </div>
      <router-view></router-view>
    </ta-border-layout>-->
    <ta-border-layout :centerCfg="{showBar: true,toolBarStyle:{height:'50px'},layoutConStyle:{padding:0,border: 0}}">
      <div slot="centerExtraContent" style="height: 45px">
        <ta-tabs @tabClick="onRadioClick" :activeKey="value">
          <ta-tab-pane key="1" tab="角色维度" ></ta-tab-pane>
          <ta-tab-pane key="2" tab="人员维度" ></ta-tab-pane>
        </ta-tabs>
      </div>
      <router-view></router-view>
    </ta-border-layout>
  </div>
</template>

<script>

  export default{
    name:"roleAuthorityManagement",
    data(){
      return {
        value: '1',
      }
    },
    methods:{
      onRadioClick(key){
        this.value = key;
        if(key==1){
          this.$router.push({name:'publicRoleManager'})
        }else if(key==2){
          this.$router.push({name:'userRole'})
        }
      }
    },
    // created(){
    //   if(this.$route.name!='publicRoleManager'){
    //     this.$router.push({name:'publicRoleManager'})
    //   }
    // },
    activated(){
      if(this.$route.name==="publicRoleManager"){
        this.value = '1';
      }else if(this.$route.name==="userRole"){
        this.value='2';
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
</style>
