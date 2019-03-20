<template>
  <div id="app" style="height: 100%">
    <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
      <ta-row slot="header" type="flex" justify="center" align="middle">
        <ta-input-search placeholder="请输入经办人姓名" class="search-box" v-model="opUser"
                         @search="loadData" enterButton="搜索"></ta-input-search>
      </ta-row>
      <div slot="centerExtraContent">
        <ta-range-picker
          v-model="opTime"
          :placeholder="['开始时间', '结束时间']"
          @change="onChange"
        />
        <ta-select allowClear placeholder="请选择操作类型" v-model="opType" @change="changeOpType" style="width: 220px" class="filter-name">
          <ta-select-option v-for="item in CollectionData('OPTYPE')"
                            :key="item.value"
                            :value="item.value">
            {{item.label}}
          </ta-select-option>
        </ta-select>
        <ta-tag-select title="操作权限" class="filter-name" :data="CollectionData('HAVAORNOT')" :is-multi="true"
                       @change="filterClick" v-model="isPermissions"></ta-tag-select>
        <ta-tag-select title="影响主体类型" class="filter-name" :data="CollectionData('OPOBJTYPE')" :is-multi="true"
                       @change="filterClick" v-model="influenceBodyTypes"></ta-tag-select>
      </div>
      <div>
        <ta-table :columns="columns"
                  :dataSource="gridData"
                  ref="table"
                  rowKey="logId"
                  :pagination=false>
          <template slot="action" slot-scope="text, record">
            <span v-if="record.changeContent">
                <a @click="showModel(record.logId)" class="operate">操作内容</a>
            </span>
            <span v-else>
                -
            </span>
          </template>
          <span slot="isPermission" slot-scope="text">
            <ta-tag v-if="text == '1'" color="green" class='no-cursor'>有</ta-tag>
            <ta-tag v-else color="red" class='no-cursor'>无</ta-tag>
          </span>
          <span slot="opType" slot-scope="text">
              {{CollectionLabel('OPTYPE',text)}}
          </span>
          <span slot="influenceBodyType" slot-scope="text">
              {{CollectionLabel('OPOBJTYPE',text)}}
          </span>
          <span slot="opBodyType" slot-scope="text">
              {{CollectionLabel('OPOBJTYPE',text)}}
          </span>
          <span slot="influenceBodyName" slot-scope="text, record">
            <ta-tag v-if="record.influenceBody && !text" color="red" class='no-cursor'>已删除</ta-tag>
            <span v-else>{{text}}</span>
          </span>
          <span slot="opSubjectName" slot-scope="text, record">
            <ta-tag v-if="record.opSubject && !text" color="red" class='no-cursor'>已删除</ta-tag>
            <span v-else>{{text}}</span>
          </span>
        </ta-table>
        <ta-pagination
          style="float: right; margin-top: 10px;"
          showSizeChanger
          showQuickJumper
          :dataSource.sync="gridData"
          :defaultPageSize="10"
          :params="pageParams"
          url="org/sysmg/orgOpLogRestService/getOrgOpLog"
          ref="gridPager"
        >
        </ta-pagination>
      </div>
    </ta-border-layout>
    <ta-modal v-model="visible"
              centered
              :footer="null"
              width="800px"
              :destroyOnClose="true">
      <ta-form :autoFormCreate="(form)=>{this.form = form}" :layout="formLayout">
        <ta-form-item label="操作内容"
                      style="margin-bottom: 0px"
        >
          <ta-textarea :autosize="{ minRows: 20, maxRows: 20 }" v-model="changeContent" readonly="readonly"/>
        </ta-form-item>
      </ta-form>
    </ta-modal>
  </div>
</template>
<script>

  import api from "./api"

  const columns = [{
    title: '经办人',
    dataIndex: 'name',
  }, {
    title: '经办时间',
    dataIndex: 'opTime',
  }, {
    title: '操作权限',
    dataIndex: 'isPermission',
    scopedSlots: {customRender: 'isPermission'}
  }, {
    title: '操作类型',
    dataIndex: 'opType',
    scopedSlots: {customRender: 'opType'}
  }, {
    title: '影响主体类型',
    dataIndex: 'influenceBodyType',
    scopedSlots: {customRender: 'influenceBodyType'}
  }, {
    title: '影响主体名称',
    dataIndex: 'influenceBodyName',
    scopedSlots: {customRender: 'influenceBodyName'}
  }, {
    title: '操作主体类型',
    dataIndex: 'opBodyType',
    scopedSlots: {customRender: 'opBodyType'},
  }, {
    title: '操作主体名称',
    dataIndex: 'opSubjectName',
    scopedSlots: {customRender: 'opSubjectName'}
  }, {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    scopedSlots: {customRender: 'action'},
  }];

  export default {
    name: "app",
    components: {},
    data() {
      return {
        formLayout: 'vertical',
        columns,
        gridData: [],
        startDateStr: '',
        endDateStr: '',
        opTime: [],
        opUser: '',
        opType: undefined,
        isPermissions: [],
        influenceBodyTypes: [],
        opBodyTypes: [],
        visible: false,
        changeContent: '',
      };
    },

    mounted: function () {
      this.loadData();
    },

    methods: {

      pageParams: function () {
        if (this.startDateStr !== "" && this.endDateStr !== "") {
          if (new Date(this.startDateStr).getTime() > new Date(this.endDateStr).getTime()) {
            this.$message.warn('开始日期不能大于结束日期');
            return;
          }
        }
        return {
          startDateStr: this.startDateStr,
          endDateStr: this.endDateStr,
          opUser: this.opUser,
          opType: this.opType,
          isPermissions: this.isPermissions,
          influenceBodyTypes: this.influenceBodyTypes,
          opBodyTypes: this.opBodyTypes,
        }
      },

      loadData: function () {
        this.$refs.gridPager.loadData((data) => {
        });
      },

      filterClick() {
        this.loadData();
      },

      changeOpType() {
        this.loadData();
      },

      showModel(logId) {
        this.visible = true;
        let data = {
          logId: logId
        }
        api.getChangeContent(this, data, (result) => {
          this.changeContent = result.data.changeContent;
        });
      },

      onChange(value, dateString) {
        this.startDateStr = dateString[0];
        this.endDateStr = dateString[1];
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

  .filter-name {
    margin-left: 20px
  }
</style>
