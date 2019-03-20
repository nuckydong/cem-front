<template>
    <div id="app">
        <!-- ta-tree示例 -->
        <div hidden>
            <ta-collapse :bordered="true">
                <ta-collapse-panel header="受控操作示例">
                    <part1></part1>
                </ta-collapse-panel>
                <ta-collapse-panel header="基本用法">
                    <part2></part2>
                </ta-collapse-panel>
                <ta-collapse-panel header="可搜索的树">
                    <part4></part4>
                </ta-collapse-panel>
                <ta-collapse-panel header="异步加载节点">
                    <part3></part3>
                </ta-collapse-panel>
                <ta-collapse-panel header="事件示例">
                    <part5></part5>
                </ta-collapse-panel>
                <ta-collapse-panel header="全选/反选 示例">
                    <part6></part6>
                </ta-collapse-panel>
            </ta-collapse>
        </div>
        <!-- ta-e-tree示例 -->
        <div>
            <ta-collapse :bordered="true">
                <ta-collapse-panel header="基础示例（全选按钮）">
                    <part7></part7>
                </ta-collapse-panel>
                <ta-collapse-panel header="基础示例（属性）">
                    <part8></part8>
                </ta-collapse-panel>
                <ta-collapse-panel header="基础示例（事件及DnD）">
                    <part9></part9>
                </ta-collapse-panel>
            </ta-collapse>
        </div>
    </div>
</template>
<script>

import Part1 from '../demoTree/part/part1'
import Part2 from '../demoTree/part/part2'
import Part3 from '../demoTree/part/part3'
import Part4 from '../demoTree/part/part4'
import Part5 from '../demoTree/part/part5'
import Part6 from '../demoTree/part/part6'
import Part7 from '../demoTree/part/part7'
import Part8 from '../demoTree/part/part8'
import Part9 from '../demoTree/part/part9'

export default {
  name: 'app',
  data () {
    return {}
  },
  components: { Part1, Part2, Part3, Part4, Part5, Part6, Part7, Part8, Part9 },
  methods: {}
}
</script>

<style scoped lang="scss" type="text/scss">
    #app {
        padding: 20px
    }
</style>
