require('./font/iconfont.css')
require('./font/save.css')
require('./font/new.css')
require('./font/huitui.css')
require('./worktable.scss')// 引入公共样式
require('./js/createApp.js')
require('./font/save.js')
document.body.addEventListener('mousedown',(e)=>{
  window.parent.indexTool.closeIndexPops();
});
