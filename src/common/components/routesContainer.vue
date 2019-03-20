
<script type="text/jsx">
  import zhCN from '@yh/ta404-ui/src/components/locale-provider/zh_CN'
  // import enUS from '@yh/ta404-ui/src/components/locale-provider/default'
  export default {
    name: 'routesContainer',
    props:{
      routesList : Array
    },
    data() {
      return {
        name:''
      }
    },
    render(){
      let locale = zhCN
      return (
        <div class="page-wrapper">
          <ta-locale-provider locale={locale}>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </ta-locale-provider>
        </div>
      )
    }
  }
</script>

<style scoped type="text/scss">
.page-wrapper{
  height: 100%;
}
</style>
