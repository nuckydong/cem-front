<template>
    <div>
        <ul class="components-list">
            <!-- 导航栏 -->
            <li @dragstart="dragStart" data-name="Avatar" draggable="true">
                <ta-avatar size="large"/>
            </li>
        </ul>
    </div>
</template>
<script>


export default {
  name: 'components',
  data () {
    return {}
  },
  mounted () {

  },
  methods: {
    handleTabChange (val) {
      this.activeUI = val
    },
    getComponent (e) {
      if (!e) { return }
      if (e.localName !== 'li') { return this.getComponent(e.parentElement) } else { return e }
    },
    removeDom (e) {
      if (e && e.parentElement) { e.parentElement.removeChild(e) }
    },
    dragStart (e) {
      let componentName = e.target.getAttribute('data-name')
      let info = {
        name: componentName,
        ui: this.activeUI
      }
      e.dataTransfer.setData('info', JSON.stringify(info))
    }
  },
  computed: {
    activeUI: {
      get () {
        return 'Ta404-UI'
      },
      set (val) {
        this.$store.commit('setState', {
          activeUI: val
        })
      }
    }
  },

}
</script>
<style scoped>
    .components-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .components-list * {
        cursor: move !important;
    }

    .components-list > li {
        min-height: 36px;
        font-size: 18px;
        -webkit-user-select: none;
        transform: scale(0.7) translateX(-15%);
        padding-bottom: 10px;
        transition: transform .2s;

    &
    :hover {
        transform: scale(1) translateX(5%);
    }

    i {
        vertical-align: middle;
    }

    }

    .components-list.iview-ui > li {
        transform: scale(0.8) translateX(-5%);

    &
    :hover {
        transform: scale(1.1) translateX(10%);
    }

    }
</style>
