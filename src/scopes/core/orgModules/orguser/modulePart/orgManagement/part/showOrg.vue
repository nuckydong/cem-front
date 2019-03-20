<template>
  <ta-drawer title="组织机构信息" width="500" placement="right" :closable="true" @close="closeEdit" :visible="visible" destroyOnClose>
    <ta-form :autoFormCreate="(form)=>{this.form = form}">
      <taContainerMask :show="editLoading"></taContainerMask>
      <template v-for="formSetting in formNormalShowSettings">
        <renderFormItem :key="formSetting.id" :formSetting="formSetting" :isShow="true" :showValues="formData" :simpleShowSlot="simpleShowSlot">
          <template v-if="formSetting.id == 'effective'">
            {{formData.effective ? '有效':'无效'}}
          </template>
          <template v-else-if="formSetting.id == 'orgManager'">
            {{formData.orgManagerName}}
          </template>
          <template v-else-if="formSetting.id == 'contacts'">
            {{formData.contactsName}}
          </template>
          <template v-else-if="formSetting.id == 'tags'">
            <template v-for="tag in tags">
              <ta-tag :key="tag.tagid" v-if="selectedTags.indexOf(tag.tagid) > -1" color="blue" class="tag-select">{{tag.tagname}}</ta-tag>
            </template>
          </template>
        </renderFormItem>
      </template>
      <ta-collapse :bordered="false" v-if="formMoreShowSettings.length > 0">
        <ta-collapse-panel header="更多组织信息" key="1" style="border:none">
          <template v-for="formSetting in formMoreShowSettings">
            <renderFormItem :key="formSetting.id" :formSetting="formSetting" :isShow="true" :showValues="formData" :simpleShowSlot="simpleShowSlot">
              <template v-if="formSetting.id == 'effective'">
                {{formData.effective ? '有效':'无效'}}
              </template>
              <template v-else-if="formSetting.id == 'orgManager'">
                {{formData.orgManagerName}}
              </template>
              <template v-else-if="formSetting.id == 'contacts'">
                {{formData.contactsName}}
              </template>
              <template v-else-if="formSetting.id == 'tags'">
                <template v-for="tag in tags">
                  <ta-tag :key="tag.tagid" v-if="selectedTags.indexOf(tag.tagid) > -1" color="blue" class="tag-select">{{tag.tagname}}</ta-tag>
                </template>
              </template>
            </renderFormItem>
          </template>
        </ta-collapse-panel>
      </ta-collapse>
    </ta-form>
  </ta-drawer>
</template>
<script>
  import $api from '../api/index'
  import renderFormItem from '@common/components/renderFormItem'
  import mixins from '../mixins'

  const showColumnFilter = ['porgId','orgId']
  const simpleShowSlot = ['areaValue']

  export default {
    name: 'showOrg',
    props:['visible','rowData','tags'],
    components:{renderFormItem},
    mixins: [mixins],
    data() {
      return {
        form:null,
        formData:{},
        simpleShowSlot,
        selectedTags: [],
        editLoading: false,
      }
    },
    computed:{
      formNormalShowSettings(){
        return this.formNormalSettings.filter(a => showColumnFilter.indexOf(a.id) == -1) || []
      },
      formMoreShowSettings(){
        return this.formMoreSettings.filter(a => showColumnFilter.indexOf(a.id) == -1) || []
      },
    },
    watch:{
      visible(val){
        if(val){
          this.editLoading = true;
          $api.queryTaOrgByOrgId(this, {orgId: this.rowData.orgId, type: '2'}, (result) => {
            const { orgTags,pOrgName,orgManagerName,contactsName } = result.data.taOrgInfoVo
            const { parentId,effective,orgName,orgId,orgType,customNo,orgCode,tel,address,orderNo } = result.data.taOrgInfoVo.org
            this.selectedTags = orgTags;

            let orgData = result.data.taOrgInfoVo.org
            Object.keys(orgData).forEach(field => {
              this.formData[field] = orgData[field]
            })
            Object.assign(this.formData,{
              porgId: parentId,
              pOrgName: pOrgName,
              areaValue :this.rowData.area,
              effective: effective == '1' ? true : false,
              orderNo: orderNo.toString(),
            })

            this.buildForm(this.formData);
            this.editLoading = false;
          });
        }
      }
    },
    methods: {
      closeEdit(){
        this.$emit('close')
        this.editLoading = false;
        this.formData = {}
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  .tag-select { @include noSelect() }
</style>
