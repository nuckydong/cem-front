import {Vue, store,taMixins} from 'common/js/public-ant.js';
import app from './demo.vue';

//自己引入各种插件
import popover from '@yh/ta404-ui/dist/popover/popover.js'
import '@yh/ta404-ui/dist/popover/popover.css'
import userSelect from '@yh/ta404-ui/dist/userSelect/userSelect.js'
import '@yh/ta404-ui/dist/userSelect/userSelect.css'
import searchPanel from '@yh/ta404-ui/dist/searchPanel/searchPanel.js'
import '@yh/ta404-ui/dist/searchPanel/searchPanel.css'
import userInput from '@yh/ta404-ui/dist/userInput/userInput.js'
import '@yh/ta404-ui/dist/userInput/userInput.css'
import tagSelect from '@yh/ta404-ui/dist/tagSelect/tagSelect.js'
import '@yh/ta404-ui/dist/tagSelect/tagSelect.css'

Vue.use(popover);
Vue.use(userSelect);
Vue.use(searchPanel);
Vue.use(userInput);
Vue.use(tagSelect);

import VueCookies from 'vue-cookies'
Vue.use(VueCookies);
new Vue({
  mixins:[taMixins],
  render: h => h(app),
  store
}).$mount("#app");
