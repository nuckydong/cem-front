<template>
  <ta-modal destroyOnClose
            width="70%"
            :visible="customOrgTypeNameVisible"
            :centered="true"
            @cancel="fnCloseCustomOrgTypeNameModal"
            :bodyStyle="{'height':'400px'}">
    <div slot="title" style="text-align: center">
      自定义组织类别管理
    </div>
    <add-custom-org-type-name></add-custom-org-type-name>
    <div slot="footer" style="text-align: center">
      <ta-button @click="fnCloseCustomOrgTypeNameModal">返回</ta-button>
    </div>
  </ta-modal>
</template>

<script>
import AddCustomOrgTypeName from './addCustomOrgTypeName'

export default {
  name: 'customOrgTypeNameModal',
  props: {
    isShow: {
      type: Boolean,
      required: true
    }
  },
  components: {AddCustomOrgTypeName},
  data () {
    return {
      customOrgTypeNameVisible: false// 是否展示
    }
  },
  watch: {
    isShow (isShow) {
      if (isShow) {
        this.customOrgTypeNameVisible = isShow
      }
    }
  },
  methods: {
    fnCloseCustomOrgTypeNameModal () {
      this.customOrgTypeNameVisible = false
      // 通知上层进行关闭
      this.$emit('closeCustomOrgTypeNameModal')
    }
  }
}
</script>

<style scoped type="text/scss" lang="scss">

</style>
