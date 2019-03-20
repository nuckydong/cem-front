<template>
    <div id="jobExecutionTrace" style="height: 100%">
        <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
            <ta-row slot="header" type="flex" justify="center" align="middle">
                <ta-input-search placeholder="请输入作业名称" class="search-box" @search="loadData" v-model="searchInfo"
                                 enterButton="搜索"></ta-input-search>
            </ta-row>
            <div slot="centerExtraContent">
                <span>当前数据源名称：</span>
                <ta-tag color="#00a65a" class='no-cursor'>{{this.dsData.datasourceName}}</ta-tag>
                <ta-range-picker
                        :placeholder="['开始时间', '结束时间']"
                        @change="onChange"
                        class="distance"
                />
                <ta-tag-select title="状态"
                               class="filter-name"
                               :data="state"
                               @change="filterClick" v-model="stateList">
                </ta-tag-select>
                <div style="float: right">
                    <ta-button @click="fnBackToHome">返回作业历史</ta-button>
                </div>
            </div>
            <ta-table :columns="statusColumns" :dataSource="statusGridData" :pagination=false>
                <span slot="state" slot-scope="text">
                    <ta-tag v-if="text == 'TASK_FINISHED'" color="#00a65a" class='no-cursor'>已完成</ta-tag>
                    <ta-tag v-else-if="text == 'TASK_STAGING'" color="#d2d6de" class='no-cursor'>等待运行</ta-tag>
                    <ta-tag v-else-if="text == 'TASK_RUNNING'" color="#3c8dbc" class='no-cursor'>运行中</ta-tag>
                    <ta-tag v-else-if="text == 'TASK_ERROR'" color="#dd4b39" class='no-cursor'>启动失败</ta-tag>
                    <ta-tag v-else-if="text == 'TASK_KILLED'" color="#f0ad4e" class='no-cursor'>主动终止</ta-tag>
                    <ta-tag v-else-if="text == 'TASK_FAILED'" color="#d9534f" class='no-cursor'>运行失败</ta-tag>
                </span>
                <template slot="action" slot-scope="text, record">
                    <span v-if="record.message">
                        <a @click="showModel(record.message)" class="operate">备注</a>
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
                    :dataSource.sync="statusGridData"
                    :defaultPageSize="10"
                    :params="pageParams"
                    url="jobmg/elasticjob/jobDatasourceManagementRestService/getJobStatusTrace"
                    ref="gridPager"
            />
        </ta-border-layout>
        <ta-modal v-model="visible"
                  centered
                  :footer="null"
                  width="800px"
                  :destroyOnClose=true>
            <ta-form>
                <ta-form-item label="备注"
                              :labelCol="2"
                              :wrapperCol="22"
                              style="margin-bottom: 0px">
                    <ta-textarea :autosize="{ minRows: 15, maxRows: 20 }" v-model="message" readonly="readonly"/>
                </ta-form-item>
            </ta-form>
        </ta-modal>
    </div>
</template>

<script>

    import api from '../api/index'

    const statusColumns = [
        {
            title: '作业名称',
            dataIndex: 'job_name',
            width: '23%',
        }, {
            title: '分片项',
            dataIndex: 'sharding_item',
            width: '23%',
        }, {
            title: '状态',
            dataIndex: 'state',
            width: '23%',
            scopedSlots: {customRender: 'state'},
        }, {
            title: '创建时间',
            dataIndex: 'creation_time',
            width: '23%',
        }, {
            title: '操作选项',
            dataIndex: 'action',
            width: '10%',
            scopedSlots: {customRender: 'action'},
            align: 'center',
        }];

    const state = [
        {
            value: 'TASK_FINISHED',
            label: '已完成'
        },
        {
            value: 'TASK_STAGING',
            label: '等待运行'
        },
        {
            value: 'TASK_RUNNING',
            label: '运行中'
        },
        {
            value: 'TASK_ERROR',
            label: '启动失败'
        },
        {
            value: 'TASK_KILLED',
            label: '主动终止'
        },
        {
            value: 'TASK_FAILED',
            label: '运行失败'
        }];

    export default {
        name: "jobExecutionTrace",

        components: {},

        data() {
            return {
                statusGridData: [],
                statusColumns,
                searchInfo: '',
                start_time_str: '',
                complete_time_str: '',
                message: '',
                visible: false,
                dsData: {},
                state,
                stateList: [],
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
                });

            },

            pageParams: function () {
                return {
                    driver: this.dsData.driver,
                    url: this.dsData.url,
                    userName: this.dsData.userName,
                    password: this.dsData.password,
                    job_name: this.searchInfo,
                    state: this.stateList[0],
                    start_time_str: this.start_time_str,
                    complete_time_str: this.complete_time_str,
                }
            },

            onChange(value, dateString) {
                this.start_time_str = dateString[0];
                this.complete_time_str = dateString[1];
                this.loadData();
            },

            showModel(message) {
                this.visible = true;
                this.message = message;
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
</style>
