<template>
  <div id="app" style="height: 100%">
    <ta-border-layout :layout="{left:'300px'}">
      <div slot="left" class="left-card">
        <ta-card :bordered="false" style="width: 100%" title="资源类别" :bodyStyle="{'padding':0}">
          <a v-for="(item, index) in selectData" :key="item.id" :value="item.id" @click="selectClick(item.id,index)">
            <div class="select-item" :class="{'active': item.id == selectCategory}"> {{item.name}}</div>
          </a>
        </ta-card>
      </div>
      <div>
        <div class="search-box">
          <div>
            <ta-input-search v-model="param" placeholder="输入资源名称/自定义编码/所属系统" @search="queryAllCustomResource" enterButton="搜索" style="width: 340px;"/>
          </div>
          <ta-button @click="showCatagoryDrawer()" type="primary" class="add-btn">新增授权对象类型</ta-button>
        </div>
        <ta-table :columns="customResourceColumns"
                  :pagination='false'
                  rowKey="customResourceId"
                  defaultExpandAllRows
                  :indentSize=5
                  :dataSource="gridData"
        >
          <span slot="code" slot-scope="text,record">{{(record.code == '' || record.code == null) ? '--': text}}</span>
          <span slot="resourceContent" slot-scope="text,record">{{(record.resourceContent == '' || record.resourceContent == null) ? '--': text}}</span>
          <span slot="systemName" slot-scope="text,record">{{(record.systemName == '' || record.systemName == null) ? '--': text}}</span>
          <div slot="actions" slot-scope="text, record">
            <a href="javascript:;" @click="toAddResource(record)">新增</a>
            <ta-divider type="vertical"/>
            <a href="javascript:;" @click="toUpdateResource(record)">编辑</a>
            <ta-divider type="vertical"/>
            <ta-popconfirm title="确定删除该授权对象?" @confirm="toDeleteResource(record)" okText="确定" cancelText="取消"><a href="javascript:;" >删除</a></ta-popconfirm>
          </div>
        </ta-table>
      </div>
    </ta-border-layout>
    <ta-drawer title="授权对象信息" width="500" placement="right" :closable="true" @close="visible = false" :visible="visible">
      <ta-form :autoFormCreate="(form)=>{this.form = form}">
        <ta-form-item
          label="资源ID"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          fieldDecoratorId="customResourceId"
          style="display: none;"
        >
          <ta-input placeholder="请输入资源名称" />
        </ta-form-item>
        <ta-form-item
          label="资源名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          fieldDecoratorId="resourceName"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入资源名称' },{max:450,message:'不能超过450个字符'}]}"
        >
          <ta-input placeholder="请输入资源名称"  />
        </ta-form-item>
        <ta-form-item
          label="自定义编码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          fieldDecoratorId="code"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入自定义编码' },{max:100,message:'不能超过100个字符'},{pattern:new RegExp('^[a-z0-9]*$'),message:'输入格式错误'}]}"
        >
          <ta-input placeholder="请输入自定义编码" />
        </ta-form-item>
        <ta-form-item
          label="所属类别"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          fieldDecoratorId="resourceCategory"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入所属类别' }]}"
        >
          <ta-select allowClear placeholder="请选择所属类别" disabled>
            <ta-select-option v-for="item in selectData" :key="item.id">{{item.name}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="上级节点"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          fieldDecoratorId="parentId"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择上级节点' }]}"
        >
          <ta-select allowClear placeholder="请选择上级节点"  :disabled="true">
            <ta-select-option v-for="item in selectParent" :key="item.id">{{item.name}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="自定义资源内容"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          fieldDecoratorId="resourceContent"
        >
          <ta-input placeholder="请输入自定义资源内容" />
        </ta-form-item>
        <ta-form-item
          label="所属系统"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          fieldDecoratorId="system"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择所属系统' }]}"
        >
          <ta-select allowClear placeholder="请选择所属系统">
            <ta-select-option v-for="item in selectSystem" :key="item.id">{{item.name}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button-group>
          <ta-button  @click="reSetForm()">重置</ta-button>
          <ta-button type="primary" @click="saveCustomResource">保存</ta-button>
        </ta-button-group>
      </div>
    </ta-drawer>
    <ta-drawer title="授权对象类型信息" width="500" placement="right" :closable="true" @close="categoryVisible = false" :visible="categoryVisible">
      <ta-form :autoFormCreate="(form) => {this.form1 = form}">
        <ta-form-item
          label="类别ID"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          fieldDecoratorId="categoryId"
          style="display: none;"
        >
          <ta-input placeholder="请输入自定义资源类别名称" />
        </ta-form-item>
        <ta-form-item
          label="类别名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          fieldDecoratorId="categoryName"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入自定义资源类别名称' },{max:10,message:'不能超过10个字符'}]}"
        >
          <ta-input placeholder="请输入自定义资源类别名称" />
        </ta-form-item>
        <ta-form-item
          label="类别编码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          fieldDecoratorId="code"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入自定义资源类别编码' },{max:100,message:'不能超过100个字符'}]}"
        >
          <ta-input placeholder="请输入自定义资源类别编码" />
        </ta-form-item>
        <ta-form-item
          label="类别描述"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          fieldDecoratorId="categoryContent"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入自定义资源类别描述' },{max:1024,message:'不能超过1024个字符'}]}"
        >
          <ta-input placeholder="请输入自定义资源类别描述" />
        </ta-form-item>
        <ta-form-item label='有效标识' :labelCol="labelCol" :wrapperCol="wrapperCol" fieldDecoratorId="effective" :fieldDecoratorOptions="{ valuePropName: 'checked', initialValue: true}">
          <ta-switch @change='onchange' checkedChildren="有效" unCheckedChildren="无效" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button-group>
          <ta-button  @click="reSetForm()">重置</ta-button>
          <ta-button type="primary" @click="saveCatagory">保存</ta-button>
        </ta-button-group>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
  const gridData = [];
  const customResourceColumns = [
    { title: '资源名称', dataIndex: 'resourceName', key: 'resourceName', width: '30%', overflowTooltip:false },
    { title: '分类', dataIndex: 'categoryName', key: 'categoryName', align:'center', width: '15%', overflowTooltip:true, },
    { title: '自定义编码', dataIndex: 'code', key: 'code', align:'center', width: '20%', overflowTooltip:true, scopedSlots: {customRender: 'code'} },
    { title: '自定义资源内容', dataIndex: 'resourceContent', key: 'resourceContent', align:'center', width: '20%', overflowTooltip:true, scopedSlots: {customRender: 'resourceContent'} },
    { title: '所属系统', dataIndex: 'systemName', key: 'systemName', align:'center', width: '15%',overflowTooltip:true, scopedSlots: {customRender: 'systemName'}},
    { title: '操作', key: 'actions', align:'center', width: 200, scopedSlots: {customRender: 'actions'} }
  ];
  export default {
    name:'app',
    data(){
      return{
        gridData,    //授权对象表格数据
        customResourceColumns,  //授权对象表格列
        selectData:[],      //分类列表 的下拉数据
        selectSystem:[],
        selectParent:[],
        selectCategory:'',//选中类别
        param:'',              //输入框查询参数
        visible: false,   //授权对象信息  显示标识
        categoryVisible:false,  //授权对象类型显示标识
        wrapperCol: { span:18 },
        labelCol:{ span:6 },
        clickData: {},
        form:null,
        form1:null,
      }
    },
    mounted(){
      this.queryALLTaCustomOrgCategory(true);
      this.queryALLTaAccessSystem();
      this.queryAllCustomResourcePatent();
    },

    methods:{
      //查询类别
      queryALLTaCustomOrgCategory(firstTime){
        let submitParameter = {
          url:"org/sysmg/resourceCategoryManagementRestService/queryALLTaResourceCategory"
        };
        let callBack={
          successCallback: (data) => {
            if(data && data.serviceSuccess){
              let customResourceList= data.data.customResourceList;
              this.selectData = [];
              if(customResourceList.length){
                customResourceList.forEach((item) => {
                  this.selectData.push({
                    id:item.categoryId,
                    name:item.categoryName
                  })
                })
                if(firstTime){
                  this.selectCategory = this.selectData[0].id;
                  this.selectClick(this.selectData[0].id)
                }
              }
            }
          }
        };
        this.Base.submit(null,submitParameter,callBack)
      },
      //选择资源类别
      selectClick(id){
        this.selectCategory= id;
        if(id){
          let submitParameter = {
            url:"org/sysmg/customResourceManagementRestService/queryALLTaCustomResourceTreeByCategoryId",
            data:{
              categoryId: id,
              param: this.param
            }
          }
          let callBack={
            successCallback: (data) => {
              this.gridData=data.data.customResourceTree;
            }
          }
          this.Base.submit(null,submitParameter,callBack)
        }else{
          this.queryAllCustomResource();
        }
      },
      //查询系统列表
      queryALLTaAccessSystem(){
        const submitParameter = {
          url:"org/sysmg/accessSystemManagementRestService/queryAccessSystemByParam"
        }
        const callBack={
          successCallback: (data) => {
            if(data && data.data.pageBean.list){
              let systems = data.data.pageBean.list;
              if(systems && systems.length){
                systems.forEach(item=>{
                  this.selectSystem.push({
                    id:item.id,
                    name:item.sysName
                  })
                })
              }
            }
          }
        }
        this.Base.submit(null,submitParameter,callBack);
      },
      //查询上级节点
      queryAllCustomResourcePatent(){
        const submitParameter = {
          url:"org/sysmg/customResourceManagementRestService/queryALLTaCustomResourceParent"
        }
        const callBack={
          successCallback: (data) => {
            let parentList = data.data.parentList;
            this.selectParent = [];
            if(parentList.length){
              parentList.forEach((item) => {
                this.selectParent.push({
                  id:item.customResourceId,
                  name:item.resourceName
                })
              })
            }
          }
        }
        this.Base.submit(null,submitParameter,callBack)
      },
      reSetForm() {
        const record = this.clickData;
        if(this.visible){
          if(this.form.getFieldValue('customResourceId')){
            /*编辑*/
            this.form.resetFields();
            this.form.setFieldsValue({
              customResourceId:record.customResourceId,
              resourceCategory:record.resourceCategory,
              resourceName :record.resourceName,
              parentId:record.parentId,
              resourceContent:record.resourceContent,
              code:record.code,
              resourceCategory:record.resourceCategory,
              system:record.system
            })
          } else {
            /*新增*/
            this.form.resetFields();
            this.form.setFieldsValue({
              parentId:record.customResourceId,
              resourceCategory: record.type == 'resource' ? record.resourceCategory : record.customResourceId,
            })
          }
        }
        if(this.categoryVisible){
          this.form1.resetFields();
          if(record.type == 'category'){
            /*编辑类别*/
            this.form1.setFieldsValue({
              categoryId:record.customResourceId,
              categoryName :record.resourceName,
              categoryContent:record.categoryContent.trim(),
              code:record.code,
              effective: record.effective == '1' ? true : false,
            })
          }
        }
      },
      //授权类型 信息保存  categoryId
      saveCatagory() {
        const record = this.clickData;
        if(record.type){
          this.updateCategory();
        } else {
          this.addCategory();
        }
      },
      //显示授权类型  窗口
      showCatagoryDrawer() {
        this.categoryVisible = true;
        this.clickData = {};
        this.$nextTick(() => { this.form1.resetFields(); });
      },
      //新增授权对象类型
      addCategory() {
        this.form1.validateFields((err,values) => {
          if (!err) {
            values.effective = this.form1.getFieldValue('effective') ? '1' : '0';
            let submitParameter={
              url:"org/sysmg/resourceCategoryManagementRestService/addTaResourceCategory",
              data: values
            }
            let callBack={
              successCallback: (data) => {
                if (data.errors != null) {
                  this.$message.error(data.errors[0].msg, 2);
                }else {
                  this.$message.success("新增对象类型成功",2);
                  this.queryALLTaCustomOrgCategory();
                  this.selectCategory = data.data.categoryId;
                  this.selectClick(this.selectCategory);
                  this.queryAllCustomResourcePatent();
                }
                this.categoryVisible = false;
              }
            }
            this.Base.submit(this.form,submitParameter,callBack);
          }
        })
      },
      //修改授权对象类型
      updateCategory() {
        this.form1.validateFields((err,values) => {
          if (!err) {
            if(! this.form1.getFieldValue('categoryId')) {
              this.$message.warn("授权对象类型ID不能为空", 2);
              return;
            }
            values.effective = this.form1.getFieldValue('effective') ? '1' : '0';
            let submitParameter={
              url:"org/sysmg/resourceCategoryManagementRestService/updateTaResourceCategoryByCategoryId",
              data:values
            }
            let callBack={
              successCallback:(data) => {
                if (data.errors != null) {
                  this.$message.error(data.errors[0].msg, 2);
                } else {
                  this.$message.success('修改成功', 2);
                  this.queryALLTaCustomOrgCategory();
                  this.selectClick(this.selectCategory);
                  this.queryAllCustomResourcePatent();
                }
                this.categoryVisible = false;
              }
            }
            this.Base.submit(this.form,submitParameter,callBack);
          }
        })
      },
      onchange(checked) {
        this.form1.setFieldsValue({ effective: checked == true ? '1' : '0' })
      },
      //到新增资源
      toAddResource(record){
        this.clickData = record;
        this.visible = true;
        this.$nextTick(() => {
          this.form.resetFields();
          this.form.setFieldsValue({
            parentId:record.customResourceId,
            resourceCategory: record.type == 'resource' ? record.resourceCategory : record.customResourceId,
          })
        });
      },
      //新增/修改保存
      saveCustomResource() {
        if(!this.form.getFieldValue('customResourceId')) {
          this.addResource();
        }else {
          this.updateResource();
        }
      },
      //保存
      addResource(){
        this.form.validateFields((err,values) => {
          if (!err) {
            let submitParameter={
              url:"org/sysmg/customResourceManagementRestService/addTaCustomResource",
              data:values
            }
            let callBack={
              successCallback:(data) => {
                if (data.errors != null) {
                  this.$message.error(data.errors[0].msg, 2);
                }else {
                  this.$message.success("保存成功", 2);
                  this.queryALLTaCustomOrgCategory();
                  this.selectClick(this.selectCategory);
                  this.queryAllCustomResourcePatent();
                  this.form.resetFields();
                  this.visible = false;
                }
              }
            }
            this.Base.submit(null,submitParameter,callBack);
          }
        })
      },
      //修改自定义资源
      updateResource(){
        this.form.validateFields((err,values) => {
          if (!err) {
            let submitParameter={
              url:"org/sysmg/customResourceManagementRestService/updateTaCustomResourceByCustomResourceId",
              data:values
            }
            let callBack={
              successCallback:(data) => {
                if (data.errors != null) {
                  this.$message.error(data.errors[0].msg, 2);
                }else {
                  this.$message.success("修改成功", 2);
                  this.queryALLTaCustomOrgCategory()
                  this.selectClick(this.selectCategory)
                  this.form.resetFields();
                  this.queryAllCustomResourcePatent();
                  this.visible = false;
                }
              }
            }
            this.Base.submit(null,submitParameter,callBack);
          }
        })
      },
      //到删除资源
      toDeleteResource(record){
        if(record.type == 'resource'){
          this.deleteResource(record);
        }else if(record.type == 'category'){
          this.deleteCategory(record);
        }
      },
      //删除自定义资源
      deleteResource(data){
        let submitParameter={
          url:"org/sysmg/customResourceManagementRestService/deleteTaCustomResourceByCustomResourceId",
          data:{
            customResourceId:data.customResourceId,
          }
        }
        let callBack={
          successCallback:(data) => {
            if (data.errors != null) {
              this.$message.error(data.errors[0].msg, 2);
            }else {
              this.$message.success("删除成功",2);
              this.queryALLTaCustomOrgCategory()
              this.selectClick(this.selectCategory)
              this.queryAllCustomResourcePatent();
            }
          }
        }
        this.Base.submit(null,submitParameter,callBack);
      },
      //删除自定义资源类别
      deleteCategory(data){
        let submitParameter={
          url:"org/sysmg/resourceCategoryManagementRestService/deleteTaResourceCategoryByCategoryId",
          data:{
            categoryId:data.customResourceId,
          }
        }
        let callBack={
          successCallback:(data) => {
            if (data.errors != null) {
              this.$message.error(data.errors[0].msg, 2);
            }else {
              this.$message.success("删除成功",2);
              this.queryALLTaCustomOrgCategory(true);
              this.queryAllCustomResourcePatent();
            }
          }
        }
        this.Base.submit(null,submitParameter,callBack);
      },
      //到修改资源
      toUpdateResource(record){
        this.clickData = record;
        //修改授权对象 信息
        if(record.type == 'resource') {
          this.visible = true;
          this.$nextTick(() => {
            this.form.resetFields();
            this.form.setFieldsValue({
              customResourceId:record.customResourceId,
              resourceCategory:record.resourceCategory,
              resourceName :record.resourceName,
              parentId:record.parentId,
              resourceContent:record.resourceContent,
              code:record.code,
              effective:record.effective,
              resourceCategory:record.resourceCategory,
              system:record.system
            })
          });
        }else if(record.type == 'category') {    //  修改授权对象类型信息
          this.categoryVisible = true;
          this.$nextTick(() => {
            this.form1.resetFields();
            this.form1.setFieldsValue({
              categoryId:record.customResourceId,
              categoryName :record.resourceName,
              categoryContent:record.categoryContent.trim(),
              code:record.categoryCode,
              effective: record.effective == '1' ? true : false,
            })
          });
        }
      },
      //根据参数查询授权对象所有的数据
      queryAllCustomResource(){
        const paramObj = {param:this.param,selectCategory:this.selectCategory};
        let submitParameter = {
          url:"org/sysmg/customResourceManagementRestService/queryALLTaCustomResourceTree",
          data:paramObj
        }
        let callBack={
          successCallback: (data) => {
            this.gridData = data.data.customResourceTree;
          }
        }
        this.Base.submit(null,submitParameter,callBack);
      },
    },
  }
</script>
<style lang="scss" scoped type="text/scss">
  .left-card { border-right: 1px solid rgb(220,224,221); height: 100% }
  .select-item { width: 100%; height: 50px; line-height: 50px; padding-left: 24px;
    &.active { background-color: rgb(230, 246, 254); color: dodgerblue !important; border-right: 6px solid rgb(54, 134, 246); }
  }
  .search-box { text-align: center; height: 84px; }
  .add-btn { float: right; margin-top: 10px; }
</style>
