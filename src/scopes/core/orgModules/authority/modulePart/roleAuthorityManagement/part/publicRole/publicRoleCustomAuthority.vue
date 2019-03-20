<template>
  <div id="publicRoleCustomAuthority" class="fit">
    <ta-border-layout :layout="{header:'55px'}">
      <template slot="header">
        <ta-breadcrumb separator=">" style="line-height: 30px">
          <ta-breadcrumb-item><a @click="fnBack">角色维度</a></ta-breadcrumb-item>
          <ta-breadcrumb-item>自定义对象权限管理</ta-breadcrumb-item>
        </ta-breadcrumb>
      </template>
      <ta-alert :message="'当前角色为：'+role.roleName" type="info" showIcon class="notice-box"/>
      <ta-tabs class="fit content-box">
        <template slot="tabBarExtraContent">
          <ta-button-group>
            <ta-button @click="fnBack">返回角色列表</ta-button>
          </ta-button-group>
        </template>
        <ta-tab-pane tab="自定义对象权限">
          <ta-row class="fit">
            <ta-col
              :span="4"
              class="fit"
              style="border-right:1px solid #eee"
            >
              <div class="menu-title">
                <ta-icon type="menu-fold"></ta-icon>
                <span style="margin-left: 5px">自定义对象一级菜单</span>
              </div>
              <ta-divider style="margin: 0"></ta-divider>
              <ta-menu
                mode="inline"
                :selectedKeys="menuSelectedKeys"
                @click="onSelectMenu"
              >
                <ta-menu-item :key="item.id" v-for="item in menuData">
                  <ta-icon type="appstore"/>
                  {{item.name}}
                </ta-menu-item>
              </ta-menu>
            </ta-col>
            <ta-col :span="18" class="right-box">
              <div style="border: 1px solid #e8e8e8" class="fit" v-if="authrityTree.length>0">
                <div class="divider"></div>
                <ta-row style="height: 5%">
                  <ta-col :span="17" class="col-header">
                    可授权的自定义对象
                  </ta-col>
                  <ta-col :span="7" class="col-header">
                    有效期
                  </ta-col>
                </ta-row>
                <ta-divider/>
                <div class="authority-box">
                  <ta-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterText"
                    style="width: 250px;margin-left: 10px;"
                  >
                  </ta-input>
                  <ta-button type="primary" @click="fnCustomAuthorityMgSave" class="button-save">权限保存</ta-button>
                  <ta-popover
                    placement="bottom"
                    trigger="manual"
                    :value="batchPop"
                    v-if="defaultCheckedList.length>0"
                  >
                    <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
                      <ta-calendar :fullscreen="false" @change="onPanelChange"/>
                    </div>
                    <div style="float: right;margin-top: 10px;">
                      <ta-button @click="batchPop=false" size="small">取消</ta-button>
                      <ta-button @click="fnSaveCustomEffectiveTime(true)" size="small">设为永久</ta-button>
                      <ta-button type="primary" size="small" @click="fnSaveCustomEffectiveTime(false)">确定
                      </ta-button>
                    </div>
                    <ta-button slot="reference" size="small" @click="batchPop=true"
                               style="float: right;margin-right: 10px">批量设置有效期
                    </ta-button>
                  </ta-popover>
                  <ta-e-tree
                    :data="authrityTree"
                    show-checkbox
                    node-key="id"
                    ref="atree"
                    highlight-current
                    :props="defaultProps"
                    :default-checked-keys="defaultCheckedList"
                    default-expand-all
                    :expand-on-click-node="false"
                    :filter-node-method="filterNode"
                  >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span v-if="data.loginAccess" style="color: #67c23a">{{ node.label }} (登录即可访问)</span>
                      <span>{{ node.label }}</span>
                      <span v-if="data.checked">
                        {{data.effectTime?data.effectTime.split(' ')[0]:'永久'}}
                        <ta-popover v-if="data.checked"
                                    placement="bottom"
                                    trigger="manual"
                                    :value="data.id==indexClick">
                            <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
                              <ta-calendar :fullscreen="false" @change="onPanelChange"/>
                            </div>
                            <div style="float: right;margin-top: 10px;">
                              <ta-button @click="indexClick=null" size="small">取消</ta-button>
                              <ta-button @click="onCustomCellChange(node,data,true)" size="small">设为永久</ta-button>
                              <ta-button type="primary" size="small" @click="onCustomCellChange(node,data,false)">确定
                              </ta-button>
                            </div>
                            <ta-icon style="color: #1890ff;margin-left: 10px;" slot="reference" type="edit"
                                     @click="indexClick = data.id"/>
                          </ta-popover>
                      </span>
                      <span v-else></span>
                    </span>
                  </ta-e-tree>
                </div>
              </div>
            </ta-col>
          </ta-row>
        </ta-tab-pane>
      </ta-tabs>
    </ta-border-layout>
  </div>
</template>
<script>


  export default {
    name: 'publicRoleCustomAuthority',
    data() {
      return {
        effectiveTime: "",
        role: {},
        defaultProps: {
          children: "children",
          label: "name",
          id: "id"
        },
        indexClick: null,
        allCheckedList: [],
        currentCheckedList: [],
        tempCheckedList: [],
        authrityTree: [],
        defaultCheckedList: [],
        menuData: [],
        rootId: '',
        popVisible: false,
        batchPop: false,
        filterText: '',
        menuSelectedKeys: [],
        // menuIndexClick:null,
      }
    },
    watch: {
      filterText(val) {
        this.$refs.atree.filter(val);
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      fnBack() {
        this.$router.push(
          {
            name: 'publicRoleManager'
          }
        );
      },
      onPanelChange(value, mode) {
        this.effectiveTime = value.format('YYYY-MM-DD');
      },
      onSelectMenu({item, key, keyPath}) {
        let selectArry = [];
        let treeObj = this.$refs.atree;
        selectArry = [...selectArry, ...treeObj.getCheckedKeys(), ...treeObj.getHalfCheckedKeys()];
        //过滤掉登录即可访问的菜单
        selectArry = selectArry.filter(el => {
          return !treeObj.getNode(el).data.loginAccess;
        });
        if (!(this.currentCheckedList.sort().toString() === selectArry.sort().toString())) {
          this.$confirm({
            title: '提示',
            content: '当前自定义对象修改未保存，是否保存?',
            cancelText: '取消',
            okText: '确认',
            onOk: () => {
              this.rootId = key;
              this.fnCustomAuthorityMgSave();
              this.menuSelectedKeys = keyPath;
            },
            onCancel:()=>{
              this.menuSelectedKeys = keyPath;
              this.fnQueryCustomUsePermissionByResourceId(key);
            }
          });
        } else {
          this.menuSelectedKeys = keyPath;
          this.fnQueryCustomUsePermissionByResourceId(key);
        }
      },
      //递归遍历树checked
      fnCreateCheckedCustomResourceIds(item, resourceIds) {
        if (item.children) {
          item.children.forEach((value) => {
            this.fnCreateCheckedCustomResourceIds(value, resourceIds);
          });
        }
        if (item.checked) {
          resourceIds.push(item.id);
        }
      },
      fnSaveCustomEffectiveTime(forever) {
        let resourceIds = [];
        this.fnCreateCheckedCustomResourceIds(this.authrityTree[0], resourceIds);
        let submitParam = {
          url: "org/authority/roleAuthorityManagementRestService/updateBatchCustomResourceUsePermissionEffectiveTime",
          data: {
            roleId: this.role.roleId,
            resourceIds: resourceIds.join(","),
            effectTime: forever?null:this.effectiveTime
          }
        };
        let callBack = {
          successCallback: (data) => {
            if (!data.errors) {
              this.$message.success("批量设置有效期成功");
              this.fnQueryCustomUsePermissionByResourceId(this.rootId);
              this.batchPop = false;
            } else {
              this.$message.success("批量设置有效期失败");
            }
          }
        };
        this.Base.submit(null, submitParam, callBack);
      },
      onCustomCellChange(node, data,forever) {
        let submitParam = {
          url: "org/authority/roleAuthorityManagementRestService/updateCustomResourceUsePermissionEffectiveTime",
          data: {
            roleId: this.role.roleId,
            resourceId: data.id,
            effectTime: forever?null:this.effectiveTime
          }
        };
        let callBack = {
          successCallback: (data) => {
            this.fnQueryCustomUsePermissionByResourceId(this.rootId);
            this.indexClick = null;
          }
        };
        this.Base.submit(null, submitParam, callBack);
      },
      //查询左侧二级菜单
      fnQueryCustomUsePermissionByRoleId() {
        let submitParameter = {
          url: "org/authority/roleAuthorityManagementRestService/queryCustomRePermissionByRoleId",
          data: {
            roleId: this.role.roleId,
          }
        };
        let callBack = {
          successCallback: (data) => {
            this.menuData = data.data.customRePermissions;
            //默认选中右侧第一个二级菜单
            this.$nextTick(() => {
              if (this.menuData && (this.menuData.length > 0)) {
                this.menuSelectedKeys = [this.menuData[0].id];
                this.fnQueryCustomUsePermissionByResourceId(this.menuData[0].id, 0);
              }
            });
          }
        }
        this.Base.submit(null, submitParameter, callBack);
      },
      //根据点击左侧二级菜单查询右侧权限树
      fnQueryCustomUsePermissionByResourceId(id, index) {
        // this.menuIndexClick = index;
        this.rootId = id;
        let submitParam = {
          url: "org/authority/roleAuthorityManagementRestService/queryCustomRePermissionByRoleId",
          data: {
            roleId: this.role.roleId,
            resourceId: id
          }
        };
        let callBack = {
          successCallback: (data) => {
            this.authrityTree = data.data.customRePermissions;
            this.currentCheckedList = data.data.checkedList;
            this.allCheckedList = data.data.allCheckedList;
            this.tempCheckedList = this.allCheckedList.filter(el => {
              return !data.data.checkedList.includes(el);
            });
            this.$nextTick(() => {
              let arrySelect = [];
              data.data.checkedList.forEach((value, index) => {
                let node = this.$refs.atree.getNode(value);
                if (node.isLeaf) {
                  arrySelect.push(node.data.id);
                }
              });
              this.defaultCheckedList = arrySelect;
            });
          }
        };
        this.defaultCheckedList = [];
        this.Base.submit(null, submitParam, callBack);
      },
      //保存修改权限
      fnCustomAuthorityMgSave() {
        let selectArry = [];
        let treeObj = this.$refs.atree;
        selectArry = [...selectArry, ...treeObj.getCheckedKeys(), ...treeObj.getHalfCheckedKeys()];
        //过滤掉登录即可访问的菜单
        selectArry = selectArry.filter(el => {
          return !treeObj.getNode(el).data.loginAccess;
        });
        selectArry = [...selectArry, ...this.tempCheckedList];
        let submitParam = {
          url: "org/authority/roleAuthorityManagementRestService/addCustomResourceUsePermission",
          data: {
            roleId: this.role.roleId,
            customResourceIds: selectArry.join(","),
          }
        };
        let callBack = {
          successCallback: (data) => {
            this.$message.success("保存自定义对象权限成功");
            this.fnQueryCustomUsePermissionByResourceId(this.rootId);
          },
          failCallback: (data) => {
            this.$message.success("保存自定义对象权限失败");
          }
        };
        this.Base.submit(null, submitParam, callBack);
      },
    },
    activated() {
      if (this.$route.params.role instanceof Object) {
        this.role = this.$route.params.role || {};
        this.fnQueryCustomUsePermissionByRoleId();
      } else {
        this.$router.push({name: 'publicRoleManager'})
      }
    },
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .divider {
    position: absolute;
    top: 0;
    right: 30%;
    height: 100%;
    width: 1px;
    background-color: #e8e8e8;
    border-top: 10px solid #fff;
    border-bottom: 10px solid #fff;
    box-sizing: border-box;
    z-index: 1000;
  }

  .right-box {
    height: 100%;
    padding: 10px;
  }

  .ant-divider-horizontal {
    margin: 5px 0;
  }

  .authority-box {
    height: 90%;
    overflow: auto;
    @include beautifyScrollbar();
  }

  .col-header {
    text-align: center;
    line-height: 50px;
  }

  .button-save {
    position: absolute;
    right: 30%;
    margin-right: 10px;
  }

  .menu-title {
    height: 39px;
    line-height: 39px;
    width: 100%;
    padding: 0 0 0 25px;
  }

  .notice-box {
    float: right;
    width: 100%;
  }

  .content-box {
    padding-top: 40px;
    overflow: visible;
  }

</style>
