import {Vue, store,taMixins} from 'common/js/public-ant.js';
import app from './projectModuleTwo.vue';

new Vue({
  mixins:[taMixins],
  render: h => h(app),
  store
}).$mount("#app");
