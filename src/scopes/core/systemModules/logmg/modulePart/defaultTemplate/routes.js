//导出该模块路由
export default [
  {
    title: "默认模板管理",
    name: "defaultTemplate",
    path: 'defaultTemplate',
    component: () => import("./defaultTemplate.vue"),
    children: [
      {
        name: 'resourceTemplate',
        path: 'resourceTemplate',
        component: () => import("./template/resourceTemplate.vue")
      },
      {
        name: 'roleTemplate',
        path: 'roleTemplate',
        component: () => import("./template/roleTemplate.vue")
      },
      {path: '', redirect: {name: "resourceTemplate"}}
    ]

  }
  ,
  {
    name: 'resourceTemplate',
    path: 'resourceTemplate',
    component: () => import("./template/resourceTemplate.vue")
  },
  {
    name: 'roleTemplate',
    path: 'roleTemplate',
    component: () => import("./template/roleTemplate.vue")
  }
];

