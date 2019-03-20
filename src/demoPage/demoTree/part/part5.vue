<!--ta-tree示例-->
<template>
    <ta-tree
            :treeData="treeData"
            @check="this.onCheck"
            @dragEnd="this.onDragEnd"
            @dragEnter="this.onDragEnter"
            @dragLeave="this.onDragLeave"
            @dragOver="this.onDragOver"
            @dragStart="this.onDragStart"
            @drop="this.onDrop"
            @expand="this.onExpand"
            @load="this.onLoad"
            @rightClick="this.onRightClick"
            @select="this.onSelect"
            checkable
            draggable
    >
        <span slot="title0010" style="color: #1890ff">sss</span>
    </ta-tree>
</template>
<script>
  const treeData = [{
    title: 'parent 1',
    key: '0-0',
    children: [{
      title: 'parent 1-0',
      key: '0-0-0',
      children: [
        { title: 'leaf', key: '0-0-0-0' },
        { title: 'leaf', key: '0-0-0-1' }
      ]
    }, {
      title: 'parent 1-1',
      key: '0-0-1',
      children: [
        { key: '0-0-1-0', title: '0-0-1-0' }
      ]
    }]
  }]

  export default {
    data () {
      return {
        treeData
      }
    },
    methods: {
      /**
       * 点击树节点触发
       * @param selectedKeys
       * @param info：{selected: bool, selectedNodes, node, event}
       */
      onSelect (selectedKeys, info) {
        console.log('selected', selectedKeys, info)
      },
      /**
       * 点击复选框触发
       * @param checkedKeys：
       * @param info：{checked: bool, checkedNodes, node, event}
       */
      onCheck (checkedKeys, info) {
        console.log('onCheck', checkedKeys, info)
      },
      /**
       * dragend 触发时调用
       * @param info：{event, node}
       */
      onDragEnd (info) {
        console.log('dragEnd',info)
      },
      /**
       * dragenter事件触发时调用
       * @param info：{event, node}
       */
      onDragEnter (info) {
        console.log('dragEnter',info)
      },
      /**
       * dragleave事件触发时调用
       * @param info：{event, node}
       */
      onDragLeave (info) {
        console.log('dragLeave',info)
      },
      /**
       * dragover事件触发时调用
       * @param info：{event, node}
       */
      onDragOver (info) {
        console.log('dragOver',info)
      },
      /**
       * dragstart事件触发时调用
       * @param info：{event, node}
       */
      onDragStart (info) {
        console.log('dragStart',info)
      },
      /**
       * drop事件触发时调用
       * @param info：{event, node, dragNode, dragNodesKeys}
       */
      onDrop (info) {
        console.log('drop',info)
      },
      /**
       * 展开/收起节点时触发
       * @param expandedKeys：
       * @param info：{expanded: bool, node}
       */
      onExpand (expandedKeys,info) {
        console.log('expand',info)
      },
      /**
       * 节点加载完毕时触发，使用loadData的时候生效
       * @param info：{event, node}
       */
      onLoad (info) {
        console.log('load',info)
      },
      /**
       * 响应右键点击，可生成右键上下文菜单
       * @param info：{event, node}
       */
      onRightClick (info) {
        console.log('contextMenu',info)
      }
    }
  }

</script>
