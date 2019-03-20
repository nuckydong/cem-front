//导出该模块路由
export default [
  {
    title:"生命周期示例",
    name: "vueLife",
    path: 'vueLife',
    component: ()=>import("./vueLife.vue")
  }
];

