<template>
  <div id="adminAuthority" style="height: 100%">
    <ta-border-layout :centerCfg="{showBar: true,toolBarStyle:{height:'50px'},layoutConStyle:{padding:0,border: 0}}">
      <div slot="centerExtraContent" style="height: 45px">
        <ta-tabs @tabClick="onRadioClick" :activeKey="value">
          <ta-tab-pane key="1" tab="角色维度" :forceRender="false">

            <!--<admin-role-management></admin-role-management>-->
          </ta-tab-pane>
          <ta-tab-pane key="2" tab="人员维度" :forceRender="false">
            <!--<admin-user-management></admin-user-management>-->
          </ta-tab-pane>
        </ta-tabs>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

    </ta-border-layout>
  </div>
</template>

<script>

  import AdminRoleManagement from "./part/role/adminRoleManagement";
  import AdminUserManagement from "./part/user/adminUserManagement";

  const ROLE = '1';//角色维度
  const USER = '2';//人员维度
  export default {
    name: "adminAuthority",
    components: {AdminUserManagement, AdminRoleManagement},
    data() {
      return {
        value: ROLE//设置默认的tab选项，默认显示角色维度
      }
    },
    methods: {
      onRadioClick(key) {
        this.value = key;
        if (key == ROLE) {
          this.$router.push({name: 'adminRoleManagement'})
        } else if (key == USER) {
          this.$router.push({name: 'adminUserManagement'})
        }
      }
    },
    mounted() {
      // console.log('adminAuthority mounted')
      this.value = ROLE;
    },
    activated() {
      // console.log('adminAuthority activated')
    }
  }
</script>
<style type="text/scss" lang="scss">
  #adminAuthority > .borderLayout > .center > .layoutCon {
    border: 0;
    padding: 0;
  }
</style>
