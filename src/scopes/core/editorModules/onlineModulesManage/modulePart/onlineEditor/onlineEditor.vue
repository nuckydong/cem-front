<template>
    <ta-border-layout
            :center-cfg="centerCfg"
            :layout="layout"
            :left-cfg="leftCfg"
            :right-cfg="rightCfg"
    >
        <div slot="left">
            <components />
        </div>
        <div slot="right">
            <attributes></attributes>
        </div>
        <preview></preview>

    </ta-border-layout>
</template>
<script>
import preview from './components/preview'
import attributes from './components/attributes'
import Components from './components/components'

export default {
  name: 'onlineEditor',
  components: { Components, preview, attributes },
  data () {
    return {
      layout: {
        left: `300px`,
        right: `280px`
      },
      leftCfg: {
        showBar: true,
        expand: true,
        expandText: `收起`,
        title: `组件选择`

      },
      rightCfg: {
        showBar: true,
        expand: true,
        expandText: `收起`,
        title: `属性选择`

      },
      centerCfg: {}
    }
  }

}
</script>

<style scoped type="text/scss">

</style>
