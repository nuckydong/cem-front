<template>
  <div>
    <ta-form formLayout="horizontal" :autoFormCreate="(form)=>{this.form = form}">
      <!--<ta-row>-->
      <ta-form-item label='组织分类'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="customOrgTypeNameId"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: '组织分类不能为空' }]}">
        <!--判断新增组织属于哪种类型,如果是添加顶级组织则加载下拉选项,如果是修改或者新增下级,则使用传值过来的值-->
        <ta-select showSearch
                   allowClear
                   notFoundContent="无数据显示"
                   placeholder="请选择组织类别"
                   optionFilterProp="children"
                   disabled>
          <ta-select-option v-for="(item, index) in orgTypeNameList"
                            :key="index"
                            :value="item.customOrgTypeNameId">
            {{item.customOrgTypeName}}
          </ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item v-if="showParent"
                    label="父级组织"
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="customOrgPath">
        <ta-input :disabled="showParent"/>
      </ta-form-item>
      <ta-form-item label="组织名称"
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="customOrgName"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: '组织名称不能为空' }]}">
        <ta-input-search placeholder="请输入组织名称" @search="treeVisible=true">
          <ta-button slot="enterButton" icon="plus"></ta-button>
        </ta-input-search>
      </ta-form-item>
      <ta-form-item label="自定义编码"
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="customCode">
        <ta-input placeholder='请输入自定义编码'/>
      </ta-form-item>
      <ta-form-item label="是否有效"
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol">
        <ta-switch checkedChildren="有效" unCheckedChildren="无效" v-model="effectiveVal"/>
      </ta-form-item>
      <ta-form-item v-show="isEdit" label="关联人员"
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol">
        <custom-org-user-select-tag v-model="userIds"></custom-org-user-select-tag>
      </ta-form-item>
    </ta-form>
    <custom-org-modal-tree :visible="treeVisible" @close="fnCloseOrgTreeModal"></custom-org-modal-tree>
  </div>
</template>

<script>

import $api from '../api/index'
import CustomOrgModalTree from './customOrgModalTree'
import CustomOrgUserSelectTag from './customOrgUserSelectTag'

const formItemLayout = {
  labelCol: {span: 5},
  wrapperCol: {span: 19}
}
const formTailLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 8, offset: 4}
}

export default {
  components: {CustomOrgUserSelectTag, CustomOrgModalTree},
  props: ['org'],
  name: 'addCustomOrg',
  data () {
    return {
      type: this.org.type, // 进入时的类型,分为addTopOrg:添加顶级组织,add:添加下级组织,edit:修改组织
      addTopOrg: false, // 是否添加为顶级组织
      isEdit: true, // 是否为编辑
      showParent: true, // 是否显示父级组织
      customOrgId: this.org.customOrgId, // 组织id
      customOrgPathId: this.org.customOrgPathId, // 组织路径id
      effectiveVal: this.org.effective != '0', // 默认是否选中
      parentId: this.org.parentId, // 当前组织的父级id
      orgTypeNameList: [],
      formItemLayout,
      formTailLayout,
      treeVisible: false, // 是否显示组织树模态框
      userIds: '', // 选中的用户id
      form: {
        row: {
          gutter: 16
        },
        col: {
          span: 24,
          allSpan: 24
        }
      }
    }
  },
  watch: {
    // 过滤组织名称
    orgFilterText (val) {
      this.$refs.tree.filter(val)
    },
    org: {
      handler: function (val) {
        this.org = val
      },
      deep: true
    }
  },
  mounted: function () {
    this.fnBindForm()
    this.dealCustomOrgPath()
  },
  methods: {
    fnResetForm () {
      this.fnBindForm()
    },
    // 绑定form表单
    fnBindForm () {
      this.form.setFieldsValue({
        customOrgTypeNameId: this.org.customOrgTypeNameId,
        customOrgName: this.org.customOrgName,
        customCode: this.org.customCode
      })
    },
    // 查询所有自定义组织名称
    fnQueryAllCustomOrgTypeName () {
      $api.queryCustomOrgTypeName(this, null, (data) => {
        this.orgTypeNameList = data.data.customOrgTypeNameList
      }
      )
    },
    // 加载处理父级组织以及自定义编码
    dealCustomOrgPath () {
      let self = this
      if (self.type == 'addTop') {
        self.addTopOrg = true
        self.showParent = false
      } else {
        let oldPath = self.org.customOrgPath
        let index = oldPath.lastIndexOf('\/')
        let customOrgPath
        if (index == -1) { // 如果是顶级组织,则直接和组织名称相等
          customOrgPath = self.org.customOrgName
        } else {
          if (self.type === 'edit') { // 如果为编辑,则截取上一级的组织
            customOrgPath = oldPath.substr(0, index)
          } else if (self.type === 'add') {
            // 如果为新增下级,则当前组织为父级组织
            customOrgPath = oldPath
          }
        }
        self.form.setFieldsValue({
          'customOrgPath': customOrgPath
        })

        if (self.type === 'edit') { // 如果为编辑,则设置组织路径
          // 判断是否是顶级节点,如果是,则隐藏父级组织
          if (!self.org.parentId || self.org.parentId == '0') {
            self.showParent = false
          }
          self.isEdit = false
        } else if (self.type === 'add') {
          self.form.setFieldsValue({
            'customOrgName': '',
            'customCode': ''
          })
        }
      }
      // 加载下拉选项
      self.fnQueryAllCustomOrgTypeName()
    },
    // 关闭组织树模态框
    fnCloseOrgTreeModal (val) {
      this.treeVisible = false
      if (val) {
        this.form.setFieldsValue({
          'customOrgName': val
        })
      }
    },
    // 点击更新或者保存组织
    fnUpdateOrSaveOrg () {
      let self = this
      self.form.validateFields((err) => {
        if (!err) {
          // 选择所选的用户信息
          let data = self.form.getFieldsValue()
          let customOrgPath = self.form.getFieldValue('customOrgPath')
          let customOrgName = self.form.getFieldValue('customOrgName')
          if (!customOrgPath) {
            customOrgPath = customOrgName
          } else {
            customOrgPath = customOrgPath + '/' + customOrgName
          }

          let effective = self.effectiveVal ? '1' : '0'

          data.customOrgPath = customOrgPath
          data.effective = effective
          data.customOrgPathId = self.customOrgPathId

          if (self.type === 'add') { // 新增下级
            data.parentId = self.customOrgId
            data.userIds = self.userIds
            // 提交新增数据
            $api.addCustomOrg(self, data, (data) => {
              // 将新增结果添加到表格中
              self.$emit('closeCustomOrgDrawer', data.data.result)
              self.$message.success('更新数据成功')
            })
          } else if (self.type === 'edit') { // 修改组织
            data.customOrgId = self.customOrgId
            data.parentId = self.parentId
            $api.updateCustomOrg(self, data, (dd) => {
              self.$emit('closeCustomOrgDrawer', data)
              self.$message.success('更新数据成功')
            })
          } else { // 新增顶级组织
            data.customOrgPath = customOrgName// 自定义组织全路径和自定义组织名称一样
            data.userIds = self.userIds
            data.addTop = true
            // 提交新增顶级组织数据
            $api.addCustomOrg(self, data, (dd) => {
              self.$emit('closeCustomOrgDrawer', data)
              self.$message.success('更新数据成功')
            })
          }
        }
      })
    },
    // 点击返回上传上级组件
    closeCustomOrgDrawer () {
      this.$emit('closeCustomOrgDrawer')
    }
  }

}
</script>

<style scoped type="text/scss" lang="scss">
</style>
