import Vue from 'vue'//引入vue
import VueRouter from 'vue-router'//引入路由
import layout from '../layout.vue'
import tabsFit from '../part/tabsFit'
import fixedTop from '../part/fixedTop'

//使用注册使用路由
Vue.use(VueRouter);
//定义该模块的路由
const router = new VueRouter({
  routes:[
    { path: '/', component: layout },
    { path: '/tabsFit', component: tabsFit },
    { path: '/fixedTop', component: fixedTop },
  ]
})
//导出该模块路由
export default router;
