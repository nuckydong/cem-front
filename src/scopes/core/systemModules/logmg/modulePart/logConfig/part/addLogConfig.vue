<template>
  <ta-form :autoFormCreate="(form)=>{this.form = form}">
    <ta-row>
      <ta-col :span="24">
        <ta-form-item label="包名称"
                      :labelCol="formItemLayout.labelCol"
                      :wrapperCol="formItemLayout.wrapperCol"
                      fieldDecoratorId="packageName"
                      :fieldDecoratorOptions="{ rules: [{ required: true, message: '请输入包名称' }]}">
          <ta-input v-model="packageName"/>
        </ta-form-item>
      </ta-col>
    </ta-row>
    <ta-row>
      <ta-col :span="24">
        <ta-form-item label="日志级别"
                      :labelCol="formItemLayout.labelCol"
                      :wrapperCol="formItemLayout.wrapperCol"
                      fieldDecoratorId="level"
                      :fieldDecoratorOptions="{ rules: [{ required: true, message: '请选择日志级别' }]}">
          <ta-select showSearch v-model="level">
            <ta-select-option value="OFF">OFF</ta-select-option>
            <ta-select-option value="ERROR">ERROR</ta-select-option>
            <ta-select-option value="WARN">WARN</ta-select-option>
            <ta-select-option value="INFO">INFO</ta-select-option>
            <ta-select-option value="DEBUG">DEBUG</ta-select-option>
            <ta-select-option value="TRACE">TRACE</ta-select-option>
            <ta-select-option value="ALL">ALL</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-row>
    <ta-row>
      <ta-col :span="24">
        <ta-form-item label="输出类型"
                      :labelCol="formItemLayout.labelCol"
                      :wrapperCol="formItemLayout.wrapperCol"
                      fieldDecoratorId="appenderType">
          <ta-select mode="multiple" :tokenSeparators="[',']" placeholder="支持多选" v-model="appenderType">
            <ta-select-option v-if="bindData.isConsole" value="console">console</ta-select-option>
            <ta-select-option v-else value="console" disabled>console</ta-select-option>
            <ta-select-option v-if="bindData.isFile" value="file">file</ta-select-option>
            <ta-select-option v-else value="file" disabled>file</ta-select-option>
            <ta-select-option v-if="bindData.isKafka" value="kafka">kafka</ta-select-option>
            <ta-select-option v-else value="kafka" disabled>kafka</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-row>
  </ta-form>


</template>
<script>

  import api from "../api"

  export default {
    name: 'addLogConfig',
    props: ['bindData'],
    data() {
      return {
        formItemLayout: {
          labelCol: {span: 5},
          wrapperCol: {span: 19},
        },
        packageName: "",
        level: "",
        appenderType: [],
      };
    },

    mounted: function () {
    },
    methods: {
      saveLogConfig() {
        if(!this.packageName){
          this.$message.warning("包名称不能为空");
          return;
        }
        if(!this.level){
          this.$message.warning("日志级别不能为空");
          return;
        }
        let appenderType = "";
        if (this.appenderType) {
          appenderType = this.appenderType.join(',');
        }
        let data = {
            packageName: this.packageName,
            level: this.level,
            appenderType: appenderType
          };
        api.addLogConfig(this, data, (result) => {
          this.$message.success("新增成功");
          this.$emit('closeLogDrawer',true);
        });
      },

      handleReset(){
        this.form.resetFields();
      }
    }
  };
</script>
