
import Vue from 'vue'//引入vue
import VueRouter from 'vue-router'//引入路由
import app from '../page1.vue'//引入路由页面page1
import part1 from '../part/part1'//引入路由页面part1
import part2 from '../part/part2'//引入路由页面part2

//使用注册使用路由
Vue.use(VueRouter);
//定义该模块的路由
const router = new VueRouter({
  routes:[
    { path: '/', component: ()=> import('../page1.vue')},
    { path: '/part1', component: ()=> import('../part/part1') },
    { path: '/part2', component: ()=> import('../part/part2') }
  ]
})
//导出该模块路由
export default router;

