import Vue from 'vue'
import Vuex from 'vuex'
import indexStore from './store/indexStore'
import faceConfig from 'faceConfig'
import Ta404UI from '@yh/ta404-ui'
import '@yh/ta404-ui/dist/ta404-ui.css'
import app from './index1.vue'//引入组件化页面
window.faceConfig=faceConfig;
Vue.use(Ta404UI);
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    indexStore
  }
})


const indexPage=new Vue({
  store,
  render: h => h(app)
}).$mount('#app');









