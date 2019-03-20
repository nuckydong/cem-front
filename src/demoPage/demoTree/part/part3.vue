<!--ta-tree示例-->
<template>
    <div>
        <div>
            <h2>异步加载子节点</h2>
            <ta-tree
                    :loadData="onLoadData"
                    :treeData="treeData"
                    @load="this.onLoad"
            />
        </div>
        <div>
            <h2>异步加载树所有节点</h2>
            <ta-button @click="fnAsyncData">加载</ta-button>
            <ta-tree :expandedKeys="expanded"
                     :treeData="treeData1"/>
        </div>
        <div class="box">
            <div>
                <p class="title">expandedKeys(.sync)</p>
                <div class="code-box">（受控属性）展开指定的树节点：设置之后可能会导致无法通过点击展开节点</div>
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
        treeData: [
          { title: 'Expand to load', key: '0' },
          { title: 'Expand to load', key: '1' },
          { title: 'Tree Node', key: '2', isLeaf: true }
        ],
        treeData1: [],
        expanded: []
      }
    },
    methods: {
      onLoadData (treeNode) {
        return new Promise((resolve) => {
          if (treeNode.dataRef.children) {
            resolve()
            return
          }
          setTimeout(() => {
            treeNode.dataRef.children = [
              { title: 'Child Node', key: `${treeNode.eventKey}-0` },
              { title: 'Child Node', key: `${treeNode.eventKey}-1` }
            ]
            this.treeData = [...this.treeData]
            resolve()
          }, 1000)
        })
      },
      fnAsyncData () {
        this.treeData1 = treeData
        this.expanded = ['0-0', '0-0-0']
      },
      onLoad (info) {
        console.log('load')
        console.log(info)
      },
    }
  }
</script>
