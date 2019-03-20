<template>
  <div>
    <ta-row :gutter="10" style="width: 100%">
      <ta-col :span="8">
        <ta-tabs class="fit">
          <ta-tab-pane tab="缓存节点列表">
            <!--TODO 显示表格-->
            <ta-table :columns="nodeColumns" :dataSource="nodeData"
                      size="small" :pagination="false">
            </ta-table>

          </ta-tab-pane>
        </ta-tabs>
      </ta-col>
      <ta-col :span="8">
        <ta-tabs class="fit">
          <ta-tab-pane tab="缓存键列表">
            <!--TODO 显示表格-->

          </ta-tab-pane>
        </ta-tabs>
      </ta-col>
      <ta-col :span="8">
        <ta-tabs class="fit">
          <ta-tab-pane tab="缓存值">
            <!--TODO 显示表格-->

          </ta-tab-pane>
        </ta-tabs>
      </ta-col>
    </ta-row>

  </div>
</template>

<script>
  import $api from '../api/index'
  const nodeColumns = [
    {
      title: '节点名称', width: "100", dataIndex: 'nodeName', key: 'nodeName'
    },
    // {title: '姓名', width: "100", dataIndex: 'userName', key: 'userName',
    //   customRender:function (text) {
    //     return text?text:'--';
    //   }
    // },
    {
      title: '节点状态', width: "100", dataIndex: 'nodeState', key: 'nodeState',
      // scopedSlots: {customRender: 'nodeState'}
    },
    {
      title: '版本', width: "100", dataIndex: 'version', key: 'version'
    }
  ];

  const keyColumns = [
    {
      title: '节点名称', width: "100", dataIndex: 'nodeName', key: 'nodeName'
    },
    {
      title: '节点状态', width: "100", dataIndex: 'nodeState', key: 'nodeState',
    },
    {
      title: '版本', width: "100", dataIndex: 'version', key: 'version'
    }
  ];
  export default {
    name: "cacheDetail",
    props:['cache'],
    data(){
      return{
        nodeColumns,//node列属性
        nodeData:[],//node节点数据
        keyColumns,//键属性
        keyData:[],//键数据

      }
    },
    mounted:function(){
      this.fnLoadDefaultNode();
    },
    methods:{
      //加载默认节点列表
      fnLoadDefaultNode(){
        let self = this;
        console.log('cache',self.cache);
        let data = {
          cacheName:self.cache.cacheName,
          version:self.cache.version
        };
        $api.queryCacheNodeList(self,data,function (data) {
          self.nodeData = data.data.nodeList;
        });
      },


    }

  }
</script>

<style scoped>

</style>
