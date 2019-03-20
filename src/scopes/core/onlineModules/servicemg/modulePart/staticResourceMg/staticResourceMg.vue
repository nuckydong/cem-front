<template>
  <div id="staticResourceMg" class="fit">
    <ta-border-layout
      :layout="{left:'200px'}"
      :leftCfg="{title:'资源管理',showBar:true}"
    >
      <div slot="left">
        <ta-e-tree
          highlight-current
          ref="resourceTree"
          node-key="key"
          :load="loadFileResourceTree"
          lazy
          :expand-on-click-node="false"
          @node-click="onSearchResource"
        >
          <span  slot-scope="{ node, data }">
            <span>{{data.fileName}}</span>
          </span>
        </ta-e-tree>
      </div>
      <ta-border-layout
        :layout="{header:'80px'}"
        :headerCfg="{showBorder:false}"
        :centerCfg="{showBorder:false,showBar:true,toolBarStyle:{height:'35px'}}"
      >
        <ta-row type="flex" slot="header" justify="center" align="middle">
          <ta-input-search placeholder="请输入静态资源名称" v-model="searchInfo" @search="onSearchResource" class="search-box">
            <ta-button slot="enterButton" type="primary">搜索</ta-button>
          </ta-input-search>
          <ta-divider style="margin: 10px 0"/>
        </ta-row>
        <div slot="centerExtraContent" class="centerTopBar">
          <ta-tag-select
            title="资源类型"
            :data="[{value:'0',label:'文件夹'},{value:'1',label:'css'},{value:'2',label:'png'}]"
            v-model="resourceType"
            :is-multi="true"
          />
          <div style="float: right">
            <ta-upload
              name="uploadFile"
              :action="uploadUrl"
              @change="handleChange"
              :data="uploadData"
              style="float: left;margin-right: 10px"
              :withCredentials="true"
              :showUploadList="false"
            >
              <ta-button type="primary">
                <ta-icon type="upload" /> 上传模板
              </ta-button>
            </ta-upload>
            <ta-button-group>
              <ta-button @click="fnShowAddDirectory">新建目录</ta-button>
              <ta-button @click="fnShowAddFile">新建文件</ta-button>
            </ta-button-group>
          </div>
        </div>
        <ta-table
          :dataSource="resourceData"
          :columns="resourceColumns"
        >
          <span slot="fileType" slot-scope="text">{{CollectionLabel('FILERESOURCETYPE',text)}}</span>
          <template slot="operation" slot-scope="text,record">
            <a>编辑</a>
            <!--<a @click="fnRemoveResource(record)">删除</a>-->
            <ta-popconfirm title="确认删除该资源?" cancelText="取消" okText="确认" okType="default" @confirm="fnRemoveResource(record)">
              <ta-icon slot="icon" type="question-circle-o" style="color: red"/>
              <a class="operate">删除</a>
            </ta-popconfirm>
          </template>
        </ta-table>
      </ta-border-layout>
    </ta-border-layout>
    <ta-modal
      title="新建目录"
      :visible="addDirectory"
      @cancel="addDirectory=false"
      @ok="fnSaveAddDirectory"
      centered
      destroyOnClose
    >
      <ta-form :autoFormCreate="(form)=>{this.addDirectoryForm = form}">
        <ta-alert :message="'当前所在目录：'+ currentDirectory" type="info" showIcon class="message-box"/>
        <ta-form-item
          label="文件夹名称"
          :labelCol="{span:6}"
          :wrapperCol="{span:18}"
          fieldDecoratorId="fileName"
          :fieldDecoratorOptions="{rules: [{ required: true,message:'文件夹名为必输'}]}"
        >
          <ta-input placeholder="请输入目录名称，可建多级目录，用/分隔" ></ta-input>
        </ta-form-item>
      </ta-form>
    </ta-modal>
    <ta-modal
      title="新建文件"
      :visible="addFile"
      @cancel="addFile=false"
      @ok="fnSaveAddFile"
      centered
      destroyOnClose
    >
      <ta-form :autoFormCreate="(form)=>{this.addFileForm = form}">
        <ta-alert :message="'当前所在目录：'+ currentDirectory" type="info" showIcon class="message-box"/>
        <ta-form-item
          label="文件名称"
          :labelCol="{span:6}"
          :wrapperCol="{span:18}"
          fieldDecoratorId="fileName"
          :fieldDecoratorOptions="{rules: [{ required: true,message:'文件名为必输'}]}"
        >
          <ta-input placeholder="请输入文件名称，可在多级子目录下建立文件，用/分隔" ></ta-input>
        </ta-form-item>
        <ta-form-item
          label="文件内容"
          :labelCol="{span:6}"
          :wrapperCol="{span:18}"
          fieldDecoratorId="content"
          :fieldDecoratorOptions="{rules: [{ required: true,message:'文件内容为必输'}]}"
        >
          <ta-textarea style="height: 150px;"></ta-textarea>
        </ta-form-item>
      </ta-form>
    </ta-modal>
  </div>
</template>
<script>

  import $api from './api/index'

  const resourceColumns = [{
    title:'文件名称',
    dataIndex:'fileName',
  },{
    title: '文件大小（byte）',
    dataIndex:'fileSize',
    customRender: (text) => {
      return text==0 ?'--' : text
    }
  },{
    title: '类型',
    dataIndex: 'fileType',
    scopedSlots: {customRender: 'fileType'},
  },{
    title:'修改日期',
    dataIndex:"updateTime"
  },{
    title:'操作',
    dataIndex: 'operation',
    scopedSlots: {customRender: 'operation'},
    align:"center"
  }]

  export default {
    name:"staticResourceMg",
    data(){
      return {
        searchInfo:"",
        resourceType:[],
        resourceColumns,
        resourceData:[],
        addDirectory:false,
        addFile:false,
        //当前目录
        currentDirectory:"/",
        currentNode:{},
        resolveMap:{},
        uploadUrl:faceConfig.basePath+"/fileResource/fileResourceManageRestService/addFileResource"
      }
    },
    methods:{
      //加载静态资源树
      loadFileResourceTree(node, resolve){
        if (node.level === 0) {
          resolve([{fileName:'根目录'}])
        }
        if(node.level=== 1){
          $api.loadFileResourceTree(this, {path:'/'}, (data) => {
            //将该节点的渲染方法存储，以方便后面动态刷新树使用
            this.resolveMap['/'] = resolve;
            if(data.data.fileNodes){
              resolve(data.data.fileNodes);
            }else{
              resolve([]);
            }
          });
        }
        if(node.level>1){
          $api.loadFileResourceTree(this,{path:node.data.filePath+"/"+node.data.fileName},(data)=>{
            //将该节点的渲染方法存储，以方便后面动态刷新树使用
            this.resolveMap[node.data.filePath+"/"+node.data.fileName] = resolve;
            if(data.data.fileNodes){
              resolve(data.data.fileNodes);
            }else{
              resolve([]);
            }
          });
        }
      },
      //搜索目录下的资源
      onSearchResource(data,node) {
        if (node.level === 1) {
          this.currentDirectory = "/";
        }else{
          this.currentDirectory = data.filePath+"/"+data.fileName;
        }
        this.currentNode = node;
        this.fnSearchResourceByPath();
      },
      //根据路径查询该路径下的资源
      fnSearchResourceByPath(){
        $api.listFileResource(this, {path:this.currentDirectory} , (data) => {
          this.resourceData = data.data.fileResources;
        });
      },
      //显示新建目录弹窗
      fnShowAddDirectory(){
        this.addDirectory = true;
      },
      //保存新建目录
      fnSaveAddDirectory(){
        let param = {
          filePath:this.currentDirectory,
          fileName:this.addDirectoryForm.getFieldValue("fileName")
        };
        $api.addFileDirectoryResource(this, param, (data) => {
          this.$message.success("新建目录成功");
          this.addDirectory = false;
          this.fnSearchResourceByPath();
          this.refreshLazyTree();
        });
      },
      //显示新建文件弹窗
      fnShowAddFile(){
        this.addFile = true;
      },
      //保存新建文件
      fnSaveAddFile(){
        let param = {
          filePath:this.currentDirectory,
          ...this.addFileForm.getFieldsValue()
        };
        $api.addFileResourceText(this, param, (data) => {
          this.$message.success("新建文件成功");
          this.addFile = false;
          this.fnSearchResourceByPath();
        });
      },
      //删除静态资源
      fnRemoveResource(record){
        //如果是目录
        if(record.fileType==="1"){
          $api.removeFileDirectoryResource(this, record, (data) => {
            this.$message.success("删除目录成功");
            this.fnSearchResourceByPath();
            this.refreshLazyTree();
          });
        }else{
          $api.removeFileResource(this, record, (data) => {
            this.$message.success("删除文件成功");
            this.fnSearchResourceByPath();
          });
        }
      },
      //树刷新方法
      refreshLazyTree() {
        this.currentNode.childNodes = [];
        if(typeof this.resolveMap[this.currentDirectory] === "function") {
          this.loadFileResourceTree(this.currentNode,this.resolveMap[this.currentDirectory]);
        }
      },
      //上传状态变化事件
      handleChange(info){
        if (info.file.status === 'done') {
          this.$message.success(`${info.file.name} 上传成功`);
          this.fnSearchResourceByPath();
        } else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name} 上传失败`);
        }
      },
      uploadData(file){
        return {
          fileName:file.name,
          filePath:this.currentDirectory,
          ...this.Global.getProperty('TA$indexParam',{})
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
</style>
