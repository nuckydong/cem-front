import {Vue} from 'common/js/public-ant.js';
import router from './router/index' //引入 改模块的路由模块

new Vue({
  router: router,//路由模块渲染
}).$mount('#app');
