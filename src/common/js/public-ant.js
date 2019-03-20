import faceConfig from 'faceConfig'
import Vue from 'vue'
import Ta404UI from '@yh/ta404-ui'
import '@yh/ta404-ui/dist/ta404-ui.css'
import store from '@/common/store'
import taMixins from './mixins/mixins.js'
require('@/common/scss/reset.scss')
window.faceConfig = faceConfig
Vue.use(Ta404UI)
export {
  Vue,
  store,
  taMixins
}
