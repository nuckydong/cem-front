<template>
    <div id="jobExecutionTrace" style="height: 100%">
        <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
            <ta-row slot="header" type="flex" justify="center" align="middle">
                <ta-input-search placeholder="请输入作业名称" class="search-box" @search="loadData" v-model="searchInfo"
                                 enterButton="搜索"></ta-input-search>
            </ta-row>
            <div slot="centerExtraContent">
                <span>当前数据源名称：</span><ta-tag color="#00a65a" class='no-cursor'>{{this.dsData.datasourceName}}</ta-tag>
                <ta-range-picker
                        :placeholder="['开始时间', '结束时间']"
                        @change="onChange"
                        class="distance"
                />
                <ta-tag-select title="操作权限" class="filter-name" :data="CollectionData('ISSUCCESS')"
                               @change="filterClick" v-model="isSuccess"></ta-tag-select>
                <div style="float: right">
                    <ta-button @click="fnBackToHome">返回作业历史</ta-button>
                </div>
            </div>
            <ta-table :columns="executionColumns" :dataSource="executionGridData" :pagination=false>
                <span slot="is_success" slot-scope="text, record">
                    <ta-tag v-if="record.is_success == 1" color="#00a65a" class='no-cursor'>成功</ta-tag>
                    <ta-tag v-else color="#dd4b39" class='no-cursor'>失败</ta-tag>
                </span>
                <template slot="action" slot-scope="text, record">
                    <span v-if = "record.failure_cause">
                        <a :disabled='!record.failure_cause' @click="showModel(record.failure_cause)"
                           class="operate">失败原因</a>
                    </span>
                    <span v-else>
                        -
                    </span>
                </template>
            </ta-table>
            <ta-pagination
                    style="float: right; margin-top: 10px;"
                    showSizeChanger
                    showQuickJumper
                    :dataSource.sync="executionGridData"
                    :defaultPageSize="10"
                    :params="pageParams"
                    url="jobmg/elasticjob/jobDatasourceManagementRestService/getJobExecutionTrace"
                    ref="gridPager"
            />
        </ta-border-layout>
        <ta-modal v-model="visible"
                  centered
                  :footer="null"
                  width="800px"
                  :destroyOnClose=true>
            <ta-form>
                <ta-form-item label="失败原因"
                              :labelCol="2"
                              :wrapperCol="22"
                              style="margin-bottom: 0px">
                    <ta-textarea :autosize="{ minRows: 15, maxRows: 20 }" v-model="failure_cause" readonly="readonly"/>
                </ta-form-item>
            </ta-form>
        </ta-modal>
    </div>
</template>

<script>

    import api from '../api/index'

    const executionColumns = [
        {
            title: '作业名称',
            dataIndex: 'job_name',
            width: '14%',
        }, {
            title: '服务器IP',
            dataIndex: 'ip',
            width: '14%',
        }, {
            title: '分片项',
            dataIndex: 'sharding_item',
            width: '14%',
        }, {
            title: '执行结果',
            dataIndex: 'is_success',
            width: '14%',
            scopedSlots: {customRender: 'is_success'}
        }, {
            title: '开始时间',
            dataIndex: 'start_time',
            width: '14%',
        }, {
            title: '完成时间',
            dataIndex: 'complete_time',
            width: '14%',
        }, {
            title: '操作选项',
            dataIndex: 'action',
            width: '10%',
            scopedSlots: {customRender: 'action'},
            align: 'center',
        }];

    export default {
        name: "jobExecutionTrace",

        components: {},

        data() {
            return {
                executionGridData: [],
                executionColumns,
                searchInfo: '',
                start_time_str: '',
                complete_time_str: '',
                failure_cause: '',
                isSuccess: [],
                visible: false,
                dsData: {},
            }
        },

        mounted: function () {
            if (this.$route.params.dsData instanceof Object) {
                this.dsData = this.$route.params.dsData || {};
                this.loadData();
            } else {
                this.$router.push({name: 'jobDatasourceConfig'})
            }
        },

        methods: {

            loadData: function () {
                this.$refs.gridPager.loadData((data) => {
                    console.log(data.data.executionGridData)
                });

            },

            pageParams: function () {
                return {
                    driver: this.dsData.driver,
                    url: this.dsData.url,
                    userName: this.dsData.userName,
                    password: this.dsData.password,
                    job_name: this.searchInfo,
                    ip: this.ip,
                    is_success: this.isSuccess[0],
                    start_time_str: this.start_time_str,
                    complete_time_str: this.complete_time_str,
                }
            },

            onChange(value, dateString) {
                this.start_time_str = dateString[0];
                this.complete_time_str = dateString[1];
                this.loadData();
            },

            showModel(failure_cause) {
                this.visible = true;
                this.failure_cause = failure_cause;
            },

            fnBackToHome() {
                this.$router.push({name: 'jobDatasourceConfig'});
            },

            filterClick() {
                this.loadData();
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

    .notice-box {
        float: left;
        width: 50%;
    }

    .distance {
        margin-top: 4px;
        margin-left: 20px
    }

    .filter-name {
        margin-left: 20px
    }
</style>
