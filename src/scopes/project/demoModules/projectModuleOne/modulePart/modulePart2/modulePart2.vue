<template>
  <div>
    <h1>
      modulePart2 功能 </h1>
    <ta-cascader
      url="org/orguser/orgManagementRestService/getOrgByAsync"
      treeId="orgTreeData"
      :options.sync="options"
      :changeOnSelect="true"
      @change="onChange"
      expandTrigger="hover"
      :fieldNames="{ label: 'orgName', value: 'orgId', children: 'children' }"
    />
    <ta-button @click="testsb">测试showPageLoading</ta-button>
    <ta-button @click="testSendMessage">测试SendMessage</ta-button>
  </div>
</template>

<script>
  export default {
    name: 'modulePart2',
    data() {
      return {
        options: []
      }
    },
    methods: {
      testSendMessage(){
        //显示蒙层   show状态  text显示的加载文本  isTop:是否在顶层框架显示
         this.Base.pageMask({show:true,text:'',isTop:true})
      },
      testsb() {
        this.Base.submit(null, {
          url: 'org/orguser/orgManagementRestService/getOrgByAsync',
          showPageLoading: true
        }, {})
        this.Base.submit(null, {
          url: 'test',
          showPageLoading: true
        }, {})
      },
      onChange(value, selectedOptions) {
        // console.log('触发选中',value)

        // console.log(value,JSON.stringify(selectedOptions));

      }
    }
  }
</script>

<style scoped type="text/scss">

</style>
