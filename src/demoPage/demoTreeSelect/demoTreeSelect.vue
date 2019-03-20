<template>
  <div id="app">
    <div class="box">
      <h2>展示ta-tree-select的属性及事件</h2>
      <ta-tree-select
        :dropdownStyle="{ maxHeight: '400px', overflow: 'auto'}"
        :filterTreeNode="fnFilterTreeNode"
        :showCheckedStrategy="checkedStrategy"
        :treeData="treeData"
        @change="fnTreeSelectChange"
        @search="fnTreeSelectSearch"
        @select="fnTreeSelectSelect"
        placeholder='Please select'
        searchPlaceholder="input to search"
        showSearch
        style="width: 300px"
        size="large"
        treeCheckable
        treeCheckStrictly
      >
      </ta-tree-select>
      <div class="box">
        <part1 :currentNodeLabel="currentNodeLabel" :fromRootNodeLabel="fromRootNodeLabel"></part1>
      </div>
    </div>
    <div class="box">
      <h2>异步加载ta-tree-select</h2>
      <ta-tree-select
        :dropdownStyle="{ maxHeight: '400px', overflow: 'auto'}"
        :loadData="fnLoadData"
        :treeData="treeData"
        :value="treeSelectValue1"
        placeholder='Please select'
        style="width: 300px"
        treeDefaultExpandAll
        treeCheckable
      >
      </ta-tree-select>
      <div>
      </div>
    </div>
  </div>
</template>
<script>

import part1 from './part/part1'

const treeData = [{
  label: 'Node1',
  value: '0-0',
  key: '0-0',
  ff: 'n1',
  children: [{
    value: '0-0-1',
    key: '0-0-1',
    ff: 'n11',
    label: 'Child Node1',
    isLeaf: true
  }, {
    label: 'Child Node2',
    ff: 'n12',
    value: '0-0-2',
    key: '0-0-2'
  }]
}, {
  label: 'Node2',
  value: '0-1',
  key: '0-1',
  ff: 'n2',
  children: [{
    value: '0-1-1',
    key: '0-1-1',
    ff: 'n21',
    label: 'Child Node3'
  }, {
    label: 'Child Node4',
    value: '0-1-2',
    ff: 'n22',
    key: '0-1-2'
  }]
}]
export default {
  name: 'app',
  data () {
    return {
      treeSelectValue: undefined,
      treeSelectValue1: undefined,
      treeSelectValue2: undefined,
      treeData,
      defaultValue: ['0-0-1'],
      checkedStrategy: TreeSelect.SHOW_ALL,
      fromRootNodeLabel: '',
      currentNodeLabel: '',
      defaultExpandKeys: ['0-0', '0-0-1', '0-0-2'],
      allowClear: false
    }
  },
  components: { part1 },
  methods: {
    /**
       * 当选中节点时触发事件
       * @param value
       * @param label
       * @param extra
       */
    fnTreeSelectChange (value, label, extra) {
      console.log('change')
      console.log(value)
      console.log(label)

      console.log(extra)
      this.treeSelectValue = value
      this.currentNodeLabel = label
      this.fromRootNodeLabel = extra.triggerLabelFromRootToSelected === undefined ? 'NaN' : extra.triggerLabelFromRootToSelected
    },
    fnTreeSelectChange1 (value, label, extra) {
      console.log('change1')
      console.log(value)
      console.log(label)
      console.log(extra)
      this.treeSelectValue = value.toString()
    },
    /**
       * 当点击节点的时候触发
       * @param value
       * @param label
       * @param extra
       */
    fnTreeSelectSelect (value, label, extra) {
      console.log('select')
      console.log(value)
      console.log(label)
      console.log(extra)
    },
    /**
       * 在search框中搜索的时候触发
       * 仅在showSearch属性为true的时候触发
       * @param value
       */
    fnTreeSelectSearch (value) {
      console.log(value)
    },
    fnFilterTreeNode (input, node) {
      return node.componentOptions.propsData.title.indexOf(input) !== -1
    },
    fnLoadData (node) {
      return new Promise((resolve, reject) => {
        reject()
      }).catch(e => {
        // console.error(e)
      })
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  #app {
    padding: 20px
  }
</style>
