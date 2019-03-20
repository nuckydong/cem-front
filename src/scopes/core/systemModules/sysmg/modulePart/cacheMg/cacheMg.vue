<template id="app">
  <ta-layout>
    <ta-layout-content class="backGround">
      <div>
        <!--begin 缓存搜索-->
        <ta-row type="flex" justify="start" :gutter="16">
          <ta-col :span="5">
            <ta-input v-model="cacheName" placeholder="请输入缓存名称"/>
          </ta-col>
          <ta-col>
            <ta-button type="primary" @click="fnQueryCache">查询</ta-button>
            <ta-button @click="fnCacheReset">重置</ta-button>
          </ta-col>
        </ta-row>
        <!--end 缓存搜索-->

        <!--分隔符-->
        <ta-divider class="divider"></ta-divider>

        <ta-row style="margin-top: 10px">
          <ta-col :span="24">
            <ta-tabs class="fit">
              <ta-tab-pane tab="缓存列表">
                <!--begin 加载表格数据-->
                <ta-table :columns="cacheColumns" :dataSource="cacheData" :loading="loading" :pagination="false"
                          rowKey="cacheId"
                          :locale="{filterConfirm: '确定',filterReset: '重置',emptyText: '暂无数据'}"
                          size="small">

                  <!--begin 用户操作项处理-->
                  <template slot="action" slot-scope="text,record">
                    <a @click="fnEditCache(record)">编辑</a>
                  </template>
                  <!--end 用户操作项处理-->
                </ta-table>
                <!--end 加载表格数据-->
              </ta-tab-pane>
            </ta-tabs>
          </ta-col>
        </ta-row>

        <!--begin 编辑模态框-->
        <ta-modal :visible="cache.visible"
                  :centered="true"
                  destroyOnClose
                  :footer="null"
                  width="90%"
                  @cancel="onModalCancel"
                  :bodyStyle="{'height':'400px'}">
          <template slot="title">
            <div style="text-align: center">
              {{cacheNameTitle}}缓存详情
            </div>
          </template>
          <cache-detail :cache="cacheItem"></cache-detail>
        </ta-modal>
        <!--end 编辑模态框-->
      </div>
    </ta-layout-content>
  </ta-layout>
</template>
<script>
  import $api  from './api/index'
  import CacheDetail from "./part/cacheDetail";

  const cacheStateDict = [
    {
      value: '',
      label: '所有'
    }, {
      value: '0',
      label: '未同步'
    }, {
      value: '1',
      label: '同步中'
    }, {
      value: '2',
      label: '同步完成'
    }, {
      value: '3',
      label: '不需同步'
    }
  ];

  const cacheColumns = [
    {title: '缓存名称', dataIndex: 'cacheName', key: 'cacheName'},
    {title: '缓存类型', dataIndex: 'cacheType', key: 'cacheType'},
    {title: '最近更新时间', dataIndex: 'lastUpdateDate', key: 'lastUpdateDate'},
    {title: '最近使用时间', dataIndex: 'lastUseDate', key: 'lastUseDate'},
    {title: '版本号', dataIndex: 'version', key: 'version'},
    {
      title: '操作',
      key: 'operation',
      align: 'center',
      scopedSlots: {customRender: 'action'}
    }
  ];


  export default {
    name: "cacheMg",
    components: {CacheDetail},
    data() {
      return {
        cacheStateDict,//缓存状态
        cacheType: '',//默认缓存类型
        cacheName: '',//缓存名称
        loading: false,//是否显示加载中
        cacheColumns,//缓存表格列属性
        cacheData: [],//表格数据
        pagination: {
          size: 10
        },
        defaultTitle: '编辑缓存',
        cache: {
          visible: false//模态框是否可见
        },
        cacheItem: {},//选中的单行数据
        cacheNameTitle: '',//缓存详情名称标题
      }
    },
    mounted: function () {
      this.fnQueryCache();
    },

    methods: {
      //取消模态框,重新加载数据
      onModalCancel() {
        this.cache.visible = false;
        this.fnQueryCache();
      },
      //重置表单查询
      fnCacheReset() {
        let self = this;
        self.cacheName = '';
      },
      //查询表单
      fnQueryCache() {
        let self = this;
        let data = {
          cacheName: self.cacheName
        };
        $api.queryCacheNameList(self, data, function (data) {
          self.cacheData = data.data.cacheNameList;
        });
      },
      //编辑缓存
      fnEditCache(record) {
        this.cache.visible = true;
        this.cacheItem = record;
        this.cacheNameTitle = record.cacheName;
      },

    }
  }
</script>

<style scoped type="text/scss">
  .backGround {
    background: #fff !important;
    padding: 10px;
  }

  .divider {
    margin: 8px 0;
  }

  .title {
    font-weight: bold;
  }

  .filter {
    display: flex;
    margin-top: 10px;
  }
</style>
