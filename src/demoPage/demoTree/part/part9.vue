<!--ta-e-tree示例-->
<template>
    <div>
        <ta-e-tree :data="data" @node-click="fnNodeClick" @node-contextmenu="fnNodeContextMenu" @check-change="fnCheckChange" @check="fnCheck" @current-change="fnCurrentChange" @node-expand="fnNodeExpand" @node-collapse="fnNodeCollapse" @node-drag-start="fnNodeDragStart" @node-drag-enter="fnNodeDragEnter" @node-drag-leave="fnNodeDragLeave" @node-drag-over="fnNodeDragOver" @node-drag-end="fnNodeDragEnd" @node-drop="fnNodeDrop" show-checkbox draggable :allow-drag="fnAllowDrag"></ta-e-tree>
        <div>
            <div>
                <p class="tips">
                    使用拖拽功能需要draggable属性，并且可以提供allow-drag回调以控制是否可以拖拽
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      data: [{
        ids: 1,
        label: '一级 1',
        children: [{
          ids: 2,
          label: '二级 1-1',
          children: [{
            ids: 3,
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        ids: 4,
        children: [{
          label: '二级 2-1',
          ids: 5,
          children: [{
            ids: 6,
            label: '三级 2-1-1'
          }]
        }, {
          ids: 7,
          label: '二级 2-2',
          children: [{
            ids: 8,
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        ids: 9,
        children: [{
          label: '二级 3-1',
          ids: 10,
          children: [{
            ids: 11,
            label: '三级 3-1-1'
          }]
        }, {
          ids: 12,
          label: '二级 3-2',
          children: [{
            ids: 13,
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    /**
     * 节点被点击时调用
     * @param data data数组中表示该节点的对象
     * @param node 当前节点
     * @param nodeComponent 节点组件本身
     */
    fnNodeClick (data, node, nodeComponent) {
      console.log('node-click')
      console.log(data)
      console.log(node)
      console.log(nodeComponent)
    },
    /**
     * 当一个节点触发鼠标右键事件时，可使用此事件生成上下文菜单
     * @param e 事件
     * @param data data数组中表示该节点的对象
     * @param node 当前节点
     * @param nodeComponent 节点组件本身
     */
    fnNodeContextMenu (e, data, node, nodeComponent) {
      console.log('node-contextmenu')
      console.log(e)
      console.log(data)
      console.log(node)
      console.log(nodeComponent)
    },
    /**
     * 节点选中状态发生变化时的回调
     * @param data data数组中表示该节点的对象
     * @param isChecked 当前节点是否被选中
     * @param hasCheckedNodeInChild 子树中是否有被选中的节点
     */
    fnCheckChange (data, isChecked, hasCheckedNodeInChild) {
      console.log('check-change')
      console.log(data)
      console.log(isChecked)
      console.log(hasCheckedNodeInChild)
    },
    /**
     * 当复选框被点击时触发
     * @param data data数组中表示该节点的对象
     * @param checkedStatus 树目前的选中状态，包括checkedNodes,checkedKeys,halfCheckedNodes,halfCheckedKeys
     */
    fnCheck (data, checkedStatus) {
      console.log('check')
      console.log(data)
      console.log(checkedStatus)
    },
    /**
     * 当前选中节点变化时的回调
     * @param data 当前节点的数据
     * @param node 当前节点的Node对象
     */
    fnCurrentChange (data, node) {
      console.log('current-change')
      console.log(data)
      console.log(node)
    },
    /**
     * 节点被展开时触发的事件
     * @param data data数组中表示该节点的对象
     * @param node 当前节点
     * @param nodeComponent 节点组件本身
     */
    fnNodeExpand (data, node, nodeComponent) {
      console.log('node-expand')
      console.log(data)
      console.log(node)
      console.log(nodeComponent)
    },
    /**
     * 节点被关闭/收起时触发的事件
     * @param data data数组中表示该节点的对象
     * @param node 当前节点
     * @param nodeComponent 节点组件本身
     */
    fnNodeCollapse (data, node, nodeComponent) {
      console.log('node-collapse')
      console.log(data)
      console.log(node)
      console.log(nodeComponent)
    },
    /**
     * 节点开始拖拽时触发的事件
     * @param node 被拖拽的节点对应的Node
     * @param e 事件
     */
    fnNodeDragStart (node, e) {
      console.log('node-drag-start')
      console.log(node)
      console.log(e)
    },
    /**
     * 拖拽节点进入其他节点时触发
     * @param src 被拖拽的节点对应的Node
     * @param target 进入的节点对应的Node
     * @param e 事件
     */
    fnNodeDragEnter (src, target, e) {
      console.log('node-drag-enter')
      console.log(src)
      console.log(target)
      console.log(e)
    },
    /**
     * 拖拽节点离开某个节点时触发
     * @param src 被拖拽的节点对应的Node
     * @param target 离开的节点对应的Node
     * @param e 事件
     */
    fnNodeDragLeave (src, target, e) {
      console.log('node-drag-leave')
      console.log(src)
      console.log(target)
      console.log(e)
    },
    /**
     * 拖拽节点时触发(类似浏览器的mouseover事件)
     * @param src 被拖拽的节点对应的Node
     * @param target 当前进入节点对应的Node
     * @param e 事件
     */
    fnNodeDragOver (src, target, e) {
      console.log('node-drag-over')
      console.log(src)
      console.log(target)
      console.log(e)
    },
    /**
     * 拖拽结束时(可能未成功)触发的事件
     * @param src 被拖拽的节点对应的Node
     * @param target 结束拖拽时最后进入的节点(可能为空)
     * @param targetPosition 当被拖拽节点的放置位置(before,after,inner)
     * @param e 事件
     */
    fnNodeDragEnd (src, target, targetPosition, e) {
      console.log('node-drag-end')
      console.log(src)
      console.log(target)
      console.log(targetPosition)
      console.log(e)
    },
    /**
     * 拖拽成功完成时触发的事件
     * @param src 被拖拽的节点对应的Node
     * @param target 结束拖拽时最后进入的节点
     * @param targetPosition 当被拖拽节点的放置位置(before,after,inner)
     * @param e 事件
     */
    fnNodeDrop (src, target, targetPosition, e) {
      console.log('node-drop')
      console.log(src)
      console.log(target)
      console.log(targetPosition)
      console.log(e)
    },
    fnAllowDrag (node) {
      console.log('allow-drag')
      return true
    }
  }
}
</script>
