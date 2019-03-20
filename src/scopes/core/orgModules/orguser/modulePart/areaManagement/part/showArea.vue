<template>
  <div>
    <div id="showArea">
      <ta-form :autoFormCreate="(form)=>{this.form = form}">
        <ta-form-item
          label='行政区划名称：'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          {{showArea.areaName}}
        </ta-form-item>
        <ta-form-item
          label='行政区划编码：'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          {{showArea.areaCode}}
        </ta-form-item>

        <ta-form-item
          label='排序号：'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          {{showArea.areaOrder}}
        </ta-form-item>

        <ta-form-item
          label='区划层级：'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <span v-for="item in CollectionData('AREALEVEL')" :key="item.value" v-if="item.value==showArea.areaLevel">{{item.label}}</span>
        </ta-form-item>

        <ta-form-item
          label='状态：'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol">
          <span v-for="item in CollectionData('EFFECTIVE')" :key="item.value" v-if="item.value==showArea.effective">{{item.label}}</span>
        </ta-form-item>
        <ta-form-item
          label='最后修改时间：'
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          {{showArea.modifyTime}}
        </ta-form-item>

      </ta-form>

    </div>


  </div>

</template>

<script>

  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
  }
  const tailFormItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 8, offset: 4}
  }

  export default {
    name: 'showArea',
    props: ['showArea'],

    mounted() {
    },
    data() {
      return {
        effective: true,
        formItemLayout,
        tailFormItemLayout
      }
    },

  }
</script>
<style>
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }


</style>
