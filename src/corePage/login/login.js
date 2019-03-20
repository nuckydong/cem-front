import Vue from 'vue'
import faceConfig from 'faceConfig'
import Ta404UI from '@yh/ta404-ui'
import '@yh/ta404-ui/dist/ta404-ui.css'
import app from './login.vue';//引入.vue页面模块
import store from './store/loginStore'
window.faceConfig = faceConfig
Vue.use(Ta404UI);
//把组件化页面挂载到节点app上
new Vue({
  store,
  render: h => h(app),
}).$mount("#app");



