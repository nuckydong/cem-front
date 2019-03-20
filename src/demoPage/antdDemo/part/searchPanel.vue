<template>
  <div>
    <ta-row>
      <ta-col :span="12">
        <ta-input-search
          placeholder="输入框"
          @search="onSearch"
          @enterButton = "onSearch"
        />
      </ta-col>
      <ta-col :span="12">
        <!-- 文档详情见 https://ta3face.gitee.io/ta404-ui/#/docs/components/serch-panel-cn/
        ta-search-panel组件
        id: 组件唯一标识
        width: 弹出框宽度，数字，默认500
        height: 弹出框高度，数字，默认400
        form：必输，表单经 Form.create() 包装过的组件自带的 this.form 属性
        placement： 气泡框所在位置
        target(slot)：触发 searchPanel 显示的 HTML 元素
        formPanel(slot)： 表单
        search：点击"搜索"或者"搜索并保存"后的回调函数，返回值为表单值
        -->
        <ta-search-panel :form="form" id="demo" :width="450" @search="onSearch">
          <ta-button slot="target">高级搜索</ta-button>
          <div slot="formPanel">
            <ta-button-group style="margin-bottom: 10px;">
              <ta-button @click="formLayout = 'horizontal'">布局：horizontal</ta-button>
              <ta-button @click="formLayout = 'vertical'">布局：vertical</ta-button>
              <ta-button @click="formLayout = 'inline'">布局：inline</ta-button>
            </ta-button-group>
            <ta-form :autoFormCreate="(form)=>{this.form = form}" :layout="formLayout">
              <template v-if="form">
                <ta-form-item
                  label='文字信息'
                  :labelCol="formItemLayout.labelCol"
                  :wrapperCol="formItemLayout.wrapperCol"
                  fieldDecoratorId="form1"
                >
                  <ta-input />
                </ta-form-item>
                <ta-form-item
                  label='单选框'
                  :labelCol="formItemLayout.labelCol"
                  :wrapperCol="formItemLayout.wrapperCol"
                  fieldDecoratorId="form2"
                >
                  <ta-radio-group name="radioGroup">
                    <ta-radio :value="1">男</ta-radio>
                    <ta-radio :value="2">女</ta-radio>
                  </ta-radio-group>
                </ta-form-item>
                <ta-form-item
                  label='评分组件'
                  :labelCol="formItemLayout.labelCol"
                  :wrapperCol="formItemLayout.wrapperCol"
                  fieldDecoratorId="form3"
                >
                  <ta-rate/>
                </ta-form-item>
                <ta-form-item
                  label='选择器'
                  :labelCol="formItemLayout.labelCol"
                  :wrapperCol="formItemLayout.wrapperCol"
                  fieldDecoratorId="form4"
                >
                  <ta-select mode="multiple" style="min-width: 180px;">
                    <ta-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item
                  label='日期选择'
                  :labelCol="formItemLayout.labelCol"
                  :wrapperCol="formItemLayout.wrapperCol"
                  fieldDecoratorId="form5"
                >
                  <ta-range-picker style="width: 100%"/>
                </ta-form-item>
              </template>
            </ta-form>
          </div>
        </ta-search-panel>
      </ta-col>
    </ta-row>
    <div>搜索的信息：{{result}}</div>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        form: null,
        formLayout: 'horizontal',
        result:'',
      }
    },
    computed:{
      formItemLayout () {
        const { formLayout } = this
        return formLayout === 'horizontal' ? {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        } : {}
      }
    },
    methods: {
      onSearch(val) {
        this.result = val;
      }
    },
  }
</script>
