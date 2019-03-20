<template>
  <div>
    <ta-button @click="isShow = true">点击打开用户选择组件</ta-button>
    <ta-button @click="addDefault">添加默认用户</ta-button>
    <p>最后选择结果为<span v-html="result"></span></p>
    <!--组件参数介绍 by Xianln-->
    <!--
    配置选项
    props: {
      treeNodeKey: 'value', // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 （默认：value）
      treeLabel: 'label', // 树节点的属性名称 （默认：label）
      treeChildren: 'children', // 树子节点对象的属性名称 （默认：children）
      listKey: 'userId', // 每条用户信息的唯一标识（默认：userId）
      listTitle: 'name', // 用户信息第一行显示内容 （默认：name）
      listSubTitle: 'mobile', // 用户信息第二行显示内容 （默认：mobile）
      listDescription: 'taOrgVo.namePath', // 用户信息鼠标移上去显示描述信息 （默认：taOrgVo.namePath）
    },
    user-tree-data： 传入的数据，树格式，如treeData，可根据props自定义
    user-list-data：查询到的用户信息，如userListData，可根据props自定义
    default-user-list：默认显示用户
    title：弹出框名称（默认"用户选择"）
    include-child-title：用户列表右侧包含子部分的名称（默认：包含子部门人员）
    width: 组件宽度，要加px（默认800px）
    isShow：是否显示（默认不显示）
    is-multi: true(用户多选：默认) false(用户单选)
    close: 关闭组件时要进行的操作
    queryUserList：点击树后返回节点唯一标识的值、是否包含子部门人员。以便查询用户信息
    getUserListResult: 点击确定后返回的所有选中用户信息
    -->
    <ta-user-select
      :props="defaultProps"
      :user-tree-data="treeData"
      :user-list-data="userListData"
      :default-user-list="defaultUserList"
      :is-multi="true" :is-show="isShow" title="用户选择" include-child-title="包含XXX" width="800px"
      @close="isShow = false" @queryUserList="fnQueryUserList" @getUserListResult="fnGetUserListResult"
    ></ta-user-select>
  </div>
</template>
<script>
  export default {
    name:"app",
    data(){
      return {
        result:[],
        isShow: false,
        defaultProps: {
          treeNodeKey: 'value', // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
          treeLabel: 'label', // 树节点的属性名称
          treeChildren: 'children', // 树子节点对象的属性名称
          listKey: 'userId', // 每条用户信息的唯一标识（默认：userId）
          listTitle: 'name', // 用户信息第一行显示内容
          listSubTitle: 'mobile', // 用户信息第二行显示内容
          listDescription: "taOrgVo.namePath", // 用户信息鼠标移上去显示描述信息
        },
        userListData:[],
        defaultUserList:[],
        /*tree格式value,label,name*/
        treeData: [{
          key: 1,
          value: 1,
          label: '久远银海',
          children: [{
            key: 2,
            value: 2,
            label: '创新中心',
            children: [{
              key: 4,
              value: 4,
              label: '解决方案部',
            }, {
              key: 5,
              value: 5,
              label: '大数据产品部',
            }]
          },{
            key: 3,
            value: 3,
            label: '研发中心',
            children: [{
              key: 6,
              value: 6,
              label: '技术研发部',
            }, {
              key: 7,
              value: 7,
              label: '应用设计部',
            }]
          },{
            key: 8,
            value: 8,
            label: '职能部门',
            children: [{
              key: 9,
              value: 9,
              label: '人力资源部',
            }, {
              key: 10,
              value: 10,
              label: '行政管理部',
            }, {
              key: 11,
              value: 11,
              label: '信息部',
            }, {
              key: 12,
              value: 12,
              label: '企业战略部',
            }]
          }]
        }]
      }
    },
    methods:{
      addDefault(){
        this.defaultUserList = [
          { "userId": 2, "name": "张4", sex: '0', taOrgVo:{"namePath": "四川省/成都市/成都市人力资源和社会保障局/养老保险处"}, mobile:'13111223344' },
          { "userId": 3, "name": "张5", sex: '1', taOrgVo:{"namePath": "四川省/成都市/成都市人力资源和社会保障局/养老保险处"}, mobile:'13111223344' },
        ];
      },
      fnQueryUserList(nodeKey,includeChild){
//        一个请求，返回用户信息
        console.log(nodeKey);
        console.log(includeChild);
        let arr = [
          { "userId": 4, "name": "张1", taOrgVo:{"namePath": "顶级组织/研发中心"}, mobile:'13111223344' },
          { "userId": 5, "name": "张2", sex:null, taOrgVo:{"namePath": "四川省/成都市/成都市人力资源和社会保障局/养老保险处"}, mobile:'13111223344' },
          { "userId": 1, "name": "张3", sex: '1', taOrgVo:{"namePath": "四川省/成都市/成都市人力资源和社会保障局/养老保险处"}, mobile:'13111223344' },
          { "userId": 2, "name": "张4", sex: '0', taOrgVo:{"namePath": "四川省/成都市/成都市人力资源和社会保障局/养老保险处"}, mobile:'13111223344' },
          { "userId": 3, "name": "张5", sex: '1', taOrgVo:{"namePath": "四川省/成都市/成都市人力资源和社会保障局/养老保险处"}, mobile:'13111223344' },
          { "userId": 6, "name": "张6", sex: '1', taOrgVo:{"namePath": "四川省/成都市/成都市人力资源和社会保障局/养老保险处"}, mobile:'13111223344' },
          { "userId": 7, "name": "张7", sex: '0', taOrgVo:{"namePath": "四川省/成都市/成都市人力资源和社会保障局/养老保险处"}, mobile:'13111223344' },
          { "userId": 8, "name": "张8", sex: '1', taOrgVo:{"namePath": "四川省/成都市/成都市人力资源和社会保障局/养老保险处"}, mobile:'13111223344' },
          { "userId": 9, "name": "张9",  taOrgVo:{"namePath": "四川省/成都市/成都市人力资源和社会保障局/养老保险处"}, mobile:'13111223344' },
          { "userId": 10, "name": "张10", sex: '1', taOrgVo:{"namePath": "四川省/成都市/成都市人力资源和社会保障局/养老保险处"}, mobile:'13111223344' },
          { "userId": 11, "name": "张11", sex: '0', taOrgVo:{"namePath": "四川省/成都市/成都市人力资源和社会保障局/养老保险处"}, mobile:'13111223344' },
          { "userId": 12, "name": "张12", sex: '', taOrgVo:{"namePath": "四川省/成都市/成都市人力资源和社会保障局/养老保险处"}, mobile:'13111223344' },
        ];
        this.userListData =  arr;
      },
      fnGetUserListResult(data){
        this.result = data;
      }
    }
  }
</script>
