<template>
    <div id="zookeeperRegistryCenterConfig" style="height: 100%">
        <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
            <ta-row slot="header" type="flex" justify="center" align="middle">
                <ta-input-search placeholder="请输入注册中心名称" class="search-box" v-model="appName"
                                 @search="loadData" enterButton="搜索"></ta-input-search>
            </ta-row>
            <div slot="centerExtraContent">
                <div style="float: right">
                    <ta-button type="primary" @click="editVisible = true;">新增</ta-button>
                    <ta-button :disabled="btnDisable" @click="batchDelete">批量删除</ta-button>
                </div>
            </div>
            <ta-table :columns="columns" :dataSource="gridData" rowKey="zkId"
                      :rowSelection="{selectedRowKeys: selectedRowKeys, onSelect: fnOnSelect, onSelectAll : fnOnSelectAll}"
                      :pagination=false>
              <span slot="action" slot-scope="text, record">
                  <a class="operate" @click="routeToJobMg(record)">作业维度</a>
                  <ta-divider type="vertical"/>
                  <a class="operate" @click="routeToServerMg(record)">服务器维度</a>
                  <ta-divider type="vertical"/>
                  <a class="operate" @click="routeToFreeBusyJobMg(record)">闲忙任务管理</a>
                  <!--<ta-divider type="vertical"/>
                  <ta-popconfirm v-if="gridData.length" title="确定要删除吗?" @confirm="() => onDelete(record.zkId)"
                                 okText="确定" cancelText="取消" okType="default">
                      <ta-icon slot="icon" type="question-circle-o" style="color: red"/>
                      <a class="operate">删除</a>
                  </ta-popconfirm>-->
              </span>
            </ta-table>
            <ta-pagination
                    style="float: right; margin-top: 10px;"
                    showSizeChanger
                    showQuickJumper
                    :dataSource.sync="gridData"
                    :defaultPageSize="10"
                    :params="pageParams"
                    url="jobmg/elasticjob/zookeeperAddressManagementRestService/getZookeeperRegistryCenter"
                    ref="gridPager"
            >
            </ta-pagination>
        </ta-border-layout>
        <edit-zk :visible="editVisible" @close="editVisible = false" @queryTable="loadData"></edit-zk>
    </div>
</template>
<script>

    import editZk from './editZk.vue'
    import api from "../api/index"

    const columns = [{
        title: '注册中心名称',
        dataIndex: 'appName',
        width: '25%',
        overflowTooltip: true
    }, {
        title: '注册中心地址',
        dataIndex: 'zkAddress',
        width: '30%',
        overflowTooltip: true
    }, {
        title: '命名空间',
        dataIndex: 'appNamespace',
        width: '20%',
        overflowTooltip: false
    }, {
        title: '操作选项',
        dataIndex: 'action',
        width: '25%',
        scopedSlots: {customRender: 'action'},
        align: 'center',
    }];

    export default {
        name: "app",
        data() {
            return {
                selectedRowKeys: [],
                selectedRows: [],
                columns,
                gridData: [],
                appName: '',
                editVisible: false,
            };
        },

        components: {editZk},

        mounted: function () {
            this.loadData();
        },

        computed: {
            btnDisable() {
                return this.selectedRowKeys.length ? false : true
            }
        },

        methods: {
            loadData: function () {
                this.$refs.gridPager.loadData((data) => {
                    this.selectedRowKeys = [];
                    this.selectedRows = [];
                });

            },

            pageParams: function () {
                return {
                    appName: this.appName,
                }
            },

            onDelete: function (zkId) {
                let data = {
                    zkIds: zkId,
                }
                api.batchDeleteZookeeperRegistryCenter(this, data, (result) => {
                    this.$message.success('删除成功');
                    this.loadData();
                });
            },


            batchDelete() {
                if (this.selectedRows.length === 0) {
                    this.$message.warning("请先选择数据");
                    return;
                }
                let self = this;
                self.$confirm({
                    title: '批量删除注册中心',
                    content: '确认删除注册中心吗?',
                    cancelText: '取消',
                    okText: '确认',
                    onOk() {
                        let zkIds = self.selectedRows.map(function (record) {
                            return record.zkId;
                        });
                        zkIds = zkIds.join(",");
                        let data = {
                            zkIds: zkIds
                        }
                        api.batchDeleteZookeeperRegistryCenter(self, data, (result) => {
                            self.$message.success("批量删除成功");
                            self.loadData();
                        });
                    },
                });
            },

            fnOnSelect: function (record, selected) {
                const {selectedRowKeys, selectedRows} = this
                if (selected) {
                    selectedRowKeys.push(record.zkId);
                    selectedRows.push(record);
                } else {
                    this.selectedRowKeys = selectedRowKeys.filter(zkId => zkId != record.zkId)
                    this.selectedRows = selectedRows.filter(item => item.zkId != record.zkId)
                }
            },

            fnOnSelectAll: function (selected, selectedRows) {
                this.selectedRows = [], this.selectedRowKeys = []
                if (selected) {
                    selectedRows.map(item => {
                        this.selectedRowKeys.push(item.zkId)
                    })
                    this.selectedRows = selectedRows;
                }
            },

            connect(zkId) {
                let data = {
                    zkId: zkId,
                }
                api.connectZookeeperRegistryCenter(this, data, (result) => {
                    this.loadData();
                });
            },

            connectBtnDisable(connectFlag) {
                if (connectFlag === '1') {
                    return true;
                } else {
                    return false;
                }
            },

            routeToJobMg(record) {
                this.$router.push(
                    {
                        name: 'jobDimensionality',
                        params: {
                            zkData: record,
                        }
                    }
                )
            },

            routeToServerMg(record) {
                this.$router.push(
                    {
                        name: 'serverDimensionality',
                        params: {
                            zkData: record,
                        }
                    }
                );
            },

            routeToFreeBusyJobMg(record) {
                this.$router.push(
                    {
                        name: 'freeBusyJobManager',
                        params: {
                            zkData: record,
                        }
                    }
                );
            },
        }
    }
</script>

<style type="text/scss" scoped lang="scss">
    .search-box {
        width: 340px;
        line-height: 46px;
        margin-right: 10px;
    }
</style>
