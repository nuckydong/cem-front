<!--ta-e-tree示例-->
<template>
    <div>
        <ta-e-tree :data="data" :props="defaultProps" node-key="ids" show-check-all show-checkbox></ta-e-tree>
        <div>
            <p class="title">在使用show-check-all的时候必须同时提供 show-checkbox、node-key="ids" 两个属性才能正确显示全选按钮及进行相应操作。</p>
            <p class="code-box">&lt;ta-e-tree :data="data" :props="defaultProps" node-key="ids" show-check-all show-checkbox>&lt;/ta-e-tree></p>
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
  }
}
</script>
