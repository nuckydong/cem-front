<template>
  <div class="assemble">
    <div class="assemble-header">
      <span class="btn-header" @click="$router.back(-1)"><ta-icon type="double-left" class="mg-r06" />返回</span>
      <div class="btn-right">
        <span class="btn-header"><ta-icon type="eye-o" class="mg-r06" />预览</span>
        <span class="btn-header"><ta-icon type="save" class="mg-r06" />发布</span>
      </div>
    </div>
    <div class="left-content">
      <ta-tabs defaultActiveKey="1" style="height: 100%">
        <ta-tab-pane tab="页面" key="1" style="position: relative; height: 100%">
          <div class="add-btn">
            <ta-button type="primary" icon="plus" @click="addOne">新增页面</ta-button>
          </div>
          <div class="add-box pd-10">
            <ta-e-tree ref="addPage" :data="pageData" node-key="id" default-expand-all :expand-on-click-node="false" draggable :allow-drop="allowDrop" :allow-drag="allowDrag">
              <div class="add-item" slot-scope="{ node, data }">
                <div class="add-name" :title="data.label">{{data.label}}</div>
                <ta-icon type="select" class="add-btn-drag" />
                <div class="add-btn-right">
                  <ta-icon type="edit" class="right-btn" @click="fnEdit(node,data,'edit')"/>
                  <ta-icon type="plus" class="right-btn" @click="fnEdit(node,data,'add')"/>
                  <ta-icon type="delete" class="right-btn" @click="fnDelete(node,data)"/>
                </div>
              </div>
            </ta-e-tree>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="组件" key="2" disabled></ta-tab-pane>
        <ta-tab-pane tab="模板" key="3">
          <div class="pd-10">
            <ta-tree-select showSearch style="width: 100%" :treeData="templateTreeData" @change="templateChange" searchPlaceholder='选择所需模板' treeNodeFilterProp='label' />
          </div>
        </ta-tab-pane>
      </ta-tabs>
    </div>
    <div class="center-content"></div>
    <div class="right-content">
      <ta-tabs defaultActiveKey="1">
        <ta-tab-pane tab="组件设置" key="1">
          <div class="pd-10">
            <ta-form :autoFormCreate="(form)=>{this.form = form}">
              <template v-if="form">
                <ta-form-item
                  label='标题'
                  :labelCol="formItemLayout.labelCol"
                  :wrapperCol="formItemLayout.wrapperCol"
                  fieldDecoratorId="test1"
                >
                  <ta-input/>
                </ta-form-item>
                <ta-form-item
                  label='描述'
                  :labelCol="formItemLayout.labelCol"
                  :wrapperCol="formItemLayout.wrapperCol"
                  fieldDecoratorId="test2"
                >
                  <ta-input/>
                </ta-form-item>
                <div style="text-align: center">
                  <ta-button type='primary'>保存</ta-button>
                </div>
              </template>
            </ta-form>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="服务关联" key="2">服务关联</ta-tab-pane>
      </ta-tabs>
    </div>
    <edit-page :visible="editVisible" :rowData="rowData" :edit-type="editType" @close="editClose"></edit-page>
  </div>
</template>
<script>
import editPage from './editPage'
const pageData = [{ 'id': 0, 'label': '父页面', 'children': [ { 'id': 1, 'label': '页面1', 'children': [] }, { 'id': 2, 'label': '页面2', 'children': [ { 'id': 3, 'label': '页面2-1' } ] }, { 'id': 4, 'label': '页面3' } ] }]
const templateTreeData = [{label: '模板1', value: '0', key: '0', children: [{label: '模板1-1', value: '1', key: '1'}]}, {label: '模板2', value: '2', key: '2', children: [{label: '模板2-1', value: '3', key: '3'}, {label: '模板2-2', value: '4', key: '4'}, {label: '模板2-3', value: '5', key: '5'}]}]

export default {
  name: 'assemble',
  data () {
    return {
      form: null,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      pageData,
      editVisible: false,
      rowData: {},
      editType: '',
      templateTreeData
    }
  },
  components: {editPage},
  mounted () {

  },
  methods: {
    fnEdit (node, data, type) {
      this.editVisible = true
      this.rowData = data
      this.editType = type
    },
    editClose (type, data) {
      if (type == 'add') {
        let temp = {
          id: Math.random(),
          label: data.pageName,
          children: []
        }
        this.$refs.addPage.append(temp, this.rowData)
      } else if (type == 'edit') {
        this.$set(this.rowData, 'label', data.pageName)
      }
      this.editVisible = false
    },
    fnDelete (node, data) {
      this.$refs.addPage.remove(data.id)
    },
    addOne () {
      this.pageData.push({ 'id': Math.random(), 'label': '页面' + (this.pageData.length + 1), 'children': [] })
    },
    templateChange (value) {
      console.log(arguments)
      console.log(value)
    },
    allowDrop (draggingNode, dropNode, type) {
      return dropNode.data.id !== 0
    },
    allowDrag (draggingNode) {
      return draggingNode.data.id !== 0
    }
  }
}
</script>
<style lang="scss" type="text/scss">
  .assemble {
    .el-tree-node__content { height: 40px!important; margin-bottom: 10px!important; }
    .el-tree-node__content:hover, .is-current .el-tree-node__content { background-color: #ffffff!important; .add-item { background-color: #f5f7fa!important; } }
    .ant-tabs-content { height: calc(100% - 70px); }
  }
</style>
<style lang="scss" scoped type="text/scss">
  $top-header: 50px;
  $left-menu: 260px;
  $right-menu: 320px;
  $border: 1px solid #e8e8e8;
  .mg-r06 { margin-right: 6px; }
  .assemble { width: 100%; height: 100%; position: relative; }
  .assemble-header { width: 100%; height: $top-header; line-height: $top-header; background-color: #001529; color: #ffffff;
    .btn-header { display: inline-block; padding: 0 15px; height: $top-header; cursor: pointer; &:hover { background-color: #272a3b } }
    .btn-right { float: right; }
  }
  .left-content { position: absolute; width: $left-menu; left: 0; top: $top-header; bottom: 0;
    .add-btn { text-align: center; margin-bottom: 16px; }
    .add-box { position: absolute; width: 100%; top: 48px; left: 0; bottom: 0; overflow: auto; @include beautifyScrollbar(); }
    .add-item { border: $border; border-radius: 3px; height: 40px; line-height: 40px; position: relative; width: 100%; max-width: 216px;
      .add-name { @include text-overflow(); @include noSelect(); width: 100%; box-sizing: border-box; padding: 0 85px 0 40px; }
      .add-btn-drag { width: 30px; height: 40px; border-right: $border; color: #b3aebd; position: absolute; left: 0; top: 0; line-height: 40px; cursor: pointer; }
      .add-btn-right { position: absolute; top: 0; right: 0; width: 85px; @include noSelect(); }
      .right-btn { margin: 0 5px; cursor: pointer; }
    }
  }
  .center-content { position: absolute; left: $left-menu; right: $right-menu; top: $top-header; bottom: 0; border-left: $border; border-right: $border; background-color: #f0f2f5; }
  .right-content { position: absolute; width: $right-menu; right: 0; top: $top-header; bottom: 0; }
  .pd-10 { padding: 0 10px; }
</style>
