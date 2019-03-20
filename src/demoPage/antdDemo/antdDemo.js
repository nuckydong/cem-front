import {Vue, store} from 'common/js/public-ant.js';// 引入公共文件
import app from './antdDemo.vue';// 引入.vue页面模块

//自己引入各种插件
import popover from '@yh/ta404-ui/dist/popover/popover.js'
import '@yh/ta404-ui/dist/popover/popover.css'
Vue.use(popover);

import userSelect from '@yh/ta404-ui/dist/userSelect/userSelect.js'
import '@yh/ta404-ui/dist/userSelect/userSelect.css'
Vue.use(userSelect);

import searchPanel from '@yh/ta404-ui/dist/searchPanel/searchPanel.js'
import '@yh/ta404-ui/dist/searchPanel/searchPanel.css'
Vue.use(searchPanel);

// 把组件化页面挂载到节点app上
new Vue({
    render: h => h(app),
    store
}).$mount("#app");


