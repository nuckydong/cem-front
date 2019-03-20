<template>
  <div id="templateMg" class="fit">
    <ta-border-layout
      :layout="{left:'300px'}"
      :leftCfg="{title:'模板管理',showBar:true}"
    >
      <div slot="left">
        <ta-e-tree
          highlight-current
          ref="resourceTree"
          node-key="id"
          :load="loadTemplateCatalogTree"
          lazy
          :expand-on-click-node="false"
          @node-click="onTreeNodeClick"
        >
          <span  class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{data.name}}</span>
            <span>
              <ta-icon type="plus-square" @click="fnAddTemplateCatalog(node,data)"/>
              <ta-popconfirm title="确认删除该功能模块?" cancelText="取消" okText="确认" okType="default"
                             @confirm="fnRemoveTemplateCatalog(node,data)">
                <ta-icon slot="icon" type="question-circle-o" style="color: red"/>
                <ta-icon type="minus-square" v-if="node.level!=1"/>
              </ta-popconfirm>
            </span>
          </span>
        </ta-e-tree>
      </div>
      <ta-border-layout
        :layout="{header:'80px'}"
        :headerCfg="{showBorder:false}"
        :centerCfg="{showBorder:false,showBar:true,toolBarStyle:{height:'35px'}}"
      >
        <ta-row type="flex" slot="header" justify="center" align="middle">
          <ta-input-search placeholder="请输入模板名称或编码" v-model="searchInfo" class="search-box">
            <ta-button slot="enterButton" type="primary">搜索</ta-button>
          </ta-input-search>
          <ta-divider style="margin: 10px 0"/>
        </ta-row>
        <div slot="centerExtraContent" class="centerTopBar">
          <ta-tag-select
            title="有效标志"
            :data="[{value:'0',label:'有效'},{value:'1',label:'无效'}]"
            v-model="resourceType"
            :is-multi="true"
          />
          <div style="float: right">
            <ta-upload
              name="uploadFile"
              :customRequest="fnUploadTemplate"
              :beforeUpload="fnBeforeUpload"
              style="float: left;margin-right: 10px"
              accept=".vue"
              :withCredentials="true"
              :showUploadList="false"
            >
              <ta-button type="primary">
                <ta-icon type="upload" /> 上传模板
              </ta-button>
            </ta-upload>
            <ta-button-group>
              <ta-button @click="fnAddTemplate">新增模板</ta-button>
            </ta-button-group>
          </div>
        </div>
        <ta-table
          :dataSource="templateData"
          :columns="templateColumns"
        >
          <template slot="operation" slot-scope="text,record">
            <a @click="fnEditTemplate(record)">编辑</a>
            <ta-popconfirm title="确认删除该页面模板?" cancelText="取消" okText="确认" okType="default" @confirm="fnRemoveTemplate(record)">
              <ta-icon slot="icon" type="question-circle-o" style="color: red"/>
              <a class="operate">删除</a>
            </ta-popconfirm>
          </template>
        </ta-table>
      </ta-border-layout>
    </ta-border-layout>
    <ta-modal
      title="新建功能模块"
      :visible="addTemplateCatalog"
      @cancel="addTemplateCatalog=false"
      @ok="fnSaveAddTemplateCatalog"
      centered
      destroyOnClose
      okText="确定"
      cancelText="取消"
    >
      <ta-form :autoFormCreate="(form)=>{this.addTemplateCatalogForm = form}">
        <ta-form-item
          label="功能模块名称"
          :labelCol="{span:6}"
          :wrapperCol="{span:18}"
          fieldDecoratorId="name"
          :fieldDecoratorOptions="{rules: [{ required: true,message:'功能模块名称为必输'}]}"
        >
          <ta-input placeholder="请输入功能模块名称" ></ta-input>
        </ta-form-item>
      </ta-form>
    </ta-modal>
    <ta-modal
      title="新增模板"
      :visible="addTemplate"
      @cancel="addTemplate=false"
      @ok="fnSaveAddTemplate"
      centered
      destroyOnClose
      okText="确定"
      cancelText="取消"
    >
      <ta-form :autoFormCreate="(form)=>{this.addTemplateForm = form}">
        <ta-form-item
          label="模板名称"
          :labelCol="{span:6}"
          :wrapperCol="{span:18}"
          fieldDecoratorId="templateName"
          :fieldDecoratorOptions="{rules: [{ required: true,message:'模板名称为必输'}]}"
        >
          <ta-input placeholder="请输入模板名称" ></ta-input>
        </ta-form-item>
      </ta-form>
    </ta-modal>
  </div>
</template>
<script>

  import $api from './api/index'

  const templateColumns = [{
    title:'模板名称',
    dataIndex:'templateName',
  },{
    title: '编码',
    dataIndex:'templateCode',
    customRender: (text) => {
      return text?text:"--"
    }
  },{
    title: '类型',
    dataIndex: 'templateType',
    customRender: (text) => {
      if(text=="1"){
        return "模板"
      }else if(text=="2"){
        return "CODE"
      }
    }
  },{
    title:'来源',
    dataIndex:"templateSource",
    customRender: (text) => {
      if(text=="1"){
        return "外部上传"
      }else if(text=="2"){
        return "内部绘制"
      }
    }
  },{
    title:'可用标志',
    dataIndex:'effective',
    customRender: (text) => {
      if(text=="1"){
        return "有效"
      }else if(text=="0"){
        return "无效"
      }
    }
  },{
    title:'操作',
    dataIndex: 'operation',
    scopedSlots: {customRender: 'operation'},
    align:"center"
  }]

  export default {
    name:"templateMg",
    data(){
      return {
        searchInfo:"",
        resourceType:[],
        templateColumns,
        templateData:[],
        addTemplateCatalog:false,
        currentTemplateCatalog:{},
        addTemplate:false,
        currentNode:{},
        resolveMap:{},
        currentFile:{},
        uploadUrl:faceConfig.basePath+"/templateMg/templateMgRestService/uploadTemplate"
      }
    },
    methods:{
      //加载功能列表
      loadTemplateCatalogTree(node, resolve){
        if (node.level === 0) {
          resolve([{name:'功能列表',id:'0',idPath:'0',namePath:'功能列表'}])
        }
        if(node.level>= 1){
          $api.loadTemplateCatalogTree(this, {parentId:node.data.id}, (data) => {
            //将该节点的渲染方法存储，以方便后面动态刷新树使用
            this.resolveMap[node.data.id] = resolve;
            if(data.data.treeData){
              resolve(data.data.treeData);
            }else{
              resolve([]);
            }
          });
        }
      },
      //树点击事件
      onTreeNodeClick(data,node) {
        this.currentNode = node;
        this.fnSearchTemplate();
      },
      fnSearchTemplate(){
        $api.listTemplate(this,{
          catalogId:this.currentNode.data.id
        },(data)=>{
          this.templateData = data.data.templateVos;
        })
      },
      //显示新建功能
      fnAddTemplateCatalog(node,data){
        this.currentTemplateCatalog = data;
        this.addTemplateCatalog = true;
      },
      //保存新建功能
      fnSaveAddTemplateCatalog(){
        let name = this.addTemplateCatalogForm.getFieldValue("name");
        let param = {
          name: name,
          parentId: this.currentTemplateCatalog.id,
          idPath:this.currentTemplateCatalog.idPath,
          namePath:this.currentTemplateCatalog.namePath+"/"+name
        };
        $api.addTemplateCatalog(this, param, (data) => {
          this.$message.success("新增功能模块成功");
          this.addTemplateCatalog = false;
          this.refreshLazyTree();
        });
      },
      //删除功能模块
      fnRemoveTemplateCatalog(node,data) {
        $api.removeTemplateCatalog(this,{
          id:data.id
        },(data)=>{
          this.$message.success("移除功能模块成功");
          this.fnSearchTemplate();
          this.refreshParentLazyTree(node);
        })
      },
      //新增模板窗口
      fnAddTemplate(){
        this.addTemplate = true;
      },
      //保存新增模板
      fnSaveAddTemplate(){
        $api.addTemplate(this, {
          templateName: this.addTemplateForm.getFieldValue("templateName"),
          catalogId:  this.currentNode.data.id
        }, (data) => {
          this.$message.success("新增模板成功");
          this.addTemplate = false;
          this.fnSearchTemplate();
        });
      },
      //删除模板
      fnRemoveTemplate(record){
        $api.removeTempalte(this, {templateId:record.templateId}, (data) => {
          this.$message.success("删除模板成功");
          this.fnSearchTemplate();
        });
      },
      //编辑模板
      fnEditTemplate(record){
        $api.getTemplateContent(this,{templateId:record.templateId},(data)=>{
          let templateObj = {
            templateContent:data.data.templateContent,
            templateName:data.data.templateVo.templateName,
            templateId:data.data.templateVo.templateId
          };
          this.$store.commit('setOnlineCode',templateObj);
          this.Base.openTabMenu({url:`onlineModulesManage.html#/onlineCode`,id:'onlineCode',name:`在线code`});
        });
      },
      //上传参数
      uploadData(file){
        return {
          templateName:file.name,
          catalogId:this.currentNode.data.id,
          ...this.Global.getProperty('TA$indexParam',{})
        }
      },
      fnBeforeUpload(file,fileList){
        this.currentFile = file;
        return true;
      },
      //上传模板
      fnUploadTemplate(){
        $api.uploadTemplate(this, {
          uploadFile: this.currentFile,
          templateName: this.currentFile.name,
          catalogId: this.currentNode.data.id,
        }, (data) => {
          this.fnSearchTemplate();
          this.$message.success(`上传成功`);
        });
      },
      //刷新树当前节点
      refreshLazyTree() {
        this.currentNode.childNodes = [];
        if(typeof this.resolveMap[this.currentTemplateCatalog.id] === "function") {
          this.loadTemplateCatalogTree(this.currentNode,this.resolveMap[this.currentTemplateCatalog.id]);
        }
      },
      //刷新树父节点
      refreshParentLazyTree(node){
        node.parent.childNodes = [];
        if(typeof this.resolveMap[node.parent.data.id] === "function") {
          this.loadTemplateCatalogTree(node.parent,this.resolveMap[node.parent.data.id]);
        }
      }
    },
    activated(){
      // this.loadFileResourceTree();
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .search-box {
    width: 340px;
    line-height: 46px;
  }
  .centerTopBar{
    height: 30px;
    line-height: 30px;
  }
  .message-box{
    margin-bottom: 10px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
