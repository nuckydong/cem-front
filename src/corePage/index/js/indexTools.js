const indexTools = (indexObj) => {
  return {
    //打开一个菜单页
    openTabMenu(item) {
      if (!item.name) {
        item.name = 'new tab'
      }
      indexObj.$store.dispatch('addTabMenuList', {value: item})

    },
    //关闭一个菜单页
    closeTabMenu(value) {
      indexObj.$refs.indexTab.closeTabFn({id: value})
    },
    //关闭首页的所有弹出泡泡
    closeIndexPops() {
      //关闭用户框框
      indexObj.$refs.indexLayout.ifUserPane = false;
      //关闭tab更多选项卡框框
      indexObj.$refs.indexTab.ifShowMore = false;
    },
    //获取当前菜单id
    getActiveTabMenuId() {
      let menuId = "";
      try {
        menuId = indexObj.$store.state.indexStore.activeTabMenu;
      } catch (e) {

      }
      return menuId
    }
  }
}

export default indexTools;
