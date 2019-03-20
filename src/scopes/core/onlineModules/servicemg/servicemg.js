import {Vue, store,taMixins} from 'common/js/public-ant.js'// 引入公共文件
import router from './router/index' // 引入 改模块的路由模块

// 自己引入各种插件
import popover from '@yh/ta404-ui/dist/popover/popover.js'
import '@yh/ta404-ui/dist/popover/popover.css'
import userSelect from '@yh/ta404-ui/dist/userSelect/userSelect.js'
import '@yh/ta404-ui/dist/userSelect/userSelect.css'
import userInput from '@yh/ta404-ui/dist/userInput/userInput.js'
import '@yh/ta404-ui/dist/userInput/userInput.css'
import tagSelect from '@yh/ta404-ui/dist/tagSelect/tagSelect.js'
import '@yh/ta404-ui/dist/tagSelect/tagSelect.css'

Vue.use(popover)
Vue.use(userSelect)
Vue.use(userInput)
Vue.use(tagSelect)

// 把组件化页面挂载到节点app上
new Vue({
  mixins:[taMixins],
  router,
  store
}).$mount('#app')
