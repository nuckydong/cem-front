<template>
  <div>
    <!--isShow:是否展示抽屉-->
    <!--title:抽屉标题-->
    <!--width:抽屉宽度,默认500-->
    <!--@close:抽屉关闭时触发-->

    <!--data:需要展示的数据,需要是一个数组,每个元素的属性如下:-->
    <!--label:需要展示的标签名称-->
    <!--value:需要展示的值-->
    <!--type:暂支持如下几种:-->
    <!--text:输入框,默认-->
    <!--codeTable:码表,需要指定dictType字段-->
    <!--desc:描述内容,例如组织路径,或者描述等字段内容较长信息-->
    <!--boolean:以开关的方式进行展示,值必须是true或者fase-->
    <!--date:日期,格式化成日期形式展示-->
    <!--img:图片形式,value需要指定加载的绝对路径url-->
    <ta-drawer destroyOnClose
               centered
               :visible="isShow"
               :width="width"
               @close="fnCloseDrawer"
               :title="drawerTitle">
      <ta-form :autoFormCreate="(form)=>{this.form = form}">
        <ta-form-item v-for="item in data"
                      :key="item.label"
                      :label='item.label'
                      :labelCol="formItemLayout.labelCol"
                      :wrapperCol="formItemLayout.wrapperCol">
          <span v-if="!item.type || item.type == 'text'">
            <span v-if="item.value">
              <ta-input :value="item.value" disabled/>
            </span>
            <span v-else>
              --
            </span>
          </span>
          <span v-else-if="item.type == 'codeTable'">
            <span>{{CollectionLabel(item.dictType,item.value)}}</span>
          </span>
          <span v-else-if="item.type == 'desc'">
            <span>{{item.value?item.value:'--'}}</span>
          </span>
          <span v-else-if="item.type == 'boolean'">
            <ta-switch :defaultChecked="item.value" checkedChildren="有效" unCheckedChildren="无效" disabled/>
          </span>
          <span v-else-if="item.type == 'date'">
            <span v-if="item.value">
              <ta-input :defaultValue="moment(item.value).format('YYYY-MM-DD')" disabled></ta-input>
            </span>
            <span v-else>
              永久
            </span>
          </span>
          <span v-else-if="item.type == 'img'">
            <img :src="item.value"/>
          </span>
          <span v-else>
            {{item.value}}
          </span>
        </ta-form-item>
      </ta-form>
    </ta-drawer>
  </div>
</template>

<script>
import moment from 'moment'

const formItemLayout = {
  labelCol: {span: 5},
  wrapperCol: {span: 19}
}
export default {
  name: 'showDetailInfo',
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    title: {
      required: true
    },
    isShow: {
      type: Boolean,
      required: true
    },
    width: {
      type: [Number, String],
      default: function () {
        return '500'
      }
    }
  },
  data () {
    return {
      drawerTitle: '', // 默认抽屉标题
      formItemLayout
    }
  },
  mounted () {
    this.fnInitDrawer()
  },
  watch: {
    isShow (isShow) {
      if (isShow) {
        this.isShow = isShow
      }
    }
  },
  methods: {
    moment,
    // fnLoadType(item) {
    //   console.log('item111', item);
    //   let type = item.type;
    //   if (!type) {
    //     type = 'text';
    //   }
    //   switch (type) {
    //     case 'text':
    //       // 如果不存在或者是text,则加载文本
    //       return "<input defaultValue=\"456\"></input>"
    //       break;
    //     case 'img':
    //       return '<img src="item.value" disabled></img> '
    //       break;
    //     case 'codeTable':
    //       // 如果是码表,则进行加载码表
    //       break;
    //     case '':
    //       break;
    //     default:
    //       //默认显示文本类型
    //       return '<ta-input disabled></ta-input> ';
    //   }
    // },
    // 初始化抽屉
    fnInitDrawer () {
      this.drawerTitle = this.title
    },
    // 关闭模态框
    fnCloseDrawer () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped type="text/scss" lang="scss">

</style>
