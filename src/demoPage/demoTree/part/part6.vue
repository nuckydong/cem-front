<!--ta-tree示例-->
<template>
    <div>
        <ta-tree
                :treeData="treeData"
                checkable
                defaultExpandAll
                showCheckAll
        >
        </ta-tree>
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
    data() {
      return {
        treeData: treeData,
      }
    },
    methods: {
    },
  }

</script>
