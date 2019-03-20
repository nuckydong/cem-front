import faceConfig from 'faceConfig'// 引入配置
//菜单搜索
function fnCreateCheckedResourceIds(item, list, value) {
  if (item.children) {
    item.children.forEach((item) => {
      fnCreateCheckedResourceIds(item, list, value)
    })
  }
  if ((!item.children || (item.children && item.children.length === 0)) && item.name.indexOf(value) >= 0) {
    list.push(item)
  }
};

const indexStore = {
  state: {
    menuList: [], // 所有菜单
    tabMenuList: [], // 被打开的作为tab的菜单
    activeTabMenu: 'worktable', // 默认被打开的为工作台
    activeMenuOne: false, // 一级菜单激活的选项false没有激活选项//默认是第一个选中
    activeMenuTwo: '', // 二级菜单激活的选项false//''没有激活选项,
    ...faceConfig.indexPageConfig, // 首页配置数据
    ifSearchPane: false, // 是否显示搜索框
    searchValue: '', // 搜索框的值
    ifDropdownMenu: false, // 是否显示下拉框
    userInfo: {
      userName: '未登录',
      userImg: 'person-head.png',
      mainRoleName: ''
    }

  },
  getters: {
    getUserInfo: (state) => {
      return state.userInfo
    },
    getMenuListOne: (state) => {
      return state.menuList
    },
    getSearchMenuList: (state) => {
      // if (state.searchValue) { return [] }
      let list = []
      fnCreateCheckedResourceIds({children: state.menuList}, list, state.searchValue)
      return list
    },
    getSearchValue: (state) => {
      return state.searchValue
    },
    getMenuListTwo: (state) => {
      // 判断activeMenuOne是否有子节点
      let list = []
      try {
        let l = state.menuList.filter(item => item.id === state.activeMenuOne)
        list = l[0].children || []
      } catch (error) {
        list = []
      }
      return list
    },
    getActiveMenuOne: (state) => {
      return state.activeMenuOne
    },
    getActiveMenuOneName: (state) => {
      let item = state.menuList.filter(item => item.id === state.activeMenuOne)[0] || ''
      return item.name || ''
    },
    getActiveMenuTwo: (state) => {
      return state.activeMenuTwo
    },
    getTabMenuList: (state) => {
      return state.tabMenuList
    },
    getActiveTabMenu: (state) => {
      return state.activeTabMenu
    },
    getIframeList: (state) => {
      let list = []
      for (let i = 0; i < state.tabMenuList.length; i++) {
        let item = state.tabMenuList[i].url || ''
        let partId = state.tabMenuList[i].id || ''
        let url = {
          partId:partId,
          module: item.split('#/')[0],
          part: item.split('#/')[1] || ''
        }
        let flag = true
        for (let j = 0; j < list.length; j++) {
          if (list[j].module === url.module) {
            flag = false
            break
          }
        }
        flag && (list.push(url))
      }
      return list
    },
    getActiveIframe: (state) => {
      let menuId = state.activeTabMenu
      if (menuId === 'worktable') {
        return {
          module: 'worktable',
          part: '',
          partId:''
        }
      }
      let menu = state.tabMenuList.filter(item => item.id === menuId)[0] || ''
      if (menu.url) {
        return {
          partId:menu.id,
          module: menu.url.split('#/')[0],
          part: menu.url.split('#/')[1] || ''
        }
      } else {
        return {
          module: '404.html',
          part: '',
          partId:'',
        }
      }

    },
    getLeftMenuWidth: (state) => {
      return state.leftWidth
    },
    getHeaderHeight: (state) => {
      return state.headerHeight
    },
    getLogoWidth: (state) => {
      return state.logoWidth
    },
    getUserPaneWidth: (state) => {
      return state.userPaneWidth
    },
    getTabHeight: (state) => {
      return state.tabHeight
    },
    getMenuOneStyle: (state) => {
      return state.menuOneStyle
    },
    getMenuTwoStyle: (state) => {
      return state.menuTwoStyle
    },
    getIfSearchPane: (state) => {
      return state.ifSearchPane
    },
    getIfDropdownMenu: (state) => {
      return state.ifDropdownMenu
    },

  },
  actions: {
    loadMenuList({commit}, {menuList}) {
      commit('_setMenuList', menuList)
      // 初始化激活的菜单
      let actMenu = false
      if (menuList[0] && menuList[0].id) {
        actMenu = menuList[0].id
      }
      commit('_setActiveMenuOne', actMenu)
    },
    setActiveMenu({commit}, {level, value}) {
      if (level === 'one') {
        commit('_setActiveMenuOne', value)
      } else if (level === 'two') {
        commit('_setActiveMenuTwo', value)
      }
    },
    addTabMenuList({commit}, {value}) {
      if (value && value.id && (value.children === undefined || value.children.length <= 0)) {
        commit('_addTabMenuList', value)
      }
    },
    deleteTabMenuList({commit}, {value}) {
      commit('_deleteTabMenuList', value)
    },
    deleteTabMenuListAll({commit}) {
      commit('_deleteTabMenuListAll')
    },
    setActiveTabMenu({commit}, {value}) {
      commit('_setActiveTabMenu', value)
    },
    setLeftMenuWidth({commit}, {value}) {
      commit('_changeLeftMenuWidth', value)
    },
    setIfSearchPane({commit}, {value}) {
      commit('_setIfSearchPane', value)
    },
    setIfDropdownMenu({commit}, {value}) {
      commit('_setIfDropdownMenu', value)
    },
    setSearchValue({commit}, {value}) {
      commit('_setSearchValue', value)
    },
    setUserInfo({commit}) {
      Base.submit(null, {
        url: 'indexRestService/getCurUserAccount',
      }, {
        successCallback: (data) => {
          let info = {
            ...data.data.curUserAccount,
            passwordRSA: data.data.passwordRSA || true,
            isSSO: data.data.isSSO || false
          }
          commit('_setUserInfo', info || {})
        }
      })
    }
  },
  mutations: {
    _setMenuList(state, menuList) {
      state.menuList = JSON.parse(JSON.stringify(menuList))
    },
    _setActiveMenuOne(state, value) {
      state.activeMenuOne = value
    },
    _setActiveMenuTwo(state, value) {
      state.activeMenuTwo = value
    },
    _addTabMenuList(state, value) {
      if (state.tabMenuList.filter(item => item.id === value.id).length <= 0) {
        state.tabMenuList.push(value)
      }
      state.activeTabMenu = value.id
    },
    _deleteTabMenuList(state, value) {
      try {
        state.tabMenuList = JSON.parse(JSON.stringify(state.tabMenuList.filter(item => item.id !== value)))
      } catch (error) {
        console.log(error)
      }
    },
    _deleteTabMenuListAll(state) {
      state.tabMenuList = []
    },
    _setActiveTabMenu(state, value) {
      state.activeTabMenu = value
    },
    _changeLeftMenuWidth(state, value) {
      state.leftWidth = value
    },
    _setIfSearchPane(state, value) {
      state.ifSearchPane = value
    },
    _setIfDropdownMenu(state, value) {
      state.ifDropdownMenu = value
    },
    _setSearchValue(state, value) {
      state.searchValue = value
    },
    _setUserInfo(state, value) {
      state.userInfo = Object.assign(state.userInfo, value || {})
    }
  }
}

export default indexStore
