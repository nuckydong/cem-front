<template>
  <div id="app" ref="app">
    <ta-fixed-top header-height="70px">
      <ta-form slot="header" :autoFormCreate="(form)=>{this.form = form}" layout="inline">

        <ta-form-item
          label="条件搜一搜"
          fieldDecoratorId="searchValue"
        >
          <ta-input></ta-input>
        </ta-form-item>
        <ta-form-item>
          <ta-button @click="searchHandle" type="primary">搜索</ta-button>
        </ta-form-item>
      </ta-form>
      <div>
        <ta-tabs class="fit">
          <ta-tab-pane tab="人员列表">
            <ta-table :columns="userColumns"
                      :dataSource="userList"
                      :pagination=false
                      size="small"
            >
              <span slot="sex" slot-scope="text">{{CollectionLabel('SEX',text)||'--'}}</span>
            </ta-table>
          </ta-tab-pane>
        </ta-tabs>
      </div>
    </ta-fixed-top>
  </div>
</template>


<script>
  export default {
    name: 'vueDemo',
    data() {
      const userColumns =
        [
          {
        title: '姓名',
        dataIndex: 'name',
      },{
        title:'账号',
        dataIndex:'loginId'
      },{
        title:'性别',
        dataIndex:'sex',
        scopedSlots: { customRender: 'sex' }
      },{
        title:'组织路径',
        dataIndex:'namePath'
      }];
      return {
        userColumns,
        userList:[],

      }
    },
    methods: {
      searchHandle() {
        let value=this.form.getFieldValue('searchValue')
        this.Base.submit(this.form,{
          data:{
            pageNumber: 1,
            pageSize: 10,
            orgId: 'fd811ab9c30440088df3e29ea784460a',
            showChildUser: true,
            name:value,
            loginId: value,
            idCardNo: value
          },
          url:"org/orguser/userManagementRestService/queryUserByConditon"
        },
          {
            successCallback:(data)=>{
              this.userList=data.data.pageBean.list
            }
          }
        )
      },
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  #app {
    height: 100%;
  }
</style>

