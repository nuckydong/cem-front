// 前端所有配置放这里
const faceConfig = () => {
  return {
    // 基础路径,打包发布的时候修改为后端发布服务地址
    'basePath': 'http://localhost:8081/cem',
    // 开发模式mockServer服务地址
    'mockServer': 'http://192.168.17.18:10000/mock/5b68f9b10b81e375f173f0ed',
    // 开发模式后端服务地址
    'devServer': 'http://localhost:8081/cem',
    // 项目文件打包寻址地址
    'docModule': ['corePage/*', 'demoPage/*'],
    'coreModules': [
      'orgModules/authority',
      'orgModules/orguser',
      'systemModules/sysmg',
      'systemModules/logmg',
      'editorModules/formDesign',
      'editorModules/formPreview',
      'editorModules/onlineModulesManage',
      'editorModules/staticResourceMg',
      'onlineModules/servicemg'
    ],
    'projectModules': [
      'demoModules/projectModuleOne',
      'demoModules/projectModuleTwo',
      'demoModules/demoTest',
      'cem/demo'
    ],
    // 首页数据配置
    'indexPageConfig': {
      //menuType 菜单样式 topLeft,left,top
      menuType:'topLeft',
      //layout 布局  top,left
      layout:'left',
      // 顶部头的高度
      headerHeight: '64px',
      // 左侧菜单的宽度
      leftWidth: '230px',
      //首页右侧菜单状态expand,collapsed,false
      leftState:`expand`,
      //首页右侧菜单收起的时候的宽度//预留
      leftCloseWidth:`40px`,
      // logo框框的宽度
      logoWidth: '230px',
      // 用户信息框框的宽度
      userPaneWidth: '220px',
      // 第二条的那个tab页的高度
      tabHeight: '39px',
      // 一级菜单的显示方式(horizon水平,dropdown下拉)
      menuOneStyle: 'horizon',
      // 二级菜单显示方式(sliding侧滑,dropdown手风琴)
      menuTwoStyle: 'dropdown'
    }
  }
}
module.exports = faceConfig()
