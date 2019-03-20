<template>
    <div style="padding-left:10px;">
        <!-- 组件的attributes中包含了组件的属性，如：
             attributes = {
                label: {
                    type:'text',
                    value:'按钮'
                }
            }-->
        <div v-for="(v,k,i) in attr" v-if="attr">
            <!-- 文本型（text）属性 -->
            <ta-input :label="k" :name="k" @input.native="updateAttribute" fullWidth type="text"
                           v-if="v.type==='text'" v-model="v.value"/>
            <!-- 数字型（number）属性 -->
            <ta-input-number :label="k" :name="k" @input.native="updateAttribute" fullWidth
                           type="number" v-if="v.type==='number'" v-model="v.value"/>
            <!-- 滑块型 -->
            <small v-if="v.type==='slider'">{{k+': '+v.value}}</small>
            <ta-slider :max="v.max" :min="v.min" :step="v.step" @mouseup.native="updateAttribute" v-if="v.type==='slider'"
                       v-model="v.value"/>
            <!--  标签型（label）属性  -->
            <div class="mu-text-field-label" v-if="v.type==='label'">{{v.value}}</div>
            <!--  开关（boolean）属性   -->
            <ta-switch :label="k" :style="{width:'100%',marginBottom:'10px'}" @change="updateAttribute" labelLeft v-if="v.type==='boolean'"
                       v-model="v.value"/>
            <!--  选择型 (selection) 属性  -->
            <ta-select :label="k" @input="updateAttribute" style="width:100%;" v-if="v.type==='selection'"
                             v-model="v.value">
                <ta-select-option :key="index" :title="item" :value="item" v-for="(item,index) in v.items"/>
            </ta-select>
            <!-- 图标型 (icon) 属性 Muse-UI专用 -->
            <iconPicker :name="k" @change="updateAttribute" v-if="v.type==='icon'" v-model="v.value"/>
            <!-- 图标型 (ionicon) 属性 iView-UI专用 -->
            <ioniconPicker :name="k" @change="updateAttribute" v-if="v.type==='ionicon'" v-model="v.value"/>
            <!-- 颜色型 (color) 属性 -->
            <ta-color-picker :name="k" @change="updateAttribute" v-if="v.type==='color'" v-model="v.value"/>
            <!-- 子属性 -->
            <subAttributes :attributes="v.children" :keyOfAttr="k" @update="subUpdate" v-if="v.children"/>
        </div>
    </div>
</template>
<script>

export default {
  name: 'subAttributes',
  data () {
    return {
      attr: {}
    }
  },
  props: {
    attributes: {
      type: Object,
      default: null
    },
    keyOfAttr: {
      type: String,
      default: null
    }
  },
  created () {
    this.attr = JSON.parse(JSON.stringify(this.attributes))
  },
  watch: {
    attributes: {
      deep: true,
      handler (val, oldVal) {
        this.attr = JSON.parse(JSON.stringify(val))
      }
    }
  },
  methods: {
    subUpdate (attr) { // 收到了子组件的更新
      Object.assign(this.attr, attr)
      this.updateAttribute()
    },
    updateAttribute () { // 提交更新到父组件
      if (this.keyOfAttr) {
        this.$emit('update', {
          [this.keyOfAttr]: {
            children: this.attr
          }
        })
      } else {
        this.$emit('update', this.attr)
      }
    }
  },
  components: {
  }
}
</script>
