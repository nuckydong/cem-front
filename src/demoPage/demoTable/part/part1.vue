<template>
  <div>
    <div class="title">Table的属性说明</div>
    <div>
      <p class="title">customCell(record) customHeaderCell(column)可以使用下面的代码格式进行设置(需要在Column定义上声明)</p>
      <div v-text="codeCustomCell" class="code-box">
      </div>
    </div>
    <div>
      <div class="title">bordered</div>
      <p>是否显示表格的边框</p>
    </div>
    <div>
      <div class="title"> childrenColumnName</div>
      <p>指定在传入的数据中若存在树形结构的数据时，此树形结构的数据在dataSource中的key。示例：</p>
      标签：
      <div class="code-box">
        &lt;ta-table :columns="columns" :dataSource="data" :childrenColumnName="'<span class="strict">child</span>'"/&gt;
      </div>
      传入的数据：
      <div class="code-box">
        {
        line: '1',
        firstName: 'John',
        lastName: 'Brown',
        money: '￥300,000.00',
        address: 'New York No. 1 Lake Park',
        <span class="strict">child</span>:[{
        line: '11',
        firstName: 'John11',
        lastName: 'Brown11',
        money: '￥1,256,000.00',
        address: 'London No. 1 Lake Park'
        }]
        }
      </div>
    </div>
    <div>
      <p class="title">components</p>
      <ta-alert message="components实现了自定义Table的接口，用于覆盖默认的table代码。" type="success" />
      <p>需要传入下面这个接口的JSON对象，?表示这个属性可以不写</p>
      <div class="code-box">
        export interface TableComponents {
        table?: any;
        header?: {
        wrapper?: any;
        row?: any;
        cell?: any;
        };
        body?: {
        wrapper?: any;
        row?: any;
        cell?: any;
        };
        }
      </div>
      <p>实际上，这个属性会在生成html的时候直接替换Table默认生成的元素，比如，如下两个代码：</p>
      <p class="title">默认生成的代码</p>
      <div class="code-box">
        &lt;th key="name" class="">&lt;span>Name&lt;/span>&lt;/th>
      </div>
      <p class="title">使用components属性替换之后的代码</p>
      <div class="code-box">
        {
        header: {
        cell: '<span class="strict">div</span>'
        }
        }
      </div>
      <div class="code-box">
        &lt;<span class="strict">div</span> key="name" class="">&lt;span>Name&lt;/span>&lt;/<span class="strict">div</span>>
      </div>
      <ta-alert message="通过此属性实现表格拖拽示例：https://github.com/ant-design/ant-design/blob/master/components/table/demo/drag-sorting.md" type="success" />
    </div>
    <div>
      <p class="title">dataSource</p>
      <p>@yh/ta404-ui：版本0.1.35之后，对此属性的设置实现了一个监听，可实现异步设置数据时的defaultExpandAllRows属性可工作</p>
    </div>
    <div>
      <p class="title">defaultExpandAllRows</p>
      <p>@yh/ta404-ui v0.1.35及以上版本支持异步数据的默认展开</p>
    </div>
    <div>
      <p class="title">defaultExpandedRowKeys</p>
      <p>默认需要展开的行</p>
    </div>
    <div>
      <p class="title">expandedRowKeys</p>
      <p>控制属性：动态设置展开的行（无法收起）</p>
    </div>
    <div>
      <p class="title">expandedRowRender</p>
      <p>渲染行数据，点击展开后显示更多内容（与树状数据不同）</p>
      <div class="code-box">
        :expandedRowRender="fnExpandedRowRender"

        fnExpandedRowRender(record,index,indent,expanded){
        return "当前行数据的扩展数据";
        }
      </div>
    </div>
    <div>
      <p class="title">expandRowByClick</p>
      <p>点击行以展开</p>
      <p>设置此属性后，会导致树形结构数据不显示前边的可展开图标</p>
    </div>
    <div>
      <p class="title">footer</p>
      <p>表格尾部</p>
      <div class="code-box">
        &lt;ta-table :columns="columns" <span class="strict">:footer="fnCustomFooter"</span> :dataSource="data"/&gt;
      </div>
      回调方法：回调方法参数代表当前表格页的数据，应返回一个字符串。
      <div class="code-box">
        fnCustomFooter () {
        return '表格尾部'
        }
      </div>
    </div>
    <div>
      <p class="title">indentSize</p>
      <p>树状表格数据，子项相对于父项的缩进</p>
    </div>
    <div>
      <p class="title">loading</p>
      <p>显示表格加载状态</p>
    </div>
    <div>
      <p class="title">locale</p>
      <p>默认文案设置，目前包括排序、过滤、空数据文案</p>
    </div>
    <div>
      <p class="title">pagination</p>
      <p>分页器，参考Pagination，设为 false 时不展示和进行分页</p>
      <p>position:指定分页显示的位置 'top' | 'bottom'(默认) | 'both'</p>
    </div>
    <div>
      <p class="title">rowClassName</p>
      <p>指定每一行的css class</p>
      <div class="code-box">
        fnRowClassName (record, index) {
        return 'table-row-class-' + index
        }
      </div>
    </div>
    <div>
      <p class="title">rowKey</p>
      <p>自定义数据中的唯一标志。默认为key</p>
      <p>可写为下面3种写法的任意一种</p>
      <p class="code-box">rowKey='uid'</p>
      <p class="code-box">:rowKey='{record => record.uid}'</p>
      <div class="code-box">
        <p>:rowKey='fnSetRowKey'</p>
        <p>fnSetRowKey: record => record.uid</p>
      </div>
    </div>
    <div>
      <p class="title">rowSelection</p>
      <p>列表项是否可选择</p>
      <div class="code-box">
        <p>标签：</p>
        <p>:rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"</p>
        <p>可接受的参数：</p>
        <p>
          {
          columnWidth: string|number //自定义列表选择框宽度
          columnTitle: string|VNode //自定义列表选择框标题
          fixed: boolean//把选择框列固定在左边
          getCheckboxProps: Function(record) // 选择框的默认属性配置
          hideDefaultSelections: boolean(default:false) // 去掉『全选』『反选』两个默认选项
          selectedRowKeys: string[](default:[])// 指定选中项的 key 数组，需要和 onChange 进行配合
          selections:object[]|boolean(default:true) // 自定义选择配置项, 设为 true 时使用默认选择项
          type: 'checkbox'|'radio' // 多选/单选，
          onChange: Function(selectedRowKeys, selectedRows) // 选中项发生变化时的回调
          onSelect: Function(record, selected, selectedRows, nativeEvent) // 用户手动选择/取消选择某列的回调
          onSelectAll : Function(selected, selectedRows, changeRows) //用户手动选择/取消选择所有列的回调
          onSelectInvert: Function(selectedRows) //用户手动选择反选的回调
          }
        </p>
      </div>
    </div>
    <div>
      <p class="title">scroll</p>
      <p>
        设置横向或纵向滚动，也可用于指定滚动区域的宽和高，建议为 x 设置一个数字，如果要设置为 true，需要配合样式 <span class="code-box">.ant-table td { white-space: nowrap; }</span>
      </p>
      <p class="code-box">:scroll="{ x:1,y:1 }"</p>
    </div>
    <div>
      <p class="title">showHeader</p>
      <p class="code-box">是否显示表头(默认为true)</p>
    </div>
    <div>
      <p class="title">size</p>
      <p class="code-box">正常或迷你类型，default 或 small。设定之后影响表格行高度。</p>
    </div>
    <div>
      <p class="title">title</p>
      标签：
      <div class="code-box">
        &lt;ta-table :columns="columns" <span class="strict">:title="fnCustomTitle"</span> :dataSource="data"/&gt;
      </div>
      回调方法：回调方法参数代表当前表格页的数据，应返回一个字符串。
      <div class="code-box">
        fnCustomTitle(currentPageData){
        &#9;return "表格头部信息";
        }
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {
      codeCustomCell: '{' +
        '        title: \'First Name\',' +
        '        className: \'first-name\',' +
        '        dataIndex: \'firstName\',' +
        '        customCell: record=>{' +
        '        return record;' +
        '        },' +
        '        customHeaderCell:(column)=>{' +
        '        return column' +
        '        }' +
        '        }'
    }
  },
  methods: {}
}
</script>
<style scoped lang="scss" type="text/scss">
  .strict {
    font-weight: bold;
  }
</style>
