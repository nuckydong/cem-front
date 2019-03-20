<!--ta-tree示例-->
<template>
    <div>
        <div class="box">
            <ta-tree
                    :autoExpandParent="autoExpandParent"
                    :expandedKeys="expandedKeys"
                    :selectedKeys="selectedKeys"
                    :treeData="treeData"
                    @expand="onExpand"
                    @select="onSelect"
                    checkable
                    v-model="checkedKeys"
            />
        </div>
        <div class="box">
            <h3>此示例演示下列属性及事件</h3>
            <div>
                <p class="title">autoExpandParent</p>
                <div class="code-box">（属性）是否自动展开父节点：默认为true</div>
            </div>
            <div>
                <p class="title">expandedKeys</p>
                <div class="code-box">（受控属性）展开指定的树节点</div>
            </div>
            <div>
                <p class="title">selectedKeys</p>
                <div class="code-box">（受控属性）设置当前选中的树节点</div>
            </div>
            <div>
                <p class="title">treeData</p>
                <div class="code-box">（属性）节点的配置描述</div>
            </div>
            <div>
                <p class="title">expand</p>
                <div class="code-box">（事件）展开/收起节点时触发</div>
            </div>
            <div>
                <p class="title">select</p>
                <div class="code-box">（事件）点击树节点触发</div>
            </div>
            <div>
                <p class="title">checkable</p>
                <div class="code-box">（属性）节点前添加 Checkbox 复选框：默认为false</div>
            </div>
            <div>
                <p class="title">checkedKeys(v-model)</p>
                <div class="code-box">
                    （受控属性）选中复选框的树节点（注意：父子节点有关联，如果传入父节点key，则子节点自动选中；相应当子节点key都传入，父节点也自动选中。当设置checkable和checkStrictly，它是一个有checked和halfChecked属性的对象，并且父子节点的选中与否不再关联
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  const treeData = [{
    title: '0-0',
    key: '0-0',
    children: [{
      title: '0-0-0',
      key: '0-0-0',
      children: [
        { title: '0-0-0-0', key: '0-0-0-0' },
        { title: '0-0-0-1', key: '0-0-0-1' },
        { title: '0-0-0-2', key: '0-0-0-2' }
      ]
    }, {
      title: '0-0-1',
      key: '0-0-1',
      children: [
        { title: '0-0-1-0', key: '0-0-1-0' },
        { title: '0-0-1-1', key: '0-0-1-1' },
        { title: '0-0-1-2', key: '0-0-1-2' }
      ]
    }, {
      title: '0-0-2',
      key: '0-0-2'
    }]
  }, {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' }
    ]
  }, {
    title: '0-2',
    key: '0-2'
  }]

  export default {
    data () {
      return {
        expandedKeys: ['0-0-0', '0-0-1'],
        autoExpandParent: true,
        checkedKeys: ['0-0-0'],
        selectedKeys: [],
        treeData
      }
    },
    watch: {
      checkedKeys (val) {
        console.log('onCheck', val)
      }
    },
    methods: {
      onExpand (expandedKeys) {
        console.log('onExpand', expandedKeys)
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.expandedKeys = expandedKeys
        this.autoExpandParent = false
      },
      onCheck (checkedKeys) {
        console.log('onCheck', checkedKeys)
        this.checkedKeys = checkedKeys
      },
      onSelect (selectedKeys, info) {
        console.log('onSelect', info)
        this.selectedKeys = selectedKeys
      }
    }
  }

</script>
