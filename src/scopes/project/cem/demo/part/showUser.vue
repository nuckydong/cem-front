<template>
  <ta-drawer title="个人信息" placement="right" :closable="true" @close="closeDrawer" :visible="visible" destroyOnClose width="500px">
    <ta-form :autoFormCreate="(form)=>{this.form = form}">
      <template v-for="formSetting in formNormalShowSettings">
        <renderFormItem :key="formSetting.id" :formSetting="formSetting" :isShow="true" :showValues="formData" :simpleShowSlot="simpleShowSlot">
        </renderFormItem>
      </template>
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
          // this.queryPortrait();
          // this.queryTag();
        }
      }
    },
    methods:{
      getFormNecessarySettings(initData){
        return [

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
            id: 'gender',
            formId: 'gender',
            formItem: {
              type: 'input',
              collection: null
            },
            label: '性别',
            decoratorOptions:{},
            display: true,
            exist: true,
            formItemLayout: this.formItemLayouts.default
          }
        ]
      },
      closeDrawer(){
        this.$emit("close");
      },
      // queryPortrait(){
      //   $api.queryAvatar(this, {'userId': this.rowData.userId}, (data) => {
      //     this.imageUrl = data.data.portrait;
      //   });
      // },
      // queryTag(){
      //   $api.queryTagByUserId(this, {'userId': this.rowData.userId}, (data) => {
      //     this.tags = data.data.tagList;
      //     this.selectedTags = [];
      //     for(let i=0; i<this.tags.length; i++){
      //       if(this.tags[i].ischecked == 1){
      //         this.selectedTags.push(this.tags[i].tagid);
      //       }
      //     }
      //   })
      // },
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
