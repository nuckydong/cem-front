import {Vue,taMixins} from 'common/js/public-ant.js';
import app from './formDesign.vue';
// 自己引入各种插件
import components from './components/index'
Vue.use(components)
// 把组件化页面挂载到节点app上
new Vue({
  mixins:[taMixins],
  render: h => h(app),
}).$mount("#app");
