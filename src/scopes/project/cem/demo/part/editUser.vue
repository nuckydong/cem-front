<template>
  <ta-drawer :title="editType == '1'? '添加人员信息':'编辑人员信息'" placement="left" :closable="true" @close="closeEdit" :visible="visible" destroyOnClose width="500px">
    <ta-form id="userForm" :autoFormCreate="(form)=>{this.form = form}">
      <template v-if="form">
        <template v-for="formSetting in formNormalSettings">
          <renderFormItem :key="formSetting.id"  :formSetting="formSetting">
          </renderFormItem>
        </template>
      </template>
    </ta-form>
    <div slot="footer">
      <ta-button-group>
        <ta-button @click="onResetForm()">重置</ta-button>
        <ta-button @click="onSubmitForm()" type="primary">保存</ta-button>
      </ta-button-group>
    </div>
  </ta-drawer>
</template>
<script>
  import $api from '../api/index'
  import renderFormItem from '@common/components/renderFormItem'
  import mixins from '../mixins'

  import $ from 'jquery'
  // import '../api/Barrett'
  // import {setMaxDigits} from '../api/BigInt'
  // import '../api/jQuery.md5'
  // import {RSAKeyPair, encryptedString} from '../api/RSA'



  // function getBase64 (img, callback) {
  //   const reader = new FileReader()
  //   reader.addEventListener('load', () => callback(reader.result))
  //   reader.readAsDataURL(img)
  // }
  export default {
    name: 'editUser',
    props: ['visible','editType','rowData'],
    components:{renderFormItem},
    mixins: [mixins],
    data() {
      return {
        form: null,
        formData:{},
        tags: [],
        initTags: [],
        selectedTags: [],
        //密码规则校验
        pwdRules:{},
        confirmDirty: false,
        loading: false,
        imageUrl: '',
        options: [],
        rsaKey: {}
      }
    },
    watch:{
      visible(val){
        if(val){
          this.setValue();
        }
      }
    },
    mounted(){
    },
    methods: {
      setValue(){
        //type = 1 新增，type=2 编辑
        // const {userId}=this.rowData
        if(this.editType == '2'){
          Object.keys(this.rowData).forEach(field => {
            this.formData[field] = this.rowData[field]
          })
          // this.queryPortrait({userId:userId})
        } else {
          // this.formData.sex = '0';
        }
        this.buildForm(this.formData);
        // this.getUserTags({userId:userId});
      },
      //获取用户标签
      // getUserTags (obj) {
      //   $api.queryTagByUserId(this, obj, (data) => {
      //     this.tags = data.data.tagList;
      //     this.initTags = [], this.selectedTags = [];
      //     for(let i=0; i< this.tags.length; i++){
      //       if(this.tags[i].ischecked == 1){
      //         this.initTags.push(this.tags[i].tagid);
      //       }
      //     }
      //     if(this.initTags.length){
      //       this.selectedTags = this.initTags
      //     }
      //   });
      // },
      // queryPortrait(obj){
      //   $api.queryAvatar(this, obj, (data) => {
      //     this.imageUrl = data.data.portrait;
      //   });
      // },
      // validatePwd(rule,value,callback) {
      //   if (value && this.confirmDirty) {
      //     this.form.validateFields(['password_2'], { force: true })
      //   }
      //   callback()
      // },
      // compareToFirstPwd(rule,value,callback) {
      //   if (value && value !== this.form.getFieldValue('password')) {
      //     callback('两次口令输入不一致')
      //   } else {
      //     callback()
      //   }
      // },
      handleConfirmBlurs  (e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      },
      // tagClick(tagid) {
      //   const {selectedTags} = this
      //   let checked = selectedTags.some(t => t == tagid)
      //   this.selectedTags = checked ? selectedTags.filter(t => t !== tagid) : [...selectedTags, tagid]
      // },
      closeEdit(){
        this.$emit('close')
        this.form.resetFields();
        this.formData = {}
        this.imageUrl = '';
      },
      onResetForm() {
        this.form.resetFields();
        this.imageUrl = '';
        this.selectedTags = this.initTags
        // if(this.editType == '2'){
        //   this.queryPortrait({userId: this.formData.userId})
        // }
        document.getElementById('uploadPhotoId').value = ''
      },
      onSubmitForm() {
        this.form.validateFields((err, values) => {
          if (!err) {
            // if(this.selectedTags.length){
            //   values.tags = this.selectedTags.join(",");
            // }
            if(this.editType == '2'){
              console.log(this.formData);
              values.id = this.formData.id;
              $api.update(this, values, (data) => {
                this.$message.success('更新成功');
                this.$emit('editSuccess',values);
                this.closeEdit()
              });
            }else {
              // values.orgId = values.orgId[values.orgId.length-1]
              $api.insert(this, values, (data) => {
                if (!data.errors) {
                  this.showConfirm();
                }
              });
            }
          }
        });
      },

      //提示
      showConfirm() {
        this.$confirm({
          title: '保存成功',
          content: '保存成功。是否继续新增人员?',
          onOk: () => {
            this.form.resetFields();
            this.$emit('queryTable');
          },
          onCancel: () => {
            this.closeEdit()
            this.$emit('queryTable');
          },
        });
      }
    }
  }
</script>
<style type="text/scss" lang="scss">
  .avatar-form-item .ant-form-item-label { margin-top: 12px; }
</style>
<style type="text/scss" scoped lang="scss">
  .pos-avatar { position: relative; overflow: hidden; width: 64px; height: 64px; line-height: 64px; margin-left: 10px; font-size: 32px; text-align: center; background: #ccc; color: #fff; border-radius: 100%; cursor: pointer;
    &:hover .icon-upload:before { content: "\E627" }
  }
  .img-avatar { width: 64px; height: 64px; background-repeat: no-repeat; background-size: cover; background-position: center; }
  .hide-input { width: 64px; height: 64px; position: absolute; left: 0; top: 0; opacity: 0; z-index: 1; background: transparent; cursor: pointer; }
  .tag-select { @include noSelect() }
</style>
