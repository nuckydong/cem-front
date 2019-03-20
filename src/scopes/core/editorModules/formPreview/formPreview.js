import {Vue,taMixins} from 'common/js/public-ant.js';
//把组件化页面挂载到节点app上
import $ from 'jquery';
import componentDeal from './js/componentDeal'
import './formPreview.scss'
import moment from 'moment';
var da = JSON.parse(localStorage.getItem('da'));
var ht = localStorage.getItem('ht');
//装组件data属性的
var cptda = {}
//装组件的方法
var cptMethods = {}
//装组件html的
var $pnode = $('<div></div>');
$pnode.append(ht);

while ($pnode.find('.item-src').length > 0) {
  let $node = $pnode.find('.item-src:first');
  let cpt = da[$node.attr('id')];
  let rs = componentDeal[cpt.type](cpt);
  cpt && $node.replaceWith(rs.str);
  cptda[cpt.id] = rs.data;
  rs.methods && (cptMethods = Object.assign(cptMethods, rs.methods));

}


new Vue({
  el: '#app',
  mixins:[taMixins],
  data() {
    return {
      //验证
      format: {
        phone: {rules: [{pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/, message: '请输入正确的电话号码'}]},
        number: {rules: [{pattern: /^[0-9]+$/, message: '请输入数值'}]},
        email: {rules: [{type: 'email', message: '请输入正确的email'}]},
        text: {}
      },
      moment:moment,
      ...cptda
    }
  },
  methods: {
    ...cptMethods
  },
  template:
  `<ta-form layout="inline" :autoFormCreate="(form)=>{this.form = form}"><div style="padding: 10px">` + $pnode.html() + `</div></ta-form>`,
})

