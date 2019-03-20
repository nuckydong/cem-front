<template>
  <div id="tree">
    <ta-e-tree :data="eTreeData" highlight-current ref="tree" node-key="key" show-checkbox :props="defaultProps" @node-click="click"/>
    <ta-e-tree :load="loadNode1" highlight-current show-checkbox :props="defaultProps1" @node-click="click" lazy/>
  </div>
</template>
<script>
  const treeData1 = [
      {
          key: '1',
          value: '开发管理',
          child: [
              {key: '1_1', value: '菜单管理'},
              {key: '1_2', value: 'part1'},
              {key: '1_3', value: 'part2'},
              {key: '1_4', value: '字典管理'},
              {key: '1_5', value: '超级管理员管理'},
              {key: '1_6', value: '缓存管理'},
              {key: '1_7', value: '接入系统管理'},
              {key: '1_9', value: '登陆日志统计'},
              {key: '1_8', value: '人员管理'},
              {key: '1_10', value: '自定义资源管理'},
              {key: '10_11', value: '用户信息可管理字段'}]
      },
      {key: '2', value: '简单模块示例', child: []},
      {key: '3', value: '管理员人员管理', child: []}];
  const eTreeData = treeData1;
  export default {
      data () {
          return {
              eTreeData,
              defaultProps: {
                  children: 'child', // 指定json数组中，子节点的key，默认：children
                  label: 'value', // 指定json数组中，当前节点在页面上显示的文本的key，默认：label
                  id: 'key', // 指定json数组中节点的唯一标识，默认：id，必须与node-key属性指定的值一致
                  isLeaf: 'leaf'
              },
              defaultProps1: {
                  label: 'name', // 指定json数组中，当前节点在页面上显示的文本的key，默认：label
                  isLeaf: 'leaf',
                  children: 'zones'
              }
          };
      },
      methods: {
          click (data, node, self) {
              console.log(data);
              console.log(node);
              console.log(self);
          },
          loadNode1 (node, resolve) {
              if (node.level === 0) {
                  return resolve([{ name: 'region' }]);
              }
              if (node.level > 1) return resolve([]);

              setTimeout(() => {
                  const data = [{
                      name: 'leaf',
                      leaf: true
                  }, {
                      name: 'zone'
                  }];

                  resolve(data);
              }, 500);
          }
      }
  };
</script>

<style scoped lang="scss" type="text/scss">
  #tree {
    padding: 20px
  }
</style>
