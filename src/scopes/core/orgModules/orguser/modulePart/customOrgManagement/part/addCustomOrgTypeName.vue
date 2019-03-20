<template>
  <div>
    <ta-row>
      <!--begin 左侧显示组织类别-->
      <ta-col>
        <ta-tabs class="fit">
          <ta-tab-pane tab="自定义组织类别列表">
            <ta-table :columns="customOrgTypeNameColumns"
                      :dataSource="customOrgTypeNameData"
                      :pagination="false"
                      rowKey="customOrgTypeNameId"
                      size="small"
                      style="padding-top: 10px">
              <template slot="customOrgTypeName" slot-scope="text, record, index">
                <div v-if="record.editable">
                  <ta-input style="margin: -5px 0"
                            placeholder="请输入类别名称"
                            :value="text"
                            @change="e => handleChange(e.target.value, record.customOrgTypeNameId, 'customOrgTypeName')"/>
                </div>
                <div v-else>
                  <span v-if="record.effective == '1'">{{text}}</span>
                  <span v-else class="invalidStyle">{{text}}</span>
                </div>
              </template>
              <template slot="customOrgTypeNameCode" slot-scope="text, record, index">
                <div v-if="record.editable">
                  <ta-input style="margin: -5px 0"
                            placeholder="请输入类别自定义编码"
                            :value="text"
                            @change="e => handleChange(e.target.value, record.customOrgTypeNameId, 'customOrgTypeNameCode')"/>
                </div>
                <div v-else>
                  {{text?text:'--'}}
                </div>
              </template>
              <template slot="customOrgTypeNameDesc" slot-scope="text, record, index">
                <div v-if="record.editable">
                  <ta-input style="margin: -5px 0"
                            placeholder="请输入类别描述"
                            :value="text"
                            @change="e => handleChange(e.target.value, record.customOrgTypeNameId, 'customOrgTypeNameDesc')"/>
                </div>
                <div v-else>
                  {{text?text:'--'}}
                </div>
              </template>
              <template slot="effective" slot-scope="text, record, index">
                <div v-if="record.editable">
                  <ta-switch checkedChildren="有效"
                             unCheckedChildren="无效"
                             :checked="text=='1'"
                             @change="(checked) => handleChange(checked, record.customOrgTypeNameId, 'effective')"/>
                </div>
                <div v-else>
                  <span v-if="record.effective == '1'">
                    <ta-tag color="green">有效</ta-tag>
                  </span>
                  <span v-else>
                    <ta-tag color="red">无效</ta-tag>
                  </span>
                </div>
              </template>
              <!--处理操作-->
              <template slot="action" slot-scope="text, record">
                <div class='editable-row-operations'>
                  <!--begin 编辑操作-->
                  <span v-if="record.editable">
                    <a @click="() => fnSaveEdit(record)">保存</a>
                    <ta-divider type="vertical"/>
                    <ta-popconfirm title='取消编辑?'
                                   okText="是"
                                   cancelText="否"
                                   @confirm="() => fnCancelEdit(record.customOrgTypeNameId)">
                      <a>取消</a>
                    </ta-popconfirm>
                  </span>
                  <!--end 编辑操作-->
                  <span v-else>
                    <a @click="() => fnRecordEdit(record.customOrgTypeNameId)">编辑</a>
                    <ta-divider type="vertical"/>
                    <ta-popconfirm slot="actions"
                                   title="确认删除该组织类别(提示:其组织树及其相关人员都会被删除)?"
                                   okText="确认"
                                   cancelText="取消"
                                   @confirm="() => fnDeleteTypeName(record)">
                      <a href="javascript:;">删除</a>
                    </ta-popconfirm>
                  </span>
                </div>
              </template>
            </ta-table>
          </ta-tab-pane>
          <ta-button slot="tabBarExtraContent" @click="fnAddCustomOrgTypeName" type="primary">新增组织类别</ta-button>
        </ta-tabs>
      </ta-col>
      <!--end 左侧显示组织类别-->
    </ta-row>
  </div>
</template>
<script>
  import $api from '../api/index';

  const customOrgTypeNameColumns = [
    {
      title: '类别名称',
      width: '100',
      dataIndex: 'customOrgTypeName',
      scopedSlots: {customRender: 'customOrgTypeName'}
    },
    {
      title: '类别自定义编码',
      width: '100',
      dataIndex: 'customOrgTypeNameCode',
      scopedSlots: {customRender: 'customOrgTypeNameCode'}
    },
    {
      title: '类别描述',
      width: '100',
      dataIndex: 'customOrgTypeNameDesc',
      overflowTooltip: true,
      scopedSlots: {customRender: 'customOrgTypeNameDesc'}
    },
    {
      title: '有效标识',
      width: '100',
      dataIndex: 'effective',
      scopedSlots: {customRender: 'effective'}
    },
    {
      title: '操作',
      key: 'operation',
      width: '100',
      align: 'center',
      scopedSlots: {customRender: 'action'}
    }
  ]
  export default {
    name: 'addCustomOrgTypeName',
    data() {
      return {
        customOrgTypeNameColumns, // 自定义组织类别列属性
        customOrgTypeNameData: [], // 自定义组织名称类型数组
        customOrgTypeName: undefined, // 自定义组织类型名称
        customOrgTypeNameCode: undefined, // 自定义编码
        customOrgTypeNameDesc: undefined, // 自定义描述
        customOrgTypeNameId: undefined, // 自定义组织类型id
        effective: true, // 是否有效
        cacheData: [], // 缓存数据
      }
    },
    mounted: function () {
      this.fnQueryAllCustomOrgTypeName()
    },
    methods: {
      handleChange(value, key, column) {
        const newData = [...this.customOrgTypeNameData]
        const target = newData.filter(item => key === item.customOrgTypeNameId)[0]
        if (target) {
          if (column === 'effective') {
            target[column] = !value ? '0' : '1'
          } else {
            target[column] = value
          }
          this.customOrgTypeNameData = newData
        }
      },
      // 保存编辑
      fnSaveEdit(record) {
        // 提交请求进行保存或者更新
        this.fnSaveOrUpdateTypeName(record)
        // 如果是编辑数据的话，则直接进行处理即可，
        if (record.customOrgTypeNameId) {
          const newData = [...this.customOrgTypeNameData]
          const target = newData.filter(item => record.customOrgTypeNameId === item.customOrgTypeNameId)[0]
          if (target) {
            delete target.editable
            this.customOrgTypeNameData = newData
            this.cacheData = newData.map(item => ({...item}))
          }
        }
      },
      // 取消编辑
      fnCancelEdit(key) {
        const newData = [...this.customOrgTypeNameData]
        const target = newData.filter(item => key === item.customOrgTypeNameId)[0]
        // 处理新增的流程
        if (!key) {
          const addData = this.cacheData.filter(item => key !== item.customOrgTypeNameId)
          delete target.editable
          this.customOrgTypeNameData = addData
        } else {
          if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.customOrgTypeNameId)[0])
            delete target.editable
            this.customOrgTypeNameData = newData
          }
        }
      },
      // 点击进行编辑
      fnRecordEdit(key) {
        const newData = [...this.customOrgTypeNameData]
        const target = newData.filter(item => key === item.customOrgTypeNameId)[0]
        if (target) {
          target.editable = true
          this.customOrgTypeNameData = newData
        }
      },
      // 点击删除自定义组织名称
      fnDeleteTypeName(record) {
        let self = this
        let data = {
          customOrgTypeNameId: record.customOrgTypeNameId
        }
        $api.deleteBatchCustomOrgTypeName(self, data, (data) => {
          self.$message.success('更新数据成功')
          // 从list中移除删除的数据
          const newData = [...self.customOrgTypeNameData]
          const target = newData.filter(item => record.customOrgTypeNameId !== item.customOrgTypeNameId)
          self.cacheData = target.map(item => ({...item}))
          self.customOrgTypeNameData = target
        })
      },
      // 点击新增记录
      fnAddCustomOrgTypeName() {
        const {customOrgTypeNameData} = this
        let newData = {
          effective: '1',
          editable: true
        }
        this.customOrgTypeNameData = [...customOrgTypeNameData, newData]
      },
      // 查询所有自定义组织名称
      fnQueryAllCustomOrgTypeName() {
        let self = this
        $api.queryCustomOrgTypeNameByCondition(self, null, (data) => {
          self.customOrgTypeNameData = data.data.customOrgTypeNameList
          self.cacheData = self.customOrgTypeNameData.map(item => ({...item}))
        })
      },
      // 点击保存执行的相关操作
      fnSaveOrUpdateTypeName(record) {
        let self = this
        if (!record.customOrgTypeName || record.customOrgTypeName.trim() == '') {
          self.$message.warning('自定义组织名称不能为空')
          return
        }
        let data = {
          customOrgTypeName: record.customOrgTypeName,
          customOrgTypeNameCode: record.customOrgTypeNameCode,
          customOrgTypeNameDesc: record.customOrgTypeNameDesc,
          effective: record.effective
        }
        if (!record.customOrgTypeNameId) {
          // 执行新增
          $api.addCustomOrgTypeName(self, data, (data) => {
            self.$message.success('新增组织类别成功')
            self.fnQueryAllCustomOrgTypeName()
          })
        } else {
          data.customOrgTypeNameId = record.customOrgTypeNameId
          $api.updateCustomOrgTypeName(self, data, (data) => {
            self.$message.success('修改组织类别成功')
          })
        }
      }
    }
  }

</script>
<style scoped type="text/scss" lang="scss">
  .invalidStyle {
    color: $text-l3-color;
    &:hover {
      color: $text-l3-color
    }
  }
</style>
