import {Vue} from 'common/js/public-ant.js';
import router from './router/index' //引入 改模块的路由模块
//引入路由,并把模块渲染到节点html节点上
new Vue({
  router: router,
}).$mount('#app');
