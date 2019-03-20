<template>
  <div>
    <ta-form id="dictForm" :autoFormCreate="(form)=>{this.form = form}">
      <ta-form-item label='字典类型'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="type"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: '字典类型不能为空!' }]}">
        <ta-input :disabled="!edit"/>
      </ta-form-item>
      <ta-form-item label='字典名称'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="name"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: '字典名称不能为空' }]}">
        <ta-input :disabled="!edit"/>
      </ta-form-item>
      <ta-form-item v-if="dict.parentValue && dict.parentValue !== ''"
                    label='父级字典'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol">
        <ta-input :disabled=true v-model="parentLabel"/>
      </ta-form-item>
      <ta-form-item label='字典标签'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="label"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: '字典标签不能为空' }]}">
        <ta-input/>
      </ta-form-item>
      <ta-row>
        <ta-col :span="12">
          <ta-form-item label='字典键值'
                        :labelCol="{ span: 10 }"
                        :wrapperCol="{ span: 14}"
                        fieldDecoratorId="value"
                        :fieldDecoratorOptions="{rules: [{ required: true, message: '字典键值不能为空' }]}">
            <ta-input />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label='排序号'
                        :labelCol="{ span: 12}"
                        :wrapperCol="{ span: 12 }"
                        fieldDecoratorId="sort"
                        :fieldDecoratorOptions="{rules: [{ required: true, message: '排序号不能为空' }]}">
            <ta-input/>
          </ta-form-item>
        </ta-col>
      </ta-row>
      <ta-form-item label='CSS样式'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="cssStyle">
        <ta-input/>
      </ta-form-item>
      <ta-form-item label='CSS Class'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="cssClass">
        <ta-input/>
      </ta-form-item>
      <ta-form-item label='权限标识'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="authority"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: '权限标识不能为空' }]}">
        <ta-input :disabled="!edit"/>
      </ta-form-item>
      <ta-form-item id="status" label='是否有效'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol">
        <ta-switch v-model="dictStatus" checkedChildren="有效" unCheckedChildren="无效"/>
      </ta-form-item>
    </ta-form>
  </div>
</template>
<script>

  import $api from '../api/index'
  const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
  }

  export default {
    name: 'systemDictMg',
    props: ['dict'],
    data() {
      return {
        edit:false,//是否是边界
        formItemLayout,
        parentValueSelect:false,
        parentValueList:[],//父级字典列表
        parentValue: undefined,//父级字典
        parentLabel: '',
        dictStatus: true,//是否有效,默认为true
      }
    },

    mounted: function () {
      if (this.dict.drawerType && this.dict.drawerType !== 'edit') {
        this.fnLoadParentValue();
      }
      this.fnBindForm();
    },

    methods: {
      //加载父级字典
      fnLoadParentValue(){
        let data = {
          type: this.dict.type,
          authority: this.dict.authority,
          value: this.dict.value
        };
        if (this.dict.parentValue && this.dict.parentValue !== '') {
          this.parentLabel = this.dict.parentLabel;
          this.parentValue = this.dict.parentValue;
        }
        $api.queryDictInfo(this,data, (data) => {
          if (this.dict.drawerType === 'add') {
            this.form.setFieldsValue({"sort": data.data.sort});
          }
        })
      },

      //重置表单
      resetForm: function () {
        this.fnBindForm();
      },

      //保存字典
      saveDict() {
        this.form.validateFields((err) => {
          if (!err) {
            let type = this.dict.drawerType;
            let system = this.dict.system;
            let formVal = this.form.getFieldsValue();
            let data = formVal;
            let parentValue = this.parentValue;
            let dictStatus = this.dictStatus==true?'1':'0';
            data.oldType = this.dict.type;
            data.oldValue = this.dict.value;
            data.parentValue = parentValue;
            data.status = dictStatus;
            data.system = system;

            if('add' == type){
              $api.saveDict(this,data, (data) => {
                this.$message.success('新增字典成功！');
                this.$emit('closeSystemDictMgDrawer');
              });
            }else{
              $api.updateDict(this,data, (data) => {
                this.$message.success('更新字典成功！');
                this.$emit('closeSystemDictMgDrawer');
              });
            }
          }
        });
      },

      //绑定form表单
      fnBindForm() {
        console.log('dict',this.dict);
        this.form.setFieldsValue({
          type: this.dict.type,
          name: this.dict.name,
          label: this.dict.label,
          value: this.dict.value,
          sort: this.dict.sort,
          cssStyle: this.dict.cssStyle,
          cssClass: this.dict.cssClass,
          authority: this.dict.authority,
        });
        if (this.dict.status && this.dict.status == '1') {
          this.dictStatus = true;
        } else if (this.dict.status && this.dict.status == '0') {
          this.dictStatus = false;
        }
      },

    }
  }
</script>
<style scoped type="text/scss">
</style>
