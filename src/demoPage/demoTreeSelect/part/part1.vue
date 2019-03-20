<template>
  <div>
    <div class="title">注意事项</div>
    <p></p>
    <p class="title"><span class="code-box">:defaultValue="defaultValue"</span>与<span class="code-box">:value="selectedValue"</span>不能同时使用。</p>
    <p class="title"><span class="code-box">dropdownClassName="dropdown-class-tree-select"</span></p>
    <p class="title"><span class="code-box">:getPopupContainer="triggerNode => triggerNode.parentNode"</span></p>
    <p class="title"><span class="code-box">:showCheckedStrategy="TreeSelect.SHOW_ALL"</span> 控制在checkable状态下选中的节点回填到已选择节点显示框中的方式：SHOW_ALL：若选择了所有子节点，则将显示父节点及所有子节点；SHOW_PARENT：若选择了所有子节点，则显示其父节点；SHOW_CHILD：默认，若选择了所有子节点，则显示所有选中的子节点</p>
    <p class="title">:treeDefaultExpandedKeys="['0-0']" 测试无作用</p>
    <p class="title">treeNodeLabelProp="'value'" 测试无作用</p>
    <p class="title"><span class="code-box">treeNodeFilterProp="'key'"</span>若已提供自定义实现的搜索回调filterTreeNode则以提供的回调进行过滤判断，否则以此属性提供的值进行过滤</p>
    <p class="title">change事件及select事件触发顺序</p>
    <p>select事件优先于change事件触发</p>
    <p class="title">change事件扩展</p>
    <p>对change事件的参数extra进行了扩展，在extra中增加了从根节点到当前选中节点的路径</p>
    <p>可点击上面的demo查看下方的两个值有何不同</p>
    选中的节点：<p class="code-box">{{currentNodeLabel}}</p>
    选中的节点及其路径：<p class="code-box">{{fromRootNodeLabel}}</p>
    参数名称:<div class="code-box"> console.log(extra.triggerLabelFromRootToSelected); // /root/sub node1/.../selected node</div>
    <div>
      <p class="title">其他属性</p>
      <p class="title">allowClear</p>
      显示清空选择按钮
      <p class="title">disabled</p>
      是否禁用
      <p class="title">dropdownClassName</p>
      设置下拉菜单的css class属性
      <p class="title">dropdownMatchSelectWidth</p>
      下拉菜单和选择器等宽
      <p class="title">dropdownStyle</p>
      自定义下拉菜单的样式
      <p class="title">labelInValue</p>
      是否将label包装到value中，会影响change等事件的value值，变为{value: string, label: VNode, halfChecked(treeCheckStrictly 时有效): string[] }格式
      <p class="title">loadData</p>
      异步加载数据
      <p class="title">multiple</p>
      支持多选（设置treeCheckabel时默认为true）
      <p class="title">placeholder</p>
      选择框默认文字
      <p class="title">searchPlaceholder</p>
      搜索框默认文字
      <p class="title">showSearch</p>
      在下拉菜单中显示搜索框（仅单选模式）
      <p class="title">size</p>
      设置选择框大小：'small' 或 'large' 或 'default'
      <p class="title">treeCheckable</p>
      是否可以多选
      <p class="title">treeCheckStrictly</p>
      设置父子节点选中状态是否关联，会强制labelInValue为true
      <p class="title">treeData</p>
      设置树的节点数据
      <p class="title">treeDataSimpleMode</p>
      使用简单格式的 treeData(此时 treeData 应变为这样的数据结构: [{id:1, pId:0, value:'1', label:"test1",...},...], pId 是父节点的 id)，若不设置，则为false
      <p class="title">treeDefaultExpandAll</p>
      节点默认完全展开
      <p class="title">treeDefaultExpandedKeys</p>
      默认展开的节点
      <p class="title">treeNodeFilterProp</p>
      搜索框中输入时，过滤treeNode的对应属性
      <p class="title">treeNodeLabelProp</p>
      作为显示的treeNode的对应值

    </div>

  </div>
</template>

<script>
  export default {
    props:['currentNodeLabel','fromRootNodeLabel'],
    data () {
      return {
      }
    },
    methods: {

    },
  }
</script>
<style scoped lang="scss"  type="text/scss">
</style>
