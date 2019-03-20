//导出该模块路由
export default [
  {
    title:"项目模块实例part 3",
    name: "modulePart3",
    path: 'modulePart3',
    component: ()=>import("./modulePart3.vue")
  }
];

