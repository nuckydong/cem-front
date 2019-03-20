<template>
    <div id="jobDatasourceConfig" style="height: 100%">
        <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
            <ta-row slot="header" type="flex" justify="center" align="middle">
                <ta-input-search placeholder="请输入数据源名称" class="search-box" v-model="datasourceName"
                                 @search="loadData" enterButton="搜索"></ta-input-search>
            </ta-row>
            <div slot="centerExtraContent">
                <div style="float: right">
                    <ta-button type="primary" @click="visible = true;">新增</ta-button>
                    <ta-button :disabled="btnDisable" @click="batchDelete">批量删除</ta-button>
                </div>
            </div>
            <ta-table :columns="columns" :dataSource="gridData" rowKey="datasourceId"
                      :rowSelection="{selectedRowKeys: selectedRowKeys, onSelect: fnOnSelect, onSelectAll: fnOnSelectAll}"
                      :pagination=false>
                <span slot="action" slot-scope="text, record">
                    <a class="operate" @click="routeToJobExecutionTrace(record)">历史轨迹</a>
                    <ta-divider type="vertical"/>
                    <a class="operate" @click="routeToJobStatusTrace(record)">历史状态</a>
                    <ta-divider type="vertical"/>
                    <ta-popconfirm v-if="gridData.length" title="确定要删除吗?" @confirm="() => onDelete(record.datasourceId)"
                                   okText="确定" cancelText="取消" okType="default">
                        <ta-icon slot="icon" type="question-circle-o" style="color: red"/>
                        <a class="operate">删除</a>
                    </ta-popconfirm>
                </span>
            </ta-table>
            <ta-pagination
                    style="float: right; margin-top: 10px;"
                    showSizeChanger
                    showQuickJumper
                    :dataSource.sync="gridData"
                    :defaultPageSize="10"
                    :params="pageParams"
                    url="jobmg/elasticjob/jobDatasourceManagementRestService/getJobDatasource"
                    ref="gridPager"
            >
            </ta-pagination>
        </ta-border-layout>
        <add-datasource :visible="visible" @close="visible = false" @queryTable="loadData"></add-datasource>
    </div>
</template>
<script>

    import addDatasource from './addDatasource.vue'
    import api from "../api/index"

    const columns = [{
        title: '数据源名称',
        dataIndex: 'datasourceName',
        width: '20%',
    }, {
        title: '数据源驱动',
        dataIndex: 'driver',
        width: '20%',
        overflowTooltip: true
    }, {
        title: '数据源url',
        dataIndex: 'url',
        width: '30%',
        overflowTooltip: true
    }, {
        title: '数据源用户',
        dataIndex: 'userName',
        width: '10%',
    }, {
        title: '操作选项',
        dataIndex: 'action',
        width: '20%',
        scopedSlots: {customRender: 'action'},
        align: 'center',
    }];

    export default {
        name: "jobDatasourceConfig",
        data() {
            return {
                selectedRowKeys: [],
                selectedRows: [],
                columns,
                gridData: [],
                datasourceName: '',
                visible: false,
            };
        },

        components: {addDatasource},

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
                    datasourceName: this.datasourceName,
                }
            },

            fnOnSelect: function (record, selected) {
                const {selectedRowKeys, selectedRows} = this
                if (selected) {
                    selectedRowKeys.push(record.datasourceId);
                    selectedRows.push(record);
                } else {
                    this.selectedRowKeys = selectedRowKeys.filter(datasourceId => datasourceId != record.datasourceId)
                    this.selectedRows = selectedRows.filter(item => item.datasourceId != record.datasourceId)
                }
            },

            fnOnSelectAll: function (selected, selectedRows) {
                this.selectedRows = [], this.selectedRowKeys = []
                if (selected) {
                    selectedRows.map(item => {
                        this.selectedRowKeys.push(item.datasourceId)
                    })
                    this.selectedRows = selectedRows;
                }
            },

            onDelete: function (datasourceId) {
                let data = {
                    datasourceIds: datasourceId,
                }
                api.deleteJobDatasource(this, data, (result) => {
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
                    title: '批量删除数据源',
                    content: '确认删除数据源吗?',
                    cancelText: '取消',
                    okText: '确认',
                    onOk() {
                        let datasourceIds = self.selectedRows.map(function (record) {
                            return record.datasourceId;
                        });
                        datasourceIds = datasourceIds.join(",");
                        let data = {
                            datasourceIds: datasourceIds
                        }
                        api.deleteJobDatasource(self, data, (result) => {
                            self.$message.success("批量删除成功");
                            self.loadData();
                        });
                    },
                });
            },

            routeToJobExecutionTrace(record) {
                this.$router.push(
                    {
                        name: 'jobExecutionTrace',
                        params: {
                            dsData: record,
                        }
                    }
                )
            },

            routeToJobStatusTrace(record) {
                this.$router.push(
                    {
                        name: 'jobStatusTrace',
                        params: {
                            dsData: record,
                        }
                    }
                );
            }
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
