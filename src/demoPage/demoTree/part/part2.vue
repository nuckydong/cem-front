<!--ta-tree示例-->
<template>
    <div>
        <div>
            <ta-tree
                    :defaultCheckedKeys="['0-0-0', '0-0-1']"
                    :defaultExpandedKeys="['0-0-0', '0-0-1']"
                    :defaultSelectedKeys="['0-0-0', '0-0-1']"
                    :treeData="treeData"
                    @check="this.onCheck"
                    @select="this.onSelect"
                    checkStrictly
                    checkable
                    draggable
                    showIcon
                    showLine
            >
                <span slot="title0010" style="color: #1890ff">sss</span>
                <!-- 图标样式设置 -->
                <ta-icon slot="smile" type="smile-o"/>
                <ta-icon slot="meh" type="smile-o"/>
                <template slot="custom" slot-scope="{selected}">
                    <ta-icon :type="selected ? 'frown':'frown-o'"/>
                </template>
            </ta-tree>
        </div>
        <div class="box">
            <h3>此示例演示下列属性及事件</h3>
            <div>
                <p class="title">defaultCheckedKeys</p>
                <div class="code-box">（属性）设置默认选中复选框的节点</div>
            </div>
            <div>
                <p class="title">defaultExpandedKeys</p>
                <div class="code-box">（属性）设置默认展开的节点</div>
            </div>
            <div>
                <p class="title">defaultSelectedKeys</p>
                <div class="code-box">（属性）设置默认选中的节点</div>
            </div>
            <div>
                <p class="title">check</p>
                <div class="code-box">（事件）点击复选框触发</div>
            </div>
            <div>
                <p class="title">showIcon</p>
                <div class="code-box">（属性）是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式</div>
            </div>
            <div>
                <p class="title">showLine</p>
                <div class="code-box">（属性）是否展示连接线</div>
            </div>
            <div>
                <p class="title">checkStrictly</p>
                <div class="code-box">（属性）checkable状态下节点选择完全受控（父子节点选中状态不再关联）：默认为false</div>
            </div>
            <div>
                <p class="title">draggable</p>
                <div class="code-box">（属性）设置节点可拖拽：默认为false</div>
            </div>
            <div>
                <p class="title">结点描述数据对象，是 treeNodes 中的一项，TreeNode 使用相同的 API。</p>
                <div class="code-box">
                    {
                        class: 节点的class
                        style: 节点的样式
                        disableCheckbox: 禁用checkbox
                        disable: 禁用节点响应
                        icon: 自定义图标。可接收组件，props为当前节点的props
                        isLeaf: 设置为叶子节点（设置了loadData时有效）
                        key: 被树的 (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys 属性所用。注意：整个树范围内的所有节点的 key 值不能重复！
                        selectable: 设置节点是否可被选中
                        title: 标题
                        slots: 使用treeNodes时，可以通过该属性配置支持slot的属性，如 slots: { title: 'XXX'}
                        scopedSlots: 使用columns时，可以通过该属性配置支持slot-scope的属性，如 scopedSlots: { title: 'XXX'}
                        on: 事件对象，仅在treeNodes使用方式中生效，如{click: () => {}}
                    }
                </div>
            </div>
        </div>
        <div class="box">
            <ta-directory-tree
                    multiple
                    defaultExpandAll
                    @select="onSelect"
                    @expand="onExpand"
            >
                <ta-tree-node title="parent 0" key="0-0">
                    <ta-tree-node title="leaf 0-0" key="0-0-0" isLeaf ></ta-tree-node>
                    <ta-tree-node title="leaf 0-1" key="0-0-1" isLeaf ></ta-tree-node>
                </ta-tree-node>
                <ta-tree-node title="parent 1" key="0-1">
                    <ta-tree-node title="leaf 1-0" key="0-1-0" isLeaf ></ta-tree-node>
                    <ta-tree-node title="leaf 1-1" key="0-1-1" isLeaf ></ta-tree-node>
                </ta-tree-node>
            </ta-directory-tree>
            <div>
                <div>
                    <p class="title">multiple</p>
                    <p>multiple：默认为false； 支持 ctrl(Windows) / command(Mac) 复选。</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  const treeData = [{
    title: 'parent 1',
    key: '0-0',
    slot: { icon: 'custom' },
    children: [{
      title: 'parent 1-0',
      key: '0-0-0',
      disabled: true,
      children: [
        { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
        { title: 'leaf', key: '0-0-0-1', slot: { icon: 'meh' } }
      ]
    }, {
      title: 'parent 1-1',
      key: '0-0-1',
      children: [
        { key: '0-0-1-0', slots: { title: 'title0010', icon: 'smile' } }
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
      onSelect (selectedKeys, info) {
        console.log('selected', selectedKeys, info)
      },
      onCheck (checkedKeys, info) {
        console.log('onCheck', checkedKeys, info)
      }
    }
  }

</script>
