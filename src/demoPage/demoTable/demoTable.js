import {Vue, store} from 'common/js/public-ant.js';// 引入公共文件
import app from './demoTable.vue';// 引入.vue页面模块
import '@/demoPage/common/scss/common.scss' //引入demo样式
// 把组件化页面挂载到节点app上
new Vue({
  render: h => h(app),
  store
}).$mount("#app");
