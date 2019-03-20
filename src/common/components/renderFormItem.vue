<script type="text/jsx">
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    showValues: {
      type: Object,
      default: () => {
        return {}
      }
    },
    simpleShowSlot: {
      type: Array,
      default: () => {
        return []
      }
    },
    formSetting: {
      required: true,
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    let {formSetting} = this.$props
    return {

    }
  },
  methods: {
    buildItemShowContext (type) {
      let slot = this.$slots.default
      let formItem = this.formSetting.formItem
      let formItemId = this.formSetting.formId || ''

      switch (type) {
        case 'slot':
          return this.simpleShowSlot.indexOf(formItemId) == -1 ? slot : this.showValues[formItemId]
        case 'select':
        case 'radio':
        case 'radioButton':
          return this.CollectionLabel(formItem.collection, this.showValues[formItemId])
        default:
          return this.showValues[formItemId]
      }
    },
    buildItemContext (type) {
      let slot = this.$slots.default
      let disabled = this.formSetting.disabled
      let formItem = this.formSetting.formItem

      switch (type) {
        case 'slot':
          return slot
        case 'select':
          return (<ta-select disabled={disabled}>
            {
              this.CollectionData(formItem.collection).map(({label, value }) =>
                <ta-select-option key={value}>
                  {label}
                </ta-select-option>)
            }
          </ta-select>)
        case 'radio':
          return (<ta-radio-group disabled={disabled}>
            {
              this.CollectionData(formItem.collection).map(({label, value }) =>
                <ta-radio key={value} value={value}>
                  {label}
                </ta-radio>)
            }
          </ta-radio-group>)
        case 'radioButton':
          return (<ta-radio-group buttonStyle="solid" disabled={disabled}>
            {
              this.CollectionData(formItem.collection).map(({label, value }) =>
                <ta-radio-button key={value} value={value}>
                  {label}
                </ta-radio-button>)
            }
          </ta-radio-group>)
        default:
          return (<ta-input disabled={disabled}/>)
      }
    }
  },
  render () {
    let _class = this.formSetting.class || ''
    let formItemId = this.formSetting.formId || ''
    let formLabel = this.formSetting.label
    let decoratorOptions = this.formSetting.decoratorOptions
    if (decoratorOptions && decoratorOptions.rules) {
      let rules = decoratorOptions.rules
      rules.map((item) => {
        if (item.type == 'number') {
          item.transform = (value) => { return Number(value) }
          item.message = '请输入数字'
        }
      })
    }
    let formItemLayout = this.formSetting.formItemLayout
    let formItem = this.formSetting.formItem

    let display = this.formSetting.display !== false
    if (!display) {
      _class += ' displayNone'
    }
    return (
      this.isShow ? <ta-form-item
        label={formLabel}
        className={_class}
        labelCol={formItemLayout.labelCol}
        wrapperCol={formItemLayout.wrapperCol}
      >
        {this.buildItemShowContext(formItem.type)
        }
      </ta-form-item>
        : <ta-form-item
          label={formLabel}
          class={_class}
          labelCol={formItemLayout.labelCol}
          wrapperCol={formItemLayout.wrapperCol}
          fieldDecoratorId={formItemId}
          fieldDecoratorOptions={decoratorOptions}
        >
          {this.buildItemContext(formItem.type)}
        </ta-form-item>
    )
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
  .displayNone{
    display: none;
  }
</style>
