<template>
  <div>
    <!--右侧弹出框添加修改组织信息-->
    <ta-drawer :title="editType == '1'? '添加组织机构':'编辑组织机构'" width="500" placement="right" :closable="true" @close="closeEdit" :visible="visible" destroyOnClose>
      <ta-form :autoFormCreate="(form)=>{this.form = form}">
        <template v-if="form">
          <taContainerMask :show="editLoading"></taContainerMask>
          <template v-for="formSetting in formNormalSettings">
            <renderFormItem :key="formSetting.id" :formSetting="formSetting">
              <template v-if="formSetting.id == 'areaValue'">
                <ta-cascader :options="areaOptions" changeOnSelect expandTrigger="hover" style="width: 100%" placeholder="请选择行政区域"/>
              </template>
              <template v-else-if="formSetting.id == 'effective'">
                <ta-switch  checkedChildren="有效" unCheckedChildren="无效"/>
              </template>
              <template v-else-if="formSetting.id == 'orgManager'">
                <ta-user-input selectTitle="选择负责人" :orgLoadFn="handleLoadOrgNode" :userLoadFn="handleQueryUserList" :userSelectCall="getOrgManagerName"></ta-user-input>
              </template>
              <template v-else-if="formSetting.id == 'contacts'">
                <ta-user-input selectTitle="选择联系人" :orgLoadFn="handleLoadOrgNode" :userLoadFn="handleQueryUserList" :userSelectCall="getContactsName"></ta-user-input>
              </template>
              <template v-else-if="formSetting.id == 'tags'">
                <template v-for="tag in tags">
                  <ta-tag :key="tag.tagid" @click="tagClick(tag.tagid)" :color="selectedTags.indexOf(tag.tagid) > -1 ? '#1890ff' : 'blue'" class="tag-select">
                    {{tag.tagname}}<ta-icon type="check" v-if="selectedTags.indexOf(tag.tagid) > -1" style="margin-left: 5px;" />
                  </ta-tag>
                </template>
              </template>
            </renderFormItem>
          </template>
          <ta-collapse :bordered="false" v-if="formMoreSettings.length > 0">
            <ta-collapse-panel header="更多组织信息" key="1" style="border:none">
              <template v-for="formSetting in formMoreSettings">
                <renderFormItem :key="formSetting.id" :formSetting="formSetting">
                  <template v-if="formSetting.id == 'areaValue'">
                    <ta-cascader :options="areaOptions" changeOnSelect expandTrigger="hover" style="width: 100%" placeholder="请选择行政区域"/>
                  </template>
                  <template v-else-if="formSetting.id == 'effective'">
                    <ta-switch  checkedChildren="有效" unCheckedChildren="无效"/>
                  </template>
                  <template v-else-if="formSetting.id == 'orgManager'">
                    <ta-user-input selectTitle="选择负责人" :orgLoadFn="handleLoadOrgNode" :userLoadFn="handleQueryUserList" :userSelectCall="getOrgManagerName"></ta-user-input>
                  </template>
                  <template v-else-if="formSetting.id == 'contacts'">
                    <ta-user-input selectTitle="选择联系人" :orgLoadFn="handleLoadOrgNode" :userLoadFn="handleQueryUserList" :userSelectCall="getContactsName"></ta-user-input>
                  </template>
                  <template v-else-if="formSetting.id == 'tags'">
                    <template v-for="tag in tags">
                      <ta-tag :key="tag.tagid" @click="tagClick(tag.tagid)" :color="selectedTags.indexOf(tag.tagid) > -1 ? '#1890ff' : 'blue'" class="tag-select">
                        {{tag.tagname}}<ta-icon type="check" v-if="selectedTags.indexOf(tag.tagid) > -1" style="margin-left: 5px;" />
                      </ta-tag>
                    </template>
                  </template>
                </renderFormItem>
              </template>
            </ta-collapse-panel>
          </ta-collapse>
        </template>
      </ta-form>
      <div slot="footer">
        <ta-button-group>
          <ta-button  @click="reset()">重置</ta-button>
          <ta-button type="primary" @click="saveOrg()" :loading="loading" >保存</ta-button>
        </ta-button-group>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
  import $api from '../api/index'
  import renderFormItem from '@common/components/renderFormItem'
  import mixins from '../mixins'

  export default {
    name: 'editOrg',
    props:['visible','editType','rowData','areaOptions','tags'],
    components:{renderFormItem},
    mixins: [mixins],
    data() {
      return {

        form:null,
        formData:{},
        initTags: [],
        selectedTags: [],
        orgManagerName: "",
        contactsName: "",
        editLoading: false,
        loading:false,

        defaultProps: {
          listKey: 'userId',
          listTitle: 'name',
          listSubTitle: 'mobile',
          listDescription: "namePath",
        },
        isShow: false,
        userListData: [],
        defaultList: [],
      }
    },
    watch:{
      visible(val){
        if(val){
          this.setValue();
        }
      }
    },
    methods: {
      setValue(){
        //type = 1 新增，type=2  编辑
        this.editLoading = true;
        // 抽屉展开再请求，防止设值时页面抖动
        setTimeout(()=>{ this.queryOrg({orgId: this.rowData.orgId, type: "2"})}, 300)

      },
      //初始化查询所有 组织机构列表
      queryOrg(obj) {
        $api.queryTaOrgByOrgId(this, obj, (result) => {
          const { orgTags,pOrgName,areaValue,orgManagerName,contactsName } = result.data.taOrgInfoVo
          const { parentId,orgManager,effective,contacts,orgName,orgId,orgType,customNo,orgCode,tel,address,orderNo } = result.data.taOrgInfoVo.org
          if(this.editType == '1'){
            this.formData = {
              porgId: orgId,
              pOrgName: orgName,
              orgType: "02",
              effective : true,
              orderNo : "0",
              areaValue :areaValue,
            }
          }else if(this.editType == '2'){
            this.initTags = orgTags;
            this.selectedTags = orgTags;
            this.orgManagerName = orgManagerName;
            this.contactsName = contactsName;

            let orgData = result.data.taOrgInfoVo.org
            Object.keys(orgData).forEach(field => {
              this.formData[field] = orgData[field]
            })
            Object.assign(this.formData,{
              porgId: parentId,
              pOrgName: pOrgName,
              areaValue :areaValue,
              effective: effective == '1' ? true : false,
              orderNo: orderNo.toString(),
            })
          }
          this.buildForm(this.formData);
          this.editLoading = false;
        });
      },
      //组织机构新增、修改时  选择的组织标签
      tagClick(tagid) {
        const {selectedTags} = this
        let checked = selectedTags.some(t => t == tagid)
        this.selectedTags = checked ? selectedTags.filter(t => t !== tagid) : [...selectedTags, tagid]
      },
      reset(){
        this.form.resetFields();
        /*this.orgManagerName = "";
        this.contactsName = "";*/
        this.selectedTags = this.initTags
      },
      saveOrg: function () {
        this.form.validateFieldsAndScroll((err, values) => {
          if(!err) {
            this.loading = true;
            values.tagIds = this.selectedTags.toString();
            if(values.areaValue && values.areaValue.length) {
              values.area = values.areaValue[values.areaValue.length - 1];
            } else {
              values.area = "";
            }
            values.effective = values.effective ? '1':'0'
            values.parentId = values.porgId;
            values.spell = this.Tool.pinyin.getCamelChars(values.orgName);
            values.orgManagerName = this.orgManagerName;
            values.contactsName = this.contactsName;
            values.editType = this.editType;
            $api.addOrUpdateTaOrg(this, values, (data) => {
              this.loading = false;
              if (data.errors == null) {
                let areaName = document.getElementById("areaValue") ? document.getElementById("areaValue").parentNode.innerText : '';
                if(this.editType == '1') {
                  let newData = data.data.addedOrg;
                  newData = Object.assign({},values,newData)
                  newData.areaId = newData.area;
                  newData.area = areaName;
                  this.showConfirm(this.rowData,newData)
                } else {
                  this.$message.success('修改成功');
                  values.areaId = values.area;
                  values.area = areaName
                  this.$emit('addSuccess', this.rowData, values)
                  this.closeEdit()
                }
              }
            });
          }
        });
      },
      //提示
      showConfirm(pRecords,newData) {
        this.$confirm({
          title: '添加组织机构成功',
          content: '保存成功。是否继续新增组织?',
          onOk: () => {
            this.form.resetFields();
            this.$emit('addSuccess', pRecords, newData)
            this.queryOrg({orgId: pRecords.orgId, type: "2"})
          },
          onCancel: () => {
            this.closeEdit()
            this.$emit('addSuccess', pRecords, newData)
          },
        });
      },
      closeEdit(){
        this.$emit('close')
        this.editLoading = false;
        this.loading = false;
        this.form.resetFields();
        this.formData = {}
        this.selectedTags = [];
        this.initTags = [];
        this.contacts = "";
        this.orgManager = "";
      },
      /*人员选择相关*/
      handleLoadOrgNode (node, resolve){
        let nodeOrgId = (node.data && node.data.orgId) || '';
        $api.loadOrgTree(this,nodeOrgId,(data) => {
          resolve(data.orgTreeData)
        })
      },
      handleQueryUserList({orgId,userId,includeChild,pageSize,pageNum,searchVal,searchType, searchParam}, resolve){
        $api.queryUserList(this,{orgId,userId,includeChild,pageSize,pageNum,searchVal,searchType,searchParam},(data) => {
          resolve(data.userList.list)
        })
      },
      getOrgManagerName(data){
        const {userId,name,address,mobile} = data
        this.orgManagerName = name;
        this.contactsName = name;

        this.form.setFieldsValue({
          orgManager: userId,
          contacts: userId,
          /*address :  address,
          tel: mobile*/
        })
      },
      getContactsName(data){
        const {userId,name,address,mobile} = data
        this.contactsName = name;
        this.form.setFieldsValue({
          contacts: userId,
          /*address :  address,
          tel: mobile*/
        })
      },
    }
  }
</script>
<style lang="scss" type="text/scss">
  .tag-select { @include noSelect() }
</style>



