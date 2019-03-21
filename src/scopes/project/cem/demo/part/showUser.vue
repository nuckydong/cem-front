<template>
  <ta-drawer title="个人信息" placement="right" :closable="true" @close="closeDrawer" :visible="visible" destroyOnClose width="500px">
    <ta-form :autoFormCreate="(form)=>{this.form = form}">
      <template v-for="formSetting in formNormalShowSettings">
        <renderFormItem :key="formSetting.id" :formSetting="formSetting" :isShow="true" :showValues="formData" :simpleShowSlot="simpleShowSlot">
          <template v-if="formSetting.id == 'avatar'">
            <div class="pos-avatar">
              <i v-if="imageUrl.length == 0" class="anticon anticon-user icon-upload"></i>
              <div v-else class="img-avatar" :style="{ backgroundImage: 'url('+imageUrl+')'}"></div>
            </div>
          </template>
          <template v-else-if="formSetting.id == 'orgIdShow'">
            {{formData.namePath}}
          </template>
          <template v-else-if="formSetting.id == 'tags'">
            <template v-for="tag in tags">
              <ta-tag :key="tag.tagid" v-if="selectedTags.indexOf(tag.tagid) > -1" color="blue" class="tag-select">{{tag.tagname}}</ta-tag>
            </template>
          </template>
        </renderFormItem>
      </template>
      <ta-collapse :bordered="false" v-if="formMoreShowSettings.length > 0">
        <ta-collapse-panel header="更多个人信息" key="1" style="border:none">
          <template v-for="formSetting in formMoreShowSettings">
            <renderFormItem :key="formSetting.id" :formSetting="formSetting" :isShow="true" :showValues="formData" :simpleShowSlot="simpleShowSlot">
              <template v-if="formSetting.id == 'avatar'">
                <div class="pos-avatar">
                  <i v-if="imageUrl.length == 0" class="anticon anticon-user icon-upload"></i>
                  <div v-else class="img-avatar" :style="{ backgroundImage: 'url('+imageUrl+')'}"></div>
                </div>
              </template>
              <template v-else-if="formSetting.id == 'orgIdShow'">
                {{formData.namePath}}
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

  const showColumnFilter = ['password','password_2']
  const simpleShowSlot = ['loginId']

  export default {
    name:"rowData",
    props:["visible",'rowData'],
    components:{renderFormItem},
    mixins: [mixins],
    data(){
      return {
        formData:{},
        simpleShowSlot,
        imageUrl:'',
        tags:[],
        selectedTags: [],
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
          this.formData = this.rowData;
          this.buildForm(this.formData);
          this.queryPortrait();
          this.queryTag();
        }
      }
    },
    methods:{
      getFormNecessarySettings(initData){
        return [
          {
            id: 'avatar',
            formId: '',
            formItem: {
              type: 'slot',
              collection: null
            },
            label: '用户头像',
            class:'avatar-form-item',
            display: true,
            exist: true,
            formItemLayout: this.formItemLayouts.default
          },
          {
            id: 'orgIdShow',
            formId: '',
            formItem: {
              type: 'slot',
              collection: null
            },
            label: '所属组织',
            decoratorOptions:{},
            display: true,
            exist: true,
            formItemLayout: this.formItemLayouts.default
          },
          {
            id: 'name',
            formId: 'name',
            formItem: {
              type: 'input',
              collection: null
            },
            label: '姓名',
            decoratorOptions:{},
            display: true,
            exist: true,
            formItemLayout: this.formItemLayouts.default
          },
          {
            id: 'loginId',
            formId: 'loginId',
            formItem: {
              type: 'slot',
              collection: null
            },
            label: '账号',
            decoratorOptions:{},
            display: true,
            exist: true,
            formItemLayout: this.formItemLayouts.default
          },
        ]
      },
      closeDrawer(){
        this.$emit("close");
      },
      queryPortrait(){
        $api.queryAvatar(this, {'userId': this.rowData.userId}, (data) => {
          this.imageUrl = data.data.portrait;
        });
      },
      queryTag(){
        $api.queryTagByUserId(this, {'userId': this.rowData.userId}, (data) => {
          this.tags = data.data.tagList;
          this.selectedTags = [];
          for(let i=0; i<this.tags.length; i++){
            if(this.tags[i].ischecked == 1){
              this.selectedTags.push(this.tags[i].tagid);
            }
          }
        })
      },
    }
  }
</script>
<style type="text/scss" lang="scss">
  .avatar-form-item .ant-form-item-label { margin-top: 12px; }
</style>
<style type="text/scss" scoped lang="scss">
  .pos-avatar { position: relative; overflow: hidden; width: 64px; height: 64px; line-height: 64px; margin-left: 10px; font-size: 32px; text-align: center; background: #ccc; color: #fff; border-radius: 100%; }
  .img-avatar { width: 64px; height: 64px; background-repeat: no-repeat; background-size: cover; background-position: center; }
</style>
