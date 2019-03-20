<template>
  <div id="resourceTemplate"  class="fit">
    <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: false}">
      <ta-row slot="header" type="flex" justify="center" align="middle">
        <ta-input-search placeholder="请输入名字" @search="onSearchUser2" v-model="searchInfo2"
                         class="search-box">
          <ta-button slot="enterButton" type="primary">搜索</ta-button>
        </ta-input-search>
      </ta-row>
      <div class="fit">
        <ta-table
          :columns="roleColumns2"
          :dataSource="roleData2"
          size="small"
          :pagination='false'
        >
          <template slot="workBench" slot-scope="text,record" style="text-align: center">
            <ta-tag v-if="record.workBench !== '1'" color="red" class="no-cursor">非可用</ta-tag>
            <ta-tag v-else color="green" class="no-cursor">可使用</ta-tag>
          </template>

          <template slot="eff2" slot-scope="text, record">
            <a v-if="record.workBench !== '1'" @click="updateTrue(record)">启用</a>
            <a v-else @click="updateFalse(record)">禁用</a>
          </template>
        </ta-table>
        <ta-pagination
          style="float: right;margin-top: 10px"
          showSizeChanger
          showQuickJumper
          :dataSource.sync="roleData2"
          :defaultPageSize="8"
          :params="pageParams"
          url="org/sysmg/WorkbenchManageRestService/queryResource"
          ref="gridPager"
        />
      </div>
    </ta-border-layout>
  </div>
</template>

<script>
  const roleColumns2 = [
    {
      title: '名字',
      dataIndex: 'name',
      width: '15%',
      scopedSlots: {customRender: 'name'},
    }, {
      title: '详细路径',
      dataIndex: 'namePath',
      width: '15%',
      overflowTooltip: 'namePath',
      customRender: (text) => {
        return text.slice(text.lastIndexOf("/") + 1);
      }
    },
    {
      title: '路径',
      dataIndex: 'url',
      width: '30%',
      overflowTooltip: 'url',
      customRender: (text) => {
        return text.slice(text.lastIndexOf("/") + 1);
      }
    }, {
      title: '工作台元素',
      dataIndex: 'workBench',
      width: '20%',
      scopedSlots: {customRender: 'workBench'},
    },
    {
      title: '操作',
      dataIndex: 'eff2',
      width: '20%',
      scopedSlots: {customRender: 'eff2'},
    }];
  export default {
    name: "resourceTemplate",
    data() {
      return {
        roleColumns2,//表头行
        roleData2: [], // 表格数据
        searchInfo2: '',
      }
    },
    mounted() {
      this.$refs.gridPager.loadData();
    },

    methods: {
      pageParams(){
        let param = {};
        param.searchInfo2= this.searchInfo2;
        return param
      },
      onSearchUser2() {
        this.$refs.gridPager.loadData();
      },
      updateTrue(record){
        const submitUrl = {
          url: 'org/sysmg/WorkbenchManageRestService/updateTrue',
          data: {resourceId: record.resourceId},//请求参数
        };
        const callBack = {
          successCallback: data => {
            if (data.errors != null) {
              this.$message.error(data.errors[0].msg, 2);
            }
            if (data.serviceSuccess) {
              if (data.errors === null ) {
                this.$message.success('修改成功');
                  record.workBench = '1';
              } else {
                this.$message.error(data.errors[0].msg);
              }
            } else {
              this.$message.error('修改失败');
            }
          }
        };
        this.Base.submit(null, submitUrl, callBack);
      },
      updateFalse(record) {
        const submitUrl = {
          url: 'org/sysmg/WorkbenchManageRestService/updateFalse',
          data: {resourceId: record.resourceId},//请求参数
        };
        const callBack = {
          successCallback: data => {
            if (data.errors != null) {
              this.$message.error(data.errors[0].msg, 2);
            }
            if (data.serviceSuccess) {
              if (data.errors === null ) {
                this.$message.success('修改成功');
                record.workBench = '0';
              } else {
                this.$message.error(data.errors[0].msg);
              }
            } else {
              this.$message.error('修改失败');
            }
          }
        };
        this.Base.submit(null, submitUrl, callBack);
      },

    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  .ant-tabs-tabpane-active{
    padding-top: 10px;
  }
  .search-box { width: 340px; line-height:46px; margin-right: 10px; }
  .no-cursor {cursor: default;}
  .filter-name { margin-left: 20px }
  .filter-box { display: inline-block }
</style>
