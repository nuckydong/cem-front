<template>
  <div>
    <div id="editArea">
      <ta-form :autoFormCreate="(form)=>{this.form = form}">
        <ta-form-item
          label='行政区划名称：'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="areaName"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '行政区划名称不能为空!' }]}"
        >
          <ta-input :disabled="flag"/>
        </ta-form-item>
        <ta-form-item
          label='行政区划编码：'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="areaCode"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '行政区划编码不能为空!' }]}"
        >
          <ta-input :disabled="flag"/>
        </ta-form-item>

        <ta-form-item
          label='排序号：'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="areaOrder"
          :fieldDecoratorOptions="{rules: [{ required: false, message: '排序号不能为空!' }]}"
        >
          <ta-input :disabled="flag"/>
        </ta-form-item>

        <ta-form-item
          label='区划层级：'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="areaLevel"
        >
          <ta-radio-group size="small" buttonStyle="solid" :disabled="flag">
            <ta-radio-button v-for="item in CollectionData('AREALEVEL')" :key='item.value' :value='item.value'>
              {{item.label}}
            </ta-radio-button>
          </ta-radio-group>
        </ta-form-item>

        <ta-form-item
          label='状态：'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          fieldDecoratorId="effective">
          <ta-switch checkedChildren="有效" unCheckedChildren="无效" v-model="effective" :disabled="flag"/>
        </ta-form-item>

        <!--<ta-form-item :wrapperCol="tailFormItemLayout.wrapperCol" >-->
        <!--<ta-button @click="onSubmitForm" type="primary">保存</ta-button>-->
        <!--<ta-button @click="onResetForm" style="margin-left: 10px">重置</ta-button>-->
        <!--</ta-form-item>-->
      </ta-form>

      <!--<ta-row type="flex" justify="end" v-show="!flag">-->
      <!--<ta-col style="bottom: 0;position:fixed; float: right">-->
      <!--<ta-button-group>-->
      <!--<ta-button @click="onResetForm">重置</ta-button>-->
      <!--<ta-button type="primary" @click="onSubmitForm">保存</ta-button>-->
      <!--</ta-button-group>-->
      <!--</ta-col>-->
      <!--</ta-row>-->
    </div>
    <!--&lt;!&ndash;新增完成后弹框&ndash;&gt;-->
    <!--<div-->
    <!--:style="{-->
    <!--position: 'absolute',-->
    <!--bottom: 0,-->
    <!--width: '100%',-->
    <!--borderTop: '1px solid #e8e8e8',-->
    <!--padding: '10px 16px',-->
    <!--textAlign: 'right',-->
    <!--left: 0,-->
    <!--background: '#fff',-->
    <!--borderRadius: '0 0 4px 4px',-->
    <!--}"-->
    <!---->
    <!--&gt;-->

    <!--<ta-button @click="onSubmitForm" type="primary">保存</ta-button>-->
    <!--<ta-button @click="onResetForm">重置</ta-button>-->

    <!--</div>-->

  </div>

</template>

<script>

  import $api from '../api/index'

  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
  }
  const tailFormItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 8, offset: 4}
  }

  export default {
    name: 'editAreaInfo',
    props: ['area', 'flag'],

    mounted() {
      this.initForm()
    },
    data() {
      return {
        effective: true,
        formItemLayout,
        tailFormItemLayout,
        editArea:this.area
      }
    },
    methods: {
      // 提交表单
      onSubmitForm() {
        let self = this
        self.form.validateFields((err) => {
          if (!err) {
            // editArea赋值给要提交的数据
            let formVal = self.form.getFieldsValue()
            let data = formVal
            data.areaId = self.editArea.areaId
            data.parentId = self.editArea.parentId
            data.idPath = self.editArea.idPath
            data.namePath = self.editArea.namePath
            // 将修改过的值赋值给submitData
            data.effective = self.effective === true ? '1' : '0'

            $api.updateArea(self, data, (dd) => {
              self.editArea = data
              // 提示
              self.$message.success('更新操作成功')
              self.$emit('editSuccess',data)
            })
          }
        })
      },
      // 重置表单
      onResetForm() {
        this.initForm()
      },
      initForm() {
        // 设置一组控件的值
        let self = this
        self.form.setFieldsValue({
          areaName: self.editArea.areaName,
          areaCode: self.editArea.areaCode,
          areaOrder: self.editArea.areaOrder,
          areaLevel: self.editArea.areaLevel.toString()
        })
        self.effective = self.editArea.effective == '1'
      }
    }

  }
</script>
<style>
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  #components-back-top-demo-custom .ant-back-top {
    bottom: 50px;
  }

  .ant-upload-list-picture-card .ant-upload-list-item {
    width: 154px;
    height: 154px;

  }

  .radioButton {
    /*width: 70px;*/
  }

</style>
