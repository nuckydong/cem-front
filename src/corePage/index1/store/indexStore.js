import faceConfig from 'faceConfig'// 引入配置

const indexStore = {
  state: {
    // 所有菜单
    menuList: [],
    // 被打开的作为tab的菜单
    tabMenuList: [],
    // 默认被打开的为工作台
    activeTabMenu: 'worktable',
    // 一级菜单激活的选项false没有激活选项//默认是第一个选中
    activeMenuOne: false,
    // 首页配置数据
    ...faceConfig.indexPageConfig,
  },
  getters:{
    indexState:(state)=>{
      return state
    },
    layoutCfg:(state)=>{
      return {
        header:state.headerHeight,
        left:state.leftWidth
      }
    },
    leftState:(state)=>{
      return state.leftState
    }
  },
  mutations:{
    setLeftState(state, value) {
      state.leftState = value
    },
  }

}

export default indexStore
