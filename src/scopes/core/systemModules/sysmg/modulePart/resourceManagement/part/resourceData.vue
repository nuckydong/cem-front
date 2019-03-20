<template>
  <div id="app">
    <ta-form :autoFormCreate="(form)=>{this.form = form}" :layout="formLayout">

      <template v-for="formSetting in formNormalSettings">
        <renderFormItem :key="formSetting.id" :formSetting="formSetting">
          <template v-if="formSetting.id == 'restUrl'">
            <!--<rest-input-tag repeat-message="重复的服务地址, 添加无效" new-label="添加服务地址"></rest-input-tag>-->
            <rest-url-input-tag repeat-message="重复的服务地址, 添加无效" new-label="添加服务地址"></rest-url-input-tag>
          </template>
          <template v-else-if="formSetting.id == 'resourceType'">
            <ta-radio-group buttonStyle="solid">
              <ta-radio-button v-for="item in  resourceTypeEditable" :value="item.value" :key="item.value" :disabled="item.editable == false">
                {{item.label}}
              </ta-radio-button>
            </ta-radio-group>
          </template>
          <template v-else-if="formSetting.id == 'sysCode'">
            <ta-select>
              <ta-select-option v-for="item in systemList" :value="item.sysCode" :key="item.sysCode">
                {{item.sysName}}
              </ta-select-option>
            </ta-select>
          </template>
          <template v-else-if="formSetting.id == 'effectiveFlag'">
            <ta-switch  checkedChildren="有效" unCheckedChildren="无效"/>
          </template>
          <template v-else-if="formSetting.id == 'iconColor'">
            <ta-color-picker panelPosition="right"></ta-color-picker>
          </template>
        </renderFormItem>
      </template>
      <ta-collapse :bordered="false" v-if="formMoreSettings.length > 0">
        <ta-collapse-panel header="更多功能信息" key="1" style="border:none">
          <template v-for="formSetting in formMoreSettings">
            <renderFormItem :key="formSetting.id" :formSetting="formSetting">
              <template v-if="formSetting.id == 'iconColor'">
                <ta-color-picker panelPosition="right"></ta-color-picker>
              </template>
            </renderFormItem>
          </template>
        </ta-collapse-panel>
      </ta-collapse>
    </ta-form>
  </div>

</template>
<script>
  import rapi from '../api/index'
  import api from '../api/resourceApi'
  import restUrlInputTag from './restUrlInputTag'
  import renderFormItem from '@common/components/renderFormItem'
  import mixins from '../mixins'

  export default {
    name: "resourceData",
    props:{
      initData:{
        type: Object,
        required: true
      },
      operationType:{
        validator: (value) => {
          //判断新增还是修改 1新增  2修改
          return ['1', '2'].indexOf(value) !== -1
        }
      }
    },
    components:{restUrlInputTag,renderFormItem},
    mixins: [mixins],
    data() {
      return {
        //form布局配置
        formLayout: 'horizontal',
        isShowParentItem:true,
        //原始数据备份
        operationResourceData: {},
        //可选系统列表
        systemList: [],
        //可选菜单类型
        resourceTypeEditable: [
          {value: '0', label: '通用菜单', editable: true},
          {value: '1', label: '管理菜单', editable: true},
          {value: '2', label: '经办菜单', editable: true}
        ]
      }
    },
    methods: {
      //重置功能资源 表单
      fnResetForm() {
        this.fnLoadResourceData(this.operationResourceData)
      },
      //保存
      fnSaveResource() {
        this.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            //判断 是新增下级还是修改当前组织机构
            if (this.operationType == '1') {
              if (!values.pResourceId) {
                this.$message.warning("请选择上级功能资源!", 2);
                return;
              }

            } else if (this.operationType == '2') {
              if (!values.resourceId) {
                this.$message.warning("组织机构ID不能为空!", 2);
                return;
              }
            }
            api.saveResource(this,{
              ...values,
              effective:values.effectiveFlag?'1':'0',
              operationType:this.operationType
            },(data) => {
              this.$emit("close",true)
            })
          }
        });
      },
      //初始化数据
      fnInitResource() {
        if(this.systemList.length == 0)
        rapi.queryAllAccessSystem(this,(data) => {
          this.systemList = eval('(' + data.systemList + ')');
        });
        api.queryResource(this,{
          resourceId: this.initData.resourceId,
          operationType: this.operationType
        },(data) => {
          this.operationResourceData = data;
          this.buildForm(this.initData);
          this.fnLoadResourceData(data)
        })
      },
      //加载数据处理  区分编辑和添加
      fnLoadResourceData(data){
        this.resourceTypeEditable = data.resourceTypeList;
        this.isShowParentItem = true;

        if (this.operationType == '2') {
          this.isShowParentItem = (this.initData.pResourceId != '0');
          //编辑
          this.$nextTick(function () {
            //form赋值
            this.form.resetFields()
            let formValue = this.Tool.objectAssign(this.form.getFieldsValue(),data.taResource)
            this.form.setFieldsValue(formValue)
            this.form.setFieldsValue({
              effectiveFlag: data.taResource.effective == '1' ? true : false,
              securityLevel: data.taResource.securityLevel.toString(),
            });
          });
        } else if (this.operationType == '1') {
          //新增
          this.$nextTick(function () {
            //重置form
            this.form.resetFields()
            this.form.setFieldsValue({
                pResourceId: this.initData.resourceId,
                pResourceName: this.initData.name,
                orderNo: data.taResource.orderNo,
              }
            );

            //处理只有一个可选菜单类型时, 默认选中
            let editableResources = this.resourceTypeEditable.filter(item => {
              return item.editable
            })
            if(editableResources.length == 0)
              this.$message.error("未加载到可用的菜单类型")
            if(editableResources.length == 1)
              this.form.setFieldsValue({resourceType: editableResources[0].value});
          });
        }
      }
    },
    watch: {
      //维持prop数据的向下传递性
      initData: {
        immediate: true,
        handler: function (now, old) {
          if(this.loadStatus == true)return;
          this.loadStatus = true;
          this.fnInitResource();
          setTimeout(()=>{
            this.loadStatus = false;
          },1000)
        }
      },
      operationType: {
        immediate: true,
        handler: function (now, old) {
          if(this.loadStatus == true)return;
          this.loadStatus = true;
          this.fnInitResource();
          setTimeout(()=>{
            this.loadStatus = false;
          },1000)
        }
      }
    }
  }

</script>
<style lang="scss" type="text/scss" scoped>

</style>
