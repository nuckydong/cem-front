<!--ta-e-tree示例-->
<template>
    <div>
        <div>
            <div>
                <p class="title">data</p>
                <p class="code-box">传入要展示的数据</p>
                <ta-collapse :bordered="true">
                    <ta-collapse-panel header="展开查看示例（多属性示例）">
                        <ta-e-tree :data="data" highlight-current default-expand-all check-on-click-node show-checkbox :expand-on-click-node="false" check-strictly />
                    </ta-collapse-panel>
                </ta-collapse>
                <p class="tips">上面的示例使用了以下属性：data、highlight-current、 default-expand-all、check-on-click-node、show-checkbox、 expand-on-click-node、check-strictly</p>
            </div>
            <div>
                <p class="title">empty-text</p>
                <p class="code-box">当data为空时显示的默认文本</p>
                <ta-collapse :bordered="true">
                    <ta-collapse-panel header="展开查看示例">
                        <ta-e-tree empty-text="没有任何数据"/>
                    </ta-collapse-panel>
                </ta-collapse>
            </div>
            <div>
                <p class="title">node-key</p>
                <p class="code-box">指定树节点的唯一标识属性（在data中指定，不管是否指定这个属性的值，在渲染时，总会指定一个id作为全局唯一id）。但是，某些属性、方法会依赖此属性。</p>
                <ta-collapse :bordered="true">
                    <ta-collapse-panel header="展开查看示例">
                        <ta-e-tree :data="data" node-key="ids"/>
                    </ta-collapse-panel>
                </ta-collapse>
            </div>
            <div>
                <p class="title">props</p>
                <div class="code-box">
                    {
                    label: string/function(data,node):指定节点标签为节点对象(data)的一个属性值
                    children:string:指定子树为节点对象（data）的一个属性值
                    disabled:boolean/function(data, node):指定节点选择框是否禁用为节点对象(data)的一个属性值
                    isLeaf:boolean, function(data, node):指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
                    }
                </div>
                <ta-collapse :bordered="true">
                    <ta-collapse-panel header="展开查看示例">
                        <ta-e-tree :data="data" :props="defaultProps"/>
                    </ta-collapse-panel>
                </ta-collapse>
            </div>
            <div>
                <p class="title">render-after-expand</p>
                <p class="code-box">是否在第一次展开某个树节点后才渲染其子节点，默认为true</p>
            </div>
            <div>
                <p class="title">load</p>
                <p class="code-box">加载子树数据的方法，仅当 lazy 属性为true 时生效</p>
                <ta-collapse :bordered="true">
                    <ta-collapse-panel header="展开查看示例">
                        <ta-e-tree :load="loadNode1"
                                   :props="props1"
                                   lazy/>
                    </ta-collapse-panel>
                </ta-collapse>
            </div>
            <div>
                <p class="title">lazy</p>
                <p class="code-box">是否懒加载子节点，需与 load 方法结合使用。默认为false</p>
            </div>
            <div>
                <p class="title">render-content</p>
                <p class="code-box">树节点的内容区的渲染 Function</p>
                <p class="tips">这个属性有两种使用方法：回调及slot，推荐使用slot方式进行渲染</p>
                <ta-collapse :bordered="true">
                    <ta-collapse-panel header="展开查看示例">
                        <div class="custom-tree-container">
                            <div class="block">
                                <p>使用 render-content</p>
                                <ta-e-tree :data="data4" :expand-on-click-node="false" :render-content="renderContent" default-expand-all node-key="id" show-checkbox/>
                            </div>
                            <div class="block">
                                <p>使用 scoped slot</p>
                                <ta-e-tree :data="data5" :expand-on-click-node="false" default-expand-all                                        node-key="id" show-checkbox>
                                    <span class="custom-tree-node" slot-scope="{ node, data }">
                                        <span>{{ node.label }}</span>
                                        <span>
                                            <ta-button size="small" type="primary"> Append </ta-button>
                                            <ta-button size="small" type="primary"> Delete </ta-button>
                                        </span>
                                    </span>
                                </ta-e-tree>
                            </div>
                        </div>
                    </ta-collapse-panel>
                </ta-collapse>
            </div>
            <div>
                <p class="title">highlight-current</p>
                <p class="code-box">是否高亮当前选中节点，默认值是 false。</p>
            </div>
            <div>
                <p class="title">default-expand-all</p>
                <p class="code-box">是否默认展开所有节点，默认为false</p>
            </div>
            <div>
                <p class="title">expand-on-click-node</p>
                <p class="code-box">是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。</p>
                <p class="tips">若要设置为false，则需要写为<span class="code-box">:expand-on-click-node="false"</span></p>
            </div>
            <div>
                <p class="title">check-on-click-node</p>
                <p class="code-box">是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。</p>
            </div>
            <div>
                <p class="title">auto-expand-parent</p>
                <p class="code-box">展开子节点的时候是否自动展开父节点</p>
            </div>
            <div>
                <p class="title">default-expanded-keys</p>
                <p class="code-box">默认展开的节点的 key 的数组</p>
                <ta-collapse :bordered="true">
                    <ta-collapse-panel header="展开查看示例">
                        <ta-e-tree :data="data" :default-expanded-keys="defaultExpandedKeys" :default-checked-keys="defaultCheckedKeys" :node-key="'ids'" show-checkbox/>
                    </ta-collapse-panel>
                </ta-collapse>
            </div>
            <div>
                <p class="title">show-checkbox</p>
                <p class="code-box">节点是否可被选择，默认为false</p>
            </div>
            <div>
                <p class="title">check-strictly</p>
                <p class="code-box">在显示复选框的情况下，选中子节点是否相应地选中父节点，默认为 false</p>
            </div>
            <div>
                <p class="title">default-checked-keys</p>
                <p class="code-box">默认勾选的节点的 key 的数组</p>
            </div>
            <div>
                <p class="title">filter-node-method</p>
                <p class="code-box">对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏</p>
                <ta-collapse :bordered="true">
                    <ta-collapse-panel header="展开查看示例">
                        <ta-input
                                placeholder="输入关键字进行过滤"
                                v-model="filterText">
                        </ta-input>

                        <ta-e-tree
                                class="filter-tree"
                                :data="data"
                                :props="defaultProps"
                                default-expand-all
                                :filter-node-method="filterNode"
                                ref="tree2">
                        </ta-e-tree>
                    </ta-collapse-panel>
                </ta-collapse>
            </div>
            <div>
                <p class="title">accordion</p>
                <p class="code-box">是否每次只打开一个同级树节点展开，默认为false</p>
            </div>
            <div>
                <p class="title">indent</p>
                <p class="code-box">相邻级节点间的水平缩进，单位为像素。默认为16px</p>
            </div>
            <div>
                <p class="title">draggable</p>
                <p class="code-box">是否开启拖拽节点功能。默认为false</p>
            </div>
            <div>
                <p class="title">allow-drag</p>
                <p class="code-box">判断节点能否被拖拽</p>
            </div>
            <div>
                <p class="title">allow-drop</p>
                <p class="code-box">拖拽时判定目标节点能否被放置。type 参数有三种情况：'prev'、'inner' 和
                    'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后</p>
            </div>
        </div>
    </div>
</template>
<script>
let id = 1000
const data = [{
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
    ids: 5,
    label: 'd',
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
      label: 'f'
    }]
  }, {
    ids: 12,
    label: '二级 3-2',
    children: [{
      ids: 13,
      label: '三级 3-2-1'
    }]
  }]
}]
export default {
  data () {
    return {
      data: data,
      emptyText: '默认',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      props1: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      data4: JSON.parse(JSON.stringify(data)),
      data5: JSON.parse(JSON.stringify(data)),
      defaultExpandedKeys: ['4', '5'],
      defaultCheckedKeys: ['12'],
      filterText: ''
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    loadNode1 (node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region' }])
      }
      if (node.level > 1) return resolve([])

      setTimeout(() => {
        const data = [{
          name: 'leaf',
          leaf: true
        }, {
          name: 'zone'
        }]

        resolve(data)
      }, 500)
    },
    renderContent (h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <ta-button size="small" type="primary" >Append</ta-button>
            <ta-button size="small" type="primary" >Delete</ta-button>
          </span>
        </span>)
    },
    append (data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  }
}
</script>

<style>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
