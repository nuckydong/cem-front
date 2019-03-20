import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

import codetable from './modules/codetable'
import taUserSelect from '@yh/ta404-ui/dist/userSelect/userSelect.js'

Vue.use(Vuex)
Vue.mixin({
  created: function () {
    var self = this
    var loadList = this.collectionList

    if (loadList) {
      loadList.forEach(function (value, index) {
        self.$store.dispatch('loadCodeIfAbsent$$', value)
      })
    }
  },
  computed: {
    CollectionData () {
      return function (collectionType) {
        this.$store.dispatch('loadCodeIfAbsent$$', collectionType)
        return this.$store.getters.getCodeList_(collectionType)
      }
    }
  },
  methods: {
    CollectionLabel (collectionType, value) {
      this.$store.dispatch('loadCodeIfAbsent$$', collectionType)
      return this.Base.getCodeName(this.$store.getters.getCodeList_(collectionType), value) || value
    }
  }
})

const debug = process.env.NODE_ENV !== 'production'

// export default new Vuex.Store({
//   strict:debug,
//   store:{
//     count:0
//   },
//   mutations:mutations,
//   actions:actions,
//   // plugins:plugins
//
// })

const store = new Vuex.Store({
  strict: debug,
  state: {
    count: 0,
    width: [{
      attr: '15',
      preview: '70',
      components: '15'
    }, {
      attr: '20',
      preview: '60',
      components: '20'
    }, {
      attr: '25',
      preview: '50',
      components: '25'
    }],
    css: '', // 用户编辑的自定义css字符串
    activeUI: 'Ta404-UI',
    currentComponent: {}, // 预览视图的选中组件
    components: [], // 预览视图的组件树
    backupComponents: [], // 删除组件时备份的
    copiedComponents: []// 复制的组件
  },
  mutations: mutations,
  actions: actions,
  modules: {
    codetable: codetable,
    taUserSelect: taUserSelect.userSelectStore
  }
})

export default store
